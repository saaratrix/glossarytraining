import { Component, OnInit } from "@angular/core";
import { Quiz } from "../../../shared/models/quiz.model";
import { QuizGetResponse } from "../../../shared/models/httpresponses";
import { ApiService } from "../../../shared/services/api.service";

@Component({
  selector: "app-admin-quiz-list",
  templateUrl: "./quiz-list.component.html",
  styleUrls: ["./quiz-list.component.less"]
})
export class QuizListComponent implements OnInit {

  public quizzes: Quiz[];

  constructor (private apiService: ApiService) {
    this.quizzes = [];
  }

  ngOnInit () {
    this.apiService.get("quiz/get").then((result: QuizGetResponse) => {
      this.quizzes = result.quizzes || [];
    });
  }
}
