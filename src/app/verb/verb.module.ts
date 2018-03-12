import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VerbSelectionComponent } from "./verb-selection/verb-selection.component";
import { RouterModule } from "@angular/router";
import { VerbTrainingComponent } from './verb-training/verb-training.component';

const verbRouting: ModuleWithProviders = RouterModule.forChild([
  {
    // Maybe use quiz/:id if you know the quiz id
    path: "verb-selection",
    component: VerbSelectionComponent
  },
  {
    path: "verb-training",
    component: VerbTrainingComponent
  }
]);


@NgModule({
  imports: [
    CommonModule,
    verbRouting
  ],
  declarations: [
    VerbSelectionComponent,
    VerbTrainingComponent
  ]
})
export class VerbModule { }
