var _repository = require("./repository.js").Repository;

function WordRepository(a_db)
{
    _repository.call(this, a_db);
}

WordRepository.prototype = new _repository();

WordRepository.prototype.add = function (a_entity, a_callback)
{
    _repository.prototype.add.call(this, "insert into words(finnish, english, categoryId) values(:finnish, :english, :categoryId);", a_entity, a_callback);
};

WordRepository.prototype.deleteById = function (a_id, a_callback)
{
    _repository.prototype.deleteById.call(this, "delete from words where id = :id;", a_id, a_callback);
};

WordRepository.prototype.getById = function (a_id, a_callback)
{
    _repository.prototype.getById.call(this, "select * from words where id = :id", a_id, a_callback);
};

WordRepository.prototype.update = function (a_id, a_entity, a_callback)
{
    _repository.prototype.update.call(this, "update words set finnish = :finnish, english = :english, categoryId = :categoryId where id = :id", a_entity, a_callback);
};

WordRepository.prototype.all = function (a_callback)
{
    _repository.prototype.all.call(this, "select * from words", a_callback);
}

function getRepository(a_db)
{
    return new WordRepository(a_db);
}

module.exports = {
    getRepository : getRepository
};