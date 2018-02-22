import { Component, Input, OnInit } from "@angular/core";
import { Quiz } from "../shared/models/quiz.model";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.less']
})
export class QuizComponent implements OnInit {

  @Input()
  public quiz: Quiz;

  constructor() {
    this.quiz = null;
  }

  ngOnInit() {
  }

}
