var _viewFolder = "exam/";

var _testHandler = rootRequire("model/handlers/testhandler").getHandler();
var _wordHandler = rootRequire("model/handlers/wordhandler").getHandler();

var _vash = require("vash");
var _fs = require("fs");

function exam(req, res)
{
    var response = {};

    var testId = parseInt(req.body.testId);

    if (testId > 0)
    {
        _testHandler.getTestWordFull(testId, function (a_test)
        {
            if (a_test)
            {
                //Get the correct viewfile
                var viewFile = a_test.type== 0 ? "exam_simple.vash" : "exam_multiple.vash";
                         
                _fs.readFile(rootPath + "views/exam/partials/" + viewFile, "utf8", function (err, a_text)
                {
                    if (err)
                    {
                        response.error = "Could not find partial view file :(";
                    }
                    else
                    {
                        var model = {
                            words: a_test.words
                        };

                        response.words = a_test.words;
                        var vashTemplate = _vash.compile(a_text);                       

                        response.html = vashTemplate(model);
                    }

                    res.send(response);
                });

                //var htmlText = 
                //response.
                //response.html = "";
                return;
            }
            else
            {
                response.error = "No test with that id";
            }
            
            res.send(response);
        });
        return;
    }
    else {
        response.error = "Missing parameter testId";
    }

    res.send(response);
}

/**
 * Get all available tests
 */
function getTests(req, res){    
    _testHandler.getAll(function (a_tests) {
        
        var response = {};
        
        response.tests = a_tests || [];

        res.send(response);
    });
}

// The API routes
module.exports = function (app, passport, isLoggedInAPI)
{
    // Why /exam/api/exam? ... :)
    app.post("/exam/api/exam", isLoggedInAPI, exam);
    app.get("/api/exam/tests", isLoggedInAPI, getTests);
}