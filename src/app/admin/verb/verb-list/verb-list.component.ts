import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../shared/services/api.service";
import { Verb } from "../../../shared/models/verb.model";
import { VerbGetResponse } from "../../../shared/models/httpresponses";

@Component({
  selector: "app-verb-list",
  templateUrl: "./verb-list.component.html",
  styleUrls: ["./verb-list.component.less"]
})
export class VerbListComponent implements OnInit {
  public verbs: Verb[];

  constructor (private apiService: ApiService) {
    this.verbs = [];
  }

  ngOnInit () {
    this.apiService.get("verb/get").then((result: VerbGetResponse) => {
      this.verbs = result.verbs || [];
    });
  }

}
