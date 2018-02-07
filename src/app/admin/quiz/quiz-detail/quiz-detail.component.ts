import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Quiz } from "../../../shared/models/quiz.model";

import { NgForm } from "@angular/forms";

import { ApiService } from "../../../shared/services/api.service";
import { QuizGetDetailResponse } from "../../../shared/models/httpresponses/quiz-get-detail-response";
import { QuizType } from "../../../shared/enums/quiz-type.enum";
import { QuizPostUpdateResponse } from "../../../shared/models/httpresponses/quiz-post-update-response";
import { QuizPostCreateResponse } from "../../../shared/models/httpresponses/quiz-post-create-response";

import { PhrasesQuizSelectionComponent } from "../../phrases/phrases-quiz-selection/phrases-quiz-selection.component";


@Component({
  selector: 'app-admin-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.less']
})
export class QuizDetailComponent implements OnInit {

  public quiz: Quiz;
  public isNew: boolean;
  public isWaitingForServer: boolean;
  public error: string;

  public keys: any[];
  public quizTypes = QuizType;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.quiz = null;
    this.isNew = false;

    this.isWaitingForServer = false;
    this.error = null;

    this.keys = Object.keys(QuizType).filter((key => {
      const parsedkey = parseInt(key, 10);
      return Number.isInteger(parsedkey);
    }));
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = parseInt(params.id, 10);

      if (Number.isNaN(id) || id === -1) {
        this.quiz = {
          id: -1,
          name: "",
          type: QuizType.MultipleChoices,
          phrases: []
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

  /**
   * Create the Quiz in database and navigate to the new quiz url.
   */
  public createQuiz(): void {
    this.isWaitingForServer = true;
    this.error = null;

    this.apiService.post("quiz/create", this.quiz)
      .then((result: QuizPostCreateResponse) => {
        // If quiz isn't null
        if (result.quiz) {
          this.quiz.id = result.quiz.id;
          // If success show that it was updated?
          this.isNew = false;
          this.router.navigate(['/admin/quiz-detail/' + result.quiz.id]);
        }
        else {
          this.error = result.error;
        }
        this.isWaitingForServer = false;
      });
  }

  /**
   * Update the quiz data
   */
  public updateQuiz(): void {
    this.isWaitingForServer = true;
    this.error = null;

    this.apiService.post("quiz/update", this.quiz)
      .then((result: QuizPostUpdateResponse ) => {
        if (result.success) {

        }
        else {
          this.error = result.error;
        }

        this.isWaitingForServer = false;
      });
  }

  public onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.isNew) {
        this.createQuiz();
      }
      else {
        this.updateQuiz();
      }
    }
  }
}
