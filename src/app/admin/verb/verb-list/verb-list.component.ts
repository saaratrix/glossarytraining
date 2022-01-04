import { Component, EventEmitter, OnInit } from "@angular/core";
import { ApiService } from "../../../shared/services/api.service";
import { Verb } from "../../../shared/models/verb.model";
import { DefaultSuccessResponse, VerbGetResponse } from "../../../shared/models/http/httpresponses";
import { EditFieldType } from "../../../shared/enums/edit-field-type.enum";
import { EntityEditUpdateEvent } from "../../shared/entity-edit/entity-edit.component";
import { EntityUpdateSuccessEvent } from '../../shared/models/events/entity-update-success.event';
import { EntityUpdateErrorEvent } from '../../shared/models/events/entity-update-error.event';

@Component({
  selector: "app-verb-list",
  templateUrl: "./verb-list.component.html",
  styleUrls: ["./verb-list.component.less"]
})
export class VerbListComponent implements OnInit {
  public verbs: Verb[];

  public EditFieldTypes: any;

  public onstartEvent: EventEmitter<number>;
  public onsuccessEvent: EventEmitter<EntityUpdateSuccessEvent>;
  public onerrorEvent: EventEmitter<EntityUpdateErrorEvent>;

  constructor (private apiService: ApiService) {
    this.verbs = [];

    this.EditFieldTypes = EditFieldType;

    this.onstartEvent = new EventEmitter<number>();
    this.onsuccessEvent = new EventEmitter<EntityUpdateSuccessEvent>();
    this.onerrorEvent = new EventEmitter<EntityUpdateErrorEvent>();
  }

  ngOnInit () {
    this.apiService.get("verb/get").then((result: VerbGetResponse) => {
      this.verbs = result.verbs || [];
    });
  }

  public removedItem (verb: Verb) {
    const index = this.verbs.indexOf(verb);
    if (index !== -1) {
      this.verbs.splice(index, 1);
    }
  }

  public updateItem (event: EntityEditUpdateEvent): void {
    let verb = event.entity as Verb;

    this.onstartEvent.emit(event.index);

    this.apiService.post("verb/update", {
      id: verb.id,
      finnish: verb.finnish,
      english: verb.english,
      note: verb.note,
      minä: verb.mina,
      sinä: verb.sina,
      hän: verb.han,
      me: verb.me,
      te: verb.te,
      he: verb.he,
      ei: verb.ei,
    })
    .then((result: DefaultSuccessResponse ) => {
      if (result.success) {
        this.onsuccessEvent.emit({
          index: event.index,
          entity: verb
        });
      }
      else {
        this.onerrorEvent.emit({
          index: event.index,
          error: result.error
        });
      }
    });
  }

}
