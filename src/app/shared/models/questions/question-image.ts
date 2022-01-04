import type { Question } from './question';
import { QuestionType } from './question-type';

export class QuestionImage implements Question {
  public type: QuestionType = QuestionType.Image;

  index: number;
  isCorrect: boolean;
  isVisible: boolean;
  note: string;
  question: string;
  answer: string;

  private correctAnswers: string[] = [];

  constructor(
    index: number,
    answers: string[],
    imagebase64: string,
    note: string
  ) {
    this.index = index;
    this.question = imagebase64;
    this.correctAnswers = answers;
    this.note = note;
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
