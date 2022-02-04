import * as mysql from "mysql";

export const connection = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "root",
  database : "glossarytraining",
});
// It's better to use a pool of connections but there's only 1 user
connection.connect();

export interface MySQLResults {
  insertId?: number;
  affectedRows?: number;
  changedRows?: number;
  error?: string; // Won't be an error but it's so typescript compiler doesn't complain on type
  length: number;
  [key: number]: MySQLRow;
}

export interface MySQLRow {
  [key: string]: any;
}

/**
 * MySQL query that returns a promise so we can await it instead of a callback.
 */
export const query = function (sql: string, parameters: Array<any>): Promise<MySQLResults> {
  const promise = new Promise<MySQLResults>(function (res) {
    connection.query(sql, parameters, function(error, results: MySQLResults, fields) {
      if (!error) {
        res(results);
      }
      else {
        const resultError: MySQLResults = {
          error: error.message,
          insertId: -1,
          changedRows: 0,
          affectedRows: 0,
          length: 0
        };

        res(resultError);
      }
    });
  });

  return promise;
};

export default connection;
