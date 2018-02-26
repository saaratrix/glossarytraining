import { Category } from "./category.model";

export interface Phrase {
  id: number;
  finnish: string;
  english: string;
  note: string;
  category: Category;
}
