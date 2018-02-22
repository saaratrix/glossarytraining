import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { QuizModule } from "../quiz/quiz.module";

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "",
    component: HomeComponent
  }
]);

@NgModule({
  imports: [
    CommonModule,
    QuizModule,
    homeRouting
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
