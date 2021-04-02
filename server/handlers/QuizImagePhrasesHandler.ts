import { QuizHandler } from './QuizHandler';
import { ImagePhraseHandler } from './ImagePhraseHandler';
import { MySQLResults, query } from '../database/mysql-connection';

export class QuizImagePhrasesHandler {
  constructor(
    private quizHandler: QuizHandler,
    private imagePhraseHandler: ImagePhraseHandler
  ) {}

  public async addImagePhraseToQuiz (quizId: number, imagephraseId: number): Promise<boolean> {
    if (!await this.canAddImagePhraseToQuiz(quizId, imagephraseId)) {
      return false;
    }

    const sql = "insert into quizimagephrases(quizId, imagephraseId) values(?, ?);";
    const sqlResult: MySQLResults = await query(sql, [quizId, imagephraseId]);

    return (!sqlResult.error && sqlResult.affectedRows > 0);
  }

  public async canAddImagePhraseToQuiz (quizId: number, imagephraseId: number): Promise<boolean> {
    // 1. Check quiz exists
    const quiz = await this.quizHandler.get(quizId);
    if (!quiz) {
      return false;
    }
    // 2. Check phrase exists
    const phrase = await this.imagePhraseHandler.get(imagephraseId);

    return phrase !== null;
  }

  public async removeImagePhraseFromQuiz (quizId: number, imagephraseId: number): Promise<boolean> {
    const sql = "delete from quizimagephrases where quizId = ? and imagephraseId = ?";
    const sqlResult: MySQLResults = await query(sql, [quizId, imagephraseId]);

    return (!sqlResult.error && sqlResult.affectedRows > 0);
  }

}
