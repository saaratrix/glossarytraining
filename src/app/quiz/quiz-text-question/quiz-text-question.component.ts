import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TextQuestion } from "../../shared/models/text-question";

@Component({
  selector: 'app-quiz-text-question',
  templateUrl: './quiz-text-question.component.html',
  styleUrls: ['./quiz-text-question.component.less']
})
export class QuizTextQuestionComponent implements OnInit {

  @Input()
  public question: TextQuestion;
  @Output()
  public answered: EventEmitter<TextQuestion>;

  constructor () {
    this.question = null;
    this.answered = new EventEmitter<TextQuestion>();
  }

  ngOnInit () {
  }

  public questionAnswered () {
    this.answered.emit(this.question);
  }

  public getPlaceholderText () {
    if (this.question.isFinnish) {
      return `Käännä "${this.question.question}" englanniksi`;
    }
    else {
      return `Käännä "${this.question.question}" suomeksi`;
    }
  }

}
