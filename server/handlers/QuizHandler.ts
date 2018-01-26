import { query, MySQLResults } from "../database/mysql-connection";
import { BaseHandler } from './BaseHandler';
import { Quiz, QuizType } from "../models/Quiz";

export class QuizHandler extends BaseHandler<Quiz>{

  constructor() {
    super();
    this.m_table = "quizzes";
  }

  public async add(a_entity: Quiz): Promise<boolean> {
    const sql = `insert into ${this.m_table}(name, type) 
                 values (?, ?);`;

    const sqlResult = await query(sql, [a_entity.name, a_entity.type]);
    if (!sqlResult.error) {
      a_entity.id = sqlResult.insertId;
      return true;
    }

    return false;
  }

  public async update(a_entity: Quiz): Promise<boolean> {
    const sql = `update ${this.m_table} set name=?, type=?
                where id = ?;`;

    const sqlResult = await query(sql, [a_entity.name, a_entity.type, a_entity.id]);

    return !sqlResult.error && sqlResult.changedRows > 0;
  }

  public isEntityValid(a_entity: Quiz): boolean {
    if (!a_entity) {
      return false;
    }

    if (!a_entity.name || a_entity.name === "") {
      return false;
    }

    if (!(a_entity.type in QuizType)) {
      return false;
    }

    return true;
  }
}
