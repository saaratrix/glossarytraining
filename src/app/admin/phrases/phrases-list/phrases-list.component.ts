import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../shared/services/api.service";
import { Phrase } from "../../../shared/models/phrase.model";
import { DefaultSuccessResponse, PhraseGetResponse } from "../../../shared/models/httpresponses";

@Component({
  selector: 'app-admin-phrases-list',
  templateUrl: './phrases-list.component.html',
  styleUrls: ['./phrases-list.component.less']
})
export class PhrasesListComponent implements OnInit {

  public items: Phrase[];

  constructor (private apiService: ApiService) {
    this.items = [];
  }

  ngOnInit () {
    this.apiService.get("phrase/get").then((response: PhraseGetResponse) => {
      this.items = response.phrases;
    });
  }

  public removeItem (item: Phrase) {
    this.apiService.post("phrase/remove", item)
      .then((result: DefaultSuccessResponse) => {
        if (result.success) {
          const index = this.items.indexOf(item);
          if (index !== -1) {
           this.items.splice(index, 1);
          }
        }
      });
  }

}
