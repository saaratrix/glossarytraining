import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ModuleWithProviders } from "@angular/core";

import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./shared/layout/header/header.component";

import { AdminModule } from "./admin/admin.module";
import { SharedModule } from "./shared/shared.module";
import { HomeModule } from "./home/home.module";
import { PhraseModule } from "./phrase/phrase.module";
import { QuizModule } from "./quiz/quiz.module";
import { VerbModule } from "./verb/verb.module";
import { InflectionModule } from './inflection/inflection.module';

const rootRouting: ModuleWithProviders<RouterModule> = RouterModule.forRoot([], { relativeLinkResolution: 'legacy' });

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HomeModule,
    PhraseModule,
    QuizModule,
    InflectionModule,
    VerbModule,
    AdminModule,
    rootRouting
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
