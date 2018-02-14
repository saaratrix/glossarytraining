import { Component, OnInit } from '@angular/core';

import { Quiz } from "../../../shared/models/quiz.model";
import {QuizGetResponse} from "../../../shared/models/httpresponses/quiz-get-response";

import { ApiService } from "../../../shared/services/api.service";
import { DefaultSuccessResponse } from "../../../shared/models/httpresponses/default-success-response";


@Component({
  selector: "app-admin-quiz-list",
  templateUrl: "./quiz-list.component.html",
  styleUrls: ["./quiz-list.component.less"]
})
export class QuizListComponent implements OnInit {

  public quizzes: Quiz[];

  constructor(private apiService: ApiService) {
    this.quizzes = [];
  }

  ngOnInit() {
    this.apiService.get("quiz/get").then((result: QuizGetResponse) => {
      this.quizzes = result.quizzes;
    });
  }

  public removeQuiz(quiz: Quiz) {
    this.apiService.post("quiz/remove", quiz)
      .then((result: DefaultSuccessResponse) => {
        if (result.success) {
          const index = this.quizzes.indexOf(quiz);
          if (index !== -1) {
           this.quizzes.splice(index, 1);
          }
        }
      });
  }
}
