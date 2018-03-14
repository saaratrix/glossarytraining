import { Component, OnInit } from '@angular/core';
import { VerbService } from "../verb.service";
import { Router } from "@angular/router";
import { QuizCreateHelperService } from "../../shared/services/quiz-create-helper.service";
import { VerbItem } from "../../shared/models/verb-item.model";
import { Verb } from "../../shared/models/verb.model";
import { VerbItemQuestion } from "../../shared/models/verb-item-question.model";

@Component({
  selector: 'app-verb-training',
  templateUrl: './verb-training.component.html',
  styleUrls: ['./verb-training.component.less']
})
export class VerbTrainingComponent implements OnInit {
  public verbs: Verb[];

  public verbItems: VerbItem[];

  constructor (private quizCreateHelperService: QuizCreateHelperService, private verbService: VerbService, private router: Router) {
    this.verbs = [];
    this.verbItems = [];
  }

  ngOnInit () {
    this.verbs = this.verbService.verbs;

    if (this.verbs.length === 0) {
      this.router.navigate(["verb-selection"]);
      return;
    }

    // Create the training
    this.quizCreateHelperService.shuffleArray(this.verbs);

    for (let i = 0; i < this.verbs.length; i++) {
      const verb = this.verbs[i];

      const verbItem = this.createVerbItem(verb, i);
      this.verbItems.push(verbItem);
    }
    // First verb is always visible
    this.verbItems[0].isVisible = true;
  }

  public doNewVerbTraining () {
    this.verbService.verbs = [];
    this.router.navigate(["verb-selection"]);
  }

  public review () {
    console.log("woo!");
  }

  private createVerbItem(verb: Verb, index: number): VerbItem {

    const questionKeys = this.quizCreateHelperService.getQuestionKeys("finnish", "english");
    const name = verb[questionKeys.question];
    const isFinnish = questionKeys.question === "finnish";

    const questions = [];

    // Create questions
    questions.push(new VerbItemQuestion(verb[questionKeys.answer]) );
    questions.push(new VerbItemQuestion(verb.mina));
    questions.push(new VerbItemQuestion(verb.sina));
    questions.push(new VerbItemQuestion(verb.han));
    questions.push(new VerbItemQuestion(verb.me));
    questions.push(new VerbItemQuestion(verb.te));
    questions.push(new VerbItemQuestion(verb.he));
    questions.push(new VerbItemQuestion(verb.ei));

    const verbItem = new VerbItem(index, name, verb.note, questions, isFinnish);
    return verbItem;
  }
}
