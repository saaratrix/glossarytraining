import { Injectable } from '@angular/core';
import { Quiz } from "../shared/models/quiz.model";
import { QuizType } from "../shared/enums/quiz-type.enum";

@Injectable()
export class QuizService {
  // Pass quizz for example from home component to quiz component
  public quiz: Quiz;
  public quizType: QuizType;
  public phrasesPerQuestion: number;

  constructor () {
    this.quiz = null;
    this.quizType = QuizType.MultipleChoices;
    this.phrasesPerQuestion = 3;
  }
}
