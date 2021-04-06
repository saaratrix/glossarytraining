import { Category } from './category.model';
import { ImagePhrase } from './image-phrase.model';

export interface ImagePhrasesByCategory {
  category: Category;
  imagePhrases: ImagePhrase[];
  isVisible: boolean;
}
