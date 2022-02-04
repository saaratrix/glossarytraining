import { Injectable } from '@angular/core';
import type { InflectionTest } from '../inflection-training/inflection-test.model';
import type { InflectionSelection } from '../inflection-selection/inflection-chooser/inflection-selection.model';
import { InflectionQuestion } from '../inflection-question/inflection-question.model';
import type { InflectionQuestionType } from '../inflection-question/inflection-question-type.enum';

@Injectable({
  providedIn: 'root'
})
export class InflectionTrainingService {
  inflectionTest: InflectionTest | undefined;

  constructor() { }

  createTest(selection: InflectionSelection, type: InflectionQuestionType) {
    const questions = selection.inflections.map<InflectionQuestion>(i => {
      return new InflectionQuestion(i, type);
    });

    this.inflectionTest = {
      description: selection.inflectionCategory.description,
      questions,
      title: selection.inflectionCategory.name,
    };
  }
}
