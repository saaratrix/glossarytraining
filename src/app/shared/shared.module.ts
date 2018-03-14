import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ApiService } from "./services/api.service";
import { QuizCreateHelperService } from "./services/quiz-create-helper.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    ApiService,
    QuizCreateHelperService
  ],
  declarations: [],
})
export class SharedModule { }
