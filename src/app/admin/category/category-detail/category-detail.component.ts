import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../shared/services/api.service";
import { Category } from "../../../shared/models/category.model";
import { CategoryGetDetailResponse, CategoryPostCreateResponse, DefaultSuccessResponse } from "../../../shared/models/httpresponses";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-admin-category-detail",
  templateUrl: "./category-detail.component.html",
  styleUrls: ["./category-detail.component.less"]
})
export class CategoryDetailComponent implements OnInit {
  public item: Category;
  public isNew: boolean;
  public isWaitingForServer: boolean;
  public error: string;

  constructor (private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.item = null;
    this.isNew = false;

    this.isWaitingForServer = false;
    this.error = null;
  }

  ngOnInit () {
    this.route.params.subscribe((params) => {
      const id = parseInt(params.id, 10);

      if (Number.isNaN(id) || id === -1) {
        this.item = {
          id: -1,
          name: ""
        };
        this.isNew = true;
      }
      else {
        this.apiService.get("category/get/" + id).then((result: CategoryGetDetailResponse) => {
          this.item = result.category;
          // If invalid quiz then route back to quiz list
          if (!this.item) {
            this.router.navigate(["/admin/categories"]);
          }
        });
      }
    });
  }

  public createItem (): void {
    this.isWaitingForServer = true;
    this.error = null;

    this.apiService.post("category/create", this.item)
      .then((result: CategoryPostCreateResponse) => {
        if (result.category) {
          this.item.id = result.category.id;
          // If success show that it was updated?
          this.isNew = false;
          this.router.navigate(["/admin/categories"]);
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

    this.apiService.post("category/update", this.item)
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
