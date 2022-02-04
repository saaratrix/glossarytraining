import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { ApiService } from "../../../shared/services/api.service";
import { DefaultSuccessResponse } from "../../../shared/models/http/httpresponses";
import { EditField } from "../../../shared/models/edit-field";
import { EntityUpdateSuccessEvent } from '../models/events/entity-update-success.event';
import { EntityUpdateErrorEvent } from '../models/events/entity-update-error.event';
import { Subscription } from 'rxjs';

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

  @Input() public listId: number;
  @Input() public doInlineEdit: boolean;
  @Input() public entities: any[] = [];
  @Input() public keys: string[] = [];
  @Input() public keysData: Record<string, IKeyData> = {};
  @Input() public editFields: EditField[] = [];
  // The edit url for <>
  @Input() public editUrl: string = "";
  // The remove API url
  @Input() public removeUrl: string = "";
  // The update API url
  @Input() public updateUrl: string = "";
  @Input() public titles: Record<string, string> = {};

  @Input() public onstartEvent: EventEmitter<number>;
  @Input() public onsuccessEvent: EventEmitter<EntityUpdateSuccessEvent>;
  @Input() public onerrorEvent: EventEmitter<EntityUpdateErrorEvent>;

  @Output() public removed: EventEmitter<any> = new EventEmitter<any>();
  @Output() public updateItem: EventEmitter<any> = new EventEmitter<any>();

  public successSubscription: Subscription;
  public errorSubscription: Subscription;
  public startSubscription: Subscription;

  public selectedEntity: unknown | null = null;

  // Event data for entity-edit component
  public error: string = "";
  public isWaitingForServer: boolean = false;
  public isFinished: boolean = false;

  private isDestroyed: boolean = false;

  constructor (
    private apiService: ApiService
  ) { }

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

    this.startSubscription?.unsubscribe();
    this.successSubscription?.unsubscribe();
    this.errorSubscription?.unsubscribe();
  }

  /**
   * When a column is blurred ( <td> )
   */
  public columnBlurred (entity: any, key: string, event: Event): void {
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
   */
  public columnKeyDown (event: KeyboardEvent): void {
    // 13 == Enter
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  /**
   * Blur element on enter!
   */
  public columnKeyUp (event: KeyboardEvent): void {
    // 13 == Enter
    if (event.key === "Enter") {
      (event.target as HTMLElement).blur();
      event.preventDefault();
    }
  }

  /**
   * Get the value for element.title.
   * For example if you mouseover the finnish column the title could be english.
   */
  public getTitle (entity: any, key: string): string {
    if (this.titles[key]) {
      const text = entity[this.titles[key]]
      return text !== undefined ? text : this.titles[key];
    }

    return "";
  }

  /**
   * Is the column contenteditable?
   */
  public isEditable (key: string): boolean {
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

  public showEdit (entity: any, event: MouseEvent): void {
    if (!this.doInlineEdit) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (this.selectedEntity !== entity) {
      this.isWaitingForServer = false;
      this.isFinished = false;
      this.error = "";

      this.selectedEntity = entity;
    } else {
      this.selectedEntity = null;
    }
  }

  public getEditText (entity: any): string {
    if (this.isEntityCurrentlyEdited(entity)) {
      return "hide";
    } else {
      return "edit";
    }
  }

  public isEntityCurrentlyEdited (entity: any): boolean {
    return this.selectedEntity === entity;
  }
}
