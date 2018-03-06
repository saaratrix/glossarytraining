import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.less']
})
export class QuizSelectionComponent implements OnInit {

  @Input()
  public items: any[];
  @Output()
  public selected: EventEmitter<any>;

  constructor() {
    this.items = [];
    this.selected = new EventEmitter<any>();
  }

  ngOnInit() {

  }

  public itemClicked(item: any) {
    this.selected.emit(item);
  }

}
