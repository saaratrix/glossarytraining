import { Component, OnInit } from "@angular/core";
import { Verb } from "../../shared/models/verb.model";
import { ApiService } from "../../shared/services/api.service";
import { VerbGetResponse } from "../../shared/models/httpresponses";
import { Router } from "@angular/router";
import { VerbService } from "../verb.service";
import { VerbItem } from "../../shared/models/verb-item.model";

import {
  ItemToggledEvent,
  ItemToggleSelectorComponent
} from "../../shared/components/item-toggle-selector/item-toggle-selector.component";

@Component({
  selector: "app-verb-selection",
  templateUrl: "./verb-selection.component.html",
  styleUrls: ["./verb-selection.component.less"]
})
export class VerbSelectionComponent implements OnInit {

  public verbs: Verb[];
  public selectedVerbs: Verb[];

  public isFetchingItems: boolean;
  public error: string;

  constructor (private verbService: VerbService, private apiService: ApiService, private router: Router) {
    this.verbs = [];
    this.selectedVerbs = [];

    this.isFetchingItems = true;
    this.error = "";
  }

  ngOnInit () {
    this.isFetchingItems = true;

    this.apiService.get("verb/get").then((result: VerbGetResponse) => {
      this.verbs = result.verbs || [];

      if (result.error) {
        this.error = result.error;
      }
      // Start with all verbs selected
      this.selectedVerbs.push( ...this.verbs );
      this.isFetchingItems = false;
    });
  }

  public selectAll () {
    this.selectedVerbs.push(...this.verbs);
  }

  public start () {
    this.verbService.verbs = this.selectedVerbs;

    this.router.navigate(["verb-training"]);
  }

  public onItemToggled (event: ItemToggledEvent) {
    if (event.selected) {
      this.selectedVerbs.push(event.item);
    }
    else {
      const index = this.selectedVerbs.indexOf(event.item);
      if (index !== -1) {
        this.selectedVerbs.splice(index, 1);
      }
    }
  }
}
