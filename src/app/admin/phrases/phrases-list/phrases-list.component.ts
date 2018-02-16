import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../shared/services/api.service";
import { Phrase } from "../../../shared/models/phrase.model";
import { DefaultSuccessResponse, PhraseGetResponse } from "../../../shared/models/httpresponses";
import { PhrasesByCategory } from "../../../shared/models/phrases-by-category.model";

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

      this.sortPhrasesByCategory();

      console.log(this.phrasesByCategories);
    });
  }

  /**
   * Remove the phrase from the PhrasesByCategories list
   * @param {Phrase} phrase
   */
  public removeItem (phrase: Phrase) {
    this.apiService.post("phrase/remove", phrase)
      .then((result: DefaultSuccessResponse) => {
        if (result.success) {
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
      });
  }

  /**
   * Sort the phrases by category list by category name
   * Also sorts the phrases inside each category list by the phrase name.
   */
  private sortPhrasesByCategory () {
    // Sort based off category name
    this.phrasesByCategories.sort((a: PhrasesByCategory, b: PhrasesByCategory): number => {
      const aName = a.category.name.toLowerCase();
      const bName = b.category.name.toLowerCase();

      if (aName < bName) { return -1; }
      if (aName > bName) { return 1; }
      return 0;
    });

    this.phrasesByCategories.forEach((categoryList: PhrasesByCategory) => {
      categoryList.phrases.sort((a: Phrase, b: Phrase) => {
        const aName = a.finnish.toLowerCase();
        const bName = b.finnish.toLowerCase();

        if (aName < bName) { return -1; }
        if (aName > bName) { return 1; }
        return 0;
      });
    });
  }
}
