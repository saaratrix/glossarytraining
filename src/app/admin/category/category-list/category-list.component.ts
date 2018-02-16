import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../shared/services/api.service";
import { Category } from "../../../shared/models/category.model";
import { CategoryGetResponse, DefaultSuccessResponse } from "../../../shared/models/httpresponses";

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.less']
})
export class CategoryListComponent implements OnInit {

  public items: Category[];

  constructor(private apiService: ApiService) {
    this.items = [];
  }

  ngOnInit() {
    this.apiService.get("category/get").then((response: CategoryGetResponse) => {
      this.items = response.categories || [];
    });
  }

  public removeItem (item: Category) {
    this.apiService.post("category/remove", item)
      .then((result: DefaultSuccessResponse) => {
        if (result.success) {
          const index = this.items.indexOf(item);
          if (index !== -1) {
           this.items.splice(index, 1);
          }
        }
      });
  }

}
