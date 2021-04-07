import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../shared/services/api.service";
import { Phrase } from "../../../shared/models/phrase.model";
import { Input } from "@angular/core";
import { PhraseGetResponse, DefaultSuccessResponse } from "../../../shared/models/http/httpresponses";
import { ImagePhrase } from '../../../shared/models/image-phrase.model';
import { ImagePhraseGetResponse } from '../../../shared/models/http/image-phrase-get-response';

@Component({
  selector: "app-admin-phrases-quiz-selection",
  templateUrl: "./phrases-quiz-selection.component.html",
  styleUrls: ["./phrases-quiz-selection.component.less"]
})
export class PhrasesQuizSelectionComponent implements OnInit {

  @Input() public quizId: number = -1;
  /**
   * The phrases that are selected for the quiz.
   */
  @Input() public selectedPhrases: Phrase[] = [];

  @Input() public selectedImagePhrases: ImagePhrase[] = [];

  /**
   * All phrases minus the selected phrases
   */
  public unselectedPhrases: Phrase[] = [];
  public unselectedImagePhrases: ImagePhrase[] = [];

  public selectedError: string = "";
  public unselectedError: string = "";

  constructor (
    private apiService: ApiService,
  ) { }

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

    this.apiService.get('imagephrase/get').then((result: ImagePhraseGetResponse) => {
      const imagePhrases = result.imagePhrases || [];

      // Filter out selected ones
      this.unselectedImagePhrases = imagePhrases.filter((imagePhrase: ImagePhrase) => {
        // Check if selectedPhrases contains one item with the same id
        const isSelected = this.selectedImagePhrases.find((selectedImagePhrase: ImagePhrase) => {
          return selectedImagePhrase.id === imagePhrase.id;
        });

        return !isSelected;
      });
    })
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

  public addImagePhraseToQuiz (imagePhrase: ImagePhrase, sendRequest: boolean) {
    this.selectedImagePhrases.push(imagePhrase);

    const index = this.unselectedImagePhrases.indexOf(imagePhrase);
    this.unselectedImagePhrases.splice( index, 1 );

    if (sendRequest) {
      this.selectedError = "";

      this.apiService.post("quiz/addimagephrase", {
        quizId: this.quizId,
        phraseId: imagePhrase.id,
      }).then((result: DefaultSuccessResponse) => {
        if (!result.success) {
          this.selectedError = result.error;
          // Move it back to unselected, also since updating database failed theres no need to tell database.
          this.removeImagePhraseFromQuiz(imagePhrase, false);
        }
      });
    }
  }

  public removeImagePhraseFromQuiz(imagePhrase: ImagePhrase, sendRequest: boolean) {
    this.unselectedImagePhrases.push(imagePhrase);

    const index = this.selectedImagePhrases.indexOf(imagePhrase);
    this.selectedImagePhrases.splice( index, 1 );

    if (sendRequest) {
      this.unselectedError = "";

      this.apiService.post("quiz/removeimagephrase", {
        quizId: this.quizId,
        phraseId: imagePhrase.id
      }).then((result: DefaultSuccessResponse) => {
        if (!result.success) {
          this.unselectedError = "";
          this.addImagePhraseToQuiz(imagePhrase, false);
        }
      });
    }
  }
}
