import { query } from "../database/mysql-connection";
import { IHandler } from "./IHandler";

interface BaseEntity {
  id: number | string;
}

export class BaseHandler<T extends BaseEntity> implements IHandler<T> {

  // The database table to handle data to/from
  protected readonly m_table: string;
  protected readonly m_orderByAll: string;

  constructor (table: string, orderByAll: string = "") {
    this.m_table = table;
    this.m_orderByAll = orderByAll;
  }

  /**
   * Get all entities.
   */
  public async all (): Promise<T[]> {
    const sql = `select * from ${this.m_table}${this.m_orderByAll};`;
    const sqlResult = await query(sql, []);
    let items: T[] = [];

    if (!sqlResult.error) {
      items = sqlResult as T[];
    }

    return items;
  }

  /**
   * Get one entity from id.
   */
  public async get (id: number | string): Promise<T> {
    const sql = `select * from ${this.m_table} where id = ?;`;
    const sqlResult = await query(sql, [id]);

    let item: T = null;
    if (!sqlResult.error && sqlResult[0]) {
      item = sqlResult[0] as T;
    }

    return item;
  }

  /**
   * Remove the input entity.
   */
  public async remove (entity: T): Promise<boolean> {
    const sql = `delete from ${this.m_table} where id = ?;`;
    const sqlResult = await query(sql, [entity.id]);
    return (!sqlResult.error && sqlResult.affectedRows > 0);
  }

  // Unimplemented functions
  public async add (entity: T): Promise<boolean> { return false; }
  public async update (entity: T): Promise<boolean> { return false; }
  public isEntityValid (entity: T, validateId: boolean): boolean { return false; }
}
