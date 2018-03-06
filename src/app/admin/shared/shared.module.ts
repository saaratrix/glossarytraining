import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { EntityListComponent } from "./entity-list/entity-list.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    EntityListComponent
  ],
  exports: [
    EntityListComponent
  ]
})
export class SharedModule { }
