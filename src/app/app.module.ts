import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header/header.component';

import { AdminModule } from './admin/admin.module';
import { SharedModule } from "./shared/shared.module";
import { PhraseModule } from "./phrase/phrase.module";

const rootRouting = RouterModule.forRoot([]);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    PhraseModule,
    AdminModule,
    rootRouting
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
