import { BaseHandler } from './BaseHandler';
import { CategoryHandler } from './CategoryHandler';
import { MySQLResults, query } from '../database/mysql-connection';
import { Category } from '../models/Category';
import { ImagePhrase } from '../models/ImagePhrase';

export class ImagePhraseHandler extends BaseHandler<ImagePhrase> {
  private m_categoryHandler: CategoryHandler;

  constructor (categoryHandler: CategoryHandler) {
    super("imagephrases", "");

    this.m_categoryHandler = categoryHandler;
  }

  public async all (): Promise<ImagePhrase[]> {
    const sql = `select p.id, p.imageBase64, p.finnish, p.note, p.categoryId, c.name as categoryName
                from imagephrases as p
                join categories as c on c.id = p.categoryId
                order by c.name, p.finnish;`;

    const sqlResult: MySQLResults = await query(sql, []);
    const result: ImagePhrase[] = new Array(sqlResult.length);

    // Generate the models from the sql result
    for (let i = 0; i < sqlResult.length; i++) {
      const row = sqlResult[i];
      const category = new Category(row.categoryId, row.categoryName);

      result[i] = new ImagePhrase(row.id, row.imageBase64, row.finnish, row.note, category);
    }

    return result;
  }

  public async get (id: number ): Promise<ImagePhrase | null> {
    const sql = `select p.id, p.imageBase64, p.finnish, p.note, p.categoryId, c.name as categoryName
                from imagephrases as p
                join categories as c on c.id = p.categoryId
                where p.id = ?;`;

    const sqlResult: MySQLResults = await query(sql, [id]);
    let result = null;

    if (sqlResult.length > 0) {
      const row = sqlResult[0];
      const category = new Category(row.categoryId, row.categoryName);
      result = new ImagePhrase(row.id, row.imageBase64, row.finnish, row.note, category);
    }

    return result;
  }

  /**
   * Find all image phrases for a quiz.
   * @param {number} id The quiz id
   * @return {Promise<ImagePhrase[]>}
   */
  public async findImagePhrasesForQuiz (id: number): Promise<ImagePhrase[]> {
    const result: ImagePhrase[] = [];

    const sql =  `select p.id, p.imageBase64, p.finnish, p.note, c.id as categoryId, c.name as categoryName
                  from quizimagephrases as qp
                  join imagephrases as p on qp.imagephraseId = p.id
                  join categories as c on c.id = p.categoryId
                  where qp.quizId = ?
                  order by c.name, p.finnish;`;

    const sqlResult = await query(sql, [id]);
    if (!sqlResult.error) {
      for (let i = 0; i < sqlResult.length; i++) {
        const row = sqlResult[i];

        const category: Category = new Category(row.categoryId, row.categoryName);
        result.push(new ImagePhrase(row.id, row.imageBase64, row.finnish, row.note, category));
      }
    }

    return result;
  }

  /**
   * Find all image phrases for a category
   * @param {number} categoryId
   * @return {Promise<ImagePhrase[]>}
   */
  public async findImagePhrasesForCategory (categoryId: number): Promise<ImagePhrase[]> {
    const result: ImagePhrase[] = [];
    const sql = `select p.id, p.imageBase64, p.finnish, p.note, p.categoryId, c.name as categoryName
                from imagephrases as p
                join categories as c on c.id = p.categoryId
                where c.id = ?
                order by p.finnish;`;

    const sqlResult = await query(sql, [categoryId]);
    if (sqlResult.length > 0) {
      for (let i = 0; i < sqlResult.length; i++) {
        const row = sqlResult[i];

        const category: Category = new Category(row.categoryId, row.categoryName);
        result.push(new ImagePhrase(row.id, row.imageBase64, row.finnish, row.note, category));
      }
    }

    return result;
  }

  public async add (entity: ImagePhrase): Promise<boolean> {
    // First check if category exists
    const category = await this.m_categoryHandler.get(entity.category.id);

    if (!category) {
      return false;
    }

    const sql = `insert into imagephrases(imageBase64, finnish, note, categoryId)
                 values (?, ?, ?, ?);`;

    const sqlResult: MySQLResults = await query(sql, [entity.imageBase64, entity.finnish, entity.note, category.id]);
    if (!sqlResult.error) {
      entity.id = sqlResult.insertId;
      return true;
    }

    return false;
  }

  public async update (entity: ImagePhrase): Promise<boolean> {
    // First check if category exists
    const category = await this.m_categoryHandler.get(entity.category.id);

    if (!category) {
      return false;
    }
    // TODO: This could be done a lot better as now we're resetting the base64 plus uploading it every time.
    const sql = `update imagephrases set  imageBase64 = ?, finnish = ?,note = ?, categoryId = ?
                where id = ?;`;

    const sqlResult: MySQLResults = await query(sql, [entity.imageBase64, entity.finnish, entity.note, category.id, entity.id]);

    return (!sqlResult.error && sqlResult.affectedRows > 0);
  }

  public isEntityValid (entity: ImagePhrase, validateId: boolean): boolean {
    if (!entity) {
      return false;
    }

    if (validateId) {
      if (!Number.isInteger(entity.id) || entity.id <= 0) {
        return false;
      }
    }
    // One of the worse base64 validations! :D
    if (!entity.imageBase64 || entity.imageBase64.length === 0) {
      return false;
    }

    if (!entity.finnish || entity.finnish.length === 0) {
      return false;
    }

    // Validate category
    if (!this.m_categoryHandler.isEntityValid(entity.category, true)) {
      return false;
    }

    return true;
  }
}
