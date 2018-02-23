import { Component, OnInit } from '@angular/core';
import { ApiService } from "../shared/services/api.service";
import { Quiz } from "../shared/models/quiz.model";
import { Category } from "../shared/models/category.model";
import { CategoryGetResponse, PhraseGetResponse, QuizGetDetailResponse, QuizGetResponse } from "../shared/models/httpresponses";
import { QuizService } from "../quiz/quiz.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  public quizzes: Quiz[];
  public categories: Category[];

  public selectedQuiz: Quiz;

  public isFetchingQuiz: boolean;
  public error: string;

  constructor (private quizService: QuizService,  private apiService: ApiService, private router: Router) {
    this.quizzes = [];
    this.categories = [];

    this.selectedQuiz = null;
    this.isFetchingQuiz = false;
    this.error = "";
  }

  ngOnInit () {
    this.apiService.get("quiz/hasphrases").then((result: QuizGetResponse) => {
      this.quizzes = result.quizzes || [];

      // Sort based off quiz.name
      this.quizzes.sort((a: Quiz, b: Quiz) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        if (aName < bName) { return -1; }
        if (aName > bName) { return 1; }
        return 0;
      });
    });

    this.apiService.get("category/hasphrases").then((result: CategoryGetResponse) => {
      this.categories = result.categories || [];

      // Sort based off category.name
      this.categories.sort((a: Category, b: Category) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        if (aName < bName) { return -1; }
        if (aName > bName) { return 1; }
        return 0;
      });
    });
  }

  public quizSelected (quiz: Quiz): void {
    this.isFetchingQuiz = true;
    this.selectedQuiz = null;
    this.error = "";

    this.apiService.get("quiz/get/" + quiz.id).then((result: QuizGetDetailResponse) => {
      this.isFetchingQuiz = false;

      if (!result.error) {
        if (result.quiz.phrases.length > 0) {
          this.selectedQuiz = result.quiz;
        }
        else {
          this.error = "There are no phrases for that quiz.";
          const index = this.quizzes.indexOf(quiz);
          this.quizzes.splice(index, 1);
        }
      }
      else {
        this.error = result.error;
      }
    });
  }

  public categorySelected (category: Category): void {
    this.isFetchingQuiz = true;
    this.selectedQuiz = null;
    this.error = "";

    this.apiService.get("phrase/category/" + category.id).then((result: PhraseGetResponse) => {
      this.isFetchingQuiz = false;
      if (result.phrases.length > 0) {
        const quiz: Quiz = {
          id: -1,
          description: "A quiz for the category " + category.name,
          name: category.name,
          phrases: result.phrases
        };

        this.selectedQuiz = quiz;
      }
      else {
        this.error = "No phrases found for that category";
        const index = this.categories.indexOf(category);
        this.categories.splice(index, 1);
      }
    });
  }

  public startQuiz (): void {
    if (this.selectedQuiz && this.selectedQuiz.phrases.length > 0) {
      this.quizService.quiz = this.selectedQuiz;
      this.router.navigate(['quiz']);
    }
  }

}
