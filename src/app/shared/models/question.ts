export interface Question {
  isVisible: boolean;
  index: number;
  question: string;
  note: string;
  isCorrect: boolean;
  checkAnswer (): boolean;
  hasAnswer (): boolean;
}
