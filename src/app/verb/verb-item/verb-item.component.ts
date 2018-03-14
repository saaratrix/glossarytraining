import { Component, Input, OnInit } from '@angular/core';
import { VerbItem } from "../../shared/models/verb-item.model";

@Component({
  selector: 'app-verb-item',
  templateUrl: './verb-item.component.html',
  styleUrls: ['./verb-item.component.less']
})
export class VerbItemComponent implements OnInit {
  @Input()
  public item: VerbItem;

  constructor() {
    this.item = null;
  }

  ngOnInit() {

  }

}
