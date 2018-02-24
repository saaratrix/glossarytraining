import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MultipleQuestion } from "../../shared/models/multiple-question";

@Component({
  selector: 'app-quiz-multiple-question',
  templateUrl: './quiz-multiple-question.component.html',
  styleUrls: ['./quiz-multiple-question.component.less']
})
export class QuizMultipleQuestionComponent implements OnInit {

  @Input()
  public question: MultipleQuestion;
  @Output()
  public answered: EventEmitter<MultipleQuestion>;

  constructor () {
    this.question = null;
    this.answered = new EventEmitter<MultipleQuestion>();
  }

  ngOnInit () {
  }

  public questionAnswered (answer: number) {
    this.question.answer = answer;
    this.answered.emit(this.question);
  }

}
