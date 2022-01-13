import { Component, EventEmitter, OnInit } from '@angular/core';
import type { InflectionCategory } from '../../../shared/models/inflection-category';
import { EditFieldType } from '../../../shared/enums/edit-field-type.enum';
import { EntityUpdateSuccessEvent } from '../../shared/models/events/entity-update-success.event';
import { EntityUpdateErrorEvent } from '../../shared/models/events/entity-update-error.event';
import { ApiService } from '../../../shared/services/api.service';
import type { InflectionCategoryGetResponse, DefaultSuccessResponse } from '../../../shared/models/http/httpresponses';
import type { EntityEditUpdateEvent } from '../../shared/entity-edit/entity-edit.component';

@Component({
  selector: 'admin-inflection-category-list',
  templateUrl: './inflection-categories-list.component.html',
  styleUrls: ['./inflection-categories-list.component.less']
})
export class InflectionCategoriesListComponent implements OnInit {
  public items: InflectionCategory[];

  public EditFieldTypes: typeof EditFieldType;

  public onstartEvent: EventEmitter<number>;
  public onsuccessEvent: EventEmitter<EntityUpdateSuccessEvent>;
  public onerrorEvent: EventEmitter<EntityUpdateErrorEvent>;

  constructor(
    private apiService: ApiService
  ) {
    this.items = [];

    this.EditFieldTypes = EditFieldType;

    this.onstartEvent = new EventEmitter<number>();
    this.onsuccessEvent = new EventEmitter<EntityUpdateSuccessEvent>();
    this.onerrorEvent = new EventEmitter<EntityUpdateErrorEvent>();
  }

  ngOnInit(): void {
    this.apiService.get("inflection-category/get").then((response: InflectionCategoryGetResponse) => {
      this.items = response.inflectionCategories || [];
    });
  }

  public removedItem (inflectionCategory: InflectionCategory) {
    const index = this.items.indexOf(inflectionCategory);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  public updateItem (event: EntityEditUpdateEvent): void {
    let inflectionCategory = event.entity as InflectionCategory;

    this.onstartEvent.emit(event.index);

    this.apiService.post("inflection-category/update", {
      id: inflectionCategory.id,
      name: inflectionCategory.name,
      description: inflectionCategory.description,
    })
    .then((result: DefaultSuccessResponse ) => {
      if (result.success) {
        this.onsuccessEvent.emit({
          index: event.index,
          entity: inflectionCategory,
        });
      } else {
        this.onerrorEvent.emit({
          index: event.index,
          error: result.error,
        });
      }
    });
  }
}
