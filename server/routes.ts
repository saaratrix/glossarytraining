import { setupCategoryRoutes } from "./controllers/CategoryController";
import { setupPhraseRoutes } from "./controllers/PhraseController";
import { setupQuizRoutes } from "./controllers/QuizController";
import { setupVerbRoutes } from "./controllers/VerbController";
import { Application } from "express";

module.exports = function (app: Application) {
  const baseUrl: string = "/api/";

  setupCategoryRoutes(baseUrl, app);
  setupPhraseRoutes(baseUrl, app);
  setupQuizRoutes(baseUrl, app);
  setupVerbRoutes(baseUrl, app);
}
