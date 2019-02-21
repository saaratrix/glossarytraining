import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { Question } from "../../shared/models/question";
import { QuizType } from "../../shared/enums/quiz-type.enum";
import { TextQuestion } from "../../shared/models/text-question";
import { MultipleQuestion } from "../../shared/models/multiple-question";

@Component({
  selector: "app-quiz-question",
  templateUrl: "./quiz-question.component.html",
  styleUrls: ["./quiz-question.component.less"]
})
export class QuizQuestionComponent implements OnInit {
  @Input()
  public question: Question;
  @Input()
  public isReviewed: boolean;
  @Output()
  public answered: EventEmitter<Question>;

  public QuizTypes: any;

  public type: QuizType;
  public error: string;

  constructor () {
    this.question = null;
    this.answered = new EventEmitter<Question>();
    this.isReviewed = false;
    this.error = "";

    this.QuizTypes = QuizType;
  }

  ngOnInit () {
    if (this.question instanceof TextQuestion) {
      this.type = QuizType.Text;
    }
    else if (this.question instanceof MultipleQuestion) {
      this.type = QuizType.MultipleChoices;
    }
    else {
      this.error = "Unknown question";
    }
  }

  public questionAnswered (question: Question): void {
    this.answered.emit(question);
  }
}
