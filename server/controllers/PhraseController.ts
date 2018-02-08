import { Application, Request, Response } from "express";
import { CategoryHandler } from "../handlers/CategoryHandler";
import { PhraseHandler } from "../handlers/PhraseHandler";
import { Phrase } from "../models/Phrase";

export class PhraseController {
  private m_phraseHandler: PhraseHandler;

  constructor(phraseHandler: PhraseHandler) {
    this.m_phraseHandler = phraseHandler;
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    const phrases: Phrase[] = await this.m_phraseHandler.all();

    res.json({
      phrases: phrases
    });
  }
}

module.exports = function (baseUrl: string, expressApp: Application) {
  const categoryHandler = new CategoryHandler();
  const phraseHandler = new PhraseHandler(categoryHandler);

  const phraseController = new PhraseController(phraseHandler);

  expressApp.get(baseUrl + "phrase/get", async (req, res) => {
    phraseController.getAll(req, res);
  });
}
