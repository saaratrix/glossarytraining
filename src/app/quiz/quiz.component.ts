import { Component, Input, OnInit } from "@angular/core";
import { Quiz } from "../shared/models/quiz.model";
import { QuizService } from "./quiz.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.less']
})
export class QuizComponent implements OnInit {

  @Input()
  public quiz: Quiz;

  constructor (private quizService: QuizService, private router: Router) {
    this.quiz = null;
  }

  ngOnInit () {
    this.quiz = this.quizService.quiz;
    console.log("quiz", this.quiz);
    if (!this.quiz) {
      this.router.navigate(['']);
    }
  }

}
