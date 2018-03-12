import { Component, OnInit } from "@angular/core";
import { Verb } from "../../shared/models/verb.model";
import { ApiService } from "../../shared/services/api.service";
import { VerbGetResponse } from "../../shared/models/httpresponses";
import { Router } from "@angular/router";

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

  constructor (private apiService: ApiService, private router: Router) {
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

      setTimeout(() => {
        this.isFetchingItems = false;
      }, 2500);
    });
  }

  public selectAll () {
    this.selectedVerbs.push(...this.verbs);
  }

  public start () {
    console.log("STARTING!!", this.selectedVerbs);
    this.router.navigate(["verb-training"]);
  }
}
