import { Component, OnInit } from "@angular/core";
import { Verb } from "../../../shared/models/verb.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../shared/services/api.service";
import {
  DefaultSuccessResponse, VerbGetDetailResponse, VerbPostCreateResponse
} from "../../../shared/models/httpresponses";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-verb-detail",
  templateUrl: "./verb-detail.component.html",
  styleUrls: ["./verb-detail.component.less"]
})
export class VerbDetailComponent implements OnInit {

  public verb: Verb;

  public isNew: boolean;
  public isWaitingForServer: boolean;
  public error: string;

  constructor (private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.verb = null;
    this.isNew = false;
    this.isWaitingForServer = false;
    this.error = null;
  }

  ngOnInit () {
    this.route.params.subscribe((params) => {
      const id = parseInt(params.id, 10);

      if (Number.isNaN(id) || id === -1) {
        this.verb = {
          id: -1,
          finnish: "",
          english: "",
          note: "",
          mina: "",
          sina: "",
          han: "",
          me: "",
          te: "",
          he: "",
          ei: ""
        };
        this.isNew = true;
      }
      else {
        this.apiService.get("verb/get/" + id).then((result: VerbGetDetailResponse) => {
          this.verb = result.verb;
          // If invalid quiz then route back to quiz list
          if (this.verb) {
            this.router.navigate(["/admin/verbs"]);
          }
        });
      }
    });
  }

  public createItem (): void {
    this.isWaitingForServer = true;
    this.error = null;

    this.apiService.post("verb/create", {
      id: this.verb.id,
      finnish: this.verb.finnish,
      english: this.verb.english,
      note: this.verb.note,
      minä: this.verb.mina,
      sinä: this.verb.sina,
      hän: this.verb.han,
      me: this.verb.me,
      te: this.verb.te,
      he: this.verb.he,
      ei: this.verb.ei,
    })
    .then((result: VerbPostCreateResponse) => {
      if (result.verb) {
        this.verb.id = result.verb.id;
        // If success show that it was updated?
        this.isNew = true;
      }
      else {
        this.error = result.error;
      }
      this.isWaitingForServer = false;
    });
  }

  public updateItem (): void {
    this.isWaitingForServer = true;
    this.error = null;

    this.apiService.post("verb/update", {
      id: this.verb.id,
      finnish: this.verb.finnish,
      english: this.verb.english,
      note: this.verb.note,
      minä: this.verb.mina,
      sinä: this.verb.sina,
      hän: this.verb.han,
      me: this.verb.me,
      te: this.verb.te,
      he: this.verb.he,
      ei: this.verb.ei,
    })
    .then((result: DefaultSuccessResponse ) => {
      if (result.success) {

      }
      else {
        this.error = result.error;
      }

      this.isWaitingForServer = false;
    });
  }

  public onSubmit (form: NgForm): void {
    if (form.valid) {
      if (this.isNew) {
        this.createItem();
      }
      else {
        this.updateItem();
      }
    }
  }

}
