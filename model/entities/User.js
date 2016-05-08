//var _dbConn = require('../db/dbconn.js');

function User(a_id, a_username, a_password, a_roles)
{
    this.id = a_id || 1;
    this.username = a_username || "";
    this.password = a_password || "";
    this.roles = a_roles || [];   
}

User.prototype.isAdmin = function ()
{    
    for (var i = 0; i < this.roles.length; ++i)
    {
        if (this.roles[i] === "admin")
        {
            return true;
        }
    }
    return false;
}

var _users = [
    new User(1, "test", "password", [ "admin" ])    
];


function validPassword(a_user, a_password)
{
    //Encrypt password and compare the encrypted passwords
    if (a_user.password === a_password)
    {
        return true;
    }
    return false;
};

function fetchByName(a_username)
{
    for (var i = 0; i < _users.length; ++i)
    {
        var user = _users[i];

        if (user.username === a_username)
        {
            return user;
        }
    }

    return null;
    /*var sql = "select id,username,password,email from users where username = ?";
    var params = [a_username];
    _dbConn.query(sql, params);*/
};

function fetchById(a_id)
{
    if (_users[a_id])
    {
        return _users[a_id];
    }

    return null;
}

module.exports = {    
    fetchByName : fetchByName,
    fetchById : fetchById,
    validPassword : validPassword,
    User : User
};