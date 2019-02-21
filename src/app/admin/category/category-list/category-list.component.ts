import { Component, EventEmitter, OnInit } from "@angular/core";
import { ApiService } from "../../../shared/services/api.service";
import { Category } from "../../../shared/models/category.model";
import { CategoryGetResponse, DefaultSuccessResponse } from "../../../shared/models/httpresponses";
import { EditFieldType } from "../../../shared/enums/edit-field-type.enum";
import { EntityEditUpdateEvent } from "../../shared/entity-edit/entity-edit.component";
import { EntityUpdateErrorEvent, EntityUpdateSuccessEvent } from "../../phrases/phrases-list/phrases-list.component";

@Component({
  selector: "app-admin-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.less"]
})
export class CategoryListComponent implements OnInit {

  public items: Category[];
  public EditFieldTypes: any;

  public onstartEvent: EventEmitter<number>;
  public onsuccessEvent: EventEmitter<EntityUpdateSuccessEvent>;
  public onerrorEvent: EventEmitter<EntityUpdateErrorEvent>;

  constructor (private apiService: ApiService) {
    this.items = [];

    this.EditFieldTypes = EditFieldType;

    this.onstartEvent = new EventEmitter<number>();
    this.onsuccessEvent = new EventEmitter<EntityUpdateSuccessEvent>();
    this.onerrorEvent = new EventEmitter<EntityUpdateErrorEvent>();
  }

  ngOnInit () {
    this.apiService.get("category/get").then((response: CategoryGetResponse) => {
      this.items = response.categories || [];
    });
  }

  public removedItem (category: Category) {
    const index = this.items.indexOf(category);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  public updateItem (event: EntityEditUpdateEvent): void {
    let category = event.entity as Category;

    this.onstartEvent.emit(event.index);

    this.apiService.post("category/update", {
      id: category.id,
      name: category.name
    })
    .then((result: DefaultSuccessResponse ) => {
      if (result.success) {
        this.onsuccessEvent.emit({
          index: event.index,
          entity: category
        });
      }
      else {
        this.onerrorEvent.emit({
          index: event.index,
          error: result.error
        });
      }
    });
  }
}
