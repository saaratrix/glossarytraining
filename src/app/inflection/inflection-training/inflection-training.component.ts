import { Component, OnInit } from '@angular/core';
import { InflectionTrainingService } from '../providers/inflection-training.service';
import type { InflectionTest } from './inflection-test.model';
import { Router } from '@angular/router';

@Component({
  selector: 'inflection-training',
  templateUrl: './inflection-training.component.html',
  styleUrls: ['./inflection-training.component.less']
})
export class InflectionTrainingComponent implements OnInit {
  test: InflectionTest;
  isReviewed: boolean = false;
  isAllCorrect: boolean = false;

  constructor(
    private inflectionTrainingService: InflectionTrainingService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (!this.inflectionTrainingService.inflectionTest) {
      this.router.navigate(['inflection-selection']).then();
      return;
    }

    this.test = this.inflectionTrainingService.inflectionTest;
  }

  public hasAnswers (): boolean {
    for (const question of this.test.questions) {
      if (!question.hasAnswer()) {
        return false;
      }
    }

    return true;
  }

  review(): void {
    let isAllCorrect = true;
    for (const question of this.test.questions) {
      if (!question.checkAnswer()) {
        isAllCorrect = false;
      }
    }

    this.isAllCorrect = isAllCorrect;
    this.isReviewed = true;
  }

  public doNewTraining(): void {
    this.inflectionTrainingService.inflectionTest = undefined,
    this.router.navigate(["inflection-selection"]);
  }
}
