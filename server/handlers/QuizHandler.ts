import { query, MySQLResults } from "../database/mysql-connection";
import { BaseHandler } from "./BaseHandler";
import { Quiz } from "../models/Quiz";
import { PhraseHandler } from "./PhraseHandler";
import { ImagePhraseHandler } from './ImagePhraseHandler';

export class QuizHandler extends BaseHandler<Quiz>{
  private m_phraseHandler: PhraseHandler;

  constructor (
    phraseHandler: PhraseHandler,
    private imagePhraseHandler: ImagePhraseHandler,
  ) {
    super("quizzes", " order by name");

    this.m_phraseHandler = phraseHandler;

  }

  /**
   * Returns only quizzes that has an entry in the quizphrases or quizimages table.
   * Meaning they have at least 1 phrase attached!
   * @return {Promise<Quiz[]>}
   */
  public async allHasPhrasesOrImagePhrases (): Promise<Quiz[]> {
    let result: Quiz[] = [];
    const sql = `select distinct q.id, q.name, q.description
                  from quizzes as q
                  join quizphrases as qp on qp.quizId = q.id
                 union
                 select distinct q.id, q.name, q.description
                  from quizzes as q
                    join quizimagephrases as qip on qip.quizId = q.id
                    order by name;`;

    const sqlResult: MySQLResults = await query(sql, []);

    if (sqlResult.length > 0) {
      result = sqlResult as Quiz[];
    }

    return result;
  }

  /**
   * Get a quiz with the phrases and image phrases.
   * @param {number} id
   * @return {Promise<Quiz>}
   */
  public async getWithPhrasesAndImagePhrases (id: number): Promise<Quiz> {
    const quiz = await this.get(id);

    if (quiz ) {
      quiz.phrases = await this.m_phraseHandler.findPhrasesForQuiz(quiz.id);
      quiz.imagePhrases = await this.imagePhraseHandler.findImagePhrasesForQuiz(quiz.id);
    }

    return quiz;
  }

  public async add (entity: Quiz): Promise<boolean> {
    const sql = `insert into quizzes(name, description)
                 values (?, ?);`;

    const sqlResult: MySQLResults = await query(sql, [entity.name, entity.description]);
    if (!sqlResult.error) {
      entity.id = sqlResult.insertId;
      return true;
    }

    return false;
  }

  public async update (entity: Quiz): Promise<boolean> {
    const sql = `update quizzes set name = ?, description = ?
                where id = ?;`;

    const sqlResult: MySQLResults = await query(sql, [entity.name, entity.description, entity.id]);

    return (!sqlResult.error && sqlResult.affectedRows > 0);
  }

  public isEntityValid (entity: Quiz, validateId: boolean): boolean {
    if (!entity) {
      return false;
    }

    if (validateId) {
      if (!Number.isInteger(entity.id) || entity.id <= 0) {
        return false;
      }
    }

    if (!entity.name || entity.name.length === 0) {
      return false;
    }

    if (!entity.description || entity.description.length === 0) {
      return false;
    }

    return true;
  }
}
