import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import {
  CategoryGetResponse, DefaultSuccessResponse,
} from '../../../shared/models/http/httpresponses';
import { ItemToggledEvent } from '../../../shared/components/item-toggle-selector/item-toggle-selector.component';
import { NgForm } from '@angular/forms';
import { ImagePhrase } from '../../../shared/models/image-phrase.model';
import { ImagePhrasePostCreateResponse } from '../../../shared/models/http/image-phrase-post-create-response';
import { ImagePhraseDetailResponse } from '../../../shared/models/http/image-phrase-detail-response';

@Component({
  selector: 'app-image-phrases-detail',
  templateUrl: './image-phrases-detail.component.html',
  styleUrls: ['./image-phrases-detail.component.less']
})
export class ImagePhrasesDetailComponent implements OnInit {

  public static readonly ImageMaxSize: number = 128;
  public static readonly MaxImageSize: number = 16777215 - 512 - 256 - 4;

  public categories: Category[];

  public item: ImagePhrase;
  public isNew: boolean;
  public isWaitingForServer: boolean;
  public error: string;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
  ) {
    this.item = null;
    this.isNew = false;
    this.categories = [];

    this.isWaitingForServer = false;
    this.error = null;
  }

  ngOnInit(): void {
    /**
     * Try and set the actual category reference so ngModel works properly.
     */
    const trySetCategory = (): void => {
      if (this.categories.length > 0 && this.item) {
        const category = this.categories.find((item: Category) => {
          return item.id === this.item.category.id;
        });

        this.item.category = category;
      }
    };

    // Get all categories
    this.apiService.get("category/get").then((result: CategoryGetResponse) => {

      // If server would return faulty
      if (!result.categories || result.categories.length <= 0) {
        this.error = "Failed to load categories.";
      }
      else {
        this.categories = result.categories;
      }

      trySetCategory();
    });

    this.route.params.subscribe((params) => {
      const id = parseInt(params.id, 10);

      if (Number.isNaN(id) || id === -1) {
        this.item = {
          id: -1,
          imageBase64: "",
          finnish: "",
          note: "",
          // This category will be replaced as soon as trySetCategory() is finished
          category: {
            id: 1, // The uncategorised Id is 1
            name: ""
          }
        };
        this.isNew = true;
        trySetCategory();
      }
      else {
        this.apiService.get("imagephrase/get/" + id).then((result: ImagePhraseDetailResponse) => {
          this.item = result.imagePhrase;
          // If invalid quiz then route back to quiz list
          if (!this.item) {
            this.router.navigate(["/admin/imagephrases"]);
            return;
          }

          trySetCategory();
        });
      }
    });
  }

  onCategoryToggled (itemClicked: ItemToggledEvent) {
    this.item.category = itemClicked.item as Category;
  }

  public createItem (): void {
    this.isWaitingForServer = true;
    this.error = null;

    this.apiService.post("imagephrase/create", {
      id: this.item.id,
      imageBase64: this.item.imageBase64,
      finnish: this.item.finnish,
      note: this.item.note,
      categoryId: this.item.category.id,
      categoryName: this.item.category.name
    })
      .then((result: ImagePhrasePostCreateResponse) => {
        if (result.imagePhrase) {
          // If success show that it was updated?
          this.router.navigate(["/admin/imagephrase/-1"]);
          this.item.id = -1;
          this.item.imageBase64 = "";
          this.item.finnish = "";
          this.item.note = "";
          // We Specifically don't change the category because it could be likely you're adding 2 phrases to the same category in a row
        }
        else {
          this.error = result.error;
        }
        this.isWaitingForServer = false;
      });
  }

  public updateItem (): void {
    this.isWaitingForServer = true;
    this.error = null;

    this.apiService.post("imagephrase/update", {
      id: this.item.id,
      imageBase64: this.item.imageBase64,
      finnish: this.item.finnish,
      note: this.item.note,
      categoryId: this.item.category.id,
      categoryName: this.item.category.name
    })
      .then((result: DefaultSuccessResponse ) => {
        if (result.success) {

        }
        else {
          this.error = result.error;
        }

        this.isWaitingForServer = false;
      });
  }

  public onSubmit (form: NgForm): void {
    if (form.valid) {
      if (this.isNew) {
        this.createItem();
      }
      else {
        this.updateItem();
      }
    }
  }

  setImageBase64(event: Event) {
    const file = (<HTMLInputElement>event.target).files[0];
    if (!file) {
      this.item.imageBase64 = "";
      return;
    }

    this.error = '';

    const fr = new FileReader();
    fr.onload = () => {
      this.tryResizeImage(file, fr.result as string);
    }
    fr.onerror = () => {
      this.error = "Failed to read image";
      this.item.imageBase64 = "";
    }
    fr.readAsDataURL(file);
  }

  private tryResizeImage(file: File, dataUrl: string): void {
    // At the moment we'd just kill the gif if we would try and modify that.
    // So it's easier to just use a back end library then! ^^
    if (file.name.endsWith('.gif')) {
      this.trySetImageBase64(dataUrl);
      return;
    }

    const image = new Image();
    image.onload = () => {
      this.resizeImage(image);
    };
    image.onerror = () => {
      this.error = "failed to load image";
    }
    image.src = dataUrl;
  }

  // Modified source from: https://stackoverflow.com/a/20382559/2437350
  private resizeImage(image: HTMLImageElement) {
    if (image.naturalWidth <= ImagePhrasesDetailComponent.ImageMaxSize && image.naturalHeight <= ImagePhrasesDetailComponent.ImageMaxSize) {
      this.trySetImageBase64(image.src);
      return;
    }

    let targetWidth: number = ImagePhrasesDetailComponent.ImageMaxSize;
    let targetHeight: number = ImagePhrasesDetailComponent.ImageMaxSize;
    if (image.naturalWidth > image.naturalHeight) {
      targetHeight = image.naturalHeight * (ImagePhrasesDetailComponent.ImageMaxSize / image.naturalWidth);
    } else if (image.naturalHeight > image.naturalWidth) {
      targetWidth = image.naturalWidth * (ImagePhrasesDetailComponent.ImageMaxSize / image.naturalHeight);
    }

    // The target resize canvas
    const canvas = document.createElement("canvas");

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");
    ctx.scale(targetWidth / image.naturalWidth, targetHeight / image.naturalHeight);
    ctx.drawImage(image, 0, 0);
    const newDataURL = canvas.toDataURL();

    // Check that the new dataURL is actually smaller thanks to compression etc.
    const dataUrl = newDataURL.length < image.src.length ? newDataURL : image.src
    this.trySetImageBase64(dataUrl);
  }

  private trySetImageBase64(dataUrl: string): boolean {
    if (dataUrl.length >= ImagePhrasesDetailComponent.MaxImageSize) {
      this.error = "image was too large";
      this.item.imageBase64 = "";
      return;
    }

    this.item.imageBase64 = dataUrl;
  }
}
