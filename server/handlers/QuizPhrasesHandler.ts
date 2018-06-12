import { query, MySQLResults } from "../database/mysql-connection";
import { BaseHandler } from "./BaseHandler";
import { Category } from "../models/Category";
import { QuizHandler } from "./QuizHandler";
import { PhraseHandler } from "./PhraseHandler";

export class QuizPhrasesHandler {
  private m_quizHandler: QuizHandler;
  private m_phraseHandler: PhraseHandler;

  constructor (quizHandler: QuizHandler, phraseHandler: PhraseHandler) {
    this.m_quizHandler = quizHandler;
    this.m_phraseHandler = phraseHandler;

  }

  public async addPhraseToQuiz (quizId: number, phraseId: number): Promise<boolean> {
    if (!await this.canAddPhraseToQuiz(quizId, phraseId)) {
      return false;
    }

    const sql = "insert into quizphrases(quizId, phraseId) values(?, ?);";
    const sqlResult: MySQLResults = await query(sql, [quizId, phraseId]);

    return (!sqlResult.error && sqlResult.affectedRows > 0);
  }

  public async canAddPhraseToQuiz (quizId: number, phraseId: number): Promise<boolean> {
    // 1. Check quiz exists
    const quiz = await this.m_quizHandler.get(quizId);
    if (!quiz) {
      return false;
    }
    // 2. Check phrase exists
    const phrase = await this.m_phraseHandler.get(phraseId);

    return phrase !== null;
  }

  public async removePhraseFromQuiz (quizId: number, phraseId: number): Promise<boolean> {
    const sql = "delete from quizphrases where quizId = ? and phraseId = ?";
    const sqlResult: MySQLResults = await query(sql, [quizId, phraseId]);

    return (!sqlResult.error && sqlResult.affectedRows > 0);
  }
}
