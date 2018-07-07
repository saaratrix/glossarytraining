import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../shared/services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "../../../shared/models/category.model";
import { Phrase } from "../../../shared/models/phrase.model";
import {
  CategoryGetResponse, DefaultSuccessResponse,
  PhraseGetDetailResponse, PhrasePostCreateResponse
} from "../../../shared/models/httpresponses";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-admin-phrases-detail",
  templateUrl: "./phrases-detail.component.html",
  styleUrls: ["./phrases-detail.component.less"]
})
export class PhrasesDetailComponent implements OnInit {
  public categories: Category[];

  public item: Phrase;
  public isNew: boolean;
  public isWaitingForServer: boolean;
  public error: string;

  constructor (private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.item = null;
    this.isNew = false;
    this.categories = [];

    this.isWaitingForServer = false;
    this.error = null;
  }

  ngOnInit () {
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
          finnish: "",
          english: "",
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
        this.apiService.get("phrase/get/" + id).then((result: PhraseGetDetailResponse) => {
          this.item = result.phrase;
          // If invalid quiz then route back to quiz list
          if (!this.item) {
            this.router.navigate(["/admin/phrases"]);
            return;
          }

          trySetCategory();
        });
      }
    });
  }

  onCategoryToggled (category: Category) {

  }

  public createItem (): void {
    this.isWaitingForServer = true;
    this.error = null;

    this.apiService.post("phrase/create", {
      id: this.item.id,
      finnish: this.item.finnish,
      english: this.item.english,
      note: this.item.note,
      categoryId: this.item.category.id,
      categoryName: this.item.category.name
    })
    .then((result: PhrasePostCreateResponse) => {
      if (result.phrase) {
        // If success show that it was updated?
        this.router.navigate(["/admin/phrase/-1"]);
        this.item.id = -1;
        this.item.finnish = "";
        this.item.english = "";
        this.item.note = "";
        // Specifically isn't changing category because it could be likely you're adding 2 phrases to the same category in a row
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

    this.apiService.post("phrase/update", {
      id: this.item.id,
      finnish: this.item.finnish,
      english: this.item.english,
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

}
