import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { AdminComponent } from './admin.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { QuizDetailComponent } from './quiz/quiz-detail/quiz-detail.component';

const adminRouting = RouterModule.forChild([
  {
    path: "admin",
    component: AdminComponent,
    children: [
      {
        path: "quizzes",
        component: QuizListComponent
      },
      {
        path: "quiz-detail/:id",
        component: QuizDetailComponent
      }
    ]
  },
]);


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    adminRouting
  ],
  declarations: [
    AdminComponent,
    QuizListComponent,
    QuizDetailComponent
  ]
})
export class AdminModule { }
