import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { Question } from "../../shared/models/questions/question";
import { QuizType } from "../../shared/enums/quiz-type.enum";
import { TextQuestion } from "../../shared/models/questions/text-question";
import { MultipleQuestion } from "../../shared/models/questions/multiple-question";
import { QuestionType } from '../../shared/models/questions/question-type';
import { QuestionImage } from '../../shared/models/questions/question-image';

@Component({
  selector: "app-quiz-question",
  templateUrl: "./quiz-question.component.html",
  styleUrls: ["./quiz-question.component.less"]
})
export class QuizQuestionComponent implements OnInit {
  @Input() public question: Question | TextQuestion | MultipleQuestion | QuestionImage;
  @Input() public isReviewed: boolean;
  @Output() public answered: EventEmitter<Question>;

  public QuestionType: typeof QuestionType;

  public type: QuizType;

  constructor () {
    this.question = null;
    this.answered = new EventEmitter<Question>();
    this.isReviewed = false;

    this.QuestionType = QuestionType;
  }

  ngOnInit(): void {}

  public questionAnswered (question: Question): void {
    this.answered.emit(question);
  }
}
