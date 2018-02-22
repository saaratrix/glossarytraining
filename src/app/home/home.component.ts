import { Component, OnInit } from '@angular/core';
import { ApiService } from "../shared/services/api.service";
import { Quiz } from "../shared/models/quiz.model";
import { Category } from "../shared/models/category.model";
import { CategoryGetResponse, QuizGetResponse } from "../shared/models/httpresponses";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  public quizzes: Quiz[];
  public categories: Category[];

  public selectedQuiz: Quiz;

  constructor(private apiService: ApiService) {
    this.quizzes = [];
    this.categories = [];

    this.selectedQuiz = null;
  }

  ngOnInit() {
    this.apiService.get("quiz/get").then((result: QuizGetResponse) => {
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


    this.apiService.get("category/get").then((result: CategoryGetResponse) => {
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

  public quizSelected(quiz: Quiz) {
    // Get the specific quiz along with the phrases
    console.log("quiz selected!");

    this.selectedQuiz = quiz;
  }

  public categorySelected(category: Category) {
    // Get all phrases for the category and create a quiz model out of those
    console.log("category selected");

    this.selectedQuiz = {
      id: -1,
      description: "A quiz for the category " + category.name,
      name: category.name,
      phrases: []
    };
  }

}
