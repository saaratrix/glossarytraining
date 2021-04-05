import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { PhraseModule } from "../phrase/phrase.module";

import { AdminComponent } from "./admin.component";
import { QuizListComponent } from "./quiz/quiz-list/quiz-list.component";
import { QuizDetailComponent } from "./quiz/quiz-detail/quiz-detail.component";
import { PhrasesListComponent } from "./phrases/phrases-list/phrases-list.component";
import { PhrasesDetailComponent } from "./phrases/phrases-detail/phrases-detail.component";
import { PhrasesQuizSelectionComponent } from "./phrases/phrases-quiz-selection/phrases-quiz-selection.component";
import { CategoryListComponent } from "./category/category-list/category-list.component";
import { CategoryDetailComponent } from "./category/category-detail/category-detail.component";
import { VerbListComponent } from "./verb/verb-list/verb-list.component";
import { VerbDetailComponent } from "./verb/verb-detail/verb-detail.component";

import { SharedModule as SharedAdminModule } from "./shared/shared.module";
import { SharedModule as SharedCommonModule } from "../shared/shared.module";
import { ImagePhrasesListComponent } from './image-phrases/image-phrases-list/image-phrases-list.component';
import { ImagePhrasesDetailComponent } from './image-phrases/image-phrases-detail/image-phrases-detail.component';

const adminRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild([
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
        path: "imagephrases",
        component: ImagePhrasesListComponent,
      },
      {
        path: "imagephrase/:id",
        component: ImagePhrasesDetailComponent,
      },
      {
        path: "categories",
        component: CategoryListComponent
      },
      {
        path: "category/:id",
        component: CategoryDetailComponent
      },
      {
        path: "verbs",
        component: VerbListComponent
      },
      {
        path: "verb/:id",
        component: VerbDetailComponent
      }
    ]
  },
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PhraseModule,
    SharedCommonModule,
    SharedAdminModule,
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
    CategoryDetailComponent,
    VerbListComponent,
    VerbDetailComponent,
    ImagePhrasesListComponent,
    ImagePhrasesDetailComponent,
  ]
})
export class AdminModule { }
