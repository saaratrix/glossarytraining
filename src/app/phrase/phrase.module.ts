import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PhrasesSelectionComponent } from "./phrases-selection/phrases-selection.component";
import { ImagePhrasesSelectionComponent } from './image-phrases-selection/image-phrases-selection.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    PhrasesSelectionComponent,
    ImagePhrasesSelectionComponent,
  ],
  exports: [
    PhrasesSelectionComponent,
    ImagePhrasesSelectionComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class PhraseModule { }
