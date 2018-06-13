export class VerbItemQuestion {
  public answer: string;
  public isCorrect: boolean;

  private readonly correctAnswer: string;

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

    if (this.correctAnswer.indexOf("/") === -1 ) {
      this.isCorrect = answer === this.correctAnswer;
    }
    else {
      const answers = answer.split("/");
      const correctAnswers = this.correctAnswer.split("/");
      this.isCorrect = false;

      for (let i = 0; i < answers.length; i++) {
        if ( correctAnswers.indexOf( answers[i] ) !== -1 ) {
          this.isCorrect = true;
          break;
        }
      }
    }

    return this.isCorrect;
  }

  public hasAnswer (): boolean {
    return this.answer.length > 0;
  }
}
