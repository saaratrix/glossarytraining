import { Component, EventEmitter, OnInit } from '@angular/core';
import { EditFieldType } from '../../../shared/enums/edit-field-type.enum';
import { EntityUpdateSuccessEvent } from '../../shared/models/events/entity-update-success.event';
import { EntityUpdateErrorEvent } from '../../shared/models/events/entity-update-error.event';
import { InflectionCategory } from '../../../shared/models/inflection-category';
import { InflectionsByInflectionCategory } from '../../../shared/models/inflections-by-inflection-category';
import {
  DefaultSuccessResponse,
  InflectionCategoryGetResponse,
  InflectionGetResponse,
  PhraseGetResponse
} from '../../../shared/models/http/httpresponses';
import { ApiService } from '../../../shared/services/api.service';
import { Inflection } from '../../../shared/models/inflection';
import { EntityEditUpdateEvent } from '../../shared/entity-edit/entity-edit.component';
import { Phrase } from '../../../shared/models/phrase.model';

@Component({
  selector: 'admin-inflections-list',
  templateUrl: './inflections-list.component.html',
  styleUrls: ['./inflections-list.component.less']
})
export class InflectionsListComponent implements OnInit {
  public inflectionsByCategories: InflectionsByInflectionCategory[] = [];

  public phrases: Phrase[] = [];
  public inflectionCategories: InflectionCategory[] = [];

  public EditFieldTypes: typeof EditFieldType = EditFieldType;

  public onstartEvent: EventEmitter<number> = new EventEmitter<number>();
  public onsuccessEvent: EventEmitter<EntityUpdateSuccessEvent> = new EventEmitter<EntityUpdateSuccessEvent>();
  public onerrorEvent: EventEmitter<EntityUpdateErrorEvent> = new EventEmitter<EntityUpdateErrorEvent>();

  constructor(
    private apiService: ApiService,
  ) { }

  async ngOnInit(): Promise<void> {
    const inflectionsResponse = await this.apiService.get<InflectionGetResponse>("inflection/get");
    const inflections = inflectionsResponse.inflections || [];

    for (const inflection of inflections) {
      let inflectionsByCategory: InflectionsByInflectionCategory = this.inflectionsByCategories.find((item: InflectionsByInflectionCategory) => {
        return item.inflectionCategory.id === inflection.inflectionCategory.id;
      });

      if (!inflectionsByCategory) {
        inflectionsByCategory = {
          inflectionCategory: inflection.inflectionCategory,
          inflections: [],
          isVisible: true
        };

        this.inflectionsByCategories.push(inflectionsByCategory);
      }

      inflectionsByCategory.inflections.push(inflection);
    }


    this.loadInflectionCategories();
    this.loadPhrases();
  }

  private loadInflectionCategories(): void {
    this.apiService.get<InflectionCategoryGetResponse>("inflection-category/get").then(response => {
      this.inflectionCategories = response.inflectionCategories || [];

      // Iterate over all inflections by inflection categories to set the same reference.
      // Otherwise, ngModel doesn't work.
      for (const inflectionsByCategory of this.inflectionsByCategories) {
        const inflectionCategory = this.inflectionCategories.find((ic: InflectionCategory) => {
          return inflectionsByCategory.inflectionCategory.id === ic.id
        });

        if (!inflectionCategory) {
          continue;
        }

        inflectionsByCategory.inflectionCategory = inflectionCategory;
        inflectionsByCategory.inflections.forEach(inflection => {
          inflection.inflectionCategory = inflectionCategory;
        });
      }
    });
  }

  private loadPhrases(): void {
    this.apiService.get<PhraseGetResponse>('phrase/get').then(response => {
      this.phrases = response.phrases;

      for (const inflectionsByCategory of this.inflectionsByCategories) {
        for (const inflection of inflectionsByCategory.inflections) {
          inflection.phrase = this.phrases.find(p => p.id === inflection.phrase.id);
        }
      }
    });
  }

  public getToggleListText (isVisible: boolean): string {
    if (isVisible) {
      return "▶";
    } else {
      return "▼";
    }
  }

  public getToggleTooltip (inflectionsByInflectionCategory: InflectionsByInflectionCategory): string {
    if (inflectionsByInflectionCategory.isVisible) {
      return "Click to hide " + inflectionsByInflectionCategory.inflectionCategory.name;
    } else {
      return "Click to show " + inflectionsByInflectionCategory.inflectionCategory.name;
    }
  }

  public toggleList (inflectionsByInflectionCategory: InflectionsByInflectionCategory): void {
    if (inflectionsByInflectionCategory.isVisible) {
      inflectionsByInflectionCategory.isVisible = false;
    } else {
      inflectionsByInflectionCategory.isVisible = true;
    }
  }

  /**
   * Remove the inflection from the inflectionsByInflectionCategory list
   */
  public removedItem (item: Inflection) {
    const inflectionsByInflectionCategory = this.inflectionsByCategories.find((item: InflectionsByInflectionCategory) => {
      return item.inflectionCategory.id === item.inflectionCategory.id;
    });

    const index = inflectionsByInflectionCategory.inflections.indexOf(item);
    if (index !== -1) {
      inflectionsByInflectionCategory.inflections.splice(index, 1);
    }

    if (inflectionsByInflectionCategory.inflections.length <= 0) {
      const categoryListIndex = this.inflectionsByCategories.indexOf(inflectionsByInflectionCategory);
      this.inflectionsByCategories.splice(categoryListIndex, 1);
    }
  }

  public updateItem (event: EntityEditUpdateEvent) {
    var inflection = event.entity as Inflection;

    this.onstartEvent.emit(event.index);

    this.apiService.post("inflection/update", {
      ...inflection,
    })
    .then((result: DefaultSuccessResponse ) => {
      if (result.success) {
        this.onsuccessEvent.emit({
          index: event.index,
          entity: inflection,
        });
      } else {
        this.onerrorEvent.emit({
          index: event.index,
          error: result.error
        });
      }
    });
  }
}
