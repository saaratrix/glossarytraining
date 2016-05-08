var assert = require('assert');

var _rootPath = "../../../";

var _user = require(_rootPath + 'model/entities/user');

describe('User Model tests', function() {
    
    it("Valid password", function ()
    {
        var mockUser = new _user.User();
        
        var testPassword = "test";

        mockUser.password = testPassword;

        assert.ok(_user.validPassword(mockUser, testPassword), "Valid password should return true");
        
        assert.equal(_user.validPassword(mockUser, testPassword + "a"), false, "Valid Password should return false");
    })  
    

    it('Fetch by name', function () 
    {
        var username = "loser";
        //var mockUser = new _user.User(0, "idunno");
        
        var result = _user.fetchByName(username);

        assert.ok(result, "User should be found");
        
        result = _user.fetchByName(username + "a");

        assert.equal(result, null, "Result from fetch should be null");
    })

    it('Fetch by Id', function ()
    {
        var id = 0;
        //var mockUser = new _user.User(0, "idunno");
        
        var result = _user.fetchById(id);
        
        assert.ok(result, "User should be found");
        
        result = _user.fetchById(id + 1);
        
        assert.equal(result, null, "Result from fetch should be null");
    })
})
