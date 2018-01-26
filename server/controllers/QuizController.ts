import { QuizHandler } from "../handlers/QuizHandler";
import { Quiz, QuizType } from "../models/Quiz";
import { Application, Request, Response } from "express";

export class QuizController {
  private m_quizHandler: QuizHandler;

  constructor () {
    this.m_quizHandler = new QuizHandler();
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    const items = await this.m_quizHandler.all();

    res.json({
      quizzes: items
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);

    const item = await this.m_quizHandler.get(id);

    res.json({
      quiz: item
    });
  }

  public async addQuiz(req: Request, res: Response): Promise<void> {
    const name: string = req.body.name || "";
    const type: QuizType = parseInt(req.body.type, 10);

    let error = "";
    let quiz = new Quiz(-1, name, type);
    // Validate the quiz
    if (this.m_quizHandler.isEntityValid(quiz)) {
      const success = await this.m_quizHandler.add(quiz);

      if (!success) {
        quiz = null;
        error = "Failed add to database";
      }
    } else {
      error = "Invalid data";
      quiz = null;
    }

    res.json({
      error: error,
      quiz: quiz
    });
  }

  public async updateQuiz(req: Request, res: Response): Promise<void> {
    res.json({});
  }

  public async removeQuiz(req: Request, res: Response): Promise<void> {
    res.json({});
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

  a_expressApp.post(a_baseUrl + "quiz/add", async (req, res) => {
    quizController.addQuiz(req, res);
  });

  a_expressApp.post(a_baseUrl + "quiz/update", async (req, res) => {
    quizController.updateQuiz(req, res);
  });

  a_expressApp.post(a_baseUrl + "quiz/remove", async (req, res) => {
    quizController.removeQuiz(req, res);
  });
};
