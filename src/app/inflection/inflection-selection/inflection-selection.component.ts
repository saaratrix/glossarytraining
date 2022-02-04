import { Component, OnInit } from '@angular/core';
import type { InflectionSelection } from './inflection-chooser/inflection-selection.model';
import { InflectionTrainingService } from '../providers/inflection-training.service';
import { Router } from '@angular/router';
import { InflectionQuestionType } from '../inflection-question/inflection-question-type.enum';

type QuestionTypeChoice = [key: string, value: InflectionQuestionType];

@Component({
  selector: 'inflection-selection',
  templateUrl: './inflection-selection.component.html',
  styleUrls: ['./inflection-selection.component.less']
})
export class InflectionSelectionComponent implements OnInit {
  selection: InflectionSelection | undefined;

  questionTypesChoices: QuestionTypeChoice[] = [
    ['phrase → inflection', InflectionQuestionType.PhraseToInflection],
    ['phrase ← inflection', InflectionQuestionType.InflectionToPhrase],
    ['phrase ←→ inflection', InflectionQuestionType.Random],
  ];
  questionType: QuestionTypeChoice = this.questionTypesChoices[2];

  constructor(
    private inflectionTrainingService: InflectionTrainingService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  onSelected(event: InflectionSelection): void {
    this.selection = event;
  }

  startTest(): void {
    if (!this.selection?.inflections.length) {
      return;
    }

    this.inflectionTrainingService.createTest(this.selection, this.questionType[1]);
    this.router.navigate(['inflection-training']).then();
  }
}
