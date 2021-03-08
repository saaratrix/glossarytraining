import { Category } from "../../src/app/shared/models/category.model";

export class Phrase {
  constructor(
    public id: number,
    public finnish: string,
    public english: string,
    public note: string,
    public category: Category
  ) { }
}
