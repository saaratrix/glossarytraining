import { Application, Request, Response } from 'express';
import isAuthenticatedApiMiddleware from '../authentication/IsAuthenticated';
import { InflectionHandler } from '../handlers/InflectionHandler';
import { InflectionCategoryHandler } from '../handlers/InflectionCategoryHandler';
import { CategoryHandler } from '../handlers/CategoryHandler';
import { PhraseHandler } from '../handlers/PhraseHandler';
import { InflectionCategory } from '../models/InflectionCategory';
import { Inflection } from '../models/Inflection';
import { Phrase } from '../models/Phrase';
import { Category } from '../models/Category';

export class InflectionController {
  constructor(
    private inflectionHandler: InflectionHandler,
  ) {}

  async getAll(req: Request, res: Response) {
    const inflections: Inflection[] = await this.inflectionHandler.all();

    res.json({
      inflections,
    });
  }

  async getOne(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    let inflection: Inflection | null = null;

    if (Number.isInteger(id) && id > 0) {
      inflection = await this.inflectionHandler.get(id);
    }

    res.json({
      inflection,
    });
  }

  async create(req: Request, res: Response) {
    let inflection: Inflection = this.getInflectionFromBody(req.body);
    let error = "";

    if (this.inflectionHandler.isEntityValid(inflection, false)) {
      const success = await this.inflectionHandler.add(inflection);

      if (!success) {
        inflection = null;
        error = "Failed to add the inflection category to database.";
      }
    } else {
      inflection = null;
      error = "Invalid inflection category.";
    }

    res.json({
      inflection,
      error,
    });
  }

  async update(req: Request, res: Response) {
    let success = false;
    let error = "";
    const inflection: Inflection = this.getInflectionFromBody(req.body);

    if (this.inflectionHandler.isEntityValid(inflection, true)) {
      success = await this.inflectionHandler.update(inflection);

      if (!success) {
        error = "Failed to update the inflection in database.";
      }
    } else {
      error = "Invalid inflection.";
    }

    res.json({
      success,
      error
    });
  }

  async remove(req: Request, res: Response) {
    let success = false;
    let error = "";
    const inflection: Inflection = this.getInflectionFromBody(req.body);

    if (Number.isInteger(inflection.id) && inflection.id > 1) {
      success = await this.inflectionHandler.remove(inflection);

      if (!success) {
        error = "Failed to remove the inflection from database.";
      }
    }
    else {
      error = "Invalid inflection.";
    }

    res.json({
      success,
      error
    });
  }

  async findInflectionsForCategory(req: Request, res: Response) {
    let inflections: Inflection[] = [];

    const inflectionCategoryId = parseInt(req.params.id, 10);
    if (Number.isInteger(inflectionCategoryId) && inflectionCategoryId > 0) {
      inflections = await this.inflectionHandler.findInflectionsForCategory(inflectionCategoryId);
    }

    res.json({
      inflections,
    });
  }

  /**
   * Parse the request.body and return a new phrase.
   * @return {InflectionCategory}
   */
  private getInflectionFromBody (body: any): Inflection {
    const id = typeof body.id !== "undefined" ? parseInt(body.id, 10) : -1;
    const inflection = body.inflection ?? "";
    const note = body.note ?? "";

    const inflectionCategoryId = body.inflectionCategory?.id ? parseInt(body.inflectionCategory.id, 10) : -1;
    const inflectionCategoryName = body.inflectionCategory?.name || "";
    const inflectionCategoryDescription = body.inflectionCategory?.description || "";

    const phraseId = typeof body.phrase?.id !== "undefined" ? parseInt(body.phrase.id, 10) : -1;
    const finnish = body.phrase?.finnish ?? "";
    const english = body.phrase?.english ?? "";
    const phraseNote = body.phrase?.note ?? "";

    const categoryId = typeof body.phrase?.category?.id !== "undefined" ? parseInt(body.phrase.category.id, 10) : -1;
    const categoryName = body.phrase?.category?.name ?? '';

    const category = new Category(categoryId, categoryName);
    const phrase = new Phrase(phraseId, finnish, english, phraseNote, category);
    const inflectionCategory = new InflectionCategory(inflectionCategoryId, inflectionCategoryName, inflectionCategoryDescription);

    return new Inflection(id, inflection, note, phrase, inflectionCategory);
  }
}

export var setupInflectionRoutes = function (baseUrl: string, expressApp: Application) {
  const categoryHandler = new CategoryHandler();
  const phraseHandler = new PhraseHandler(categoryHandler);
  const inflectionCategoryHandler = new InflectionCategoryHandler();
  const inflectionHandler = new InflectionHandler(inflectionCategoryHandler, phraseHandler);

  const inflectionController = new InflectionController(inflectionHandler);

  expressApp.get(baseUrl + 'inflection/get', async (req, res) => {
    await inflectionController.getAll(req, res);
  });

  expressApp.get(baseUrl + 'inflection/get/:id', async (req, res) => {
    await inflectionController.getOne(req, res);
  });

  expressApp.post(baseUrl + "inflection/create", isAuthenticatedApiMiddleware, async (req, res) => {
    await inflectionController.create(req, res);
  });

  expressApp.post(baseUrl + "inflection/update", isAuthenticatedApiMiddleware, async (req, res) => {
    await inflectionController.update(req, res);
  });

  expressApp.post(baseUrl + "inflection/remove", isAuthenticatedApiMiddleware, async (req, res) => {
    await inflectionController.remove(req, res);
  });

  expressApp.get(baseUrl + "inflection/inflection-category/:id", async (req, res) => {
    await inflectionController.findInflectionsForCategory(req, res);
  })
}
