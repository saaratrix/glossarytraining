import { Question } from "./question";
import { QuestionType } from './question-type';

export class TextQuestion implements Question {
  public type: QuestionType = QuestionType.Text;

  public isVisible: boolean;
  public index: number;
  public question: string;
  public note: string;
  public answer: string;
  public isCorrect: boolean;
  public isFinnish: boolean;

  private correctAnswers: string[];

  constructor (index: number, question: string, note: string, correctAnswers: string[], isFinnish: boolean) {
    this.isVisible = false;
    this.index = index;
    this.question = question;
    this.note = note;
    this.isCorrect = false;

    this.correctAnswers = correctAnswers;
    this.isFinnish = isFinnish;
  }

  /**
   * Get the correct answers array
   */
  public getCorrectAnswers (): string[] {
    return this.correctAnswers;
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
