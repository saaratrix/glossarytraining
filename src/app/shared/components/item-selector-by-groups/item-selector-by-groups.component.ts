import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ItemToggledEvent } from '../item-toggle-selector/item-toggle-selector.component';

interface Group {
  key: string;
  items: Record<string, unknown>[];
}

@Component({
  selector: 'app-item-selector-by-groups',
  templateUrl: './item-selector-by-groups.component.html',
  styleUrls: ['./item-selector-by-groups.component.less']
})
export class ItemSelectorByGroupsComponent implements OnChanges, OnInit {
  @Input() public initialItem: any | undefined;
  @Input() public items: any[] = [];
  @Input() public titleKey: string;
  @Input() public nameKey: string;
  @Input() public groupKey: string;

  @Output() public itemClicked: EventEmitter<ItemToggledEvent> = new EventEmitter<ItemToggledEvent>();

  private selectedItem: any | undefined;

  public unknownItems: any[] = [];
  public itemsByGroups: Group[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.createItemsByGroups();
    }
  }

  ngOnInit(): void {
    this.selectedItem = this.initialItem;
  }

  private createItemsByGroups(): void {
    this.itemsByGroups = [];
    this.unknownItems = [];
    for (const item of this.items) {
      const key = this.getKey(item);
      if (!key) {
        this.unknownItems.push(item);
        continue;
      }

      let itemByGroup = this.itemsByGroups.find(g => g.key === key);
      if (!itemByGroup) {
        itemByGroup = {
          key,
          items: [],
        }
        this.itemsByGroups.push(itemByGroup);
      }

      itemByGroup.items.push(item);
    }

    this.itemsByGroups.sort((a, b) => a.key.localeCompare(b.key));
  }

  // Source: https://stackoverflow.com/a/6394168
  private getKey(item: any): string {
    const split = this.groupKey.split('.');
    return split.reduce((o,i)=> o[i], item);
  }

  public onItemClicked (item: any) {
    let isSelected = false;
    if (this.selectedItem === item) {
      this.selectedItem = null;
    } else {
      this.selectedItem = item;
      isSelected = true;
    }

    this.itemClicked.emit({
      item: item,
      selected: isSelected
    });
  }

}
