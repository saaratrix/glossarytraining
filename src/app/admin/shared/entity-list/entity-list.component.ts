import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { ApiService } from "../../../shared/services/api.service";
import { DefaultSuccessResponse } from "../../../shared/models/httpresponses";
import { EditField } from "../../../shared/models/edit-field";
import { EntityUpdateErrorEvent, EntityUpdateSuccessEvent } from "../../phrases/phrases-list/phrases-list.component";

interface IKeyData {
  header: string;
  editable: boolean;
}

interface IEntityUpdate {
  index: number,
  entity: any,
}

@Component({
  selector: "app-admin-entity-list",
  templateUrl: "./entity-list.component.html",
  styleUrls: ["./entity-list.component.less"]
})
export class EntityListComponent implements OnInit {

  @Input()
  public listId: number;
  @Input()
  public doInlineEdit: boolean;
  @Input()
  public entities: any[];
  @Input()
  public keys: string[];
  @Input()
  public keysData: { [key: string]: IKeyData };
  @Input()
  public editFields: EditField[];
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

  @Input()
  public onstartEvent: EventEmitter<number>;
  @Input()
  public onsuccessEvent: EventEmitter<EntityUpdateSuccessEvent>;
  @Input()
  public onerrorEvent: EventEmitter<EntityUpdateErrorEvent>;


  @Output()
  public removed: EventEmitter<any>;
  @Output()
  public updateItem: EventEmitter<any>;

  public successSubscription: any;
  public errorSubscription: any;
  public startSubscription: any;

  public selectedEntity: any;

  // Event data for entity-edit component
  public error: string;
  public isWaitingForServer: boolean;
  public isFinished: boolean;

  private isDestroyed: boolean;

  constructor (private apiService: ApiService) {
    this.entities = [];
    this.keys = [];
    this.keysData = {};
    this.editFields = [];
    this.editUrl = "";
    this.updateUrl = "";
    this.removeUrl = "";
    this.titles = {};

    this.selectedEntity = null;

    this.removed = new EventEmitter<any>();
    this.updateItem = new EventEmitter<any>();

    this.error = "";
    this.isWaitingForServer = false;
    this.isFinished = false;

    this.isDestroyed = false;
  }

  ngOnInit () {

    // TODO: Investigate if there is a timing issue where for example:
    // 1. Update item A
    // 2. Change to item B
    // 3. item A finishes talking to server.
    // 4. Will item A's data affect item B?
    if (this.onstartEvent) {
      this.startSubscription = this.onstartEvent.subscribe((index: number) => {
        if (this.listId !== index) {
          return;
        }

        this.isWaitingForServer = true;
        this.isFinished = false;
        this.error = "";
      });
    }
    if (this.onsuccessEvent) {
      this.successSubscription = this.onsuccessEvent.subscribe((event: EntityUpdateSuccessEvent) => {
        if (this.listId !== event.index) {
          return;
        }

        this.isWaitingForServer = false;
        this.isFinished = true;
        this.error = "";
      });
    }
    if (this.onerrorEvent) {
      this.errorSubscription = this.onerrorEvent.subscribe((event: EntityUpdateErrorEvent) => {
        if (this.listId !== event.index) {
          return;
        }

        this.isWaitingForServer = false;
        this.isFinished = false;
        this.error = event.error;
      });
    }
  }

  ngOnDestroy () {
    this.isDestroyed = true;

    if (this.startSubscription) {
      this.startSubscription.unsubscribe();
    }
    if (this.successSubscription) {
      this.successSubscription.unsubscribe();
    }
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
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

      this.update({
        entity: entity,
        index: this.listId
      });
    }
  }

  /**
   * Stop enter from adding linebreaks
   * @param {KeyboardEvent} event
   */
  public columnKeyDown (event: KeyboardEvent) {
    // 13 == Enter
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  /**
   * Blur element on enter!
   * @param {KeyboardEvent} event
   */
  public columnKeyUp (event: KeyboardEvent) {
    // 13 == Enter
    if (event.key === "Enter") {
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
  public update (entity: IEntityUpdate) {
    this.updateItem.emit(entity);
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

  public showEdit (entity: any): void {
    if (this.selectedEntity !== entity) {

      this.isWaitingForServer = false;
      this.isFinished = false;
      this.error = "";

      this.selectedEntity = entity;
    }
    else {
      this.selectedEntity = null;
    }
  }

  public getEditText (entity: any): string {
    if (this.isEntityCurrentlyEdited(entity)) {
      return "hide";
    }
    else {
      return "edit";
    }
  }

  public isEntityCurrentlyEdited (entity: any): boolean {
    return this.selectedEntity === entity;
  }
}
