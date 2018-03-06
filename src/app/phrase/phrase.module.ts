import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhrasesSelectionComponent } from "./phrases-selection/phrases-selection.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PhrasesSelectionComponent
  ],
  exports: [
    PhrasesSelectionComponent
  ]
})
export class PhraseModule { }
