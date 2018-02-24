import { Question } from "./question";

export class TextQuestion implements Question {
  public visible: boolean;
  public index: number;
  public question: string;
  public answer: string;

  private correctAnswers: string[];

  constructor (index: number, question: string, correctAnswers: string[]) {
    this.visible = false;
    this.index = index;
    this.question = question;

    this.correctAnswers = correctAnswers;
  }

  public isCorrect (): boolean {
    // Make answer lowercase and trim whitespace
    const answer = this.answer.trim().toLowerCase();

    for (let i = 0; i < this.correctAnswers.length; i++) {
      if (answer === this.correctAnswers[i]) {
        return true;
      }
    }

    return false;
  }
  public hasAnswer (): boolean {
    return this.answer.length > 0;
  }
}
