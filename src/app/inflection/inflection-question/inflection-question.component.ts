import { Component, Input, OnInit } from '@angular/core';
import type { InflectionQuestion } from './inflection-question.model';
import { InflectionQuestionType } from './inflection-question-type.enum';

@Component({
  selector: '[inflection-question]',
  templateUrl: './inflection-question.component.html',
  styleUrls: ['./inflection-question.component.less']
})
export class InflectionQuestionComponent implements OnInit {
  @Input() question: InflectionQuestion;

  InflectionQuestionType: typeof InflectionQuestionType = InflectionQuestionType;
  direction: '←' | '→';
  showAnswer: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.direction = this.question.type === InflectionQuestionType.PhraseToInflection ? '→' : '←';
  }

  toggleReveal(): void {
    this.showAnswer = !this.showAnswer;
  }
}
