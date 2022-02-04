import { QuizHandler } from "../../handlers/QuizHandler";
import { PhraseHandler } from "../../handlers/PhraseHandler";
import { CategoryHandler } from "../../handlers/CategoryHandler";
import { Quiz } from "../../models/Quiz";
import { Application, Request, Response } from "express";

import { isAuthenticatedApiMiddleware } from "../../authentication/IsAuthenticated";
import { ImagePhraseHandler } from '../../handlers/ImagePhraseHandler';
import { setupQuizPhrasesRoutes } from './QuizPhrasesController';
import { setupQuizImagePhrasesRoutes } from './QuizImagePhrasesController';

export class QuizController {
  private m_quizHandler: QuizHandler;

  constructor (quizHandler: QuizHandler) {
    this.m_quizHandler = quizHandler;
  }

  public async getAll (req: Request, res: Response): Promise<void> {
    const quizzes = await this.m_quizHandler.all();

    res.json({
      quizzes: quizzes
    });
  }

  /**
   * Return all quizzes that has at least one phrase.
   * This is so the list user can select a quiz from only has quizzes with phrases!
   */
  public async getAllHasPhrases (req: Request, res: Response): Promise<void> {
    const quizzes = await this.m_quizHandler.allHasPhrasesOrImagePhrases();

    res.json({
      quizzes: quizzes
    });
  }

  public async getOne (req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    let quiz: Quiz = null;
    if (Number.isInteger(id) && id > 0) {
      quiz = await this.m_quizHandler.getWithPhrasesAndImagePhrases(id);
    }

    res.json({
      quiz: quiz
    });
  }

  public async createQuiz (req: Request, res: Response): Promise<void> {
    let quiz = this.getQuizFromBody(req.body);

    let error = "";

    // Validate the quiz
    if (this.m_quizHandler.isEntityValid(quiz, false)) {
      const success = await this.m_quizHandler.add(quiz);

      if (!success) {
        quiz = null;
        error = "Failed to add the quiz to database.";
      }
    } else {
      error = "Invalid data.";
      quiz = null;
    }

    res.json({
      error: error,
      quiz: quiz
    });
  }

  public async updateQuiz (req: Request, res: Response): Promise<void> {
    const quiz: Quiz = this.getQuizFromBody(req.body);
    let error = "";
    let success = false;

    if (this.m_quizHandler.isEntityValid(quiz, true)) {
      success = await this.m_quizHandler.update(quiz);

      if (!success) {
        error = "Failed to update the quiz in database.";
      }
    } else {
      error = "Invalid data.";
    }

    res.json({
      error: error,
      success: success
    });
  }

  public async removeQuiz (req: Request, res: Response): Promise<void> {
    const quiz = this.getQuizFromBody(req.body);
    let success = false;
    let error = "";

    if (Number.isInteger(quiz.id) && quiz.id > 0) {
      success = await this.m_quizHandler.remove(quiz);
      if (!success) {
        error = "Failed to remove quiz from database.";
      }
    } else {
      error = "Invalid quiz id.";
    }

    res.json({
      error: error,
      success: success
    });
  }

  /**
   * Parse the request.body and return a new quiz.
   */
  private getQuizFromBody (body: any): Quiz {
    const id = typeof body.id !== "undefined" ? parseInt(body.id, 10) : -1;
    // TODO: Sanitize?
    const name: string = body.name || "";
    const description: string = body.description || "";

    return new Quiz(id, name, description, [], []);
  }
}

export var setupQuizRoutes = function (baseUrl: string, expressApp: Application) {
  const categoryHandler = new CategoryHandler();
  const phraseHandler = new PhraseHandler(categoryHandler);
  const imagePhraseHandler = new ImagePhraseHandler(categoryHandler);
  const quizHandler = new QuizHandler(phraseHandler, imagePhraseHandler);

  const quizController = new QuizController(quizHandler);

  expressApp.get(baseUrl + "quiz/get", async (req, res) => {
    quizController.getAll(req, res);
  });

  expressApp.get(baseUrl + "quiz/get/:id", async (req, res) => {
    quizController.getOne(req, res);
  });

  expressApp.post(baseUrl + "quiz/create", isAuthenticatedApiMiddleware, async (req, res) => {
    quizController.createQuiz(req, res);
  });

  expressApp.post(baseUrl + "quiz/update", isAuthenticatedApiMiddleware, async (req, res) => {
    quizController.updateQuiz(req, res);
  });

  expressApp.post(baseUrl + "quiz/remove", isAuthenticatedApiMiddleware, async (req, res) => {
    quizController.removeQuiz(req, res);
  });

  expressApp.get(baseUrl + "quiz/hasphrases", async (req, res) => {
    quizController.getAllHasPhrases(req, res);
  });

  setupQuizPhrasesRoutes(baseUrl, expressApp, quizHandler, phraseHandler);
  setupQuizImagePhrasesRoutes(baseUrl, expressApp, quizHandler, imagePhraseHandler);
};
