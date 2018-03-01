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
  @Input()
  public isReviewed: boolean;
  @Output()
  public answered: EventEmitter<TextQuestion>;

  public revealAnswers: boolean;

  constructor () {
    this.question = null;
    this.isReviewed = false;
    this.answered = new EventEmitter<TextQuestion>();
    this.revealAnswers = false;
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
