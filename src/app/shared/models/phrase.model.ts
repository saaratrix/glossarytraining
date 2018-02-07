import { Category } from "./category.model";

export interface Phrase {
  id: number;
  finnish: string;
  english: string;
  category: Category;
}
