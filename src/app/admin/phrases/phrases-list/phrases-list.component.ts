import { Component, EventEmitter, OnInit } from "@angular/core";
import { ApiService } from "../../../shared/services/api.service";
import { Phrase } from "../../../shared/models/phrase.model";
import { CategoryGetResponse, DefaultSuccessResponse, PhraseGetResponse } from "../../../shared/models/http/httpresponses";
import { PhrasesByCategory } from "../../../shared/models/phrases-by-category.model";
import { EditFieldType } from "../../../shared/enums/edit-field-type.enum";
import { Category } from "../../../shared/models/category.model";
import { EntityEditUpdateEvent } from "../../shared/entity-edit/entity-edit.component";
import { ItemToggledEvent } from "../../../shared/components/item-toggle-selector/item-toggle-selector.component";

export interface EntityUpdateStartEvent {
  index: number;
}

export interface EntityUpdateSuccessEvent {
  index: number;
  entity: any;
}

export interface EntityUpdateErrorEvent {
  index: number;
  error: string;
}

@Component({
  selector: "app-admin-phrases-list",
  templateUrl: "./phrases-list.component.html",
  styleUrls: ["./phrases-list.component.less"]
})
export class PhrasesListComponent implements OnInit {

  public phrasesByCategories: PhrasesByCategory[];

  public categories: Category[];

  public EditFieldTypes: any;

  public onListUpdate: Function;

  public onstartEvent: EventEmitter<number>;
  public onsuccessEvent: EventEmitter<EntityUpdateSuccessEvent>;
  public onerrorEvent: EventEmitter<EntityUpdateErrorEvent>;

  constructor (private apiService: ApiService) {
    this.phrasesByCategories = [];
    this.categories = [];
    this.EditFieldTypes = EditFieldType;

    this.onstartEvent = new EventEmitter<number>();
    this.onsuccessEvent = new EventEmitter<EntityUpdateSuccessEvent>();
    this.onerrorEvent = new EventEmitter<EntityUpdateErrorEvent>();

    this.onListUpdate = this.onCategoryToggled.bind(this);
  }

  ngOnInit () {
    this.apiService.get("phrase/get").then((response: PhraseGetResponse) => {
      const phrases = response.phrases || [];

      for (let i = 0; i < phrases.length; i++) {
        const phrase: Phrase = phrases[i];

        let phraseByCategory: PhrasesByCategory = this.phrasesByCategories.find((item: PhrasesByCategory) => {
          return item.category.id === phrase.category.id;
        });

        if (!phraseByCategory) {
          phraseByCategory = {
            category: phrase.category,
            phrases: [],
            isVisible: true
          };

          this.phrasesByCategories.push(phraseByCategory);
        }

        phraseByCategory.phrases.push(phrase);
      }

      this.apiService.get("category/get").then((response: CategoryGetResponse) => {
        this.categories = response.categories || [];
        // Iterate over all phrases by category to set the same category as the categories reference.
        // Otherwise ngModel doesn't work.
        for (let i = 0; i < this.phrasesByCategories.length; i++) {
          let phrasesByCategory = this.phrasesByCategories[i];

          const category = this.categories.find((category: Category) => {
            return phrasesByCategory.category.id === category.id
          });

          if (!category) {
            continue;
          }

          phrasesByCategory.category = category;
          phrasesByCategory.phrases.forEach((phrase: Phrase) => {
            phrase.category = category;
          });
        }
      });

    });
  }

  private onCategoryToggled (itemClicked: ItemToggledEvent) {
    let changedPhrase = itemClicked.item as Phrase;


  }

  public getToggleListText (isVisible: boolean): string {
    if (isVisible) {
      return "▶";
    }
    else {
      return "▼";
    }
  }

  public getToggleTooltip (phrasesByCategory: PhrasesByCategory): string {
    if (phrasesByCategory.isVisible) {
      return "Click to hide " + phrasesByCategory.category.name;
    }
    else {
      return "Click to show " + phrasesByCategory.category.name;
    }
  }

  public toggleList (phrasesByCategory: PhrasesByCategory): void {
    if (phrasesByCategory.isVisible) {
      phrasesByCategory.isVisible = false;
    }
    else {
      phrasesByCategory.isVisible = true;
    }
  }

  /**
   * Remove the phrase from the PhrasesByCategories list
   * @param {Phrase} phrase
   */
  public removedPhrase (phrase: Phrase) {
    const phrasesByCategory = this.phrasesByCategories.find((item: PhrasesByCategory) => {
      return item.category.id === phrase.category.id;
    });

    const index = phrasesByCategory.phrases.indexOf(phrase);
    if (index !== -1) {
     phrasesByCategory.phrases.splice(index, 1);
    }

    if ( phrasesByCategory.phrases.length <= 0 ) {
      const categoryListIndex = this.phrasesByCategories.indexOf(phrasesByCategory);
      this.phrasesByCategories.splice(categoryListIndex, 1);
    }
  }

  public updatePhrase (event: EntityEditUpdateEvent) {
    var phrase = event.entity as Phrase;

    this.onstartEvent.emit(event.index);

    this.apiService.post("phrase/update", {
      id: phrase.id,
      finnish: phrase.finnish,
      english: phrase.english,
      note: phrase.note,
      categoryId: phrase.category.id,
      categoryName: phrase.category.name
    })
    .then((result: DefaultSuccessResponse ) => {
      if (result.success) {
        this.onsuccessEvent.emit({
          index: event.index,
          entity: phrase
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
