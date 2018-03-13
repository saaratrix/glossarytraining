import { Component, OnInit } from '@angular/core';
import { Verb } from "../../shared/models/verb.model";
import { VerbService } from "../verb.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-verb-training',
  templateUrl: './verb-training.component.html',
  styleUrls: ['./verb-training.component.less']
})
export class VerbTrainingComponent implements OnInit {
  public verbs: Verb[];

  constructor (private verbService: VerbService, private router: Router) {

  }

  ngOnInit () {
    this.verbs = this.verbService.verbs;

    if (this.verbs.length === 0) {
      this.router.navigate(["verb-selection"]);
    }
  }

  public review () {
    console.log("woo!");
  }

}
