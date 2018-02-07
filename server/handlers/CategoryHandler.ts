import { BaseHandler } from "./BaseHandler";
import { Category } from "../models/Category";

export class CategoryHandler extends BaseHandler<Category>{
  constructor () {
    super("categories");
  }
}
