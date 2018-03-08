import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
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

  @ViewChild("questionInput")
  private inputElement: ElementRef;

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

  public tryFocusNext (event: KeyboardEvent) {
    // 13 == Enter
    if (event.which === 13) {
      const currentInput = this.inputElement.nativeElement as HTMLInputElement;

      const nodeList: NodeList = document.querySelectorAll(".answer-text-input");
      let nextInput: HTMLInputElement = null;

      let foundInputElement = false;

      // Iterate over all nodelist items with tabIndex === -1
      // Check if inputElement == currentInput element to set that it has found the input element
      for (let i = 0; i < nodeList.length; i++) {
        const inputElement = nodeList.item(i) as HTMLInputElement;
        // Exclude the this components element
        if (inputElement === currentInput) {
          foundInputElement = true;
          continue;
        }
        // Exclude elements that doesn't have a tabIndex,  for example their question is correct!
        if (inputElement.tabIndex === -1) {
          continue;
        }

        // If the foundInputElement is true then the next item we find is the nextInput element
        // Also break out of the forloop as we've found what we're looking for!
        if (foundInputElement) {
          nextInput = inputElement;
          break;
        }

        // If null set nextInput as first found so if there are no elements after the inputElement it'll go circle back to the first elements.
        if (!nextInput) {
          nextInput = inputElement;
        }
      }
      // If no nextInput was found then there is no element to focus!
      if (!nextInput) {
        return;
      }

      event.preventDefault();
      nextInput.focus();
    }
  }

}
