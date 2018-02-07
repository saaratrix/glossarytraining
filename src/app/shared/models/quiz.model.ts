import {QuizType} from "../enums/quiz-type.enum";
import { Phrase } from "./phrase.model";

export interface Quiz {
  id: number;
  name: string;
  type: QuizType;
  phrases: Phrase[];
}
