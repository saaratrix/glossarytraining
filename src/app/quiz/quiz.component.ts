import { Component, Input, OnInit } from "@angular/core";
import { Quiz } from "../shared/models/quiz.model";
import { QuizService } from "./quiz.service";
import { Router } from "@angular/router";
import { QuizType } from "../shared/enums/quiz-type.enum";
import { Phrase } from "../shared/models/phrase.model";
import { Question } from "../shared/models/questions/question";
import { TextQuestion } from "../shared/models/questions/text-question";
import { IMultipleOption, MultipleQuestion } from "../shared/models/questions/multiple-question";
import { QuizCreateHelperService } from "../shared/services/quiz-create-helper.service";
import { LanguageMode } from "../shared/enums/language-mode.enum";
import { ImagePhrase } from '../shared/models/image-phrase.model';
import { QuestionImage } from '../shared/models/questions/question-image';


@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.less"]
})
export class QuizComponent implements OnInit {

  @Input()
  public quiz: Quiz;
  public type: QuizType;

  public questions: Question[];
  public correctQuestions: number;
  public isReviewed: boolean;

  public answeredQuestionsCount: number;
  private answeredQuestions: Question[];

  private languageMode: LanguageMode;

  constructor (
    private quizCreateHelperService: QuizCreateHelperService,
    private quizService: QuizService,
    private router: Router
  ) {
    this.quiz = null;
    this.type = QuizType.MultipleChoices;
    this. questions = [];
    this.correctQuestions = 0;
    this.isReviewed = false;

    this.answeredQuestionsCount = 0;
    this.answeredQuestions = [];

    this.languageMode = this.quizService.quizLanguageMode;
  }

  ngOnInit () {
    this.quiz = this.quizService.quiz;
    this.type = this.quizService.quizType;

    if (!this.quiz) {
      this.router.navigate([""]);
      return;
    }
    // Copy value by value
    const phrases = this.quiz.phrases.slice();
    // Shuffle array to randomize potential multiple choices answers.
    this.quizCreateHelperService.shuffleArray(phrases);
    // Generate questions
    for (let i = 0; i < phrases.length; ++i) {
      const question = this.createQuestion(i, phrases);

      this.questions.push(question);
    }

    const imagePhrases = this.quiz.imagePhrases.slice();
    for (let i = 0; i < imagePhrases.length; i++) {
      const question = this.createImageQuestion(i, imagePhrases);
      this.questions.push(question);
    }

    // Shuffle the questions to mix images & phrases.
    this.quizCreateHelperService.shuffleArray(this.questions);
    // Need to update the index.
    for (let i = 0; i < this.questions.length; i++) {
      this.questions[i].index = i;
    }

    // First one is visible!
    this.questions[0].isVisible = true;
  }

  /**
   * Take user back to quiz starting route
   */
  public doNewQuiz (): void {
    this.quizService.quiz = null;
    this.router.navigate([""]);
  }

  /**
   * Whenever a question has been answered show the question that comes after.
   * @param {Question} question
   */
  public questionAnswered (question: Question): void {
    const nextIndex = question.index + 1;
    if (nextIndex < this.questions.length && !this.questions[nextIndex].isVisible) {
      this.questions[nextIndex].isVisible = true;
    }

    if (this.answeredQuestions.indexOf(question) === -1) {
      this.answeredQuestions.push(question);
      this.answeredQuestionsCount++;
    }
  }

  public reviewQuiz (): void {
    this.correctQuestions = 0;
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].checkAnswer()) {
        this.correctQuestions++;
      }
    }

    this.isReviewed = true;
  }

  /**
   * Create a question item.
   * Based on type it will either be Text or Multiple.
   * @param {number} index
   * @param {Phrase[]} phrases
   * @return {Question}
   */
  private createQuestion (index: number, phrases: Phrase[]): Question {
    if (this.type === QuizType.Text) {
      return this.createTextQuestion(index, phrases);
    } else if (this.type === QuizType.MultipleChoices) {
      return this.createMultipleQuestion(index, phrases);
    }

    throw new Error("quiz type was of unknown type");
  }

  /**
   * Create a TextQuestion item.
   * @param {number} index
   * @param {Phrase[]} phrases
   * @return {TextQuestion}
   */
  private createTextQuestion (index: number, phrases: Phrase[]): TextQuestion {
    const phrase = phrases[index];

    const questionKeys = this.quizCreateHelperService.getQuestionKeys("finnish", "english", this.languageMode);
    const question = phrase[questionKeys.question];
    const answer = phrase[questionKeys.answer];

    const answers = answer.split("/").map(text => {
      return text.trim().toLowerCase();
    });

    return new TextQuestion(index, question, phrase.note, answers, questionKeys.question === "finnish");
  }

  /**
   * Create a MultipleQuestion item.
   * @param {number} index
   * @param {Phrase[]} phrases
   * @return {MultipleQuestion}
   */
  private createMultipleQuestion (index: number, phrases: Phrase[]) {
    if (phrases.length < this.quizService.phrasesPerQuestion) {
      throw new Error("Too few phrases for multiple question quiz");
    }

    const correctPhrase: Phrase = phrases[index];

    const questionKeys = this.quizCreateHelperService.getQuestionKeys("finnish", "english", this.languageMode);
    const question = correctPhrase[questionKeys.question];

    const indices: number[] = [ index ];

    // get 2 phrases
    while (indices.length < this.quizService.phrasesPerQuestion) {
      const phraseIndex = Math.floor(Math.random() * phrases.length);

      if (indices.indexOf(phraseIndex) === -1 ) {
        indices.push(phraseIndex);
      }
    }

    // Shuffle
    this.quizCreateHelperService.shuffleArray(indices);

    let correctAnswer = 0;
    const options: IMultipleOption[] = [];

    for (let i = 0; i < indices.length; i++) {
      const phrase = phrases[indices[i]];

      if (phrase === correctPhrase) {
        correctAnswer = i;
      }

      const option: IMultipleOption = {
        value: phrase[questionKeys.answer],
        note: phrase.note
      };

      options.push(option);
    }

    return new MultipleQuestion(index, question, correctPhrase.note, options, correctAnswer);
  }

  private createImageQuestion(index: number, imagePhrases: ImagePhrase[]): QuestionImage {
    const imagePhrase = imagePhrases[index];

    const answers = imagePhrase.finnish.split("/").map(text => {
      return text.trim().toLowerCase();
    });

    return new QuestionImage(index, answers, imagePhrase.imageBase64, imagePhrase.note);
  }
}
