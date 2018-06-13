import { VerbItemQuestion } from "./verb-item-question.model";
import { getDefaultSchematicCollection } from "@angular/cli/utilities/config";
// Ideally this would just be called Verb but that's already taken!
export class VerbItem {

  public index: number;
  // Will be the name in finnish or english
  public name: string;
  // Possible note as a hint if same word or similar meaning
  public note: string;
  public questions: VerbItemQuestion[];
  // If the name is in finnish or not
  public isFinnish: boolean;

  public isVisible: boolean;
  public isCorrect: boolean;

  private correctTranslation: string;

  constructor (index: number, name: string, note: string, questions: VerbItemQuestion[], isFinnish: boolean) {
    this.index = index;
    this.name = name;
    this.note = note;
    this.questions = questions;
    this.isFinnish = isFinnish;

    this.isVisible = false;
    this.isCorrect = false;
  }

  /**
   * Check the VerbItem's questions if they are correct or not.
   * @return {boolean}
   */
  public checkAnswers (): boolean {
    this.isCorrect = true;
    for (let i = 0; i < this.questions.length; i++) {
      if (!this.questions[i].checkAnswer()) {
        this.isCorrect = false;
      }
    }

    // Check the questions if they are correct and if so then the verb item is correct
    return this.isCorrect;
  }

  /**
   * Check if the VerbItem's questions have answers.
   * @return {boolean}
   */
  public hasAnswers (): boolean {
    for (let i = 0; i < this.questions.length; i++) {
      if (!this.questions[i].hasAnswer()) {
        return false;
      }
    }

    return true;
  }
}
