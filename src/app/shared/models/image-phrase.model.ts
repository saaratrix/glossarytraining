import { Category } from './category.model';

export interface ImagePhrase {
  id: number;
  imageBase64: string;
  finnish: string;
  note: string;
  category: Category;
}
