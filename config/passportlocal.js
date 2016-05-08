var LocalStrategy = require("passport-local").Strategy;
var _userHandler = rootRequire("model/entities/User");

module.exports = function (a_passport)
{
    // used to serialize the user for the session
    a_passport.serializeUser(function (user, done)
    {
        done(null, user.id);
    });
    
    // used to deserialize the user
    a_passport.deserializeUser(function (id, done)
    {
        var user = _userHandler.fetchById(id);

        done(null, user);
    });
    
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    
    a_passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        //usernameField : 'email',
        //passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function (req, username, password, done)
    {
        //Try to find user with that username
        var user = _userHandler.fetchByName(username);
        //If user doesn't exist
        if (!user)
        {
            //Return no user found
            return done(null, false, req.flash( "loginMessage",  'Unknown user ' + username));
        }
        // if the user is found but the password is wrong
        if (!_userHandler.validPassword(user, password))
        {
            return done(null, false, req.flash("loginMessage", 'Incorrect password'));
        }
        
        // all is well, return successful user
        return done(null, user);
    }));

};