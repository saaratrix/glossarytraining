import { Question } from "./question";

export class TextQuestion implements Question {
  public visible: boolean;
  public index: number;
  public question: string;
  public answer: string;
  public isCorrect: boolean;
  public isFinnish: boolean;

  private correctAnswers: string[];

  constructor (index: number, question: string, correctAnswers: string[], isFinnish: boolean) {
    this.visible = false;
    this.index = index;
    this.question = question;
    this.isCorrect = false;

    this.correctAnswers = correctAnswers;
    this.isFinnish = isFinnish;
  }

  public checkAnswer (): boolean {
    // Make answer lowercase and trim whitespace
    const answer = this.answer.trim().toLowerCase();
    let isCorrect = false;

    for (let i = 0; i < this.correctAnswers.length; i++) {
      if (answer === this.correctAnswers[i]) {
        isCorrect = true;
        break;
      }
    }

    this.isCorrect = isCorrect;
    return this.isCorrect;
  }

  public hasAnswer (): boolean {
    return this.answer.length > 0;
  }
}
