import { isAuthenticatedApiMiddleware } from "../authentication/IsAuthenticated";
import { ImagePhraseHandler } from '../handlers/ImagePhraseHandler';
import { Application, Request, Response } from 'express';
import { CategoryHandler } from '../handlers/CategoryHandler';
import { Category } from '../models/Category';
import { ImagePhrase } from '../models/ImagePhrase';

export class ImagePhraseController {

  constructor(
    private imagePhraseHandler: ImagePhraseHandler
  ) { }

  public async getAll (req: Request, res: Response): Promise<void> {
    const imagePhrases: ImagePhrase[] = await this.imagePhraseHandler.all();

    res.json({
      imagePhrases,
    });
  }

  public async getOne (req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);

    let imagePhrases: ImagePhrase | null = null;

    if (Number.isInteger(id) && id > 0) {
      imagePhrases = await this.imagePhraseHandler.get(id);
    }

    res.json({
      imagePhrases,
    });
  }

  public async createImagePhrase (req: Request, res: Response): Promise<void> {
    let imagePhrase: ImagePhrase = this.getImagePhraseFromBody(req.body);
    let error = "";

    if (this.imagePhraseHandler.isEntityValid(imagePhrase, false)) {
      const success = await this.imagePhraseHandler.add(imagePhrase);
      if (!success) {
        imagePhrase = null;
        error = "Failed to add the image phrase to database.";
      }
    }
    else {
      imagePhrase = null;
      error = "Invalid image phrase.";
    }

    res.json({
      imagePhrase: imagePhrase,
      error: error
    });
  }

  public async updateImagePhrase (req: Request, res: Response): Promise<void> {
    let success = false;
    let error = "";

    const imagePhrase = this.getImagePhraseFromBody(req.body);

    if (this.imagePhraseHandler.isEntityValid(imagePhrase, true)) {

      success = await this.imagePhraseHandler.update(imagePhrase);
      if (!success) {
        error = "Failed to update the image phrase in database.";
      }
    }
    else {
      error = "Invalid image phrase.";
    }

    res.json({
      success: success,
      error: error
    });
  }

  public async removeImagePhrase (req: Request, res: Response): Promise<void> {
    const imagePhrase = this.getImagePhraseFromBody(req.body);
    let success = false;
    let error = "";

    if (Number.isInteger(imagePhrase.id) && imagePhrase.id > 0) {
      success = await this.imagePhraseHandler.remove(imagePhrase);

      if (!success) {
        error = "Failed to remove the image phrase from database.";
      }
    }
    else {
      error = "Invalid image phrase.";
    }

    res.json({
      success: success,
      error: error
    });
  }

  public async getImagePhrasesForCategory (req: Request, res: Response): Promise<void> {
    let imagePhrases: ImagePhrase[] = [];

    const categoryId = parseInt(req.params.id, 10);
    if (Number.isInteger(categoryId) && categoryId > 0) {
      imagePhrases = await this.imagePhraseHandler.findImagePhrasesForCategory(categoryId);
    }

    res.json({
      imagePhrases: imagePhrases
    });
  }

  /**
   * Parse the request.body and return a new phrase.
   * @param body
   * @return {Phrase}
   */
  private getImagePhraseFromBody (body: any): ImagePhrase {
    const id = typeof body.id !== "undefined" ? parseInt(body.id, 10) : -1;
    // TODO: Sanitize?
    const finnish: string = body.finnish || "";
    const imageBase64: string = body.imageBase64 || "";
    const note: string = body.note || "";

    if (body.category) {
      body.categoryId = body.category.id;
      body.categoryName = body.category.name;
    }

    const categoryId = typeof body.categoryId !== "undefined" ? parseInt(body.categoryId, 10) : -1;
    const categoryName = body.categoryName || "";

    return new ImagePhrase(id, imageBase64, finnish, note, new Category(categoryId, categoryName));
  }
}

export var setupImagePhraseRoutes = function (baseUrl: string, expressApp: Application) {
  const categoryHandler = new CategoryHandler();
  const imagePhraseHandler = new ImagePhraseHandler(categoryHandler);

  const imagePhraseController = new ImagePhraseController(imagePhraseHandler);

  expressApp.get(baseUrl + "imagephrase/get", async (req, res) => {
    imagePhraseController.getAll(req, res);
  });

  expressApp.get(baseUrl + "imagephrase/get/:id", async (req, res) => {
    imagePhraseController.getOne(req, res);
  });

  expressApp.post(baseUrl + "imagephrase/create", isAuthenticatedApiMiddleware, (req, res) => {
    imagePhraseController.createImagePhrase(req, res);
  });

  expressApp.post(baseUrl + "imagephrase/update", isAuthenticatedApiMiddleware, (req, res) => {
    imagePhraseController.updateImagePhrase(req, res);
  });

  expressApp.post(baseUrl + "imagephrase/remove", isAuthenticatedApiMiddleware, (req, res) => {
    imagePhraseController.removeImagePhrase(req, res);
  });

  expressApp.get(baseUrl + "imagephrase/category/:id", async (req, res) => {
    imagePhraseController.getImagePhrasesForCategory(req, res);
  });
};
