import { Question } from "./question";

export class MultipleQuestion implements Question {
  public visible: boolean;
  public index: number;
  public question: string;

  public answer: number;
  public options: string[];

  private correctAnswer: number;

  constructor (index: number, question, options: string[], correctAnswer: number) {
    this.visible = false;
    this.index = index;
    this.question = question;
    this.options = options;
    this.answer = -1;

    this.correctAnswer = correctAnswer;
  }

  public isCorrect (): boolean {
    return this.correctAnswer === this.answer;
  }

  public hasAnswer (): boolean {
    return this.answer >= 0;
  }
}
