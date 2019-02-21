import { Question } from "./question";

export interface IMultipleOption {
  value: string;
  note: string;
}

export class MultipleQuestion implements Question {
  public isVisible: boolean;
  public index: number;
  public question: string;
  public note: string;
  public isCorrect: boolean;

  public answer: number;
  public options: IMultipleOption[];

  private correctAnswer: number;

  constructor (index: number, question: string, note: string, options: IMultipleOption[], correctAnswer: number) {
    this.isVisible = false;
    this.index = index;
    this.question = question;
    this.note = note;
    this.isCorrect = false;
    this.options = options;
    this.answer = -1;

    this.correctAnswer = correctAnswer;
  }

  public checkAnswer (): boolean {
    this.isCorrect = this.correctAnswer === this.answer;

    return this.isCorrect;
  }

  public hasAnswer (): boolean {
    return this.answer >= 0;
  }
}
