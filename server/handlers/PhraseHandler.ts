import { query, MySQLResults } from "../database/mysql-connection";
import { BaseHandler } from "./BaseHandler";
import { Phrase } from "../models/Phrase";
import { CategoryHandler } from "./CategoryHandler";
import { Category } from "../models/Category";

export class PhraseHandler extends BaseHandler<Phrase>{
  private m_categoryHandler: CategoryHandler;

  constructor(categoryHandler: CategoryHandler) {
    super("phrases");

    this.m_categoryHandler = categoryHandler;
  }

  /**
   * Find all phrases for a quiz.
   * @param {number} id The quiz id
   * @return {Promise<Phrase[]>}
   */
  public async findPhrasesForQuiz(id: number): Promise<Phrase[]> {
    const result = [];

    const sql =  `select p.id, p.finnish, p.english, c.id as categoryId, c.name as categoryName
                  from quizphrases as qp
                  join phrases as p on qp.phraseId = p.id
                  join categories as c on c.id = p.categoryId
                  where qp.quizId = ?;`;

    const sqlResult = await query(sql, [id]);
    if (!sqlResult.error) {
      for (let i = 0; i < sqlResult.length; ++i) {
        const row = sqlResult[i];

        const category: Category = new Category(row.categoryId, row.categoryName);
        result.push(new Phrase(row.id, row.finnish, row.english, category));
      }
    }


    return result;
  }
}
