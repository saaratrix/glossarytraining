var _viewFolder = "admin/categories/";

var _categoryHandler = new rootRequire("model/handlers/categoryhandler").getHandler();

function categories(req, res)
{    
    var model = { title: "Categories overview" };
    _categoryHandler.getAll(function (result)
    {
        model.categories = result;
        res.render(_viewFolder + 'categories', model);
    });
}

function categoriesAdd(req, res)
{
    var model = { title: "Categories add"};
    if (req.method === "POST")
    {
        if (req.body.category != "")
        {
            var sanitizedCategory = require("validator").escape(req.body.category);
            model.isPost = true;
            
            _categoryHandler.addCategory(sanitizedCategory, function (success)
            {
                model.added = success;
                res.render(_viewFolder + 'categories_add', model);
            });
            //Cancel so the res code doesn't happen
            return;
        }
    }
    
    res.render(_viewFolder + 'categories_add', model);
}

function categoriesEdit(req, res)
{
    var validator = require("validator");
    
    var model = { title: "Categories edit"};
    var categoryId = req.params.id;
    
    model.categoryId = categoryId;
    //So its not undefined!
    model.categoryName = "";
    if (validator.isInt(categoryId))
    {
        _categoryHandler.getCategory(categoryId, function (a_category)
        {
            if (a_category !== null)
            {
                model.title += " - " + a_category.name;

                if (req.method === "POST")
                {
                    model.isPost = true;
                    
                    var bodyName = req.body.name;
                    if (bodyName !== "")
                    {
                        if (a_category.name !== bodyName)
                        {
                            var sanitizedName = validator.escape(req.body.name);
                            model.categoryName = sanitizedName;
                            _categoryHandler.update(a_category.id, sanitizedName, function (a_success)
                            {
                                model.success = a_success;
                                
                                if (!model.success)
                                {
                                    model.error = "Failed to update category";
                                }
                                
                                res.render(_viewFolder + 'categories_edit', model);
                            });
                            //Stop the 
                            return;
                        }
                        else
                        {

                            model.categoryName = a_category.name;
                            model.success = true;
                        }
                    }
                }
                else
                {
                    model.categoryName = a_category.name;
                }
            }
            else
            {
                model.error = "Could not find category with that id";
            }
            
            res.render(_viewFolder + 'categories_edit', model);
        });
        return;
    }
    else
    {
        model.error = "Not a valid id";
    }
    
    res.render(_viewFolder + 'categories_edit', model);
}

function categoriesDelete(req, res)
{
    var validator = require("validator");
    
    var model = { title: "Categories remove"};
    var categoryId = req.params.id;
    const test = 5;
    model.categoryId = categoryId;
    //So its not undefined!
    model.categoryName = "";
    if (validator.isInt(categoryId))
    {
        _categoryHandler.getCategory(categoryId, function (a_category)
        {
            if (a_category !== null)
            {
                model.title += " - " + a_category.name;
                model.categoryName = a_category.name;
                if (req.method === "POST")
                {
                    model.isPost = true;
                    _categoryHandler.delete(a_category.id, function (a_success)
                    {
                        model.success = a_success;
                        
                        if (!model.success)
                        {
                            model.error = "Failed to delete category";
                        }
                        else
                        {
                            model.hideForm = true;
                        }
                        
                        res.render(_viewFolder + 'categories_delete', model);
                    });
                    return;
                }
            }
            else
            {
                model.error = "Could not find category with that id";
                model.hideForm = true;
            }
            
            res.render(_viewFolder + 'categories_delete', model);
        });
        return;
    }
    else
    {
        model.error = "Not a valid id";
        model.hideForm = true;
    }
    
    res.render(_viewFolder + 'categories_delete', model);
}

/* GET home page. */
module.exports = function (app, passport, isLoggedInAdmin)
{
    //Routes    
    app.get("/admin/categories", isLoggedInAdmin, categories);
    app.get("/admin/categories/add", isLoggedInAdmin, categoriesAdd);
    app.post("/admin/categories/add", isLoggedInAdmin, categoriesAdd);
    
    app.get("/admin/categories/edit/:id", isLoggedInAdmin, categoriesEdit);
    app.post("/admin/categories/edit/:id", isLoggedInAdmin, categoriesEdit);
    
    app.get("/admin/categories/delete/:id", isLoggedInAdmin, categoriesDelete);
    app.post("/admin/categories/delete/:id", isLoggedInAdmin, categoriesDelete);   
   
};