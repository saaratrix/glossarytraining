import { BaseHandler } from './BaseHandler';
import { InflectionCategory } from '../models/InflectionCategory';
import { MySQLResults, query } from '../database/mysql-connection';

export class InflectionCategoryHandler extends BaseHandler<InflectionCategory> {
  constructor () {
    super("inflectioncategories", " order by name");
  }

  /**
   * Returns all Inflection Categories that have at least 1 Inflection
   */
  public async allCategoriesWithInflections (): Promise<InflectionCategory[]> {
    let result: InflectionCategory[] = [];
    const sql = `select distinct ic.id, ic.name, ic.description
                from inflectioncategories as ic
                join inflections as i on i.inflectioncategoryId = ic.id
                order by ic.name;`;

    const sqlResult: MySQLResults = await query(sql, []);
    if (sqlResult.length > 0) {
      result = sqlResult as InflectionCategory[];
    }

    return result;
  }

  public async add (entity: InflectionCategory): Promise<boolean> {
    const sql = `insert into inflectioncategories(name, description)
                 values (?, ?);`;

    const sqlResult: MySQLResults = await query(sql, [entity.name, entity.description]);
    if (!sqlResult.error) {
      entity.id = sqlResult.insertId;
      return true;
    }

    return false;
  }

  public async update (entity: InflectionCategory): Promise<boolean> {
    const sql = `update inflectioncategories set name = ?, description  = ?
                where id = ?;`;

    const sqlResult: MySQLResults = await query(sql, [entity.name, entity.description, entity.id]);

    return (!sqlResult.error && sqlResult.affectedRows > 0);
  }

  public async remove (entity: InflectionCategory): Promise<boolean> {
    // Can't delete default id
    if (entity.id <= 1) {
      return false;
    }
    // Update all inflections' inflectioncategoryId to the "Uncategorised" category!
    const sql = `update inflections set inflectioncategoryId = 1
                where inflectioncategoryId = ?;`;

    const sqlResult: MySQLResults = await query(sql, [entity.id]);

    if (sqlResult.error) {
      return false;
    }

    return await super.remove(entity);
  }

  public isEntityValid (entity: InflectionCategory, validateId: boolean): boolean {
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

    return true;
  }
}
