import { Category } from "./category.model";
import { Phrase } from "./phrase.model";

export interface PhrasesByCategory {
  category: Category;
  phrases: Phrase[];
  isVisible: boolean;
}
