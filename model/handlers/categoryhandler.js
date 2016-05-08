var _category = rootRequire("model/entities/category").Category;

function CategoryHandler(a_repository)
{
    if (!a_repository)
    {       
        a_repository = rootRequire("model/repository/categoryrepository").getRepository();
    }

    this.m_repository = a_repository;
};

CategoryHandler.prototype.addCategory = function (a_name, a_callback)
{        
    var category = new _category(0, a_name);
    //1. Find category
    this.m_repository.add(category, a_callback);
};

CategoryHandler.prototype.delete = function (a_id, a_callback)
{
    this.m_repository.deleteById(a_id, a_callback);
};

CategoryHandler.prototype.getCategory = function (a_id, a_callback)
{
    this.m_repository.getById(a_id, a_callback);
};

CategoryHandler.prototype.getAll = function (a_callback)
{
    this.m_repository.all(a_callback);
};

CategoryHandler.prototype.update = function (a_id, a_newName, a_callback)
{
    var entity = new _category(a_id, a_newName);

    this.m_repository.update(a_id, entity, a_callback);
};

function getHandler(a_repository)
{
    return new CategoryHandler(a_repository);
}

module.exports = {
    getHandler : getHandler
};