import { Component, OnInit } from '@angular/core';
import type { InflectionSelection } from './inflection-chooser/inflection-selection.model';
import type { Inflection } from '../shared/models/inflection';

@Component({
  selector: 'app-inflection',
  templateUrl: './inflection.component.html',
  styleUrls: ['./inflection.component.less']
})
export class InflectionComponent implements OnInit {
  selectedInflections: Inflection[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  onSelected(event: InflectionSelection): void {
    this.selectedInflections = event.inflections;
  }

  startTest(): void {

  }
}
