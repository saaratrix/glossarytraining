import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InflectionTrainingComponent } from './inflection-training/inflection-training.component';
import { RouterModule } from '@angular/router';
import { InflectionComponent } from './inflection.component';
import { InflectionsChooserComponent } from './inflection-chooser/inflections-chooser.component';
import { SharedModule } from '../shared/shared.module';

const inflectionRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: "inflection-training",
    component: InflectionComponent,
  }
]);

@NgModule({
  declarations: [
    InflectionTrainingComponent,
    InflectionComponent,
    InflectionsChooserComponent,
  ],
  imports: [
    CommonModule,
    inflectionRouting,
    SharedModule,
  ],
})
export class InflectionModule { }
