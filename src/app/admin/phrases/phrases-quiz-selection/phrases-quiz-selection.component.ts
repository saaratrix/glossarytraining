import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../shared/services/api.service";
import { Phrase } from "../../../shared/models/phrase.model";
import { Input } from "@angular/core";
import { PhraseGetResponse, DefaultSuccessResponse } from "../../../shared/models/httpresponses";

import { PhrasesSelectionComponent } from "../../../phrase/phrases-selection/phrases-selection.component";

@Component({
  selector: 'app-admin-phrases-quiz-selection',
  templateUrl: './phrases-quiz-selection.component.html',
  styleUrls: ['./phrases-quiz-selection.component.less']
})
export class PhrasesQuizSelectionComponent implements OnInit {

  @Input()
  public quizId: number;
  /**
   * The phrases that are selected for the quiz.
   */
  @Input()
  public selectedPhrases: Phrase[];
  /**
   * All phrases minus the selected phrases
   */
  public unselectedPhrases: Phrase[];

  public selectedError: string;
  public unselectedError: string;


  constructor (private apiService: ApiService) {
    this.quizId = -1;
    this.selectedPhrases = [];
    this.unselectedPhrases = [];

    this.selectedError = "";
    this.unselectedError = "";
  }

  ngOnInit () {
    // Get all phrases from server so we can remove the selected ones from the list
    this.apiService.get("phrase/get").then((result: PhraseGetResponse) => {
      const phrases = result.phrases || [];

      // Filter out selected ones
      this.unselectedPhrases = phrases.filter((phrase: Phrase) => {
        // Check if selectedPhrases contains one item with the same id
        const isSelected = this.selectedPhrases.find((selectedPhrase: Phrase) => {
          return selectedPhrase.id === phrase.id;
        });

        return !isSelected;
      });
    });
  }

  /**
   * Move the phrase from unselectedPhrases to selectedPhrases.
   * Also tells the server to update database with the new phrase.
   * @param {Phrase} phrase
   * @param {boolean} sendRequest
   */
  public addPhraseToQuiz (phrase: Phrase, sendRequest: boolean) {
    this.selectedPhrases.push(phrase);

    const index = this.unselectedPhrases.indexOf(phrase);
    this.unselectedPhrases.splice( index, 1 );

    if (sendRequest) {
      this.selectedError = "";

      this.apiService.post("quiz/addphrase", {
        quizId: this.quizId,
        phraseId: phrase.id
      }).then((result: DefaultSuccessResponse) => {
        if (!result.success) {
          this.selectedError = result.error;
          // Move it back to unselected, also since updating database failed theres no need to tell database.
          this.removePhraseFromQuiz(phrase, false);
        }
      });
    }
  }

  /**
   * Remove the phrase from selectedPhrases and add it to unselectedPhrases.
   * Also tells the server to remove phrase from quiz in database.
   * @param {Phrase} phrase
   * @param {boolean} sendRequest
   */
  public removePhraseFromQuiz (phrase: Phrase, sendRequest: boolean) {
    this.unselectedPhrases.push(phrase);

    const index = this.selectedPhrases.indexOf(phrase);
    this.selectedPhrases.splice( index, 1 );

    if (sendRequest) {
      this.unselectedError = "";

      this.apiService.post("quiz/removephrase", {
        quizId: this.quizId,
        phraseId: phrase.id
      }).then((result: DefaultSuccessResponse) => {
        if (!result.success) {
          this.unselectedError = "";
          this.addPhraseToQuiz(phrase, false);
        }
      });
    }
  }

}
