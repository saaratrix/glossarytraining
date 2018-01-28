import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header/header.component';


import { AdminModule } from './admin/admin.module';
import { SharedModule } from "./shared/shared.module";

import { ApiService } from "./shared/services/api.service";

const rootRouting = RouterModule.forRoot([]);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    SharedModule,
    rootRouting
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
