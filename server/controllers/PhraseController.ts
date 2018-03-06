import { Application, Request, Response } from "express";
import { CategoryHandler } from "../handlers/CategoryHandler";
import { PhraseHandler } from "../handlers/PhraseHandler";
import { Phrase } from "../models/Phrase";
import { Category } from "../models/Category";

import { isAuthenticatedApiMiddleware } from "../authentication/IsAuthenticated";

export class PhraseController {
  private m_phraseHandler: PhraseHandler;

  constructor(phraseHandler: PhraseHandler) {
    this.m_phraseHandler = phraseHandler;
  }

  public async getAll (req: Request, res: Response): Promise<void> {
    const phrases: Phrase[] = await this.m_phraseHandler.all();

    res.json({
      phrases: phrases
    });
  }

  public async getOne (req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);

    let phrase: Phrase = null;

    if (Number.isInteger(id) && id > 0) {
      phrase = await this.m_phraseHandler.get(id);
    }

    res.json({
      phrase: phrase
    });
  }

  public async createPhrase (req: Request, res: Response): Promise<void> {
    let phrase: Phrase = this.getPhraseFromBody(req.body);
    let error = "";

    if (this.m_phraseHandler.isEntityValid(phrase, false)) {
      const success = await this.m_phraseHandler.add(phrase);
      if (!success) {
        phrase = null;
        error = "Failed to add the phrase to database.";
      }
    }
    else {
      phrase = null;
      error = "Invalid phrase.";
    }

    res.json({
      phrase: phrase,
      error: error
    });
  }

  public async updatePhrase (req: Request, res: Response): Promise<void> {
    let success = false;
    let error = "";

    const phrase = this.getPhraseFromBody(req.body);

    if (this.m_phraseHandler.isEntityValid(phrase, true)) {

      success = await this.m_phraseHandler.update(phrase);
      if (!success) {
        error = "Failed to update the phrase in database.";
      }
    }
    else {
      error = "Invalid phrase.";
    }

    res.json({
      success: success,
      error: error
    });
  }

  public async removePhrase (req: Request, res: Response): Promise<void> {
    const phrase = this.getPhraseFromBody(req.body);
    let success = false;
    let error = "";

    if (Number.isInteger(phrase.id) && phrase.id > 0) {
      success = await this.m_phraseHandler.remove(phrase);

      if (!success) {
        error = "Failed to remove the phrase from database.";
      }
    }
    else {
      error = "Invalid phrase.";
    }

    res.json({
      success: success,
      error: error
    });
  }

  public async getPhrasesForCategory (req: Request, res: Response): Promise<void> {
    let phrases: Phrase[] = [];

    const categoryId = parseInt(req.params.id, 10);
    if (Number.isInteger(categoryId) && categoryId > 0) {
      phrases = await this.m_phraseHandler.findPhrasesForCategory(categoryId);
    }

    res.json({
      phrases: phrases
    });
  }

  /**
   * Parse the request.body and return a new phrase.
   * @param body
   * @return {Phrase}
   */
  private getPhraseFromBody (body: any): Phrase {
    const id = typeof body.id !== "undefined" ? parseInt(body.id, 10) : -1;
    // TODO: Sanitize?
    const finnish: string = body.finnish || "";
    const english: string = body.english || "";
    const note: string = body.note || "";

    const categoryId = typeof body.categoryId !== "undefined" ? parseInt(body.categoryId, 10) : -1;
    const categoryName = body.categoryName || "";

    return new Phrase(id, finnish, english, note, new Category(categoryId, categoryName));
  }
}

export var setupPhraseRoutes = function (baseUrl: string, expressApp: Application) {
  const categoryHandler = new CategoryHandler();
  const phraseHandler = new PhraseHandler(categoryHandler);

  const phraseController = new PhraseController(phraseHandler);

  expressApp.get(baseUrl + "phrase/get", async (req, res) => {
    phraseController.getAll(req, res);
  });

  expressApp.get(baseUrl + "phrase/get/:id", async (req, res) => {
    phraseController.getOne(req, res);
  });

  expressApp.post(baseUrl + "phrase/create", isAuthenticatedApiMiddleware, async (req, res) => {
    phraseController.createPhrase(req, res);
  });

  expressApp.post(baseUrl + "phrase/update", isAuthenticatedApiMiddleware, async (req, res) => {
    phraseController.updatePhrase(req, res);
  });

  expressApp.post(baseUrl + "phrase/remove", isAuthenticatedApiMiddleware, async (req, res) => {
    phraseController.removePhrase(req, res);
  });

  expressApp.get(baseUrl + "phrase/category/:id", async (req, res) => {
    phraseController.getPhrasesForCategory(req, res);
  });
};
