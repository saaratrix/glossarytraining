export interface Question {
  visible: boolean;
  index: number;
  question: string;
  isCorrect (): boolean;
  hasAnswer (): boolean;
}
