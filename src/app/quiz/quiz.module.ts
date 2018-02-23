import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuizSelectionComponent } from './quiz-selection/quiz-selection.component';
import { QuizComponent } from './quiz.component';
import { QuizService } from "./quiz.service";

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
    quizRouting
  ],
  declarations: [
    QuizSelectionComponent,
    QuizComponent
  ],
  providers: [
    QuizService
  ],
  exports: [QuizSelectionComponent]
})
export class QuizModule { }
