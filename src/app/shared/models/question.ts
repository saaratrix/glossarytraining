export interface Question {
  visible: boolean;
  index: number;
  question: string;
  isCorrect: boolean;
  checkAnswer (): boolean;
  hasAnswer (): boolean;
}
