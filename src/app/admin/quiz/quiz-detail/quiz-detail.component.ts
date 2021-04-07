import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Quiz } from "../../../shared/models/quiz.model";
import { NgForm } from "@angular/forms";
import { ApiService } from "../../../shared/services/api.service";
import { QuizGetDetailResponse, QuizPostCreateResponse, DefaultSuccessResponse } from "../../../shared/models/http/httpresponses";

@Component({
  selector: "app-admin-quiz-detail",
  templateUrl: "./quiz-detail.component.html",
  styleUrls: ["./quiz-detail.component.less"]
})
export class QuizDetailComponent implements OnInit {

  public quiz: Quiz;
  public isNew: boolean;
  public isWaitingForServer: boolean;
  public error: string;

  constructor (private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.quiz = null;
    this.isNew = false;

    this.isWaitingForServer = false;
    this.error = null;
  }

  ngOnInit () {
    this.route.params.subscribe((params) => {
      const id = parseInt(params.id, 10);

      if (Number.isNaN(id) || id === -1) {
        this.quiz = {
          id: -1,
          name: "",
          description: "",
          imagePhrases: [],
          phrases: [],
        };
        this.isNew = true;
      }
      else {
        this.apiService.get("quiz/get/" + id).then((result: QuizGetDetailResponse) => {
          this.quiz = result.quiz;
          // If invalid quiz then route back to quiz list
          if (!this.quiz) {
            this.router.navigate(["/admin/quizzes"]);
          }
        });
      }
    });
  }

  /**
   * Create the Quiz in database and navigate to the new quiz url.
   */
  public createQuiz (): void {
    this.isWaitingForServer = true;
    this.error = null;

    this.apiService.post("quiz/create", this.quiz)
      .then((result: QuizPostCreateResponse) => {
        // If quiz isn't null then set id so update works
        if (result.quiz) {
          this.quiz.id = result.quiz.id;
          // If success show that it was updated?
          this.isNew = false;
          this.router.navigate(["/admin/quiz/" + result.quiz.id]);
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
  public updateQuiz (): void {
    this.isWaitingForServer = true;
    this.error = null;

    this.apiService.post("quiz/update", this.quiz)
      .then((result: DefaultSuccessResponse ) => {
        if (result.success) {

        }
        else {
          this.error = result.error;
        }

        this.isWaitingForServer = false;
      });
  }

  public onSubmit (form: NgForm) {
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
