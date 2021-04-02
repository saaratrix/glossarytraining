import { Category } from "../../src/app/shared/models/category.model";

export class ImagePhrase {
  constructor(
    public id: number,
    // Storing the images as base64 makes them 33% larger but at the moment storage space isn't a concern to make it simpler!
    public imageBase64: string,
    public finnish: string,
    public note: string,
    public category: Category,
  ) { }
}
