import { Application, Request, Response } from 'express';
import isAuthenticatedApiMiddleware from '../authentication/IsAuthenticated';
import { InflectionCategoryHandler } from '../handlers/InflectionCategoryHandler';
import { InflectionCategory } from '../models/InflectionCategory';

export class InflectionCategoryController {

  constructor(
    private inflectionCategoryHandler: InflectionCategoryHandler,
  ) { }

  async getAll(req: Request, res: Response): Promise<void> {
    const inflectionCategories: InflectionCategory[] = await this.inflectionCategoryHandler.all();

    res.json({
      inflectionCategories,
    });
  }

  async allWithInflections(req: Request, res: Response): Promise<void> {
    const inflectionCategories: InflectionCategory[] = await this.inflectionCategoryHandler.allCategoriesWithInflections();

    res.json({
      inflectionCategories,
    });
  }

  async getOne(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    let inflectionCategory: InflectionCategory | null = null;

    if (Number.isInteger(id) && id > 0) {
      inflectionCategory = await this.inflectionCategoryHandler.get(id);
    }

    res.json({
      inflectionCategory,
    });
  }

  async create(req: Request, res: Response): Promise<void> {
    let inflectionCategory: InflectionCategory = this.getInflectionCategoryFromBody(req.body);
    let error = "";

    if (this.inflectionCategoryHandler.isEntityValid(inflectionCategory, false)) {
      const success = await this.inflectionCategoryHandler.add(inflectionCategory);

      if (!success) {
        inflectionCategory = null;
        error = "Failed to add the inflection category to database.";
      }
    }
    else {
      inflectionCategory = null;
      error = "Invalid inflection category.";
    }

    res.json({
      inflectionCategory,
      error,
    });
  }

  async update(req: Request, res: Response): Promise<void> {
    let success = false;
    let error = "";
    const inflectionCategory: InflectionCategory = this.getInflectionCategoryFromBody(req.body);

    if (this.inflectionCategoryHandler.isEntityValid(inflectionCategory, true)) {
      success = await this.inflectionCategoryHandler.update(inflectionCategory);

      if (!success) {
        error = "Failed to update the inflection category in database.";
      }
    }
    else {
      error = "Invalid inflection category.";
    }

    res.json({
      success,
      error,
    });
  }

  async remove(req: Request, res: Response): Promise<void> {
    let success = false;
    let error = "";
    const inflectionCategory: InflectionCategory = this.getInflectionCategoryFromBody(req.body);

    if (Number.isInteger(inflectionCategory.id) && inflectionCategory.id > 1) {
      success = await this.inflectionCategoryHandler.remove(inflectionCategory);

      if (!success) {
        error = "Failed to remove the inflection category from database.";
      }
    }
    else {
      error = "Invalid inflection category.";
    }

    res.json({
      success,
      error
    });
  }

  /**
   * Parse the request.body and return a new phrase.
   * @return {InflectionCategory}
   */
  private getInflectionCategoryFromBody (body: any): InflectionCategory {
    const id = typeof body.id !== "undefined" ? parseInt(body.id, 10) : -1;
    const name = body.name || "";
    const description = body.description || "";

    return new InflectionCategory(id, name, description);
  }
}

export var setupInflectionCategoryRoutes = function (baseUrl: string, expressApp: Application) {
  const inflectionCategoryHandler = new InflectionCategoryHandler();
  const inflectionCategoryController = new InflectionCategoryController(inflectionCategoryHandler);

  expressApp.get(baseUrl + 'inflection-category/get', async (req, res) => {
    await inflectionCategoryController.getAll(req, res);
  });

  expressApp.get(baseUrl + 'inflection-category/get/:id', async (req, res) => {
    await inflectionCategoryController.getOne(req, res);
  });

  expressApp.post(baseUrl + "inflection-category/create", isAuthenticatedApiMiddleware, async (req, res) => {
    await inflectionCategoryController.create(req, res);
  });

  expressApp.post(baseUrl + "inflection-category/update", isAuthenticatedApiMiddleware, async (req, res) => {
    await inflectionCategoryController.update(req, res);
  });

  expressApp.post(baseUrl + "inflection-category/remove", isAuthenticatedApiMiddleware, async (req, res) => {
    await inflectionCategoryController.remove(req, res);
  });

  expressApp.get(baseUrl + "inflection-category/with-inflections", async (req, res) => {
    await inflectionCategoryController.allWithInflections(req, res);
  })
}
