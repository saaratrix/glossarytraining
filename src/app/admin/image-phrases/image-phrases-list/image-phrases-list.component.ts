import { Component, EventEmitter, OnInit } from '@angular/core';
import { Category } from '../../../shared/models/category.model';
import { EditFieldType } from '../../../shared/enums/edit-field-type.enum';
import { EntityUpdateSuccessEvent } from '../../shared/models/events/entity-update-success.event';
import { EntityUpdateErrorEvent } from '../../shared/models/events/entity-update-error.event';
import { ApiService } from '../../../shared/services/api.service';
import {
  CategoryGetResponse,
  DefaultSuccessResponse,
} from '../../../shared/models/http/httpresponses';
import { EntityEditUpdateEvent } from '../../shared/entity-edit/entity-edit.component';
import { ImagePhraseGetResponse } from '../../../shared/models/http/image-phrase-get-response';
import { ImagePhrase } from '../../../shared/models/image-phrase.model';
import { ImagePhrasesByCategory } from '../../../shared/models/image-phrases-by-category.model';

@Component({
  selector: 'app-image-phrases-list',
  templateUrl: './image-phrases-list.component.html',
  styleUrls: ['./image-phrases-list.component.less']
})
export class ImagePhrasesListComponent implements OnInit {

  public imagePhrasesByCategory: ImagePhrasesByCategory[];

  public categories: Category[];

  public EditFieldTypes: typeof EditFieldType;

  public onstartEvent: EventEmitter<number>;
  public onsuccessEvent: EventEmitter<EntityUpdateSuccessEvent>;
  public onerrorEvent: EventEmitter<EntityUpdateErrorEvent>;

  constructor (
    private apiService: ApiService,
  ) {
    this.imagePhrasesByCategory = [];
    this.categories = [];
    this.EditFieldTypes = EditFieldType;

    this.onstartEvent = new EventEmitter<number>();
    this.onsuccessEvent = new EventEmitter<EntityUpdateSuccessEvent>();
    this.onerrorEvent = new EventEmitter<EntityUpdateErrorEvent>();
  }

  ngOnInit () {
    this.apiService.get<ImagePhraseGetResponse>("imagephrase/get").then((response: ImagePhraseGetResponse) => {
      const imagePhrases = response.imagePhrases || [];

      for (let i = 0; i < imagePhrases.length; i++) {
        const imagePhrase: ImagePhrase = imagePhrases[i];

        let imagePhrasesByCategory: ImagePhrasesByCategory = this.imagePhrasesByCategory.find((item: ImagePhrasesByCategory) => {
          return item.category.id === imagePhrase.category.id;
        });

        if (!imagePhrasesByCategory) {
          imagePhrasesByCategory = {
            category: imagePhrase.category,
            imagePhrases: [],
            isVisible: true
          };

          this.imagePhrasesByCategory.push(imagePhrasesByCategory);
        }

        imagePhrasesByCategory.imagePhrases.push(imagePhrase);
      }

      this.apiService.get<CategoryGetResponse>("category/get").then((response: CategoryGetResponse) => {
        this.categories = response.categories || [];
        // Iterate over all phrases by category to set the same category as the categories reference.
        // Otherwise ngModel doesn't work.
        for (let i = 0; i < this.imagePhrasesByCategory.length; i++) {
          let phrasesByCategory = this.imagePhrasesByCategory[i];

          const category = this.categories.find((category: Category) => {
            return phrasesByCategory.category.id === category.id
          });

          if (!category) {
            continue;
          }

          phrasesByCategory.category = category;
          phrasesByCategory.imagePhrases.forEach((imagePhrase: ImagePhrase) => {
            imagePhrase.category = category;
          });
        }
      });
    });
  }

  public getToggleListText (isVisible: boolean): string {
    if (isVisible) {
      return "▶";
    }
    else {
      return "▼";
    }
  }

  public getToggleTooltip (imagePhrasesByCategory: ImagePhrasesByCategory): string {
    if (imagePhrasesByCategory.isVisible) {
      return "Click to hide " + imagePhrasesByCategory.category.name;
    }
    else {
      return "Click to show " + imagePhrasesByCategory.category.name;
    }
  }

  public toggleList (imagePhrasesByCategory: ImagePhrasesByCategory): void {
    if (imagePhrasesByCategory.isVisible) {
      imagePhrasesByCategory.isVisible = false;
    }
    else {
      imagePhrasesByCategory.isVisible = true;
    }
  }

  /**
   * Remove the phrase from the ImagePhrasesByCategories list
   */
  public removedImagePhrase (imagePhrase: ImagePhrase) {
    const phrasesByCategory = this.imagePhrasesByCategory.find((item: ImagePhrasesByCategory) => {
      return item.category.id === imagePhrase.category.id;
    });

    const index = phrasesByCategory.imagePhrases.indexOf(imagePhrase);
    if (index !== -1) {
      phrasesByCategory.imagePhrases.splice(index, 1);
    }

    if ( phrasesByCategory.imagePhrases.length <= 0 ) {
      const categoryListIndex = this.imagePhrasesByCategory.indexOf(phrasesByCategory);
      this.imagePhrasesByCategory.splice(categoryListIndex, 1);
    }
  }

  public updateImagePhrase (event: EntityEditUpdateEvent) {
    const imagePhrase = event.entity as ImagePhrase;
    this.onstartEvent.emit(event.index);

    this.apiService.post<DefaultSuccessResponse>("imagephrase/update", {
      id: imagePhrase.id,
      finnish: imagePhrase.finnish,
      imageBase64: imagePhrase.imageBase64,
      note: imagePhrase.note,
      categoryId: imagePhrase.category.id,
      categoryName: imagePhrase.category.name
    })
      .then((result: DefaultSuccessResponse ) => {
        if (result.success) {
          this.onsuccessEvent.emit({
            index: event.index,
            entity: imagePhrase
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
