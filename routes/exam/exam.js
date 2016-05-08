var _viewFolder = "exam/";

var _testHandler = new rootRequire("model/handlers/testhandler").getHandler();

//The test index function, It'll select correct function based on session
function index(req, res)
{
    if (!req.session.started)
    {
        start(req, res);    
    }
    else
    {
        current(req, res);
    }    
}

function start(req, res)
{
    
    var model = { title: "Exam start" };
    _testHandler.getAll(function (a_tests)
    {
        model.tests = a_tests;
        res.render(_viewFolder + 'start', model);
    });        
}
//The current test (after you've started one)
//This only happens if you re-visit /test after starting one test.
function current(req, res)
{
    var model = { title: "Test current" };
    res.render(_viewFolder + "current", model);
}

/******************
 * API functions
*******************/
function starttest(req, res)
{
    req.session.started = true;
    res.json({ status: 1 });
}

function endtest(req, res)
{
    req.session.started = false;
    res.json({ status: 1 });
}

function testdata(req, res)
{
    res.json({ apa: "apa", moo: "hello world!" });
}

/* GET home page. */
module.exports = function (app, passport)
{
    //Routes
    app.get('/exam', isLoggedIn, index);
    
    app.get('/exam/data', isLoggedInAPI, testdata);
    app.get('/exam/start', isLoggedInAPI, starttest);
    app.get('/exam/end', isLoggedInAPI, endtest);
    
    rootRequire("routes/exam/api_exam")(app, passport, isLoggedInAPI);

    /*
     * Passport auth function
     */
    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next)
    {
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();
        
        // if they aren't redirect them to the home page
        res.redirect('/');
    }

    function isLoggedInAPI(req, res, next)
    {
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();
        
        var err = new Error("Permission denied");
        err.status = 403;
        res.status(403);
        next(err);
    }
};