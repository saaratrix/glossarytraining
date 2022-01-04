import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { QuestionImage } from '../../shared/models/questions/question-image';

@Component({
  selector: 'app-quiz-question-image',
  templateUrl: './quiz-question-image.component.html',
  styleUrls: ['./quiz-question-image.component.less']
})
export class QuizQuestionImageComponent implements OnInit {
  @Input() question: QuestionImage;
  @Input() isReviewed: boolean;
  @Output() answered: EventEmitter<QuestionImage> = new EventEmitter<QuestionImage>();

  @ViewChild("questionInput", { static: true }) private inputElement!: ElementRef;

  revealAnswers: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  public questionAnswered () {
    this.answered.emit(this.question);
  }

  public tryFocusNext (event: KeyboardEvent) {
    // 13 == Enter
    if (event.key !== "Enter") {
      return;
    }

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

      // If null then set nextInput as the found inputElement.
      // so if there are no elements after the inputElement it'll circle back to the first elements.
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
