import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MultipleQuestion } from "../../shared/models/questions/multiple-question";

@Component({
  selector: "app-quiz-multiple-question",
  templateUrl: "./quiz-multiple-question.component.html",
  styleUrls: ["./quiz-multiple-question.component.less"]
})
export class QuizMultipleQuestionComponent implements OnInit {

  @Input() public question: MultipleQuestion;
  @Output() public answered: EventEmitter<MultipleQuestion>;

  public showNote: boolean;

  constructor () {
    this.question = null;
    this.answered = new EventEmitter<MultipleQuestion>();
    this.showNote = false;
  }

  ngOnInit () {
    if (this.checkIdenticalOptions()) {
      this.showNote = true;
    }
  }

  public questionAnswered (answer: number) {
    this.question.answer = answer;
    this.answered.emit(this.question);
  }

  /**
   * Check if the options are identical in value.
   * It splits the /
   * @return {boolean}
   */
  private checkIdenticalOptions (): boolean {
    for (let a  = 0; a < this.question.options.length; a++) {
      const optionsA: string[] = this.question.options[a].value.split("/").map(value => {
        return value.trim().toLowerCase();
      });

      for (let b = 0; b < this.question.options.length; b++) {
        if (b === a) {
          continue;
        }

        const optionsB: string[] = this.question.options[b].value.split("/").map(value => {
          return value.trim().toLowerCase();
        });

        for (let i = 0; i < optionsB.length; i++) {
          if (optionsA.includes(optionsB[i])) {
            return true;
          }
        }
      }
    }

    return false;
  }

}
