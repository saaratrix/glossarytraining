import { Application, Request, Response } from 'express';
import { isAuthenticatedApiMiddleware } from '../../authentication/IsAuthenticated';
import { QuizPhrasesHandler } from '../../handlers/QuizPhrasesHandler';
import { QuizHandler } from '../../handlers/QuizHandler';
import { PhraseHandler } from '../../handlers/PhraseHandler';

export class QuizPhrasesController {
  constructor(
    private quizPhrasesHandler: QuizPhrasesHandler,
  ) { }

  public async addPhraseToQuiz (req: Request, res: Response): Promise<void> {
    const quizId = parseInt(req.body.quizId, 10);
    const phraseId = parseInt(req.body.phraseId, 10);

    let error = "";
    let success = false;

    if (Number.isInteger(quizId) && Number.isInteger(phraseId)) {
      success = await this.quizPhrasesHandler.addPhraseToQuiz(quizId, phraseId);
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
      success = await this.quizPhrasesHandler.removePhraseFromQuiz(quizId, phraseId);
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
}

export function setupQuizPhrasesRoutes(baseUrl: string, expressApp: Application, quizHandler: QuizHandler, phraseHandler: PhraseHandler): void {
  const quizPhrasesHandler = new QuizPhrasesHandler(quizHandler, phraseHandler);
  const quizPhrasesController = new QuizPhrasesController(quizPhrasesHandler);

  expressApp.post(baseUrl + "quiz/addphrase", isAuthenticatedApiMiddleware, async (req, res) => {
    quizPhrasesController.addPhraseToQuiz(req, res);
  });

  expressApp.post(baseUrl + "quiz/removephrase", isAuthenticatedApiMiddleware, async (req, res) => {
    quizPhrasesController.removePhraseFromQuiz(req, res);
  });
}
