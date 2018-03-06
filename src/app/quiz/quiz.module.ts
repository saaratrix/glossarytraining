import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule} from "@angular/forms";
import { RouterModule } from '@angular/router';
import { QuizSelectionComponent } from './quiz-selection/quiz-selection.component';
import { QuizComponent } from './quiz.component';
import { QuizService } from "./quiz.service";
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';
import { QuizMultipleQuestionComponent } from './quiz-multiple-question/quiz-multiple-question.component';
import { QuizTextQuestionComponent } from './quiz-text-question/quiz-text-question.component';

const quizRouting: ModuleWithProviders = RouterModule.forChild([
  {
    // Maybe use quiz/:id if you know the quiz id
    path: "quiz",
    component: QuizComponent
  }
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    quizRouting
  ],
  declarations: [
    QuizSelectionComponent,
    QuizComponent,
    QuizQuestionComponent,
    QuizMultipleQuestionComponent,
    QuizTextQuestionComponent
  ],
  providers: [
    QuizService
  ],
  exports: [QuizSelectionComponent]
})
export class QuizModule { }
