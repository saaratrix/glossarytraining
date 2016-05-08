var _repository = require("./repository.js").Repository;

function TestRepository(a_db)
{
    _repository.call(this, a_db);
}

TestRepository.prototype = new _repository();

TestRepository.prototype.add = function (a_entity, a_callback)
{
    _repository.prototype.add.call(this, "insert into tests(name, language, type) values(:name, :language, :type);", a_entity, a_callback);
};

TestRepository.prototype.deleteById = function (a_id, a_callback)
{
    _repository.prototype.deleteById.call(this, "delete from tests where id = :id;", a_id, a_callback);
};

TestRepository.prototype.getById = function (a_id, a_callback)
{
    _repository.prototype.getById.call(this, "select * from tests where id = :id", a_id, a_callback);
};

TestRepository.prototype.update = function (a_entity, a_callback)
{
    _repository.prototype.update.call(this, "update tests set name = :name, language = :language, type = :type where id = :id", a_entity, a_callback);
};

TestRepository.prototype.all = function (a_callback)
{
    _repository.prototype.all.call(this, "select * from tests", a_callback);
};
//Get the test from id and put all the word ids by key in the words array.
//Meaning test.words[5] = true,  e.t.c.!  So a dictionary.
TestRepository.prototype.getTestWordIds = function (a_id, a_callback)
{    
    var that = this;
    this.getById(a_id, function (a_test)
    {
        if (!a_test)
        {
            a_callback(null);
        }
        else {
            var params = { id: a_id };
            
            that.find("select wordId from testwords where testId = :id", function (a_err, a_result)
            {
                if (a_err)
                {
                    a_callback(null);               
                }
                else
                {
                    var len = a_result.length;
                    var words = [];
                    for (var i = 0; i < len; ++i)
                    {
                        var wordId = a_result[i].wordId;
                        
                        words[wordId] = true;
                    }
                    
                    a_test.words = words;
                    
                    a_callback(a_test);
                }             
                
            }, params);
        }      
    });
};

TestRepository.prototype.getTestWordFull = function (a_id, a_callback)
{
    var that = this;
    this.getById(a_id, function (a_test)
    {
        if (!a_test)
        {
            a_callback(null);
        }
        else
        {
            var params = { id: a_id };
            
            var sql = "select w.finnish, ";
            //Can do different language here for users with different languages!
            sql += "w.english";
            sql += " as translation from testwords as tw inner join words as w on w.id = tw.wordId where testId = :id;";

            that.find(sql, function (a_err, a_result)
            {
                if (a_err)
                {
                    a_callback(null);
                }
                else
                {
                    /*
                    var len = a_result.length;
                    var words = [];
                    for (var i = 0; i < len; ++i)
                    {
                        words.push()
                        
                        words[wordId] = true;
                    }*/
                    
                    a_test.words = a_result;
                    
                    a_callback(a_test);
                }
                
            }, params);
        }
    });
};

function getRepository(a_db)
{
    return new TestRepository(a_db);
}

module.exports = {
    getRepository : getRepository
};