import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  IterableDiffer,
  IterableDiffers,
  Output
} from '@angular/core';
import { ImagePhrasesByCategory } from '../../shared/models/image-phrases-by-category.model';
import { ImagePhrase } from '../../shared/models/image-phrase.model';

@Component({
  selector: 'app-image-phrases-selection',
  templateUrl: './image-phrases-selection.component.html',
  styleUrls: ['../phrases-selection/phrases-selection.component.less', './image-phrases-selection.component.less']
})
export class ImagePhrasesSelectionComponent implements DoCheck {

  @Input() public imagePhrases: ImagePhrase[];
  @Input() public emptySelection: string;

  @Output() public imagePhraseClick: EventEmitter<ImagePhrase>;
  // All phrases grouped by the category.
  public imagePhrasesByCategories: ImagePhrasesByCategory[];

  // An IterableDiffer that listens to the changes of the "phrases" input array.
  private m_imagePhrasesDiffer: IterableDiffer<ImagePhrase>;

  constructor (
    private _iterableDiffers: IterableDiffers
  ) {
    this.imagePhrases = [];
    this.imagePhraseClick = new EventEmitter<ImagePhrase>();

    this.imagePhrasesByCategories = [];

    this.m_imagePhrasesDiffer = this._iterableDiffers.find(this.imagePhrases).create(null);
  }

  ngDoCheck () {
    const changes = this.m_imagePhrasesDiffer.diff(this.imagePhrases);
    if (changes) {
      changes.forEachAddedItem((changeRecord) => {
        this.addPhraseToCategoryList(changeRecord.item);
      });

      changes.forEachRemovedItem((changeRecord) => {
        this.removePhraseFromCategoryList(changeRecord.item);
      });

      this.sortImagePhrasesByCategory();
    }
  }

  public onImagePhraseClicked (imagePhrase: ImagePhrase, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.imagePhraseClick.emit(imagePhrase);
  }

  /**
   * Add a phrase to the image phrases by category list.
   * @param {ImagePhrase} imagePhrase
   */
  private addPhraseToCategoryList (imagePhrase: ImagePhrase) {
    let imagePhrasesByCategory: ImagePhrasesByCategory = this.imagePhrasesByCategories.find((item: ImagePhrasesByCategory) => {
      return item.category.id === imagePhrase.category.id;
    });

    if (!imagePhrasesByCategory) {
      imagePhrasesByCategory = {
        category: imagePhrase.category,
        imagePhrases: [],
        isVisible: true
      };

      this.imagePhrasesByCategories.push(imagePhrasesByCategory);
    }

    imagePhrasesByCategory.imagePhrases.push(imagePhrase);
  }

  /**
   * Remove a phrase from phrases by category list.
   * @param {ImagePhrase} imagePhrase
   */
  private removePhraseFromCategoryList (imagePhrase: ImagePhrase) {
    const imagePhrasesByCategory: ImagePhrasesByCategory = this.imagePhrasesByCategories.find((item: ImagePhrasesByCategory) => {
      return item.category.id === imagePhrase.category.id;
    });

    if (imagePhrasesByCategory) {
      for (let i = 0; i < imagePhrasesByCategory.imagePhrases.length; i++) {
        if (imagePhrasesByCategory.imagePhrases[i].id === imagePhrase.id) {
          imagePhrasesByCategory.imagePhrases.splice(i, 1);
          break;
        }
      }

      if (imagePhrasesByCategory.imagePhrases.length <= 0) {
        const index = this.imagePhrasesByCategories.indexOf(imagePhrasesByCategory);
        this.imagePhrasesByCategories.splice(index, 1);
      }
    }
  }

  /**
   * Sort the phrases by category list by category name
   * Also sorts the phrases inside each category list by the image phrase name.
   */
  private sortImagePhrasesByCategory () {
    // Sort based off category name
    this.imagePhrasesByCategories.sort((a: ImagePhrasesByCategory, b: ImagePhrasesByCategory): number => {
      const aName = a.category.name.toLowerCase();
      const bName = b.category.name.toLowerCase();

      if (aName < bName) { return -1; }
      if (aName > bName) { return 1; }
      return 0;
    });

    this.imagePhrasesByCategories.forEach((categoryList: ImagePhrasesByCategory) => {
      categoryList.imagePhrases.sort((a: ImagePhrase, b: ImagePhrase) => {
        const aName = a.finnish.toLowerCase();
        const bName = b.finnish.toLowerCase();

        if (aName < bName) { return -1; }
        else if (aName > bName) { return 1; }
        return 0;
      });
    });
  }

}
