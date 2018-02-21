import { Component, OnInit } from '@angular/core';
import { Quiz } from "../../../shared/models/quiz.model";
import { QuizGetResponse } from "../../../shared/models/httpresponses";
import { ApiService } from "../../../shared/services/api.service";

import { EntityListComponent } from "../../shared/entity-list/entity-list.component";

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
}
