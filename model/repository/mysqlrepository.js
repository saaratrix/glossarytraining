var _repository = require("./repository.js");
var _dbConn = require("../db/dbconn.js").DbConn;

function MySQLRepository()
{
    _repository.Repository.call(this);
}

MySQLRepository.prototype = new _repository.Repository();

MySQLRepository.prototype.add = function (a_sql, a_params)
{
    var result = _dbConn.query(a_sql, a_params);
};

MySQLRepository.prototype.getByName = function (a_name)
{

}

module.exports = {
    MySQLRepository : MySQLRepository
};