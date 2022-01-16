import { Component, OnInit } from '@angular/core';
import { InflectionCategory } from '../../../shared/models/inflection-category';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import type { DefaultSuccessResponse, InflectionCategoryGetDetailResponse, InflectionCategoryPostCreateResponse } from '../../../shared/models/http/httpresponses';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'admin-inflection-category-detail',
  templateUrl: './inflection-category-detail.component.html',
  styleUrls: ['./inflection-category-detail.component.less']
})
export class InflectionCategoryDetailComponent implements OnInit {
  public item: InflectionCategory | undefined;
  public isNew: boolean = false;
  public isWaitingForServer: boolean = false;
  public error: string = '';

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = parseInt(params.id, 10);

      if (Number.isNaN(id) || id === -1) {
        this.item = {
          id: -1,
          name: "",
          description: "",
        };
        this.isNew = true;
      }
      else {
        this.apiService.get("inflection-category/get/" + id).then((result: InflectionCategoryGetDetailResponse) => {
          this.item = result.inflectionCategory;
          // If invalid quiz then route back to quiz list
          if (!this.item) {
            this.router.navigate(["/admin/inflection-categories"]);
          }
        });
      }
    });
  }

  public createItem (): void {
    this.isWaitingForServer = true;
    this.error = '';

    this.apiService.post("inflection-category/create", this.item)
    .then((result: InflectionCategoryPostCreateResponse) => {
      if (result.inflectionCategory) {
        this.router.navigate(["/admin/inflection-categories"]);
      } else {
        this.error = result.error;
      }
      this.isWaitingForServer = false;
    });
  }

  public updateItem (): void {
    this.isWaitingForServer = true;
    this.error = '';

    this.apiService.post("inflection-category/update", this.item)
    .then((result: DefaultSuccessResponse ) => {
      if (result.success) {

      } else {
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
