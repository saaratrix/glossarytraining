var _word = rootRequire("model/entities/word").Word;

//Allow DI but as default use the default repository!
function WordHandler(a_repository)
{
    if (!a_repository)
    {
        a_repository = new rootRequire("model/repository/wordrepository").getRepository();
    }

    this.m_repository = a_repository;
};

WordHandler.prototype.addWord = function (a_finnish, a_english, a_categoryId, a_callback)
{
    var word = new _word(0, a_finnish, a_english, a_categoryId);
    //1. Find category
    this.m_repository.add(word, a_callback);
};

WordHandler.prototype.delete = function (a_id, a_callback)
{
    this.m_repository.deleteById(a_id, a_callback);
};

WordHandler.prototype.getWord = function (a_id, a_callback)
{
    this.m_repository.getById(a_id, a_callback);
};

WordHandler.prototype.getAll = function (a_callback)
{
    this.m_repository.all(a_callback);
};
//Get all the words for a specific category
WordHandler.prototype.getAllForCategoryDB = function (a_categoryId, a_callback)
{    
    throw new Error("Not implemented");
};
//Get all the words for a specific test
WordHandler.prototype.getAllForTestDB = function (a_testId, a_callback)
{
    throw new Error("Not implemented");
};

WordHandler.prototype.getAllCategoriesForWords = function (a_categoryHandler, a_words, a_callback)
{
    //If the key is added
    var categoryKeys = [];
    var categoryList = [];
    var wlen = a_words.length;
    for (var i = 0; i < a_words.length; ++i)
    {
        var word = a_words[i];
        if (!categoryKeys[word.categoryId])
        {
            categoryList.push(word.categoryId);
            categoryKeys[word.categoryId] = true;
        }
    }

    console.log(categoryList);
};

WordHandler.prototype.update = function (a_id, a_finnish, a_english, a_categoryId, a_callback)
{
    var entity = new _word(a_id, a_finnish, a_english, a_categoryId);
    
    this.m_repository.update(a_id, entity, a_callback);
};

function getHandler(a_repository)
{
    return new WordHandler(a_repository);
}

module.exports = {
    getHandler : getHandler
};