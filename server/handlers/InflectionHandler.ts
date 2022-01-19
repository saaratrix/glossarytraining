import { BaseHandler } from './BaseHandler';
import { Inflection } from '../models/Inflection';
import { MySQLResults, query } from '../database/mysql-connection';
import { Category } from '../models/Category';
import { InflectionCategoryHandler } from './InflectionCategoryHandler';
import { Phrase } from '../models/Phrase';
import { InflectionCategory } from '../models/InflectionCategory';
import { PhraseHandler } from './PhraseHandler';

export class InflectionHandler extends BaseHandler<Inflection> {

  constructor (
    private inflectionCategoryHandler: InflectionCategoryHandler,
    private phraseHandler: PhraseHandler,
  ) {
    super("inflections", "");
  }

  public async all(): Promise<Inflection[]> {
    const sql = `select i.id, i.inflection, i.note, i.inflectioncategoryId, i.phraseId,
                   ic.name as icName, ic.description as icDescription,
                   p.finnish, p.english, p.note as pNote, p.categoryId,
                   c.name as cName
                 from inflections as i
                 join inflectioncategories as ic on ic.id = i.inflectioncategoryId
                 join phrases as p on p.id = i.phraseId
                 join categories as c on c.id = p.categoryId
                 order by ic.name, p.finnish;`;

    const sqlResult: MySQLResults = await query(sql, []);
    const result: Inflection[] = new Array(sqlResult.length);

    // Generate the models from the sql result
    for (let i = 0; i < sqlResult.length; i++) {
      const row = sqlResult[i];
      const inflectionCategory = new InflectionCategory(row.inflectioncategoryId, row.icName, row.icDescription);
      const phraseCategory = new Category(row.categoryId, row.cName);
      const phrase = new Phrase(row.phraseId, row.finnish, row.english, row.pNote, phraseCategory);
      result[i] = new Inflection(row.id, row.inflection, row.note, phrase, inflectionCategory);
    }

    return result;
  }

  public async get(id: number ): Promise<Inflection | null> {
    const sql = `select i.id, i.inflection, i.note, i.inflectioncategoryId, i.phraseId,
                  ic.name as icName, ic.description as icDescription,
                  p.finnish, p.english, p.note as pNote, p.categoryId,
                  c.name as cName
                from inflections as i
                join inflectioncategories as ic on ic.id = i.inflectioncategoryId
                join phrases as p on p.id = i.phraseId
                join categories as c on c.id = p.categoryId
                where i.id = ?;`;

    const sqlResult: MySQLResults = await query(sql, [id]);
    let result = null;

    if (sqlResult.length > 0) {
      const row = sqlResult[0];
      const inflectionCategory = new InflectionCategory(row.inflectioncategoryId, row.icName, row.icDescription);
      const phraseCategory = new Category(row.categoryId, row.cName);
      const phrase = new Phrase(row.phraseId, row.finnish, row.english, row.pNote, phraseCategory);
      result = new Inflection(row.id, row.inflection, row.note, phrase, inflectionCategory);
    }

    return result;
  }

  /**
   * Find all inflections for a category
   */
  public async findInflectionsForCategory (inflectionCategoryId: number): Promise<Inflection[]> {
    const result: Inflection[] = [];
    const sql = `select i.id, i.inflection, i.note, i.inflectioncategoryId, i.id as phraseId,
                  ic.name as icName, ic.description as icDescription ,
                  p.finnish, p.english, p.note as pNote, p.categoryId,
                  c.name as cName
                from inflections as i
                join inflectioncategories as ic on ic.id = i.inflectioncategoryId
                join phrases as p on p.id = i.phraseId
                join categories as c on c.id = p.categoryId
                where ic.id = ?
                order by i.inflection;`;

    const sqlResult = await query(sql, [inflectionCategoryId]);
    if (sqlResult.length > 0) {
      for (let i = 0; i < sqlResult.length; i++) {
        const row = sqlResult[i];
        const inflectionCategory = new InflectionCategory(row.inflectioncategoryId, row.icName, row.icDescription);
        const phraseCategory = new Category(row.categoryId, row.cName);
        const phrase = new Phrase(row.phraseId, row.finnish, row.english, row.pNote, phraseCategory);
        result.push(new Inflection(row.id, row.inflection, row.note, phrase, inflectionCategory));
      }
    }

    return result;
  }

  public async add (entity: Inflection): Promise<boolean> {
    // First check if category exists
    const category = await this.inflectionCategoryHandler.get(entity.inflectionCategory.id);
    const phrase = await this.phraseHandler.get(entity.phrase.id);

    if (!category || !phrase) {
      return false;
    }

    const sql = `insert into inflections(inflection, note, phraseId, inflectioncategoryId)
                 values (?, ?, ?, ?);`;

    const sqlResult: MySQLResults = await query(sql, [entity.inflection, entity.note, phrase.id, category.id]);
    if (!sqlResult.error) {
      entity.id = sqlResult.insertId;
      return true;
    }

    return false;
  }

  public async update (entity: Inflection): Promise<boolean> {
    // First check if category exists
    const category = await this.inflectionCategoryHandler.get(entity.inflectionCategory.id);
    const phrase = await this.phraseHandler.get(entity.phrase.id);

    if (!category || !phrase) {
      return false;
    }

    const sql = `update inflections set inflection = ?, note = ?, phraseId = ?, inflectioncategoryId = ?
                where id = ?;`;

    const sqlResult: MySQLResults = await query(sql, [entity.inflection, entity.note, phrase.id, category.id, entity.id]);

    return (!sqlResult.error && sqlResult.affectedRows > 0);
  }

  public isEntityValid (entity: Inflection, validateId: boolean): boolean {
    if (!entity) {
      return false;
    }

    if (validateId) {
      if (!Number.isInteger(entity.id) || entity.id <= 0) {
        return false;
      }
    }

    if (!entity.inflection || entity.inflection.length === 0) {
      return false;
    }

    if (!this.phraseHandler.isEntityValid(entity.phrase, true)) {
      return false;
    }

    // Validate category
    if (!this.inflectionCategoryHandler.isEntityValid(entity.inflectionCategory, true)) {
      return false;
    }

    return true;
  }
}
