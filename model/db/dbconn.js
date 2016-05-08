var _mysql = require("mysql2");
var _connection = _mysql.createConnection({
    user: 'root',
    password: '',
    host: 'localhost',
    database:"lexikon"
});
_connection.config.namedPlaceholders = true;

function query(a_sql, a_callback, a_params)
{
    _connection.execute(a_sql, a_params, a_callback);   
    //If any chaining needs to be done
    return DbConn;
}

var DbConn = {
    query : query
}; 

module.exports.DbConn = DbConn;