import { QuestionType } from './question-type';

export interface Question {
  type: QuestionType;
  isVisible: boolean;
  index: number;
  question: string;
  note: string;
  isCorrect: boolean;
  checkAnswer (): boolean;
  hasAnswer (): boolean;
}
