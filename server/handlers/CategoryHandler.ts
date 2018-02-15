import { BaseHandler } from "./BaseHandler";
import { Category } from "../models/Category";
import { query, MySQLResults } from "../database/mysql-connection";

export class CategoryHandler extends BaseHandler<Category>{
  constructor () {
    super("categories");
  }

  public async add(entity: Category): Promise<boolean> {
    const sql = `insert into ${this.m_table}(name) 
                 values (?);`;

    const sqlResult: MySQLResults = await query(sql, [entity.name]);
    if (!sqlResult.error) {
      entity.id = sqlResult.insertId;
      return true;
    }

    return false;
  }
  public async update(entity: Category): Promise<boolean> {
    const sql = `update ${this.m_table} set name = ?
                where id = ?;`;

    const sqlResult: MySQLResults = await query(sql, [entity.name, entity.id]);

    return (!sqlResult.error && sqlResult.affectedRows > 0);
  }

  public async remove(entity: Category): Promise<boolean> {
    // Can't delete default id
    if (entity.id <= 1) {
      return false;
    }
    // Update all phrases categoryIds to the "Uncategorised" category!
    const sql = `update ${this.m_table} set categoryId = 1
                where categoryId = ?;`;

    const sqlResult: MySQLResults = await query(sql, [entity.id]);

    if (sqlResult.error) {
      return false;
    }

    return await super.remove(entity);
  }

  public isEntityValid(entity: Category, validateId: boolean): boolean {

    if (!entity) {
      return false;
    }

    if (validateId) {
      if (!Number.isInteger(entity.id) || entity.id <= 0) {
        return false;
      }
    }

    if (!entity.name || entity.name.length <= 0) {
      return false;
    }

    return true;
  }
}
