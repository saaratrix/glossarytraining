import { Component, Input, OnInit } from "@angular/core";
import { Quiz } from "../shared/models/quiz.model";
import { QuizService } from "./quiz.service";
import { Router } from "@angular/router";
import { QuizType } from "../shared/enums/quiz-type.enum";
import { Phrase } from "../shared/models/phrase.model";
import { Question } from "../shared/models/question";
import { TextQuestion } from "../shared/models/text-question";
import { MultipleQuestion } from "../shared/models/multiple-question";

interface IQuestionKeys {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.less']
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

  constructor (private quizService: QuizService, private router: Router) {
    this.quiz = null;
    this.type = QuizType.MultipleChoices;
    this. questions = [];
    this.correctQuestions = 0;
    this.isReviewed = false;

    this.answeredQuestionsCount = 0;
    this.answeredQuestions = [];
  }

  ngOnInit () {
    this.quiz = this.quizService.quiz;
    this.type = this.quizService.quizType;

    if (!this.quiz) {
      this.router.navigate(['']);
      return;
    }
    // Copy value by value
    const phrases = this.quiz.phrases.slice();

    // Shuffle phrases
    this.shuffleArray(phrases);

    // Generate questions
    for (let i = 0; i < phrases.length; ++i) {
      const question = this.createQuestion(i, phrases);

      this.questions.push(question);
    }

    // First one is visible!
    this.questions[0].visible = true;
  }

  /**
   * Take user back to quiz starting route
   */
  public doNewQuiz (): void {
    this.quizService.quiz = null;
    this.router.navigate(['']);
  }

  /**
   * Whenever a question has been answered show the question that comes after.
   * @param {Question} question
   */
  public questionAnswered (question: Question): void {
    const nextIndex = question.index + 1;
    if (nextIndex < this.questions.length && !this.questions[nextIndex].visible) {
      this.questions[nextIndex].visible = true;
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
    }
    else if (this.type === QuizType.MultipleChoices) {
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

    const questionKeys = this.getQuestionKeys();
    const question = phrase[questionKeys.question];
    const answer = phrase[questionKeys.answer];

    const answers = answer.split("/").map(text => {
      return text.trim().toLowerCase();
    });

    return new TextQuestion(index, question, answers, questionKeys.question === "finnish");
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

    const questionKeys = this.getQuestionKeys();
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
    this.shuffleArray(indices);

    let correctAnswer = 0;
    const options: string[] = [];

    for (let i = 0; i < indices.length; i++) {
      const phrase = phrases[indices[i]];

      if (phrase === correctPhrase) {
        correctAnswer = i;
      }

      options.push(phrase[questionKeys.answer]);
    }

    return new MultipleQuestion(index, question, options, correctAnswer);
  }

  /**
   * Based on the quiz language return the phrase property keys.
   * For example if the quiz should randomize between finnish & english it randomizes the property keys.
   * @return {IQuestionKeys}
   */
  private getQuestionKeys (): IQuestionKeys {
    // + 0.5 is equivalent of * 2
    if (Math.floor(Math.random() + 0.5) === 0) {
      return {
        question: "finnish",
        answer: "english"
      };
    }
    else {
      return {
        question: "english",
        answer: "finnish"
      };
    }
  }

  /**
   * A simple shuffle array where it goes through each index and randomly changes position with any other index
   * @param {any[]} arr
   */
  private shuffleArray (arr: any[]) {
    for (let i = 0; i < arr.length; ++i) {
      // Get a random number between 0 and length
      const randomId: number = Math.floor(Math.random() * arr.length);
      const temp: any = arr[randomId];

      arr[randomId] = arr[i];
      arr[i] = temp;
    }
  }

}
