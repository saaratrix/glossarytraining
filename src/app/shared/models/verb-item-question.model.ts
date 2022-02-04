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
   */
  public getCorrectAnswer (): string {
    return this.correctAnswer;
  }

  public checkAnswer (): boolean {
    const answer = this.answer.trim().toLowerCase();

    // If the answer doesn't have / in it, then treat it as 1 single answer
    if (this.correctAnswer.indexOf("/") === -1 ) {
      this.isCorrect = answer === this.correctAnswer;
    }
    // Otherwise if the answer has / then separate it and check each answer.
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
