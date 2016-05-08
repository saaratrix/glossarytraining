var _viewFolder = "admin/";

function index(req, res)
{
    var model = {
        title: "Admin index"        
    };
    res.render(_viewFolder + 'index', model);
}

/* GET home page. */
module.exports = function (app, passport)
{
    //Routes
    app.get('/admin', isLoggedInAdmin, index);  
    
    /*
     * Passport auth function
     */
    // route middleware to make sure a user is logged in
    function isLoggedInAdmin(req, res, next)
    {
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
        {
            if (req.user.isAdmin())
            {
                return next();
            } 
        }           
        
        // if they aren't redirect them to the home page
        res.redirect('/');
    }

    require('./admin_categories.js')(app, passport, isLoggedInAdmin);
    require('./admin_words.js')(app, passport, isLoggedInAdmin);
    require('./admin_tests.js')(app, passport, isLoggedInAdmin);
};