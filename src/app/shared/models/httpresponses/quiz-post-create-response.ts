import { Quiz } from "../quiz.model";

export interface QuizPostCreateResponse {
  quiz: Quiz;
  error: string;
};
