import { setupCategoryRoutes } from "./controllers/CategoryController";
import { setupPhraseRoutes } from "./controllers/PhraseController";
import { setupImagePhraseRoutes } from './controllers/ImagePhraseController';
import { setupQuizRoutes } from "./controllers/QuizControllers/QuizController";
import { setupVerbRoutes } from "./controllers/VerbController";
import { Application } from "express";
import { setupInflectionCategoryRoutes } from './controllers/InflectionCategoryController';

module.exports = function (app: Application) {
  const baseUrl: string = "/api/";

  setupCategoryRoutes(baseUrl, app);
  setupPhraseRoutes(baseUrl, app);
  setupImagePhraseRoutes(baseUrl, app);
  setupQuizRoutes(baseUrl, app);
  setupVerbRoutes(baseUrl, app);
  setupInflectionCategoryRoutes(baseUrl, app);
}
