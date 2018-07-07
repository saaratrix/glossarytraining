import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { EditField } from "../../../shared/models/edit-field";
import { EditFieldType } from "../../../shared/enums/edit-field-type.enum";

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

  public EditFieldTypes: any;

  constructor() {
    this.entity = null;
    this.fields = [];

    this.EditFieldTypes = EditFieldType;
  }

  ngOnInit() {
    console.log(this.entity);
    console.log(this.fields);
  }

}
