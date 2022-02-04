import { CategoryHandler } from "../handlers/CategoryHandler";
import { Application, Request, Response } from "express";
import { Category } from "../models/Category";

import { isAuthenticatedApiMiddleware } from "../authentication/IsAuthenticated";

export class CategoryController {
  private m_categoryHandler: CategoryHandler;

  constructor (categoryHandler: CategoryHandler) {
    this.m_categoryHandler = categoryHandler;
  }

  public async getAll (req: Request, res: Response): Promise<void> {
    const categories: Category[] = await this.m_categoryHandler.all();

    res.json({
      categories: categories
    });
  }

  public async allHasPhrases (req: Request, res: Response): Promise<void> {
    const categories: Category[] = await this.m_categoryHandler.allCategoriesWithPhrases();

    res.json({
      categories: categories
    });
  }

  public async getOne (req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    let category: Category = null;

    if (Number.isInteger(id) && id > 0) {
      category = await this.m_categoryHandler.get(id);
    }

    res.json({
      category: category
    });
  }

  public async create (req: Request, res: Response): Promise<void> {
    let category: Category = this.getCategoryFromBody(req.body);
    let error = "";

    if (this.m_categoryHandler.isEntityValid(category, false)) {
      const success = await this.m_categoryHandler.add(category);

      if (!success) {
        category = null;
        error = "Failed to add the category to database.";
      }
    } else {
      category = null;
      error = "Invalid category.";
    }

    res.json({
      category: category,
      error: error
    });
  }

  public async update (req: Request, res: Response): Promise<void> {
    let success = false;
    let error = "";
    const category: Category = this.getCategoryFromBody(req.body);

    if (this.m_categoryHandler.isEntityValid(category, true)) {
      success = await this.m_categoryHandler.update(category);

      if (!success) {
        error = "Failed to update the category in database.";
      }
    } else {
      error = "Invalid category.";
    }

    res.json({
      success: success,
      error: error
    });
  }

  public async remove (req: Request, res: Response): Promise<void> {
    let success = false;
    let error = "";
    const category: Category = this.getCategoryFromBody(req.body);

    if (Number.isInteger(category.id) && category.id > 1) {
      success = await this.m_categoryHandler.remove(category);

      if (!success) {
        error = "Failed to remove the category from database.";
      }
    } else {
      error = "Invalid category.";
    }

    res.json({
      success: success,
      error: error
    });
  }

  /**
   * Parse the request.body and return a new phrase.
   * @param body
   * @return {Category}
   */
  private getCategoryFromBody (body: any): Category {
    const id = typeof body.id !== "undefined" ? parseInt(body.id, 10) : -1;
    const name = body.name || "";

    return new Category(id, name);
  }
}

export var setupCategoryRoutes = function (baseUrl: string, expressApp: Application) {
  const categoryHandler = new CategoryHandler();

  const categoryController = new CategoryController(categoryHandler);

  expressApp.get(baseUrl + "category/get", async (req, res) => {
    categoryController.getAll(req, res);
  });

  expressApp.get(baseUrl + "category/get/:id", async (req, res) => {
    categoryController.getOne(req, res);
  });

  expressApp.post(baseUrl + "category/create", isAuthenticatedApiMiddleware, async (req, res) => {
    categoryController.create(req, res);
  });

  expressApp.post(baseUrl + "category/update", isAuthenticatedApiMiddleware, async (req, res) => {
    categoryController.update(req, res);
  });

  expressApp.post(baseUrl + "category/remove", isAuthenticatedApiMiddleware, async (req, res) => {
    categoryController.remove(req, res);
  });

  expressApp.get(baseUrl + "category/hasphrases", async (req, res) => {
    categoryController.allHasPhrases(req, res);
  });
};
