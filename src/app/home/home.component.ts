import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ApiService } from "../shared/services/api.service";
import { Quiz } from "../shared/models/quiz.model";
import { Category } from "../shared/models/category.model";
import { CategoryGetResponse, PhraseGetResponse, QuizGetDetailResponse, QuizGetResponse } from "../shared/models/httpresponses";
import { QuizService } from "../quiz/quiz.service";
import { Router } from "@angular/router";
import { QuizType } from "../shared/enums/quiz-type.enum";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  public quizzes: Quiz[];
  public categories: Category[];
  public quizType: QuizType;
  public QuizTypeKeys: any[];
  public QuizTypes = QuizType;

  public selectedQuiz: Quiz;

  public isFetchingQuiz: boolean;
  public error: string;

  private _testQuiz: Quiz;

  constructor (private quizService: QuizService,  private apiService: ApiService, private router: Router) {
    this.quizzes = [];
    this.categories = [];
    // Maintain the quizType from last quiz.
    this.quizType = this.quizService.quizType;

    this.selectedQuiz = null;
    this.isFetchingQuiz = false;
    this.error = "";

    this.QuizTypeKeys = Object.keys(this.QuizTypes).filter(key => !isNaN(Number(key)) );
  }

  ngOnInit () {
    // this.apiService.get("quiz/hasphrases").then((result: QuizGetResponse) => {
    //   this.quizzes = result.quizzes || [];
    // });

    const fruitCategory: Category = {
      id: 1,
      name: "Fruit"
    };

    this._testQuiz = {
      id: -1,
      name: "Fruit Quiz",
      description: "Fruits!",
      phrases: [
        {
          category: fruitCategory,
          english: "apple",
          finnish: "omena",
          id: 1,
          note: ""
        },
        {
          category: fruitCategory,
          english: "banana",
          finnish: "banaani",
          id: 2,
          note: ""
        },
        {
          category: fruitCategory,
          english: "orange",
          finnish: "appelsiini",
          id: 3,
          note: ""
        },
        {
          category: fruitCategory,
          english: "strawberry",
          finnish: "mansikka",
          id: 4,
          note: ""
        },
        {
          category: fruitCategory,
          english: "blueberry",
          finnish: "mustikka",
          id: 5,
          note: ""
        }
      ]
    };

    this.quizzes.push(this._testQuiz);

    this.categories.push( fruitCategory );

    // this.apiService.get("category/hasphrases").then((result: CategoryGetResponse) => {
    //   this.categories = result.categories || [];
    // });
  }

  public quizSelected (quiz: Quiz): void {
    this.setSelectedQuiz(quiz);

    // this.isFetchingQuiz = true;
    // this.selectedQuiz = null;
    // this.error = "";
    //
    // this.apiService.get("quiz/get/" + quiz.id).then((result: QuizGetDetailResponse) => {
    //   this.isFetchingQuiz = false;
    //
    //   if (result.quiz) {
    //     if (result.quiz.phrases.length > 0) {
    //       this.setSelectedQuiz(result.quiz);
    //     }
    //     else {
    //       this.error = "There are no phrases for that quiz.";
    //       const index = this.quizzes.indexOf(quiz);
    //       this.quizzes.splice(index, 1);
    //     }
    //   }
    //   else {
    //     this.error = result.error;
    //   }
    // });
  }

  public categorySelected (category: Category): void {
    this.isFetchingQuiz = true;
    this.selectedQuiz = null;
    this.error = "";

    // this.apiService.get("phrase/category/" + category.id).then((result: PhraseGetResponse) => {
    //   this.isFetchingQuiz = false;
    //   if (result.phrases.length > 0) {
    //     const quiz: Quiz = {
    //       id: -1,
    //       description: "A quiz for the category " + category.name,
    //       name: category.name,
    //       phrases: result.phrases
    //     };
    //
    //     this.setSelectedQuiz(quiz);
    //   }
    //   else {
    //     this.error = "No phrases found for that category";
    //     const index = this.categories.indexOf(category);
    //     this.categories.splice(index, 1);
    //   }
    // });

    this.setSelectedQuiz(this._testQuiz);
  }

  public startQuiz (): void {
    if (!this.validateQuiz()) {
      return;
    }

    this.quizService.quiz = this.selectedQuiz;
    // quizType.Text = '0' instead of 0 causing issues
    this.quizService.quizType = parseInt("" + this.quizType, 10);
    this.router.navigate(['quiz']);
  }

  private setSelectedQuiz (quiz: Quiz) {
    this.selectedQuiz = quiz;

    // TODO: If phrases.length < phrasesPerQuestion then auto select text and maybe even make multiple questions choice invalid
  }

  private validateQuiz (): boolean {
    // Make sure quiz is selected
    if (!this.selectedQuiz || this.selectedQuiz.phrases.length <= 0) {
      return false;
    }
    // Make sure quizType is a valid type
    if (!QuizType[this.quizType]) {
      return false;
    }
    // Make sure the quiz has enough phrases if multiple choices is selected
    if (this.quizType === QuizType.MultipleChoices && this.selectedQuiz.phrases.length < this.quizService.phrasesPerQuestion) {
      return false;
    }

    return true;
  }
}
