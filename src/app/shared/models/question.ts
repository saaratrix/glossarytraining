export interface Question {
  visible: boolean;
  index: number;
  question: string;
  note: string;
  isCorrect: boolean;
  checkAnswer (): boolean;
  hasAnswer (): boolean;
}
