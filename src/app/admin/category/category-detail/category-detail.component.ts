import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../shared/services/api.service";

@Component({
  selector: 'app-admin-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.less']
})
export class CategoryDetailComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

}
