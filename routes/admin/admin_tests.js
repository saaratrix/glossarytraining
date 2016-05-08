var _viewFolder = "admin/tests/";

var _testHandler = rootRequire("model/handlers/testhandler").getHandler();
var _wordHandler = rootRequire("model/handlers/wordhandler").getHandler();

var _testsPrettifier = rootRequire("viewmodel/prettifiers/testsprettifier").getClass();


function index(req, res)
{
    var model = { title: "Tests overview" };
    
    _testHandler.getAll(function (a_tests)
    {
        model.tests = a_tests;
        model.prettifier = _testsPrettifier;

        res.render(_viewFolder + 'index', model);
    });  
}

function addTests(req, res)
{
    var model = { title: "Tests add" };
    model.prettifier = _testsPrettifier;
    
    if (req.method === "POST")
    {
        var validator = require("validator");
        var language = parseInt(req.body.language);
        var type = parseInt(req.body.type);

        if ( (language >= 0 && language <= 2)
             && (type >= 0 && type <= 1) )
        {
            var name = validator.escape(req.body.name);

            if (name !== "")
            {
                _testHandler.addTest(name, language, type, function (a_success)
                {
                    if (a_success)
                    {
                        model.success = true;
                    }
                    else
                    {
                        model.error = "Failed to add testhandler to database.";
                    }

                    res.render(_viewFolder + 'add', model);
                });
                return;
            }
            else
            {
                model.error = "Name can't be empty";
            }
        }
        else
        {
            model.error = "You hacker!! ^_^";
        }
    }
    
    res.render(_viewFolder + 'add', model);
};

function editTests(req, res)
{
    var model = { title: "Tests edit" };
    
    var testId = parseInt(req.params.id);
    model.id = testId;
    
    if (testId > 0)
    {
        _testHandler.getTestWordIds(testId, function (a_test)
        {
            if (a_test !== null)
            {
                model.prettifier = _testsPrettifier;
                model.name = a_test.name;
                model.language = a_test.language;
                model.type = a_test.type;
                model.selectedWords = a_test.words;
                
                model.title += " - " + a_test.name;

                _wordHandler.getAll(function (a_words)
                {
                    if (a_words.length == 0)
                    {
                        model.error = "There are no words to add to the test";
                    }
                    
                    model.words = a_words;                    

                    if (req.method === "POST")
                    {
                        var validator = require("validator");
                        var name = validator.escape(req.body.name);
                        var language = parseInt(req.body.language);
                        var type = parseInt(req.body.type);

                        if (name !== "" && (language >= 0 && language <= 2 ) && (type >= 0 && type <= 1 ))
                        {
                            model.name = name;
                            model.language = language;
                            model.type = type;

                            _testHandler.update(a_test.id, name, language, type, function (a_success)
                            {
                                model.success = a_success;
                                if (!model.success)
                                {
                                    model.error = "<br>Failed to update test in database";
                                }
                                else
                                {
                                    
                                }

                                res.render(_viewFolder + 'edit', model);
                            });
                            return;
                        }
                        else
                        {
                            model.error += "<br> Invalid new testdata";
                        }
                    }
                    
                    res.render(_viewFolder + 'edit', model);
                });
                return;                               
            }
            else
            {
                model.error = "Test on that id does not exist";
                model.hideForm = true;
            }
            res.render(_viewFolder + 'edit', model);
        });
        return;
    }
    else
    {
        model.error = "Id is not a valid id";
        model.hideForm = true;
    }
    
    res.render(_viewFolder + 'edit', model);
};

function deleteTests(req, res)
{
    var model = { title: "Tests delete" };
    
    var testId = parseInt(req.params.id);
    model.testId = testId;

    if (testId > 0)
    {
        _testHandler.getTest(testId, function (a_test)
        {
            if (a_test !== null)
            {
                model.testName = a_test.name;
                model.title += " - " + a_test.name;
                if (req.method === "POST")
                {
                    _testHandler.delete(testId, function (a_success)
                    {
                        if (a_success)
                        {
                            model.success = true;
                            model.hideForm = true;

                        }
                        else
                        {
                            model.error = "Failed to remove test from database";
                        }

                        res.render(_viewFolder + 'delete', model);
                    });
                    return;
                }
            }
            else
            {
                model.error = "No test found for that id";
                model.hideForm = true;
            }

            res.render(_viewFolder + 'delete', model);
        });
        return;
    }
    else
    {
        model.error = "Not a valid id";
        model.hideForm = true;
    }    
    
    res.render(_viewFolder + 'delete', model);
};

function updateTestword(req, res)
{
    
    
    var isChecked = req.body.isChecked;
    var testId = parseInt(req.body.testId );
    var wordId = parseInt(req.body.wordId);
    
    if (testId > 0 && wordId > 0)
    {
        res.setHeader('Content-Type', 'application/json');

        if (isChecked)
        {
            _testHandler.addTestWord(_wordHandler, testId, wordId, function (a_success)
            {
                res.send({ success: a_success });
            });
        }
        else
        {
            _testHandler.removeTestWord(testId, wordId, function (a_success)
            {
                res.send({ success: a_success });
            });
        }
    }
    else
    {
        //Bad request!
        res.statusCode = 400;
        res.send('Bad input data');
    }    
};

module.exports = function (app, passport, isLoggedInAdmin)
{
    var route = "/admin/tests/";
    
    //Routes    
    app.get(route, isLoggedInAdmin, index);
    
    
    app.get(route + "add", isLoggedInAdmin, addTests);      
    app.post(route + "add", isLoggedInAdmin, addTests);

    app.get(route + "edit/:id", isLoggedInAdmin, editTests);
    app.post(route + "edit/:id", isLoggedInAdmin, editTests);

    app.get(route + "delete/:id", isLoggedInAdmin, deleteTests);
    app.post(route + "delete/:id", isLoggedInAdmin, deleteTests);

    app.post(route + "testword", isLoggedInAdmin, updateTestword);
    
};
