import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ApiService } from "./services/api.service";
import { QuizCreateHelperService } from "./services/quiz-create-helper.service";
import { ItemToggleSelectorComponent } from "./components/item-toggle-selector/item-toggle-selector.component";
import { ItemSelectorComponent } from './components/item-selector/item-selector.component';
import { FormsModule } from "@angular/forms";
import { ItemSelectorByGroupsComponent } from './components/item-selector-by-groups/item-selector-by-groups.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        FormsModule,
    ],
  providers: [
    ApiService,
    QuizCreateHelperService
  ],
  declarations: [
    ItemToggleSelectorComponent,
    ItemSelectorComponent,
    ItemSelectorByGroupsComponent
  ],
  exports: [
    ItemToggleSelectorComponent,
    ItemSelectorComponent,
    ItemSelectorByGroupsComponent
  ]
})
export class SharedModule { }
