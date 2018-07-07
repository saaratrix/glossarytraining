import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../shared/services/api.service";
import { Phrase } from "../../../shared/models/phrase.model";
import { DefaultSuccessResponse, PhraseGetResponse } from "../../../shared/models/httpresponses";
import { PhrasesByCategory } from "../../../shared/models/phrases-by-category.model";

import { EntityListComponent } from "../../shared/entity-list/entity-list.component";
import { EditFieldType } from "../../../shared/enums/edit-field-type.enum";

@Component({
  selector: "app-admin-phrases-list",
  templateUrl: "./phrases-list.component.html",
  styleUrls: ["./phrases-list.component.less"]
})
export class PhrasesListComponent implements OnInit {

  public phrasesByCategories: PhrasesByCategory[];
  public EditFieldTypes: any;

  constructor (private apiService: ApiService) {
    this.phrasesByCategories = [];
    this.EditFieldTypes = EditFieldType;
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

    });
  }

  public getToggleListText (isVisible: boolean): string {
    if (isVisible) {
      return "⯆";
    }
    else {
      return "⯈";
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
}
