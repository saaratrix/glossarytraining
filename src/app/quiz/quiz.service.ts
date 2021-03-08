import { Injectable } from "@angular/core";
import { Quiz } from "../shared/models/quiz.model";
import { QuizType } from "../shared/enums/quiz-type.enum";
import { LanguageMode } from "../shared/enums/language-mode.enum";

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  // Pass quizz for example from home component to quiz component
  public quiz: Quiz;
  public quizType: QuizType;
  public quizLanguageMode: LanguageMode;
  public phrasesPerQuestion: number;

  constructor () {
    this.quiz = null;
    this.quizType = QuizType.Text;
    this.quizLanguageMode = LanguageMode.Random;
    this.phrasesPerQuestion = 3;
  }
}
