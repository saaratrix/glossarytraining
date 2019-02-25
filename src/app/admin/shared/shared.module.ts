import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { EntityListComponent } from "./entity-list/entity-list.component";
import { EntityEditComponent } from './entity-edit/entity-edit.component';
import { FormsModule } from "@angular/forms";
import { SharedModule as SharedCommonModule } from "../../shared/shared.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedCommonModule
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
