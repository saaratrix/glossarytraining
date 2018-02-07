import { QuizHandler } from "../handlers/QuizHandler";
import { PhraseHandler } from "../handlers/PhraseHandler";
import { CategoryHandler } from "../handlers/CategoryHandler";
import { QuizPhrasesHandler } from "../handlers/QuizPhrasesHandler";
import { Quiz, QuizType } from "../models/Quiz";
import { Application, Request, Response } from "express";

export class QuizController {
  private m_categoryHandler: CategoryHandler;
  private m_phraseHandler: PhraseHandler;
  private m_quizHandler: QuizHandler;
  private m_quizPhraseHandler: QuizPhrasesHandler;

  constructor () {
    this.m_categoryHandler = new CategoryHandler();
    this.m_phraseHandler = new PhraseHandler(this.m_categoryHandler);
    this.m_quizHandler = new QuizHandler(this.m_phraseHandler);
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    const quizzes = await this.m_quizHandler.all();

    res.json({
      quizzes: quizzes
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);

    const quiz = await this.m_quizHandler.getWithPhrases(id);

    res.json({
      quiz: quiz
    });
  }

  public async createQuiz(req: Request, res: Response): Promise<void> {
    let quiz = this.getQuizFromBody(req.body);

    let error = "";

    // Validate the quiz
    if (this.m_quizHandler.isEntityValid(quiz, false)) {
      const success = await this.m_quizHandler.add(quiz);

      if (!success) {
        quiz = null;
        error = "Failed add quiz to database.";
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

  public async updateQuiz(req: Request, res: Response): Promise<void> {
    const quiz: Quiz = this.getQuizFromBody(req.body);
    let error = "";
    let success = false;

    if (this.m_quizHandler.isEntityValid(quiz, true)) {
      success = await this.m_quizHandler.update(quiz);

      if (!success) {
        error = "Failed to update quiz in database.";
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

  public async removeQuiz(req: Request, res: Response): Promise<void> {
    const quiz = this.getQuizFromBody(req.body);
    let success = false;
    let error = "";

    if (Number.isInteger(quiz.id) ) {
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

  public async addPhraseToQuiz(req: Request, res: Response): Promise<void> {
    const quizId = parseInt(req.body.quizId, 10);
    const phraseId = parseInt(req.body.phraseId, 10);

    this.m_quizPhraseHandler.addPhraseToQuiz(quizId, phraseId);

    res.json({
      error: "",
      success: false
    });
  }

  private getQuizFromBody(body: any) {
    const id = typeof body.id !== "undefined" ? parseInt(body.id, 10) : -1;
    // TODO: Sanitize?
    const name: string = body.name || "";
    const type: QuizType = parseInt(body.type, 10);

    return new Quiz(id, name, type, []);
  }
}

module.exports = function (baseUrl: string, expressApp: Application) {
  const quizController = new QuizController();

  expressApp.get(baseUrl + "quiz/get", async (req, res) => {
    quizController.getAll(req, res);
  });

  expressApp.get(baseUrl + "quiz/get/:id", async (req, res) => {
    quizController.getOne(req, res);
  });

  expressApp.post(baseUrl + "quiz/create", async (req, res) => {
    quizController.createQuiz(req, res);
  });

  expressApp.post(baseUrl + "quiz/update", async (req, res) => {
    quizController.updateQuiz(req, res);
  });

  expressApp.post(baseUrl + "quiz/remove", async (req, res) => {
    quizController.removeQuiz(req, res);
  });

  expressApp.post(baseUrl + "quiz/addphrase", async(req, res) => {
    quizController.addPhraseToQuiz(req, res);
  });
};
