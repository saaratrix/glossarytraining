var _viewFolder = "admin/words/";

var _wordsHandler = new rootRequire("model/handlers/wordhandler").getHandler();
var _categoryHandler = new rootRequire("model/handlers/categoryhandler").getHandler();

function index(req, res)
{	
    var model = {};    
    var model = { title: "Words overview" };
    
    _wordsHandler.getAll(function (a_words)
    {
        model.words = a_words;
        
		if (a_words.length > 0)
		{

            _wordsHandler.getAllCategoriesForWords(_categoryHandler, a_words, function ()
            {
                
            });
            //return;
        }

        res.render(_viewFolder + 'index', model);  
    });    
}

function wordsAdd(req, res)
{
    var model = { title: "Words add" };
    //Get all categories so you can choose one for the word
    _categoryHandler.getAll(function (a_categories)
    {
        var validator = require("validator");
        model.categories = a_categories;
        
        if (req.method === "POST")
        {
            var valid = true;            
            var categoryId = req.body.category;
            if (!validator.isInt(categoryId) || categoryId <= 0)
            {
                model.error = "category is not a valid category";
                valid = false;
            }
            if (req.body.finnish === "")
            {
                model.error += "<br>Finnish word can not be empty";
                valid = false;
            }
            if (req.body.english === "")
            {
                model.error += "<br>Finnish word can not be empty";
                valid = false;
            }
            //Did validation go through !?
            if (valid)
            {
                //Check if the category exists
                var clen = a_categories.length;
                var exists = false;
                categoryId = parseInt(categoryId);
                for (var i = 0; i < clen; ++i)
                {
                    if (categoryId === a_categories[i].id)
                    {
                        exists = true;
                        break;
                    }
                }
                //if it exists!!
                if (exists)
                {
                    var finnishSanitized = validator.escape(req.body.finnish);
                    var englishSanitized = validator.escape(req.body.english);
                    
                    _wordsHandler.addWord(finnishSanitized, englishSanitized, categoryId, function (a_success)
                    {
                        if (a_success)
                        {
                            model.success = true;
                        }
                        else
                        {
                            model.error = "Failed to add word";
                        }

                        res.render(_viewFolder + 'add', model);
                    });
                    return;
                }
                else
                {
                    model.error = "Category for that Id not found";
                }               
            }          
        }


        res.render(_viewFolder + 'add', model);
    });    
}

function wordsEdit(req, res)
{
    var validator = require("validator");
    var model = { title: "Words edit" };
    
    var wordId = req.params.id;
    
    model.wordId = wordId;
    model.hideForm = false;
    model.categories = [];
    model.categoryId = 0;
    model.finnish = "";
    model.english = "";
    
    if (validator.isInt(wordId))
    {
        _wordsHandler.getWord(wordId, function (a_word)
        {
            if (a_word !== null)
            {
                model.title += " - " + a_word.finnish;

                _categoryHandler.getAll(function (a_categories)
                {
                    model.categories = a_categories;

                    if (req.method === "POST")
                    {
                        var valid = true;
                        var finnish = req.body.finnish;
                        var english = req.body.english;
                        var categoryId = parseInt(req.body.category);
                        
                        model.finnish = finnish;
                        model.english = english;
                        model.categoryId = categoryId;
                        

                        var valid = true;                        
                        if (categoryId <= 0)
                        {
                            model.error = "category is not a valid category";
                            valid = false;
                        }
                        if (finnish === "")
                        {
                            model.error += "<br>Finnish word can not be empty";
                            valid = false;
                        }
                        if (english === "")
                        {
                            model.error += "<br>Finnish word can not be empty";
                            valid = false;
                        }
                        //Did validation go through !?
                        if (valid)
                        {
                            var exists = true;
                            var hasChanged = false;
                            if (a_word.categoryId !== categoryId)
                            {
                                //Check if the category exists
                                var clen = a_categories.length;
                                exists = false;
                                
                                for (var i = 0; i < clen; ++i)
                                {
                                    if (categoryId === a_categories[i].id)
                                    {
                                        exists = true;
                                        hasChanged = true;
                                        break;
                                    }
                                }
                                
                                if (!exists)
                                {
                                    model.error = "Category for that Id not found";
                                }

                                
                            }
                            else if (a_word.finnish !== finnish)
                            {
                                hasChanged = true;
                            }
                            else if (a_word.english !== english)
                            {
                                hasChanged = true;
                            }
                            
                            //if it exists!!
                            if (exists && hasChanged)
                            {                               

                                var finnishSanitized = validator.escape(finnish);
                                var englishSanitized = validator.escape(english);
                                
                                _wordsHandler.update(a_word.id, finnishSanitized, englishSanitized, categoryId, function (a_success)
                                {
                                    if (a_success)
                                    {
                                        model.success = true;
                                    }
                                    else
                                    {
                                        model.error = "Failed to edit word";
                                    }
                                    
                                    res.render(_viewFolder + 'edit', model);
                                });
                                return;
                            }                            
                        }//End if valid 

                    }
                    //If GET method
                    else
                    {
                        model.finnish = a_word.finnish;
                        model.english = a_word.english;
                        model.categoryId = a_word.categoryId;
                    }

                    res.render(_viewFolder + 'edit', model);
                });
                return;
            }
            else
            {
                model.error = "A word with that id does not exist";
                model.hideForm = true;
            }
            res.render(_viewFolder + 'edit', model);
        });
        return;
    }
    else
    {
        model.error = "Not a valid id";
        model.hideForm = true;
    }

    res.render(_viewFolder + 'edit', model);
}

function wordsDelete(req, res)
{
    var model = { title: "Words delete" };
    
    var wordId = req.params.id;
    model.id = wordId;
    
    if (wordId > 0)
    {
        _wordsHandler.getWord(wordId, function (a_word)
        {
            if (a_word !== null)
            {
                model.title += " - " + a_word.finnish;
                model.finnish = a_word.finnish;
                model.english = a_word.english;

                if (req.method === "POST")
                {
                    _wordsHandler.delete(a_word.id, function (a_success)
                    {
                        model.success = a_success;
                        if (a_success)
                        {
                            model.hideForm = true;
                        }
                        else
                        {
                            model.error = "Failed to remove " + a_word.finnish;
                        }
                        res.render(_viewFolder + 'delete', model);
                    });
                    return;
                }
            }
            else
            {
                model.error = "Not word with that id";
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
}

module.exports = function (app, passport, isLoggedInAdmin)
{
    var route = "/admin/words/";

    //Routes    
    app.get(route, isLoggedInAdmin, index);
    
    app.get(route + "add", isLoggedInAdmin, wordsAdd);
    app.post(route + "add", isLoggedInAdmin, wordsAdd);

    app.get(route + "edit/:id", isLoggedInAdmin, wordsEdit);
    app.post(route + "edit/:id", isLoggedInAdmin, wordsEdit);

    app.get(route + "delete/:id", isLoggedInAdmin, wordsDelete);
    app.post(route + "delete/:id", isLoggedInAdmin, wordsDelete);
};