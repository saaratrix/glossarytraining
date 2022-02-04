import { InflectionQuestionType } from './inflection-question-type.enum';
import type { Inflection } from '../../shared/models/inflection';

export class InflectionQuestion {
  phrase: string = '';
  inflection: string = '';

  isCorrect: boolean = false;
  type: InflectionQuestionType;

  readonly correctAnswer: string;

  constructor(inflection: Inflection, type: InflectionQuestionType) {
    if (type === InflectionQuestionType.Random) {
      type = Math.random() < 0.5 ? InflectionQuestionType.PhraseToInflection : InflectionQuestionType.InflectionToPhrase;
    }

    this.type = type;

    switch (type) {
      case InflectionQuestionType.InflectionToPhrase:
        this.inflection = inflection.inflection;
        this.correctAnswer = inflection.phrase.finnish.trim().toLowerCase();
        break;
      default:
        this.correctAnswer = inflection.inflection.trim().toLowerCase();
        this.phrase = inflection.phrase.finnish;
        break;
    }
  }

  private getAnswer(): string {
    if (this.type === InflectionQuestionType.PhraseToInflection) {
      return this.inflection;
    }

    return this.phrase;
  }

  public checkAnswer (): boolean {
    const answer = this.getAnswer().trim().toLowerCase();
    this.isCorrect = answer === this.correctAnswer;
    return this.isCorrect;
  }

  public hasAnswer (): boolean {
    return this.getAnswer().length > 0;
  }

}
