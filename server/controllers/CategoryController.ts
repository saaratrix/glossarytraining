import { CategoryHandler } from "../handlers/CategoryHandler";
import { Application, Request, Response } from "express";
import { Category } from "../models/Category";

export class CategoryController {
  private m_categoryHandler: CategoryHandler;

  constructor(categoryHandler: CategoryHandler) {
    this.m_categoryHandler = categoryHandler;
  }

  public async getAll(req: Request, res: Response): Promise<void> {

  }

  public async getOne(req: Request, res: Response): Promise<void> {

  }

  public async create(req: Request, res: Response): Promise<void> {

  }

  public async update(req: Request, res: Response): Promise<void> {

  }

  public async remove(req: Request, res: Response): Promise<void> {

  }

  /**
   * Parse the request.body and return a new phrase.
   * @param body
   * @return {Category}
   */
  private getCategoryFromBody (body: any): Category {
    const id = typeof body.id !== "undefined" ? parseInt(body.id, 10) : -1;
    const name = body.categoryName || "";

    return new Category(id, name);
  }
}

module.exports = function (baseUrl: string, expressApp: Application) {
  const categoryHandler = new CategoryHandler();

  const categoryController = new CategoryController(categoryHandler);

  expressApp.get(baseUrl + "category/get", async (req, res) => {
    categoryController.getAll(req, res);
  });

  expressApp.get(baseUrl + "category/get/:id", async (req, res) => {
    categoryController.getOne(req, res);
  });

  expressApp.post(baseUrl + "category/create", async (req, res) => {
    categoryController.create(req, res);
  });

  expressApp.post(baseUrl + "category/update", async (req, res) => {
    categoryController.update(req, res);
  });

  expressApp.post(baseUrl + "category/remove", async (req, res) => {
    categoryController.remove(req, res);
  });
};
