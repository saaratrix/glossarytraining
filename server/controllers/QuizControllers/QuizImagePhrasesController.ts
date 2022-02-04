import { Application, Request, Response } from 'express';
import { QuizHandler } from '../../handlers/QuizHandler';
import { isAuthenticatedApiMiddleware } from '../../authentication/IsAuthenticated';
import { ImagePhraseHandler } from '../../handlers/ImagePhraseHandler';
import { QuizImagePhrasesHandler } from '../../handlers/QuizImagePhrasesHandler';

export class QuizImagePhrasesController {
  constructor(
    private quizImagePhrasesHandler: QuizImagePhrasesHandler,
  ) { }

  public async addImagePhraseToQuiz (req: Request, res: Response): Promise<void> {
    const quizId = parseInt(req.body.quizId, 10);
    const phraseId = parseInt(req.body.phraseId, 10);

    let error = "";
    let success = false;

    if (Number.isInteger(quizId) && Number.isInteger(phraseId)) {
      success = await this.quizImagePhrasesHandler.addImagePhraseToQuiz(quizId, phraseId);
      if (!success) {
        error = "Failed to add image phrase to database for the quiz.";
      }
    } else {
      error = "Invalid quiz id or imagephrase id.";
    }

    res.json({
      error: error,
      success: success
    });
  }

  public async removeImagePhraseFromQuiz (req: Request, res: Response): Promise<void> {
    const quizId = parseInt(req.body.quizId, 10);
    const phraseId = parseInt(req.body.phraseId, 10);

    let error = "";
    let success = false;

    if (Number.isInteger(quizId) && Number.isInteger(phraseId)) {
      success = await this.quizImagePhrasesHandler.removeImagePhraseFromQuiz(quizId, phraseId);
      if (!success) {
        error = "Failed to remove image phrase in the database from the quiz.";
      }
    } else {
      error = "Invalid quiz id or imagephrase id.";
    }

    res.json({
      error: error,
      success: success
    });
  }
}



export function setupQuizImagePhrasesRoutes(baseUrl: string, expressApp: Application, quizHandler: QuizHandler, imagePhraseHandler: ImagePhraseHandler): void {
  const quizImagePhrasesHandler = new QuizImagePhrasesHandler(quizHandler, imagePhraseHandler);
  const quizImagePhrasesController = new QuizImagePhrasesController(quizImagePhrasesHandler);

  expressApp.post(baseUrl + "quiz/addimagephrase", isAuthenticatedApiMiddleware, async (req, res) => {
    quizImagePhrasesController.addImagePhraseToQuiz(req, res);
  });

  expressApp.post(baseUrl + "quiz/removeimagephrase", isAuthenticatedApiMiddleware, async (req, res) => {
    quizImagePhrasesController.removeImagePhraseFromQuiz(req, res);
  });
}
