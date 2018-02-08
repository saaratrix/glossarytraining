import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../shared/services/api.service";
import { Phrase } from "../../../shared/models/phrase.model";
import { Input } from "@angular/core";
import { PhraseGetResponse } from "../../../shared/models/httpresponses/phrase-get-response";

import { PhrasesSelectionComponent } from "../../../phrase/phrases-selection/phrases-selection.component";

@Component({
  selector: 'app-admin-phrases-quiz-selection',
  templateUrl: './phrases-quiz-selection.component.html',
  styleUrls: ['./phrases-quiz-selection.component.less']
})
export class PhrasesQuizSelectionComponent implements OnInit {
  /**
   * The phrases that are selected for the quiz.
   */
  @Input() public selectedPhrases: Phrase[];
  /**
   * All phrases minus the selected phrases
   */
  public unselectedPhrases: Phrase[];

  constructor(private apiService: ApiService) {
    this.selectedPhrases = [];
    this.unselectedPhrases = [];
  }

  ngOnInit() {
    // Get all phrases from server so we can remove the selected ones from the list
    this.apiService.get("phrase/get").then((result: PhraseGetResponse) => {
      // Filter out selected ones
      this.unselectedPhrases = result.phrases.filter((phrase: Phrase) => {
        // Check if selectedPhrases contains one item with the same id
        const isSelected = this.selectedPhrases.find((selectedPhrase: Phrase) => {
          return selectedPhrase.id === phrase.id;
        });

        return !isSelected;
      });
    });
  }

  public addPhraseToQuiz(phrase: Phrase) {
    this.selectedPhrases.push(phrase);

    const index = this.unselectedPhrases.indexOf(phrase);
    this.unselectedPhrases.splice( index, 1 );

    // Do api call to add the phrase to the quiz
      // Remove if api fails
  }

  public removePhraseFromQuiz(phrase: Phrase) {
    this.unselectedPhrases.push(phrase);

    const index = this.selectedPhrases.indexOf(phrase);
    this.selectedPhrases.splice( index, 1 );

    // Do api call to remove phrase from quiz
      // Remove if api fails
  }

}
