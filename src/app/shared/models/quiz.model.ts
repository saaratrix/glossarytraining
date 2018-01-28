import {QuizType} from "../enums/quiz-type.enum";

export interface Quiz {
  id: number;
  name: string;
  type: QuizType;
}
