export class VerbItemQuestion {
  public answer: string;
  public isCorrect: boolean;

  private correctAnswer: string;

  constructor (correctAnswer: string) {
    this.answer = "";
    this.isCorrect = false;
    this.correctAnswer = correctAnswer;
  }

  /**
   * Get the correct answer
   * @return {string}
   */
  public getCorrectAnswer (): string {
    return this.correctAnswer;
  }

  public checkAnswer (): boolean {
    const answer = this.answer.trim().toLowerCase();
    this.isCorrect = answer === this.correctAnswer;

    return this.isCorrect;
  }

  public hasAnswer (): boolean {
    return this.answer.length > 0;
  }
}
