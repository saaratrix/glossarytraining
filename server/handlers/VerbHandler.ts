import { BaseHandler } from "./BaseHandler";
import { query, MySQLResults } from "../database/mysql-connection";
import { Verb } from "../models/Verb";

export class VerbHandler extends BaseHandler<Verb> {
  constructor () {
    super("verbs", " order by finnish");
  }

  public async add (entity: Verb): Promise<boolean> {
    const sql = `insert into verbs(
                finnish, english, note,
                minä, sinä, hän,
                me, te, he, ei)
                values (
                ?, ?, ?,
                ?, ?, ?,
                ?, ?, ?, ?);`;

    var values = [
      entity.finnish, entity.english, entity.note,
      entity.minä, entity.sinä, entity.hän,
      entity.me, entity.te, entity.he, entity.ei
    ];

    const sqlResult: MySQLResults = await query(sql, values);
    if (!sqlResult.error) {
      entity.id = sqlResult.insertId;
      return true;
    }

    return false;
  }

  public async update (entity: Verb): Promise<boolean> {
    const sql = `update verbs set finnish = ?, english = ?, note = ?,
                minä = ?, sinä = ?, hän = ?,
                me = ?, te = ?, he = ?, ei = ?
                where id = ?;`;

    var values = [
      entity.finnish, entity.english, entity.note,
      entity.minä, entity.sinä, entity.hän,
      entity.me, entity.te, entity.he, entity.ei,
      entity.id
    ];

    const sqlResult: MySQLResults = await query(sql, values);

    return (!sqlResult.error && sqlResult.affectedRows > 0);
  }

  public isEntityValid (entity: Verb, validateId: boolean): boolean {
    if (validateId) {
      if (!Number.isInteger(entity.id) || entity.id <= 0) {
        return false;
      }
    }

    // Skipping checking of note because it's optional
    // properties to check!
    var properties = [
      "finnish", "english",
      "minä", "sinä", "hän",
      "me", "te", "he", "ei",
    ];

    for (let i = 0; i < properties.length; i++) {
      var property = properties[i];
      if (!entity[property] || entity[property].length === 0) {
        return false;
      }
    }

    return true;
  }
}
