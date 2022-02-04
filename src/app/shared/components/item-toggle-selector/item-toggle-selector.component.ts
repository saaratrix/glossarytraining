import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

export interface ItemToggledEvent<T = UnknownItem> {
  item: T;
  selected: boolean;
}

export interface UnknownItem {
  id: number;
}

@Component({
  selector: "app-item-toggle-selector",
  templateUrl: "./item-toggle-selector.component.html",
  styleUrls: ["./item-toggle-selector.component.less"]
})
export class ItemToggleSelectorComponent implements OnInit {

  @Input() public initialItem: UnknownItem;
  @Input() public items: UnknownItem[] = [];
  @Input() public nameKey: string;
  @Input() public titleKey: string;
  @Input() public startSelected: boolean = true;
  @Input() public allowOnlyOne: boolean = false;
  @Input() public randomCount: number = 10;

  @Output() public itemClicked: EventEmitter<ItemToggledEvent> = new EventEmitter<ItemToggledEvent>();

  private readonly selectedItems: Record<string, UnknownItem> = {};

  constructor () {}

  ngOnInit () {
    if (this.startSelected) {
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        this.selectedItems[item.id] = item;
      }
    } else {
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
    } else {
      this.selectedItems[item.id] = item;
      isSelected = true;
    }

    this.itemClicked.emit({
      item,
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
