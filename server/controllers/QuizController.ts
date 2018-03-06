import { QuizHandler } from "../handlers/QuizHandler";
import { PhraseHandler } from "../handlers/PhraseHandler";
import { CategoryHandler } from "../handlers/CategoryHandler";
import { QuizPhrasesHandler } from "../handlers/QuizPhrasesHandler";
import { Quiz } from "../models/Quiz";
import { Application, Request, Response } from "express";

import { isAuthenticatedApiMiddleware } from "../authentication/IsAuthenticated";

export class QuizController {
  private m_quizHandler: QuizHandler;
  private m_quizPhraseHandler: QuizPhrasesHandler;

  constructor (quizHandler: QuizHandler, quizPhraseHandler: QuizPhrasesHandler) {
    this.m_quizHandler = quizHandler;
    this.m_quizPhraseHandler = quizPhraseHandler;
  }

  public async getAll (req: Request, res: Response): Promise<void> {
    const quizzes = await this.m_quizHandler.all();

    res.json({
      quizzes: quizzes
    });
  }

  public async getAllHasPhrases (req: Request, res: Response): Promise<void> {
    const quizzes = await this.m_quizHandler.allHasPhrases();

    res.json({
      quizzes: quizzes
    });
  }

  public async getOne (req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    let quiz: Quiz = null;
    if (Number.isInteger(id) && id > 0) {
      quiz = await this.m_quizHandler.getWithPhrases(id);
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
    }
    else {
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
    }
    else {
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
    }
    else {
      error = "Invalid quiz id.";
    }

    res.json({
      error: error,
      success: success
    });
  }

  public async addPhraseToQuiz (req: Request, res: Response): Promise<void> {
    const quizId = parseInt(req.body.quizId, 10);
    const phraseId = parseInt(req.body.phraseId, 10);

    let error = "";
    let success = false;

    if (Number.isInteger(quizId) && Number.isInteger(phraseId)) {
      success = await this.m_quizPhraseHandler.addPhraseToQuiz(quizId, phraseId);
      if (!success) {
        error = "Failed to add phrase to database for the quiz.";
      }
    }
    else {
      error = "Invalid quiz id or phrase id.";
    }

    res.json({
      error: error,
      success: success
    });
  }

  public async removePhraseFromQuiz (req: Request, res: Response): Promise<void> {
    const quizId = parseInt(req.body.quizId, 10);
    const phraseId = parseInt(req.body.phraseId, 10);

    let error = "";
    let success = false;

    if (Number.isInteger(quizId) && Number.isInteger(phraseId)) {
      success = await this.m_quizPhraseHandler.removePhraseFromQuiz(quizId, phraseId);
      if (!success) {
        error = "Failed to remove phrase in the database from the quiz.";
      }
    }
    else {
      error = "Invalid quiz id or phrase id.";
    }

    res.json({
      error: error,
      success: success
    });
  }

  /**
   * Parse the request.body and return a new quiz.
   * @param body
   * @return {Quiz}
   */
  private getQuizFromBody (body: any): Quiz {
    const id = typeof body.id !== "undefined" ? parseInt(body.id, 10) : -1;
    // TODO: Sanitize?
    const name: string = body.name || "";
    const description: string = body.description || "";

    return new Quiz(id, name, description, []);
  }
}

export var setupQuizRoutes = function (baseUrl: string, expressApp: Application) {
  const categoryHandler = new CategoryHandler();
  const phraseHandler = new PhraseHandler(categoryHandler);
  const quizHandler = new QuizHandler(phraseHandler);
  const quizPhrasesHandler = new QuizPhrasesHandler(quizHandler, phraseHandler);

  const quizController = new QuizController(quizHandler, quizPhrasesHandler);

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

  expressApp.post(baseUrl + "quiz/addphrase", isAuthenticatedApiMiddleware, async (req, res) => {
    quizController.addPhraseToQuiz(req, res);
  });

  expressApp.post(baseUrl + "quiz/removephrase", isAuthenticatedApiMiddleware, async (req, res) => {
    quizController.removePhraseFromQuiz(req, res);
  });
};
