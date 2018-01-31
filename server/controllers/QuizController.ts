import { QuizHandler } from "../handlers/QuizHandler";
import { Quiz, QuizType } from "../models/Quiz";
import { Application, Request, Response } from "express";

export class QuizController {
  private m_quizHandler: QuizHandler;

  constructor () {
    this.m_quizHandler = new QuizHandler();
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    const quizzes = await this.m_quizHandler.all();

    res.json({
      quizzes: quizzes
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);

    const quiz = await this.m_quizHandler.get(id);

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

  private getQuizFromBody( a_body: any ) {
    const id = typeof a_body.id !== "undefined" ? parseInt(a_body.id, 10) : -1;
    // TODO: Sanitize?
    const name: string = a_body.name || "";
    const type: QuizType = parseInt(a_body.type, 10);

    return new Quiz(id, name, type);
  }
}

module.exports = function (a_baseUrl: string, a_expressApp: Application) {
  const quizController = new QuizController();

  a_expressApp.get(a_baseUrl + "quiz/get", async (req, res) => {
    quizController.getAll(req, res);
  });

  a_expressApp.get(a_baseUrl + "quiz/get/:id", async (req, res) => {
    quizController.getOne(req, res);
  });

  a_expressApp.post(a_baseUrl + "quiz/create", async (req, res) => {
    quizController.createQuiz(req, res);
  });

  a_expressApp.post(a_baseUrl + "quiz/update", async (req, res) => {
    quizController.updateQuiz(req, res);
  });

  a_expressApp.post(a_baseUrl + "quiz/remove", async (req, res) => {
    quizController.removeQuiz(req, res);
  });
};
