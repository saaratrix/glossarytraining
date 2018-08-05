import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from "@angular/forms";
import { EditField } from "../../../shared/models/edit-field";
import { EditFieldType } from "../../../shared/enums/edit-field-type.enum";

export interface  EntityEditUpdateEvent {
  entity: any;
  index: number;
}

@Component({
  selector: 'app-admin-entity-edit',
  templateUrl: './entity-edit.component.html',
  styleUrls: ['./entity-edit.component.less']
})
export class EntityEditComponent implements OnInit {

  @Input()
  public entity: any;
  @Input()
  public fields: EditField[];
  @Input()
  public listId: number;

  @Input()
  public error: string;
  @Input()
  public isWaitingForServer: boolean;
  @Input()
  public isFinished: boolean;

  @Output()
  public onupdate: EventEmitter<EntityEditUpdateEvent>;

  public EditFieldTypes: any;

  constructor() {
    this.entity = null;
    this.fields = [];

    this.error = "";
    this.isWaitingForServer = false;
    this.isFinished = false;

    this.EditFieldTypes = EditFieldType;
    this.onupdate = new EventEmitter();
  }

  ngOnInit () {
    console.log("init!!");
  }

  public updateItem () {
    this.onupdate.emit({
      entity: this.entity,
      index: this.listId
    });
  }

}
