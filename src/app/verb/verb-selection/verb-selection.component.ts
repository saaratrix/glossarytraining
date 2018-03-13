import { Component, OnInit } from "@angular/core";
import { Verb } from "../../shared/models/verb.model";
import { ApiService } from "../../shared/services/api.service";
import { VerbGetResponse } from "../../shared/models/httpresponses";
import { Router } from "@angular/router";
import { VerbService } from "../verb.service";

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

      this.isFetchingItems = false;
    });
  }

  public selectAll () {
    this.selectedVerbs.push(...this.verbs);
  }

  public start () {
    // Shuffle the verbs
    this.shuffleArray(this.selectedVerbs);
    this.verbService.verbs = this.selectedVerbs;

    this.router.navigate(["verb-training"]);
  }

  private shuffleArray (arr: any[]) {
    for (let i = 0; i < arr.length; ++i) {
      // Get a random number between 0 and length
      const randomId: number = Math.floor(Math.random() * arr.length);
      const temp: any = arr[randomId];

      arr[randomId] = arr[i];
      arr[i] = temp;
    }
  }
}
