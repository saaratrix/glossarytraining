import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../shared/services/api.service";
import { Phrase } from "../../../shared/models/phrase.model";
import { DefaultSuccessResponse, PhraseGetResponse } from "../../../shared/models/httpresponses";
import { PhrasesByCategory } from "../../../shared/models/phrases-by-category.model";

import { EntityListComponent } from "../../shared/entity-list/entity-list.component";

@Component({
  selector: 'app-admin-phrases-list',
  templateUrl: './phrases-list.component.html',
  styleUrls: ['./phrases-list.component.less']
})
export class PhrasesListComponent implements OnInit {

  public phrasesByCategories: PhrasesByCategory[];

  constructor (private apiService: ApiService) {
    this.phrasesByCategories = [];
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
            phrases: []
          };

          this.phrasesByCategories.push(phraseByCategory);
        }

        phraseByCategory.phrases.push(phrase);
      }

    });
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
