import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
import { Phrase } from "../../shared/models/phrase.model";

@Component({
  selector: 'app-phrases-selection',
  templateUrl: './phrases-selection.component.html',
  styleUrls: ['./phrases-selection.component.less']
})
export class PhrasesSelectionComponent implements OnInit {

  @Input() public phrases: Phrase[];

  @Output() public phraseClick: EventEmitter<Phrase>;

  constructor() {
    this.phrases = [];
    this.phraseClick = new EventEmitter<Phrase>();
  }

  ngOnInit() {

  }

}
