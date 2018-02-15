import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { PhraseModule } from "../phrase/phrase.module";

import { AdminComponent } from './admin.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { QuizDetailComponent } from './quiz/quiz-detail/quiz-detail.component';
import { PhrasesListComponent } from './phrases/phrases-list/phrases-list.component';
import { PhrasesDetailComponent } from './phrases/phrases-detail/phrases-detail.component';
import { PhrasesQuizSelectionComponent } from './phrases/phrases-quiz-selection/phrases-quiz-selection.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';

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
        path: "quiz/:id",
        component: QuizDetailComponent
      },
      {
        path: "phrases",
        component: PhrasesListComponent
      },
      {
        path: "phrase/:id",
        component: PhrasesDetailComponent
      },
      {
        path: "categories",
        component: CategoryListComponent
      },
      {
        path: "category/:id",
        component: CategoryDetailComponent
      }
    ]
  },
]);


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PhraseModule,
    adminRouting
  ],
  declarations: [
    AdminComponent,
    QuizListComponent,
    QuizDetailComponent,
    PhrasesListComponent,
    PhrasesDetailComponent,
    PhrasesQuizSelectionComponent,
    CategoryListComponent,
    CategoryDetailComponent
  ]
})
export class AdminModule { }
