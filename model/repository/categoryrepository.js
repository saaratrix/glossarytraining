var _repository = require("./repository.js").Repository;

function CategoryRepository(a_db)
{
    _repository.call(this, a_db);    
}

CategoryRepository.prototype = new _repository();

CategoryRepository.prototype.add = function (a_entity, a_callback)
{    
    _repository.prototype.add.call(this, "insert into category(name) values(:name);", a_entity, a_callback);       
};

CategoryRepository.prototype.deleteById = function (a_id, a_callback)
{
    _repository.prototype.deleteById.call(this, "delete from category where id = :id;", a_id, a_callback);     
};

CategoryRepository.prototype.getById = function (a_id, a_callback)
{
    _repository.prototype.getById.call(this, "select * from category where id = :id", a_id, a_callback);   
};

CategoryRepository.prototype.update = function (a_id, a_entity, a_callback)
{
    _repository.prototype.update.call(this, "update category set name = :name where id = :id", a_id, a_callback);       
};

CategoryRepository.prototype.all = function(a_callback)
{
    _repository.prototype.all.call(this, "select * from category", a_callback);    
}

function getRepository(a_db)
{
    return new CategoryRepository(a_db);
}

module.exports = {
    getRepository : getRepository
};