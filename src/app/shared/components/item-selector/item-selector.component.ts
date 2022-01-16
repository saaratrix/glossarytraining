import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemToggledEvent } from "../item-toggle-selector/item-toggle-selector.component";

@Component({
  selector: 'app-item-selector',
  templateUrl: './item-selector.component.html',
  styleUrls: ['./item-selector.component.less']
})
export class ItemSelectorComponent implements OnInit {

  @Input() public initialItem: any;
  @Input() public items: any[] = [];
  @Input() public titleKey: string;
  @Input() public nameKey: string;

  @Output() public itemClicked: EventEmitter<ItemToggledEvent> = new EventEmitter<ItemToggledEvent>();

  private selectedItem: any | null = null;

  constructor() { }

  ngOnInit() {
    if (this.initialItem) {
      this.selectedItem = this.initialItem;
    }
  }

  public onItemClicked (item: any) {
    let isSelected = false;
    if (this.selectedItem === item) {
      this.selectedItem = null;
    }
    else {
      this.selectedItem = item;
      isSelected = true;
    }

    this.itemClicked.emit({
      item: item,
      selected: isSelected
    });
  }

}
