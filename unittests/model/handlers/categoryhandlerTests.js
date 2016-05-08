var assert = require('assert');

var _rootPath = "../../../";
//*sigh* since app.js isn't run for tests :(
if (!global.rootRequire)
{
    global.rootRequire = function (name)
    {
        return require(__dirname + '/' + _rootPath +  name);
    }
}

var _unittestRepository = require("../repository/unittestrepository").UnitTestRepository;
var _categoryHandler = require(_rootPath + "model/handlers/categoryhandler").CategoryHandler;
var _category = require(_rootPath + "model/entities/category.js").Category;

describe('CategoryHandler tests', function() {
    it('GetByName Category', function ()
    {
        var repository = new _unittestRepository();
        var categoryHandler = new _categoryHandler(repository);
        
        var categoryName = "abc";
        
        var mockCategory = new _category();
        mockCategory.name = categoryName;

        repository.data.push(mockCategory);

        categoryHandler.getByName(categoryName, function (result)
        {
            assert.equal(result, mockCategory, "getByName returned correct category");
        });

        //assert.equal(result, mockCategory, "getByName returned correct category");

        result = categoryHandler.getByName(categoryName + "a", function ()
        {
            assert.equal(result, null, "getByName returned null because no category was found");
        });       
    })    
    
    it('Add Category', function () {
        var repository = new _unittestRepository();
        var categoryHandler = new _categoryHandler(repository);
        
        var categoryName = "abc";
        
        var mockCategory = new _category();
        mockCategory.name = categoryName;
        
        assert.ok(repository.data.length === 0, "Repository should be empty");

        categoryHandler.addCategory(categoryName, function (success)
        {
            assert.ok(success, "Succesfully added category");
            assert.ok(repository.data.length === 1, "Category added to repository");
        });        

        categoryHandler.addCategory(categoryName, function (success)
        {
            assert.equal(success,false, "Failed to add category");
            assert.ok(repository.data.length === 1, "Category should not have added to repository");
        });       
        
        var mockCategory2 = new _category();
        mockCategory2.name = mockCategory + "a";

        categoryHandler.addCategory(mockCategory2.name, function (success)
        {
            assert.ok(success, "Succesfully added category");
            assert.ok(repository.data.length === 2, "Category added to repository");
        });

        
    })

    it('Get all Categories', function ()
    {
        var repository = new _unittestRepository();
        var categoryHandler = new _categoryHandler(repository);
        
        var categoryName = "abc";
        
        var mockCategory = new _category();
        mockCategory.name = categoryName;
        
        var mockCategory2 = new _category();
        mockCategory2.name = categoryName + "a";
        
        categoryHandler.addCategory(categoryName,  function (){ });
        categoryHandler.addCategory(mockCategory2.name, function (){ });

        categoryHandler.getAll(function (result)
        {
            assert.ok(result.length === 2, "should have 2 categories");
            
            assert.equal(result[0], mockCategory, "First item should be mockCategory");
            assert.equal(result[1], mockCategory2, "Sebond item should be mockCategory2");
        });

        
    });
})
