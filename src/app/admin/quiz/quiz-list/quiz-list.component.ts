import { Component, OnInit } from '@angular/core';
import { Quiz } from "../../../shared/models/quiz.model";
import { QuizGetResponse, DefaultSuccessResponse } from "../../../shared/models/httpresponses";
import { ApiService } from "../../../shared/services/api.service";

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

  ngOnInit () {
    this.apiService.get("quiz/get").then((result: QuizGetResponse) => {
      this.quizzes = result.quizzes || [];

      this.quizzes.sort((a: Quiz, b: Quiz) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        if (aName < bName) { return -1; }
        if (aName > bName) { return 1; }
        return 0;
      });
    });
  }

  public removeQuiz (quiz: Quiz) {
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
