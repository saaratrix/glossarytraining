import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InflectionTrainingComponent } from './inflection-training/inflection-training.component';
import { RouterModule } from '@angular/router';
import { InflectionSelectionComponent } from './inflection-selection/inflection-selection.component';
import { InflectionsChooserComponent } from './inflection-selection/inflection-chooser/inflections-chooser.component';
import { SharedModule } from '../shared/shared.module';
import { InflectionQuestionComponent } from './inflection-question/inflection-question.component';
import { FormsModule } from '@angular/forms';

const inflectionRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: "inflection-selection",
    component: InflectionSelectionComponent,
  },
  {
    path: "inflection-training",
    component: InflectionTrainingComponent,
  }
]);

@NgModule({
  declarations: [
    InflectionTrainingComponent,
    InflectionSelectionComponent,
    InflectionsChooserComponent,
    InflectionQuestionComponent,
  ],
  imports: [
    CommonModule,
    inflectionRouting,
    SharedModule,
    FormsModule,
  ],
})
export class InflectionModule { }
