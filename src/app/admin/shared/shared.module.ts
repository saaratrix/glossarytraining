import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { EntityListComponent } from "./entity-list/entity-list.component";
import { EntityEditComponent } from './entity-edit/entity-edit.component';
import { FormsModule } from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    EntityListComponent,
    EntityEditComponent
  ],
  exports: [
    EntityListComponent
  ]
})
export class SharedModule { }
