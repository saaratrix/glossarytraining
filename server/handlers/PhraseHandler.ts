import { query, MySQLResults } from "../database/mysql-connection";
import { BaseHandler } from "./BaseHandler";
import { Phrase } from "../models/Phrase";
import { CategoryHandler } from "./CategoryHandler";
import { Category } from "../models/Category";
import { Request, Response } from "express";

export class PhraseHandler extends BaseHandler<Phrase>{
  private m_categoryHandler: CategoryHandler;

  constructor (categoryHandler: CategoryHandler) {
    super("phrases");

    this.m_categoryHandler = categoryHandler;
  }

  public async all (): Promise<Phrase[]> {
    const sql = `select p.id, p.finnish, p.english, p.note, p.categoryId, c.name as categoryName
                from phrases as p
                join categories as c on c.id = p.categoryId;`;

    const sqlResult: MySQLResults = await query(sql, []);
    const result: Phrase[] = new Array(sqlResult.length);

    // Generate the models from the sql result
    for (let i = 0; i < sqlResult.length; i++) {
      const row = sqlResult[i];
      const category = new Category(row.categoryId, row.categoryName);

      result[i] = new Phrase(row.id, row.finnish, row.english, row.note, category);
    }

    return result;
  }

  public async get (id: number ): Promise<Phrase> {
    const sql = `select p.id, p.finnish, p.english, p.note, p.categoryId, c.name as categoryName
                from phrases as p
                join categories as c on c.id = p.categoryId
                where p.id = ?;`;

    const sqlResult: MySQLResults = await query(sql, [id]);
    let result = null;

    if (sqlResult.length > 0) {
      const row = sqlResult[0];
      const category = new Category(row.categoryId, row.categoryName);
      result = new Phrase(row.id, row.finnish, row.english, row.note, category);
    }

    return result;
  }

  /**
   * Find all phrases for a quiz.
   * @param {number} id The quiz id
   * @return {Promise<Phrase[]>}
   */
  public async findPhrasesForQuiz (id: number): Promise<Phrase[]> {
    const result: Phrase[] = [];

    const sql =  `select p.id, p.finnish, p.english, p.note, c.id as categoryId, c.name as categoryName
                  from quizphrases as qp
                  join phrases as p on qp.phraseId = p.id
                  join categories as c on c.id = p.categoryId
                  where qp.quizId = ?;`;

    const sqlResult = await query(sql, [id]);
    if (!sqlResult.error) {
      for (let i = 0; i < sqlResult.length; i++) {
        const row = sqlResult[i];

        const category: Category = new Category(row.categoryId, row.categoryName);
        result.push(new Phrase(row.id, row.finnish, row.english, row.note, category));
      }
    }

    return result;
  }

  /**
   * Find all phrases for a category
   * @param {number} categoryId
   * @return {Promise<Phrase[]>}
   */
  public async findPhrasesForCategory (categoryId: number): Promise<Phrase[]> {
    const result: Phrase[] = [];
    const sql = `select p.id, p.finnish, p.english, p.note, p.categoryId, c.name as categoryName
                from phrases as p
                join categories as c on c.id = p.categoryId
                where c.id = ?;`;

    const sqlResult = await query(sql, [categoryId]);
    if (sqlResult.length > 0) {
      for (let i = 0; i < sqlResult.length; i++) {
        const row = sqlResult[i];

        const category: Category = new Category(row.categoryId, row.categoryName);
        result.push(new Phrase(row.id, row.finnish, row.english, row.note, category));
      }
    }

    return result;
  }

  public async add (entity: Phrase): Promise<boolean> {
    // First check if category exists
    const category = await this.m_categoryHandler.get(entity.category.id);

    if (!category) {
      return false;
    }

    const sql = `insert into ${this.m_table}(finnish, english, note, categoryId) 
                 values (?, ?, ?, ?);`;

    const sqlResult: MySQLResults = await query(sql, [entity.finnish, entity.english, entity.note, category.id]);
    if (!sqlResult.error) {
      entity.id = sqlResult.insertId;
      return true;
    }

    return false;
  }

  public async update (entity: Phrase): Promise<boolean> {
    // First check if category exists
    const category = await this.m_categoryHandler.get(entity.category.id);

    if (!category) {
      return false;
    }

    const sql = `update ${this.m_table} set finnish = ?, english = ?, note = ?, categoryId = ?
                where id = ?;`;

    const sqlResult: MySQLResults = await query(sql, [entity.finnish, entity.english, entity.note, category.id, entity.id]);

    return (!sqlResult.error && sqlResult.affectedRows > 0);
  }

  public isEntityValid (entity: Phrase, validateId: boolean): boolean {
    if (!entity) {
      return false;
    }

    if (validateId) {
      if (!Number.isInteger(entity.id) || entity.id <= 0) {
        return false;
      }
    }

    if (!entity.finnish || entity.finnish.length === 0) {
      return false;
    }

    if (!entity.english || entity.english.length === 0) {
      return false;
    }

    // Validate category
    if (!this.m_categoryHandler.isEntityValid(entity.category, true)) {
      return false;
    }


    return true;
  }
}
