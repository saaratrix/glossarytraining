import { Component, OnInit } from '@angular/core';
import { Phrase } from '../../../shared/models/phrase.model';
import { InflectionCategory } from '../../../shared/models/inflection-category';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { Inflection } from '../../../shared/models/inflection';
import { DefaultSuccessResponse, InflectionCategoryGetResponse, InflectionGetDetailResponse, InflectionPostCreateResponse, PhraseGetResponse } from '../../../shared/models/http/httpresponses';
import { NgForm } from '@angular/forms';
import { ItemToggledEvent } from '../../../shared/components/item-toggle-selector/item-toggle-selector.component';

@Component({
  selector: 'admin-inflection-detail',
  templateUrl: './inflection-detail.component.html',
  styleUrls: ['./inflection-detail.component.less']
})
export class InflectionDetailComponent implements OnInit {
  public inflectionCategories: InflectionCategory[] = [];
  public phrases: Phrase[] = []

  public item: Inflection | undefined;
  public isNew: boolean = false;
  public isWaitingForServer: boolean = false;
  public error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.getAllInflectionCategories();
    this.getAllPhrases();
    this.initRouteInflectionIdSubscription();
  }

  private initRouteInflectionIdSubscription(): void {
    this.route.params.subscribe((params) => {
      const id = parseInt(params.id, 10);
      if (Number.isNaN(id) || id === -1) {
        this.item = {
          id: -1,
          inflection: "",
          note: "",
          phrase: undefined,
          // This category will be replaced as soon as trySetCategory() is finished
          inflectionCategory: {
            id: 1,
            name: "",
            description: "",
          },
        };
        this.isNew = true;
        this.trySetInflectionCategory();
      } else {
        this.apiService.get(`inflection/get/${id}`).then((result: InflectionGetDetailResponse) => {
          this.item = result.inflection;
          // If invalid item then route back to the item list.
          if (!this.item) {
            this.router.navigate(["/admin/inflections"]);
            return;
          }

          this.trySetInflectionCategory();
          this.trySetPhrase();
        });
      }
    });
  }

  private getAllInflectionCategories(): void {
    this.apiService.get("inflection-category/get").then((result: InflectionCategoryGetResponse) => {
      if (!result.inflectionCategories?.length) {
        this.error = "Failed to load inflection categories.";
      } else {
        this.inflectionCategories = result.inflectionCategories;
      }

      this.trySetInflectionCategory();
    });
  }

  /**
   * Try and set the actual reference so ngModel works properly.
   */
  private trySetInflectionCategory(): void {
    if (!this.inflectionCategories.length || !this.item) {
      return;
    }

    const inflectionCategory = this.inflectionCategories.find((item: InflectionCategory) => {
      return item.id === this.item.inflectionCategory.id;
    });

    this.item.inflectionCategory = inflectionCategory;

  };

  private getAllPhrases(): void {
    this.apiService.get<PhraseGetResponse>("phrase/get").then(result => {
      if (!result.phrases?.length) {
        this.error = "Failed to load phrases.";
        return;
      }

      this.phrases = result.phrases;
      this.trySetPhrase();
    })
  }

  private trySetPhrase(): void {
    if (!this.phrases.length || !this.item?.phrase) {
      return;
    }
    // Since item.phrase can be undefined we can just set this right away.
    this.item.phrase = this.phrases.find(p => p.id === this.item.phrase.id);
  }

  onPhraseToggled (itemClicked: ItemToggledEvent) {
    this.item.phrase = itemClicked.item as Phrase;
  }

  onInflectionCategoryToggled (itemClicked: ItemToggledEvent) {
    this.item.inflectionCategory = itemClicked.item as InflectionCategory;
  }

  public createItem (): void {
    this.isWaitingForServer = true;
    this.error = null;

    this.apiService.post("inflection/create", {
      ...this.item,
    })
    .then((result: InflectionPostCreateResponse) => {
      if (result.inflection) {
        // If success show that it was updated?
        this.router.navigate(["/admin/inflection/-1"]);
        this.item.id = -1;
        this.item.inflection = "";
        this.item.phrase = undefined;
        // Specifically isn't changing inflection category because it could be likely you're adding 2 inflections to the same inflection category in a row.
      } else {
        this.error = result.error;
      }
      this.isWaitingForServer = false;
    });
  }

  public updateItem (): void {
    this.isWaitingForServer = true;
    this.error = null;

    this.apiService.post("inflection/update", {
      ...this.item,
    })
    .then((result: DefaultSuccessResponse ) => {
      if (!result.success) {
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
}
