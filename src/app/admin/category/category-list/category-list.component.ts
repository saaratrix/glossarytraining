import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../shared/services/api.service";

import { Category } from "../../../shared/models/category.model";

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.less']
})
export class CategoryListComponent implements OnInit {

  public categories: Category[];

  constructor(private apiService: ApiService) {
    this.categories = [];


  }

  ngOnInit() {
  }

}
