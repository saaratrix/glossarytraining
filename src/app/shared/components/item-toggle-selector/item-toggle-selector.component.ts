import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

export interface ItemToggledEvent {
  item: any;
  selected: boolean;
}

@Component({
  selector: "app-item-toggle-selector",
  templateUrl: "./item-toggle-selector.component.html",
  styleUrls: ["./item-toggle-selector.component.less"]
})
export class ItemToggleSelectorComponent implements OnInit {

  @Input()
  public initialItem: any;
  @Input()
  public items: any[];
  @Input()
  public nameKey: string;
  @Input()
  public titleKey: string;
  @Input()
  public startSelected: boolean;
  @Input()
  public allowOnlyOne: boolean;
  @Input()
  public randomCount: number = 10;

  @Output()
  public itemClicked: EventEmitter<ItemToggledEvent>;

  private selectedItems: any;

  constructor () {
    this.items = [];
    this.selectedItems = {};
    this.startSelected = true;
    this.allowOnlyOne = false;
    this.itemClicked = new EventEmitter<ItemToggledEvent>();
  }

  ngOnInit () {
    if (this.startSelected) {
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        this.selectedItems[item.id] = item;
      }
    }
    else {
      if (this.initialItem) {

      }
    }
  }

  public selectAll () {
    for ( let i = 0; i < this.items.length; i++ ) {
      const item = this.items[i];
      if (!this.selectedItems[item.id]) {
        // Simulates selecting item
        // And tells parent it was selected aswell
        this.onItemClicked(item);
      }
    }
  }

  public unselectAll () {
    for ( let i = 0; i < this.items.length; i++ ) {
      const item = this.items[i];
      if (this.selectedItems[item.id]) {
        // Simulates unselecting item
        // And tells parent it was selected aswell
        this.onItemClicked(item);
      }
    }
  }

  public onItemClicked (item: any) {
    let isSelected = false;
    if (this.selectedItems[item.id]) {
      delete this.selectedItems[item.id];
    }
    else {
      this.selectedItems[item.id] = item;
      isSelected = true;
    }

    this.itemClicked.emit({
      item: item,
      selected: isSelected
    });
  }

  public randomizeSelection(): void {
    this.unselectAll();
    const items = [...this.items];

    for (let i = 0; i < items.length; i++) {
      const index = Math.floor(Math.random() * (items.length));
      // Just a simple swap to randomize the verbs.
      const temp = items[index];
      items[index] = items[i];
      items[i] = temp;
    }

    const randomVerbs = items.splice(0, this.randomCount);
    for (const randomVerb of randomVerbs) {
      this.onItemClicked(randomVerb);
    }
  }
}
