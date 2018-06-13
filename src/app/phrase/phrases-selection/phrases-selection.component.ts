import {
  Component, Input, Output, OnInit, EventEmitter, IterableDiffers, IterableDiffer,
  DoCheck
} from "@angular/core";
import { Phrase } from "../../shared/models/phrase.model";
import { PhrasesByCategory } from "../../shared/models/phrases-by-category.model";


@Component({
  selector: "app-phrases-selection",
  templateUrl: "./phrases-selection.component.html",
  styleUrls: ["./phrases-selection.component.less"]
})
export class PhrasesSelectionComponent implements OnInit, DoCheck {

  @Input()
  public phrases: Phrase[];
  @Input()
  public emptySelection: string;

  // All phrases grouped by the category.
  public phrasesByCategory: PhrasesByCategory[];

  @Output()
  public phraseClick: EventEmitter<Phrase>;

  // An IterableDiffer that listens to the changes of the "phrases" input array.
  private m_phrasesDiffer: IterableDiffer<Phrase>;

  constructor (private _iterableDiffers: IterableDiffers) {
    this.phrases = [];
    this.phraseClick = new EventEmitter<Phrase>();

    this.phrasesByCategory = [];

    this.m_phrasesDiffer = this._iterableDiffers.find(this.phrases).create(null);
  }

  ngOnInit () {

  }

  ngDoCheck () {
    const changes = this.m_phrasesDiffer.diff(this.phrases);
    if (changes) {
      changes.forEachAddedItem((changeRecord) => {
        this.addPhraseToCategoryList(changeRecord.item);
      });

      changes.forEachRemovedItem((changeRecord) => {
        this.removePhraseFromCategoryList(changeRecord.item);
      });

      this.sortPhrasesByCategory();
    }
  }

  public onPhraseClicked (phrase: Phrase) {
    this.phraseClick.emit(phrase);
  }

  /**
   * Add a phrase to the phrases by category list.
   * @param {Phrase} phrase
   */
  private addPhraseToCategoryList (phrase: Phrase) {
    let phraseByCategory: PhrasesByCategory = this.phrasesByCategory.find((item: PhrasesByCategory) => {
      return item.category.id === phrase.category.id;
    });

    if (!phraseByCategory) {
      phraseByCategory = {
        category: phrase.category,
        phrases: [],
        isVisible: true
      };

      this.phrasesByCategory.push(phraseByCategory);
    }

    phraseByCategory.phrases.push(phrase);
  }

  /**
   * Remove a phrase from phrases by category list.
   * @param {Phrase} phrase
   */
  private removePhraseFromCategoryList (phrase: Phrase) {
    const phraseByCategory: PhrasesByCategory = this.phrasesByCategory.find((item: PhrasesByCategory) => {
      return item.category.id === phrase.category.id;
    });

    if (phraseByCategory) {
      for (let i = 0; i < phraseByCategory.phrases.length; i++) {
        if (phraseByCategory.phrases[i].id === phrase.id) {
          phraseByCategory.phrases.splice(i, 1);
          break;
        }
      }

      if (phraseByCategory.phrases.length <= 0) {
        const index = this.phrasesByCategory.indexOf(phraseByCategory);
        this.phrasesByCategory.splice(index, 1);
      }
    }
  }

  /**
   * Sort the phrases by category list by category name
   * Also sorts the phrases inside each category list by the phrase name.
   */
  private sortPhrasesByCategory () {
    // Sort based off category name
    this.phrasesByCategory.sort((a: PhrasesByCategory, b: PhrasesByCategory): number => {
      const aName = a.category.name.toLowerCase();
      const bName = b.category.name.toLowerCase();

      if (aName < bName) { return -1; }
      if (aName > bName) { return 1; }
      return 0;
    });

    this.phrasesByCategory.forEach((categoryList: PhrasesByCategory) => {
      categoryList.phrases.sort((a: Phrase, b: Phrase) => {
        const aName = a.finnish.toLowerCase();
        const bName = b.finnish.toLowerCase();

        if (aName < bName) { return -1; }
        if (aName > bName) { return 1; }
        return 0;
      });
    });
  }
}
