import { VerbItemQuestion } from "./verb-item-question.model";
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

  public checkAnswer (): boolean {
    // Check the questions if they are correct and if so then the verb item is correct
    return false;
  };

  public hasAnswer (): boolean {
    return true;
  };
}
