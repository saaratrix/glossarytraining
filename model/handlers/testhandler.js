var _test = rootRequire("model/entities/test").Test;

//Allow DI but as default use the default repository!
function TestHandler(a_repository)
{
    if (!a_repository)
    {
        a_repository = new rootRequire("model/repository/testrepository").getRepository();
    }    
    this.m_repository = a_repository;
};

TestHandler.prototype.addTest = function (a_name, a_language, a_type, a_callback)
{     
    var test = new _test(0, a_name, a_language, a_type);
    //1. Find category
    this.m_repository.add(test, a_callback);
};

TestHandler.prototype.addTestWord = function (a_wordHandler, a_testId, a_wordId, a_callback)
{
    var that = this;
    this.getTest(a_testId, function (a_test)
    {
        if (a_test)
        {
            a_wordHandler.getWord(a_wordId, function (a_word)
            {
                if (a_word)
                {
                    that.m_repository.find("insert into testwords(testId, wordId) values(:testId, :wordId);", function (err, a_reply)
                    {
                        if (err)
                        {
                            a_callback(false);
                        }
                        else
                        {
                            if (a_reply.affectedRows > 0)
                            {
                                a_callback(true);
                            }
                            else
                            {
                                a_callback(false);
                            }
                        }
                    },
                    {
                        testId: a_testId,
                        wordId: a_wordId
                    });
                }
                else
                {
                    a_callback(false);
                }
            });
        }
        else {
            a_callback(false);
        } 
    });        
};

TestHandler.prototype.removeTestWord = function (a_testId, a_wordId, a_callback)
{
    this.m_repository.find("delete from testwords where testId = :testId and wordId = :wordId;", function (err, a_result)
    {
        if (err)
        {
            a_callback(false);
        }
        else
        {
            if (a_result.affectedRows > 0)
            {
                a_callback(true);
            }
            else
            {
                a_callback(false);
            }   
        }
    }, 
    {
        testId: a_testId,
        wordId: a_wordId
    });
};

TestHandler.prototype.delete = function (a_id, a_callback)
{
    this.m_repository.deleteById(a_id, a_callback);
};

TestHandler.prototype.getTest = function (a_id, a_callback)
{
    this.m_repository.getById(a_id, a_callback);
};

TestHandler.prototype.getTestWordIds = function (a_id, a_callback)
{
    this.m_repository.getTestWordIds(a_id, a_callback);
};

TestHandler.prototype.getTestWordFull = function (a_id, a_callback)
{
    this.m_repository.getTestWordFull(a_id, a_callback);
};

TestHandler.prototype.getAll = function (a_callback)
{
    this.m_repository.all(a_callback);
};

TestHandler.prototype.update = function (a_id, a_name, a_language, a_type, a_callback)
{
    var entity = new _test(a_id, a_name, a_language, a_type);
    
    this.m_repository.update(entity, a_callback);
};

function getHandler(a_repository)
{
    return new TestHandler(a_repository);
}

module.exports = {
    getHandler : getHandler
};