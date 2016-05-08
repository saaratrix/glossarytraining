var _viewFolder = "home/";

function index(req, res)
{
    var model = {
        title: "Index title",
        metaDescription: "Learning finnish!"
    };
    res.render(_viewFolder + 'index', model);   
}

function login(req, res)
{
    var model = { title: "Login title" };
    
    model.message = req.flash("loginMessage");    

    res.render(_viewFolder + 'login', model);   
}

/* GET home page. */
module.exports = function (app, passport)
{
    //Routes
    app.get('/', index);  
        
    app.get("/login", login);
    
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res)
    {
        req.logout();
        res.redirect('/');
    });
    
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
};