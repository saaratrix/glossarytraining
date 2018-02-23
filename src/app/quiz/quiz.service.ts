import { Injectable } from '@angular/core';
import { Quiz } from "../shared/models/quiz.model";

@Injectable()
export class QuizService {
  // Pass quizz for example from home component to quiz component
  public quiz: Quiz;

  constructor () {
    this.quiz = null;
  }
}
