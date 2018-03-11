import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ApiService } from "../../../shared/services/api.service";
import { DefaultSuccessResponse } from "../../../shared/models/httpresponses";

interface IKeyData {
  header: string;
  editable: boolean;
}

@Component({
  selector: "app-admin-entity-list",
  templateUrl: "./entity-list.component.html",
  styleUrls: ["./entity-list.component.less"]
})
export class EntityListComponent implements OnInit {

  @Input()
  public entities: any[];
  @Input()
  public keys: string[];
  @Input()
  public keysData: { [key: string]: IKeyData };
  // The edit url for <>
  @Input()
  public editUrl: string;
  // The remove API url
  @Input()
  public removeUrl: string;
  // The update API url
  @Input()
  public updateUrl: string;
  @Input()
  public titles: { [key: string]: string };

  @Output()
  public removed: EventEmitter<any>;

  constructor (private apiService: ApiService) {
    this.entities = [];
    this.keys = [];
    this.keysData = {};
    this.editUrl = "";
    this.updateUrl = "";
    this.removeUrl = "";
    this.titles = {};

    this.removed = new EventEmitter<any>();
  }

  ngOnInit () {
  }

  /**
   * When a column is blurred ( <td> )
   * @param entity
   * @param {string} key
   */
  public columnBlurred (entity: any, key: string, event: Event) {
    const value: string = (event.target as HTMLElement).innerText;

    if (value !== entity[key]) {
      entity[key] = value;
      this.update(entity);
    }
  }

  /**
   * Stop enter from adding linebreaks
   * @param {KeyboardEvent} event
   */
  public columnKeyDown (event: KeyboardEvent) {
    // 13 == Enter
    if (event.which === 13) {
      event.preventDefault();
    }
  }

  /**
   * Blur element on enter!
   * @param {KeyboardEvent} event
   */
  public columnKeyUp (event: KeyboardEvent) {
    // 13 == Enter
    if (event.which === 13) {
      (event.target as HTMLElement).blur();
      event.preventDefault();
    }
  }

  /**
   * Get the value for element.title.
   * For example if you mouseover the finnish column the title could be english.
   * @param entity
   * @param {string} key
   * @return {any}
   */
  public getTitle (entity: any, key: string) {
    if (this.titles[key]) {
      return entity[this.titles[key]];
    }

    return "";
  }

  /**
   * Is the column contenteditable?
   * @param {string} key
   * @return {boolean}
   */
  public isEditable (key: string) {
    if (this.updateUrl && this.keysData[key] && this.keysData[key].editable) {
      return true;
    }

    return false;
  }

  /**
   * Update the entity by using the api
   * @param entity
   */
  public update (entity: any) {
    this.apiService.post(this.updateUrl, entity)
    .then((result: DefaultSuccessResponse) => {
      if (result.success) {

      }
      else {

      }
    });
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
