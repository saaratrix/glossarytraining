import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Quiz } from "../../../shared/models/quiz.model";

import { ApiService } from "../../../shared/services/api.service";
import { QuizGetDetailResponse } from "../../../shared/models/httpresponses/quiz-get-detail-response";
import { QuizType } from "../../../shared/enums/quiz-type.enum";

@Component({
  selector: 'app-admin-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.less']
})
export class QuizDetailComponent implements OnInit {

  public quiz: Quiz;
  public isNew: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.quiz = null;
    this.isNew = false;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = parseInt(params.id, 10);

      if (Number.isNaN(id) || id === -1) {
        this.quiz = {
          id: -1,
          name: "",
          type: QuizType.MultipleChoices
        };
        this.isNew = true;
      } else {
        this.apiService.get("quiz/get/" + id).then((result: QuizGetDetailResponse) => {
          this.quiz = result.quiz;
          // If invalid quiz then route back to quiz list
          if (!this.quiz) {
            this.router.navigate(['/admin/quizzes']);
          }
        });
      }
    });
  }

}
