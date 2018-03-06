import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ApiService } from "../../../shared/services/api.service";
import { DefaultSuccessResponse } from "../../../shared/models/httpresponses";

@Component({
  selector: 'app-admin-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.less']
})
export class EntityListComponent implements OnInit {

  @Input()
  public entities: any[];
  @Input()
  public keys: string[];
  @Input()
  public keysPretty: { [key: string]: string };
  @Input()
  public editUrl: string;
  @Input()
  public removeUrl: string;
  @Input()
  public titles: { [key: string]: string };

  @Output()
  public removed: EventEmitter<any>;

  constructor(private apiService: ApiService) {
    this.entities = [];
    this.keys = [];
    this.keysPretty = {};
    this.editUrl = "";
    this.titles = {};

    this.removed = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  public getTitle(entity: any, key: string) {
    if (this.titles[key]) {
      return entity[this.titles[key]];
    }

    return "";
  }

  public remove (entity: any) {
    this.apiService.post(this.removeUrl, entity)
    .then((result: DefaultSuccessResponse) => {
      if (result.success) {
        const index = this.entities.indexOf(entity);
        if (index !== -1) {
         this.entities.splice(index, 1);
         this.removed.emit(entity);
        }
      }
    });
  }

}
