import {query, MySQLResults} from '../database/mysql-connection';
import {IHandler} from './IHandler';

interface BaseEntity {
  id: number | string;
}

export class BaseHandler<T extends BaseEntity> implements IHandler<T> {

  protected m_table: string;

  public async all(): Promise<T[]> {
    const sql = `select * from ${this.m_table};`;
    const sqlResult = await query(sql, []);
    let items: T[] = [];

    if (!sqlResult.error) {
      items = sqlResult as T[];
    }

    return items;
  }

  public async get(a_id: number | string): Promise<T> {
    const sql = `select * from ${this.m_table} where id = ?;`;
    const sqlResult = await query(sql, [a_id]);

    let item: T = null;
    if (!sqlResult.error && sqlResult[0]) {
      item = sqlResult[0] as T;
    }

    return item;
  }

  public async remove(a_entity: T): Promise<boolean> {
    const sql = `delete from ${this.m_table} where id = ?;`;
    const sqlResult = await query(sql, [a_entity.id]);
    return !sqlResult.error && sqlResult.changedRows > 0;
  }

  // Unimplemented functions
  public async add(a_entity: T): Promise<boolean> { return false; }
  public async update(a_entity: T): Promise<boolean> { return false; }
  public isEntityValid(a_entity: T, validateId: boolean): boolean { return false; }
}
