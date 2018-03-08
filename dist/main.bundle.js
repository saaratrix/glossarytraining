webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/admin/admin.component.html":
/***/ (function(module, exports) {

module.exports = "<nav>\r\n  <a [routerLink]=\"['./quizzes']\" >Quizzes</a>\r\n  <br>\r\n  <a [routerLink]=\"['./phrases']\">Words and phrases</a>\r\n  <br>\r\n  <a [routerLink]=\"['./categories']\">Categories</a>\r\n</nav>\r\n<div>\r\n  <router-outlet></router-outlet>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/admin.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "nav {\n  margin-bottom: 15px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/admin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AdminComponent = /** @class */ (function () {
    function AdminComponent() {
    }
    AdminComponent.prototype.ngOnInit = function () {
    };
    AdminComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-admin',
            template: __webpack_require__("../../../../../src/app/admin/admin.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/admin.component.less")]
        }),
        __metadata("design:paramtypes", [])
    ], AdminComponent);
    return AdminComponent;
}());



/***/ }),

/***/ "../../../../../src/app/admin/admin.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__phrase_phrase_module__ = __webpack_require__("../../../../../src/app/phrase/phrase.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__admin_component__ = __webpack_require__("../../../../../src/app/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__quiz_quiz_list_quiz_list_component__ = __webpack_require__("../../../../../src/app/admin/quiz/quiz-list/quiz-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__quiz_quiz_detail_quiz_detail_component__ = __webpack_require__("../../../../../src/app/admin/quiz/quiz-detail/quiz-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__phrases_phrases_list_phrases_list_component__ = __webpack_require__("../../../../../src/app/admin/phrases/phrases-list/phrases-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__phrases_phrases_detail_phrases_detail_component__ = __webpack_require__("../../../../../src/app/admin/phrases/phrases-detail/phrases-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__phrases_phrases_quiz_selection_phrases_quiz_selection_component__ = __webpack_require__("../../../../../src/app/admin/phrases/phrases-quiz-selection/phrases-quiz-selection.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__category_category_list_category_list_component__ = __webpack_require__("../../../../../src/app/admin/category/category-list/category-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__category_category_detail_category_detail_component__ = __webpack_require__("../../../../../src/app/admin/category/category-detail/category-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__shared_shared_module__ = __webpack_require__("../../../../../src/app/admin/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var adminRouting = __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forChild([
    {
        path: "admin",
        component: __WEBPACK_IMPORTED_MODULE_5__admin_component__["a" /* AdminComponent */],
        children: [
            {
                path: "quizzes",
                component: __WEBPACK_IMPORTED_MODULE_6__quiz_quiz_list_quiz_list_component__["a" /* QuizListComponent */]
            },
            {
                path: "quiz/:id",
                component: __WEBPACK_IMPORTED_MODULE_7__quiz_quiz_detail_quiz_detail_component__["a" /* QuizDetailComponent */]
            },
            {
                path: "phrases",
                component: __WEBPACK_IMPORTED_MODULE_8__phrases_phrases_list_phrases_list_component__["a" /* PhrasesListComponent */]
            },
            {
                path: "phrase/:id",
                component: __WEBPACK_IMPORTED_MODULE_9__phrases_phrases_detail_phrases_detail_component__["a" /* PhrasesDetailComponent */]
            },
            {
                path: "categories",
                component: __WEBPACK_IMPORTED_MODULE_11__category_category_list_category_list_component__["a" /* CategoryListComponent */]
            },
            {
                path: "category/:id",
                component: __WEBPACK_IMPORTED_MODULE_12__category_category_detail_category_detail_component__["a" /* CategoryDetailComponent */]
            }
        ]
    },
]);
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__phrase_phrase_module__["a" /* PhraseModule */],
                __WEBPACK_IMPORTED_MODULE_13__shared_shared_module__["a" /* SharedModule */],
                adminRouting
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__admin_component__["a" /* AdminComponent */],
                __WEBPACK_IMPORTED_MODULE_6__quiz_quiz_list_quiz_list_component__["a" /* QuizListComponent */],
                __WEBPACK_IMPORTED_MODULE_7__quiz_quiz_detail_quiz_detail_component__["a" /* QuizDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_8__phrases_phrases_list_phrases_list_component__["a" /* PhrasesListComponent */],
                __WEBPACK_IMPORTED_MODULE_9__phrases_phrases_detail_phrases_detail_component__["a" /* PhrasesDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_10__phrases_phrases_quiz_selection_phrases_quiz_selection_component__["a" /* PhrasesQuizSelectionComponent */],
                __WEBPACK_IMPORTED_MODULE_11__category_category_list_category_list_component__["a" /* CategoryListComponent */],
                __WEBPACK_IMPORTED_MODULE_12__category_category_detail_category_detail_component__["a" /* CategoryDetailComponent */],
            ]
        })
    ], AdminModule);
    return AdminModule;
}());



/***/ }),

/***/ "../../../../../src/app/admin/category/category-detail/category-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"item; then itemBlock else loadingBlock;\"></div>\r\n<ng-template #itemBlock>\r\n  <form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f)\" >\r\n    <h1>Category - {{item.name}}</h1>\r\n    <div class=\"form-group\">\r\n      <label for=\"name\">Category name:</label>\r\n      <input type=\"text\" id=\"name\" name=\"name\" required [(ngModel)]=\"item.name\">\r\n    </div>\r\n    <br>\r\n    <input type=\"submit\" [value]=\"isNew ? 'Create Category' : 'Update Category'\">\r\n    <div *ngIf=\"isWaitingForServer\">\r\n      Processing server request ...\r\n    </div>\r\n    <div *ngIf=\"error\" class=\"form-error\">\r\n      {{error}}\r\n    </div>\r\n  </form>\r\n</ng-template>\r\n<ng-template #loadingBlock>\r\n  fetching category ...\r\n</ng-template>\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/category/category-detail/category-detail.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/category/category-detail/category-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_api_service__ = __webpack_require__("../../../../../src/app/shared/services/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CategoryDetailComponent = /** @class */ (function () {
    function CategoryDetailComponent(route, router, apiService) {
        this.route = route;
        this.router = router;
        this.apiService = apiService;
        this.item = null;
        this.isNew = false;
        this.isWaitingForServer = false;
        this.error = null;
    }
    CategoryDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var id = parseInt(params.id, 10);
            if (Number.isNaN(id) || id === -1) {
                _this.item = {
                    id: -1,
                    name: ""
                };
                _this.isNew = true;
            }
            else {
                _this.apiService.get("category/get/" + id).then(function (result) {
                    _this.item = result.category;
                    // If invalid quiz then route back to quiz list
                    if (!_this.item) {
                        _this.router.navigate(['/admin/categories']);
                    }
                });
            }
        });
    };
    CategoryDetailComponent.prototype.createItem = function () {
        var _this = this;
        this.isWaitingForServer = true;
        this.error = null;
        this.apiService.post("category/create", this.item)
            .then(function (result) {
            // If quiz isn't null
            if (result.category) {
                _this.item.id = result.category.id;
                // If success show that it was updated?
                _this.isNew = false;
                _this.router.navigate(['/admin/category/' + result.category.id]);
            }
            else {
                _this.error = result.error;
            }
            _this.isWaitingForServer = false;
        });
    };
    CategoryDetailComponent.prototype.updateItem = function () {
        var _this = this;
        this.isWaitingForServer = true;
        this.error = null;
        this.apiService.post("category/update", this.item)
            .then(function (result) {
            if (result.success) {
            }
            else {
                _this.error = result.error;
            }
            _this.isWaitingForServer = false;
        });
    };
    CategoryDetailComponent.prototype.onSubmit = function (form) {
        if (form.valid) {
            if (this.isNew) {
                this.createItem();
            }
            else {
                this.updateItem();
            }
        }
    };
    CategoryDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-admin-category-detail',
            template: __webpack_require__("../../../../../src/app/admin/category/category-detail/category-detail.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/category/category-detail/category-detail.component.less")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_1__shared_services_api_service__["a" /* ApiService */]])
    ], CategoryDetailComponent);
    return CategoryDetailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/admin/category/category-list/category-list.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Categories</h1>\r\n<a [routerLink]=\"['../category', -1]\">Create new category</a>\r\n\r\n<app-admin-entity-list\r\n  [entities]=\"items\"\r\n  [keys]=\"['name']\"\r\n  [keysPretty]=\"{ 'name': 'Category Name' }\"\r\n  [editUrl]=\"'../category'\"\r\n  [removeUrl]=\"'category/remove'\"\r\n>\r\n</app-admin-entity-list>\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/category/category-list/category-list.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/category/category-list/category-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_api_service__ = __webpack_require__("../../../../../src/app/shared/services/api.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CategoryListComponent = /** @class */ (function () {
    function CategoryListComponent(apiService) {
        this.apiService = apiService;
        this.items = [];
    }
    CategoryListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.get("category/get").then(function (response) {
            _this.items = response.categories || [];
        });
    };
    CategoryListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-admin-category-list',
            template: __webpack_require__("../../../../../src/app/admin/category/category-list/category-list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/category/category-list/category-list.component.less")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__shared_services_api_service__["a" /* ApiService */]])
    ], CategoryListComponent);
    return CategoryListComponent;
}());



/***/ }),

/***/ "../../../../../src/app/admin/phrases/phrases-detail/phrases-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"item && categories.length > 0; then itemBlock else loadingBlock;\"></div>\r\n<ng-template #itemBlock>\r\n  <form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f)\" >\r\n    <h1>Phrase - {{item.finnish}}</h1>\r\n    <div class=\"form-group\">\r\n      <label for=\"finnish\">Finnish:</label>\r\n      <input type=\"text\" id=\"finnish\" name=\"finnish\" required [(ngModel)]=\"item.finnish\">\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"english\">English:</label>\r\n      <input type=\"text\" id=\"english\" name=\"english\" required [(ngModel)]=\"item.english\">\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"note\">Note:</label>\r\n      <input type=\"text\" id=\"note\" name=\"note\" [(ngModel)]=\"item.note\">\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"category\">Category</label>\r\n      <select id=\"category\" name=\"category\" [(ngModel)]=\"item.category\">\r\n        <option *ngFor=\"let category of categories\"\r\n                [ngValue]=\"category\"\r\n        >{{category.name}}</option>\r\n      </select>\r\n    </div>\r\n    <br>\r\n    <input type=\"submit\" [value]=\"isNew ? 'Create Phrase' : 'Update Phrase'\">\r\n    <div *ngIf=\"isWaitingForServer\">\r\n      Processing server request ...\r\n    </div>\r\n    <div *ngIf=\"error\" class=\"form-error\">\r\n      {{error}}\r\n    </div>\r\n  </form>\r\n</ng-template>\r\n<ng-template #loadingBlock>\r\n  fetching phrase ...\r\n  <div *ngIf=\"error\" class=\"form-error\">\r\n    {{error}}\r\n  </div>\r\n</ng-template>\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/phrases/phrases-detail/phrases-detail.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/phrases/phrases-detail/phrases-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhrasesDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_api_service__ = __webpack_require__("../../../../../src/app/shared/services/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PhrasesDetailComponent = /** @class */ (function () {
    function PhrasesDetailComponent(route, router, apiService) {
        this.route = route;
        this.router = router;
        this.apiService = apiService;
        this.item = null;
        this.isNew = false;
        this.categories = [];
        this.isWaitingForServer = false;
        this.error = null;
    }
    PhrasesDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        /**
         * Try and set the actual category reference so ngModel works properly.
         */
        var trySetCategory = function () {
            if (_this.categories.length > 0 && _this.item) {
                var category = _this.categories.find(function (item) {
                    return item.id === _this.item.category.id;
                });
                _this.item.category = category;
            }
        };
        // Get all categories
        this.apiService.get("category/get").then(function (result) {
            // If server would return faulty
            if (!result.categories || result.categories.length <= 0) {
                _this.error = "Failed to load categories.";
            }
            else {
                _this.categories = result.categories;
            }
            trySetCategory();
        });
        this.route.params.subscribe(function (params) {
            var id = parseInt(params.id, 10);
            if (Number.isNaN(id) || id === -1) {
                _this.item = {
                    id: -1,
                    finnish: "",
                    english: "",
                    note: "",
                    // This category will be replaced as soon as trySetCategory() is finished
                    category: {
                        id: 1,
                        name: ""
                    }
                };
                _this.isNew = true;
                trySetCategory();
            }
            else {
                _this.apiService.get("phrase/get/" + id).then(function (result) {
                    _this.item = result.phrase;
                    // If invalid quiz then route back to quiz list
                    if (!_this.item) {
                        _this.router.navigate(['/admin/phrases']);
                        return;
                    }
                    trySetCategory();
                });
            }
        });
    };
    PhrasesDetailComponent.prototype.createItem = function () {
        var _this = this;
        this.isWaitingForServer = true;
        this.error = null;
        this.apiService.post("phrase/create", {
            id: this.item.id,
            finnish: this.item.finnish,
            english: this.item.english,
            note: this.item.note,
            categoryId: this.item.category.id,
            categoryName: this.item.category.name
        })
            .then(function (result) {
            // If quiz isn't null
            if (result.phrase) {
                _this.item.id = result.phrase.id;
                // If success show that it was updated?
                _this.isNew = false;
                _this.router.navigate(['/admin/phrase/' + result.phrase.id]);
            }
            else {
                _this.error = result.error;
            }
            _this.isWaitingForServer = false;
        });
    };
    PhrasesDetailComponent.prototype.updateItem = function () {
        var _this = this;
        this.isWaitingForServer = true;
        this.error = null;
        this.apiService.post("phrase/update", {
            id: this.item.id,
            finnish: this.item.finnish,
            english: this.item.english,
            note: this.item.note,
            categoryId: this.item.category.id,
            categoryName: this.item.category.name
        })
            .then(function (result) {
            if (result.success) {
            }
            else {
                _this.error = result.error;
            }
            _this.isWaitingForServer = false;
        });
    };
    PhrasesDetailComponent.prototype.onSubmit = function (form) {
        if (form.valid) {
            if (this.isNew) {
                this.createItem();
            }
            else {
                this.updateItem();
            }
        }
    };
    PhrasesDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-admin-phrases-detail',
            template: __webpack_require__("../../../../../src/app/admin/phrases/phrases-detail/phrases-detail.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/phrases/phrases-detail/phrases-detail.component.less")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_1__shared_services_api_service__["a" /* ApiService */]])
    ], PhrasesDetailComponent);
    return PhrasesDetailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/admin/phrases/phrases-list/phrases-list.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Phrases</h1>\r\n<a [routerLink]=\"['../phrase', -1]\">Create new phrase</a>\r\n<ul class=\"item-list\">\r\n  <li *ngFor=\"let phrasesByCategory of phrasesByCategories\">\r\n    <h2>{{phrasesByCategory.category.name}}</h2>\r\n    <app-admin-entity-list\r\n       [entities]=\"phrasesByCategory.phrases\"\r\n       [editUrl]=\"'../phrase'\"\r\n       [removeUrl]=\"'phrase/remove'\"\r\n       [keys]=\"['finnish']\"\r\n       [titles]=\"{ 'finnish': 'english' }\"\r\n       [keysPretty]=\"{ 'finnish': 'Finnish' }\"\r\n       (removed)=\"removedPhrase($event)\"\r\n    >\r\n    </app-admin-entity-list>\r\n  </li>\r\n</ul>\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/phrases/phrases-list/phrases-list.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "ul {\n  padding: 0 0 0 0px;\n  list-style: none;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/phrases/phrases-list/phrases-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhrasesListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_api_service__ = __webpack_require__("../../../../../src/app/shared/services/api.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PhrasesListComponent = /** @class */ (function () {
    function PhrasesListComponent(apiService) {
        this.apiService = apiService;
        this.phrasesByCategories = [];
    }
    PhrasesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.get("phrase/get").then(function (response) {
            var phrases = response.phrases || [];
            var _loop_1 = function (i) {
                var phrase = phrases[i];
                var phraseByCategory = _this.phrasesByCategories.find(function (item) {
                    return item.category.id === phrase.category.id;
                });
                if (!phraseByCategory) {
                    phraseByCategory = {
                        category: phrase.category,
                        phrases: []
                    };
                    _this.phrasesByCategories.push(phraseByCategory);
                }
                phraseByCategory.phrases.push(phrase);
            };
            for (var i = 0; i < phrases.length; i++) {
                _loop_1(i);
            }
        });
    };
    /**
     * Remove the phrase from the PhrasesByCategories list
     * @param {Phrase} phrase
     */
    PhrasesListComponent.prototype.removedPhrase = function (phrase) {
        var phrasesByCategory = this.phrasesByCategories.find(function (item) {
            return item.category.id === phrase.category.id;
        });
        var index = phrasesByCategory.phrases.indexOf(phrase);
        if (index !== -1) {
            phrasesByCategory.phrases.splice(index, 1);
        }
        if (phrasesByCategory.phrases.length <= 0) {
            var categoryListIndex = this.phrasesByCategories.indexOf(phrasesByCategory);
            this.phrasesByCategories.splice(categoryListIndex, 1);
        }
    };
    PhrasesListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-admin-phrases-list',
            template: __webpack_require__("../../../../../src/app/admin/phrases/phrases-list/phrases-list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/phrases/phrases-list/phrases-list.component.less")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__shared_services_api_service__["a" /* ApiService */]])
    ], PhrasesListComponent);
    return PhrasesListComponent;
}());



/***/ }),

/***/ "../../../../../src/app/admin/phrases/phrases-quiz-selection/phrases-quiz-selection.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"selected-phrases phrases\">\r\n  <h2>Selected Phrases for quiz:</h2>\r\n  <p *ngIf=\"selectedError !== ''\" class=\"form-error\">\r\n    {{selectedError}}\r\n  </p>\r\n  <app-phrases-selection [phrases]=\"selectedPhrases\" [emptySelection]=\"'No phrases selected for quiz'\" (phraseClick)=\"removePhraseFromQuiz($event, true)\"></app-phrases-selection>\r\n</div>\r\n<hr>\r\n<div class=\"unselected-phrases phrases\">\r\n  <h2>All unselected phrases:</h2>\r\n  <p *ngIf=\"unselectedError !== ''\" class=\"form-error\">\r\n    {{unselectedError}}\r\n  </p>\r\n  <app-phrases-selection [phrases]=\"unselectedPhrases\" [emptySelection]=\"'No phrases left to add to quiz'\" (phraseClick)=\"addPhraseToQuiz($event, true)\"></app-phrases-selection>\r\n</div>\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/phrases/phrases-quiz-selection/phrases-quiz-selection.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".phrases {\n  margin: 15px 0;\n}\n.phrases h2 {\n  margin: 5px 0;\n}\nhr {\n  height: 4px;\n  background-color: black;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/phrases/phrases-quiz-selection/phrases-quiz-selection.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhrasesQuizSelectionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_api_service__ = __webpack_require__("../../../../../src/app/shared/services/api.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PhrasesQuizSelectionComponent = /** @class */ (function () {
    function PhrasesQuizSelectionComponent(apiService) {
        this.apiService = apiService;
        this.quizId = -1;
        this.selectedPhrases = [];
        this.unselectedPhrases = [];
        this.selectedError = "";
        this.unselectedError = "";
    }
    PhrasesQuizSelectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Get all phrases from server so we can remove the selected ones from the list
        this.apiService.get("phrase/get").then(function (result) {
            var phrases = result.phrases || [];
            // Filter out selected ones
            _this.unselectedPhrases = phrases.filter(function (phrase) {
                // Check if selectedPhrases contains one item with the same id
                var isSelected = _this.selectedPhrases.find(function (selectedPhrase) {
                    return selectedPhrase.id === phrase.id;
                });
                return !isSelected;
            });
        });
    };
    /**
     * Move the phrase from unselectedPhrases to selectedPhrases.
     * Also tells the server to update database with the new phrase.
     * @param {Phrase} phrase
     * @param {boolean} sendRequest
     */
    PhrasesQuizSelectionComponent.prototype.addPhraseToQuiz = function (phrase, sendRequest) {
        var _this = this;
        this.selectedPhrases.push(phrase);
        var index = this.unselectedPhrases.indexOf(phrase);
        this.unselectedPhrases.splice(index, 1);
        if (sendRequest) {
            this.selectedError = "";
            this.apiService.post("quiz/addphrase", {
                quizId: this.quizId,
                phraseId: phrase.id
            }).then(function (result) {
                if (!result.success) {
                    _this.selectedError = result.error;
                    // Move it back to unselected, also since updating database failed theres no need to tell database.
                    _this.removePhraseFromQuiz(phrase, false);
                }
            });
        }
    };
    /**
     * Remove the phrase from selectedPhrases and add it to unselectedPhrases.
     * Also tells the server to remove phrase from quiz in database.
     * @param {Phrase} phrase
     * @param {boolean} sendRequest
     */
    PhrasesQuizSelectionComponent.prototype.removePhraseFromQuiz = function (phrase, sendRequest) {
        var _this = this;
        this.unselectedPhrases.push(phrase);
        var index = this.selectedPhrases.indexOf(phrase);
        this.selectedPhrases.splice(index, 1);
        if (sendRequest) {
            this.unselectedError = "";
            this.apiService.post("quiz/removephrase", {
                quizId: this.quizId,
                phraseId: phrase.id
            }).then(function (result) {
                if (!result.success) {
                    _this.unselectedError = "";
                    _this.addPhraseToQuiz(phrase, false);
                }
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], PhrasesQuizSelectionComponent.prototype, "quizId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], PhrasesQuizSelectionComponent.prototype, "selectedPhrases", void 0);
    PhrasesQuizSelectionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-admin-phrases-quiz-selection',
            template: __webpack_require__("../../../../../src/app/admin/phrases/phrases-quiz-selection/phrases-quiz-selection.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/phrases/phrases-quiz-selection/phrases-quiz-selection.component.less")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__shared_services_api_service__["a" /* ApiService */]])
    ], PhrasesQuizSelectionComponent);
    return PhrasesQuizSelectionComponent;
}());



/***/ }),

/***/ "../../../../../src/app/admin/quiz/quiz-detail/quiz-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"quiz; then quizBlock else loadingBlock;\"></div>\r\n<ng-template #quizBlock>\r\n  <form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f)\" >\r\n    <h1>Quiz - {{quiz.name}}</h1>\r\n    <div class=\"form-group\">\r\n      <label for=\"name\">Name:</label>\r\n      <input type=\"text\" id=\"name\" name=\"name\" required [(ngModel)]=\"quiz.name\">\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"description\">Description</label>\r\n      <input type=\"text\" id=\"description\" name=\"description\" required [(ngModel)]=\"quiz.description\" >\r\n    </div>\r\n    <br>\r\n    <input type=\"submit\" [value]=\"isNew ? 'Create Quiz' : 'Update Quiz'\">\r\n\r\n    <div *ngIf=\"isWaitingForServer\">\r\n      Processing server request ...\r\n    </div>\r\n    <div *ngIf=\"error\" class=\"form-error\">\r\n      {{error}}\r\n    </div>\r\n\r\n    <!-- Add phrases editing component-->\r\n    <app-admin-phrases-quiz-selection *ngIf=\"!isNew\" [selectedPhrases]=\"quiz.phrases\" [quizId]=\"quiz.id\" ></app-admin-phrases-quiz-selection>\r\n  </form>\r\n</ng-template>\r\n<ng-template #loadingBlock>\r\n  fetching quiz ...\r\n</ng-template>\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/quiz/quiz-detail/quiz-detail.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "form {\n  width: 100%;\n}\nlabel {\n  display: inline-block;\n  min-width: 100px;\n}\n.form-group input,\n.form-group select {\n  width: 100%;\n  max-width: 300px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/quiz/quiz-detail/quiz-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuizDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_api_service__ = __webpack_require__("../../../../../src/app/shared/services/api.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var QuizDetailComponent = /** @class */ (function () {
    function QuizDetailComponent(route, router, apiService) {
        this.route = route;
        this.router = router;
        this.apiService = apiService;
        this.quiz = null;
        this.isNew = false;
        this.isWaitingForServer = false;
        this.error = null;
    }
    QuizDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var id = parseInt(params.id, 10);
            if (Number.isNaN(id) || id === -1) {
                _this.quiz = {
                    id: -1,
                    name: "",
                    description: "",
                    phrases: []
                };
                _this.isNew = true;
            }
            else {
                _this.apiService.get("quiz/get/" + id).then(function (result) {
                    _this.quiz = result.quiz;
                    // If invalid quiz then route back to quiz list
                    if (!_this.quiz) {
                        _this.router.navigate(['/admin/quizzes']);
                    }
                });
            }
        });
    };
    /**
     * Create the Quiz in database and navigate to the new quiz url.
     */
    QuizDetailComponent.prototype.createQuiz = function () {
        var _this = this;
        this.isWaitingForServer = true;
        this.error = null;
        this.apiService.post("quiz/create", this.quiz)
            .then(function (result) {
            // If quiz isn't null
            if (result.quiz) {
                _this.quiz.id = result.quiz.id;
                // If success show that it was updated?
                _this.isNew = false;
                _this.router.navigate(['/admin/quiz/' + result.quiz.id]);
            }
            else {
                _this.error = result.error;
            }
            _this.isWaitingForServer = false;
        });
    };
    /**
     * Update the quiz data
     */
    QuizDetailComponent.prototype.updateQuiz = function () {
        var _this = this;
        this.isWaitingForServer = true;
        this.error = null;
        this.apiService.post("quiz/update", this.quiz)
            .then(function (result) {
            if (result.success) {
            }
            else {
                _this.error = result.error;
            }
            _this.isWaitingForServer = false;
        });
    };
    QuizDetailComponent.prototype.onSubmit = function (form) {
        if (form.valid) {
            if (this.isNew) {
                this.createQuiz();
            }
            else {
                this.updateQuiz();
            }
        }
    };
    QuizDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-admin-quiz-detail',
            template: __webpack_require__("../../../../../src/app/admin/quiz/quiz-detail/quiz-detail.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/quiz/quiz-detail/quiz-detail.component.less")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_2__shared_services_api_service__["a" /* ApiService */]])
    ], QuizDetailComponent);
    return QuizDetailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/admin/quiz/quiz-list/quiz-list.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Quizzes</h1>\r\n<a [routerLink]=\"['../quiz', -1]\">Create new quiz</a>\r\n\r\n<app-admin-entity-list\r\n  [entities]=\"quizzes\"\r\n  [editUrl]=\"'../quiz'\"\r\n  [removeUrl]=\"'quiz/remove'\"\r\n  [keys]=\"['name', 'description']\"\r\n  [keysPretty]=\"{ 'name': 'Quiz Name', 'description': 'Description' }\"\r\n  >\r\n</app-admin-entity-list>\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/quiz/quiz-list/quiz-list.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/quiz/quiz-list/quiz-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuizListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_api_service__ = __webpack_require__("../../../../../src/app/shared/services/api.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var QuizListComponent = /** @class */ (function () {
    function QuizListComponent(apiService) {
        this.apiService = apiService;
        this.quizzes = [];
    }
    QuizListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.get("quiz/get").then(function (result) {
            _this.quizzes = result.quizzes || [];
        });
    };
    QuizListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "app-admin-quiz-list",
            template: __webpack_require__("../../../../../src/app/admin/quiz/quiz-list/quiz-list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/quiz/quiz-list/quiz-list.component.less")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__shared_services_api_service__["a" /* ApiService */]])
    ], QuizListComponent);
    return QuizListComponent;
}());



/***/ }),

/***/ "../../../../../src/app/admin/shared/entity-list/entity-list.component.html":
/***/ (function(module, exports) {

module.exports = "<table>\r\n  <thead>\r\n    <tr>\r\n      <td *ngFor=\"let key of keys\">\r\n        {{keysPretty[key]}}\r\n      </td>\r\n      <td>Actions</td>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <tr *ngFor=\"let entity of entities\" class=\"item-tiled\">\r\n      <td *ngFor=\"let key of keys\" [title]=\"getTitle(entity, key)\">{{entity[key]}}</td>\r\n      <td class=\"actions\">\r\n        <a [routerLink]=\"[editUrl, entity.id]\" class=\"edit-btn\">edit</a>\r\n        <button (click)=\"remove(entity)\">remove</button>\r\n      </td>\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/shared/entity-list/entity-list.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "table {\n  width: 100%;\n  text-align: left;\n  -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);\n          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);\n}\nthead {\n  font-size: 14px;\n  text-transform: uppercase;\n  background-color: silver;\n}\ntd {\n  padding: 5px;\n}\ntd:first-child {\n  font-weight: bold;\n}\ntbody tr:hover {\n  background-color: aquamarine !important;\n}\ntbody tr:nth-child(even) {\n  background-color: #badbad;\n}\ntbody tr:nth-child(odd) {\n  background-color: #E6E6FA;\n}\n.edit-btn {\n  margin: 0 5px;\n}\n.actions {\n  width: 135px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/shared/entity-list/entity-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntityListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_api_service__ = __webpack_require__("../../../../../src/app/shared/services/api.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EntityListComponent = /** @class */ (function () {
    function EntityListComponent(apiService) {
        this.apiService = apiService;
        this.entities = [];
        this.keys = [];
        this.keysPretty = {};
        this.editUrl = "";
        this.titles = {};
        this.removed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    EntityListComponent.prototype.ngOnInit = function () {
    };
    EntityListComponent.prototype.getTitle = function (entity, key) {
        if (this.titles[key]) {
            return entity[this.titles[key]];
        }
        return "";
    };
    EntityListComponent.prototype.remove = function (entity) {
        var _this = this;
        this.apiService.post(this.removeUrl, entity)
            .then(function (result) {
            if (result.success) {
                var index = _this.entities.indexOf(entity);
                if (index !== -1) {
                    _this.entities.splice(index, 1);
                    _this.removed.emit(entity);
                }
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], EntityListComponent.prototype, "entities", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], EntityListComponent.prototype, "keys", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], EntityListComponent.prototype, "keysPretty", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], EntityListComponent.prototype, "editUrl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], EntityListComponent.prototype, "removeUrl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], EntityListComponent.prototype, "titles", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], EntityListComponent.prototype, "removed", void 0);
    EntityListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-admin-entity-list',
            template: __webpack_require__("../../../../../src/app/admin/shared/entity-list/entity-list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/shared/entity-list/entity-list.component.less")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__shared_services_api_service__["a" /* ApiService */]])
    ], EntityListComponent);
    return EntityListComponent;
}());



/***/ }),

/***/ "../../../../../src/app/admin/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__entity_list_entity_list_component__ = __webpack_require__("../../../../../src/app/admin/shared/entity-list/entity-list.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__entity_list_entity_list_component__["a" /* EntityListComponent */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__entity_list_entity_list_component__["a" /* EntityListComponent */]
            ]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content\">\r\n  <app-header></app-header>\r\n  <router-outlet></router-outlet>\r\n</div>\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.less")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_layout_header_header_component__ = __webpack_require__("../../../../../src/app/shared/layout/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__admin_admin_module__ = __webpack_require__("../../../../../src/app/admin/admin.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home_module__ = __webpack_require__("../../../../../src/app/home/home.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__phrase_phrase_module__ = __webpack_require__("../../../../../src/app/phrase/phrase.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__quiz_quiz_module__ = __webpack_require__("../../../../../src/app/quiz/quiz.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var rootRouting = __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forRoot([]);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_4__shared_layout_header_header_component__["a" /* HeaderComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_7__home_home_module__["a" /* HomeModule */],
                __WEBPACK_IMPORTED_MODULE_8__phrase_phrase_module__["a" /* PhraseModule */],
                __WEBPACK_IMPORTED_MODULE_9__quiz_quiz_module__["a" /* QuizModule */],
                __WEBPACK_IMPORTED_MODULE_5__admin_admin_module__["a" /* AdminModule */],
                rootRouting
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n  Choose between a quiz with already selected phrases.\r\n  <br>\r\n  Or all phrases in a category.\r\n  <br>\r\n  Or select between all available phrases.\r\n</p>\r\n<h1>Quizzes</h1>\r\n<app-quiz-selection [items]=\"quizzes\" (selected)=\"quizSelected($event)\"></app-quiz-selection>\r\n\r\n<h1>Test a category</h1>\r\n<app-quiz-selection  [items]=\"categories\" (selected)=\"categorySelected($event)\"></app-quiz-selection>\r\n\r\n<h1>Select between all phrases</h1>\r\n<button>Click me!!, I do nothing</button>\r\n<hr>\r\n<ng-container *ngIf=\"selectedQuiz; then selectedBlock else needSelectionBlock;\"></ng-container>\r\n<ng-template #selectedBlock>\r\n  <div>\r\n    <h2>Quiz - {{selectedQuiz.name}}</h2>\r\n    <p>\r\n      {{selectedQuiz.description}}\r\n      <br>\r\n      Phrases count: <strong>{{selectedQuiz.phrases.length}}</strong>\r\n      <br>\r\n      <label for=\"quiztype\">Select type of quiz</label>\r\n      <select id=\"quiztype\" name=\"quiztype\" [(ngModel)]=\"quizType\" >\r\n        <option *ngFor=\"let key of QuizTypeKeys\" [value]=\"key\" [label]=\"QuizTypes[key]\" ></option>\r\n      </select>\r\n      <br>\r\n      <button (click)=\"startQuiz()\">Start quiz</button>\r\n    </p>\r\n  </div>\r\n</ng-template>\r\n<ng-template #needSelectionBlock>\r\n  <p *ngIf=\"isFetchingQuiz\">\r\n    Loading quiz...\r\n  </p>\r\n  <p *ngIf=\"error.length > 0\" class=\"form-error\">\r\n    {{error}}\r\n  </p>\r\n  <p *ngIf=\"!isFetchingQuiz && error.length === 0\">\r\n    You need to select a quiz before you can continue.\r\n  </p>\r\n</ng-template>\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/home/home.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_api_service__ = __webpack_require__("../../../../../src/app/shared/services/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__quiz_quiz_service__ = __webpack_require__("../../../../../src/app/quiz/quiz.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_enums_quiz_type_enum__ = __webpack_require__("../../../../../src/app/shared/enums/quiz-type.enum.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomeComponent = /** @class */ (function () {
    function HomeComponent(quizService, apiService, router) {
        this.quizService = quizService;
        this.apiService = apiService;
        this.router = router;
        this.QuizTypes = __WEBPACK_IMPORTED_MODULE_4__shared_enums_quiz_type_enum__["a" /* QuizType */];
        this.quizzes = [];
        this.categories = [];
        // Maintain the quizType from last quiz.
        this.quizType = this.quizService.quizType;
        this.selectedQuiz = null;
        this.isFetchingQuiz = false;
        this.error = "";
        this.QuizTypeKeys = Object.keys(this.QuizTypes).filter(function (key) { return !isNaN(Number(key)); });
    }
    HomeComponent.prototype.ngOnInit = function () {
        // this.apiService.get("quiz/hasphrases").then((result: QuizGetResponse) => {
        //   this.quizzes = result.quizzes || [];
        // });
        var fruitCategory = {
            id: 1,
            name: "Fruit"
        };
        this._testQuiz = {
            id: -1,
            name: "Fruit Quiz",
            description: "Fruits!",
            phrases: [
                {
                    category: fruitCategory,
                    english: "apple",
                    finnish: "omena",
                    id: 1,
                    note: ""
                },
                {
                    category: fruitCategory,
                    english: "banana",
                    finnish: "banaani",
                    id: 2,
                    note: ""
                },
                {
                    category: fruitCategory,
                    english: "orange",
                    finnish: "appelsiini",
                    id: 3,
                    note: ""
                },
                {
                    category: fruitCategory,
                    english: "strawberry",
                    finnish: "mansikka",
                    id: 4,
                    note: ""
                },
                {
                    category: fruitCategory,
                    english: "blueberry",
                    finnish: "mustikka",
                    id: 5,
                    note: ""
                }
            ]
        };
        this.quizzes.push(this._testQuiz);
        this.categories.push(fruitCategory);
        // this.apiService.get("category/hasphrases").then((result: CategoryGetResponse) => {
        //   this.categories = result.categories || [];
        // });
    };
    HomeComponent.prototype.quizSelected = function (quiz) {
        this.setSelectedQuiz(quiz);
        // this.isFetchingQuiz = true;
        // this.selectedQuiz = null;
        // this.error = "";
        //
        // this.apiService.get("quiz/get/" + quiz.id).then((result: QuizGetDetailResponse) => {
        //   this.isFetchingQuiz = false;
        //
        //   if (result.quiz) {
        //     if (result.quiz.phrases.length > 0) {
        //       this.setSelectedQuiz(result.quiz);
        //     }
        //     else {
        //       this.error = "There are no phrases for that quiz.";
        //       const index = this.quizzes.indexOf(quiz);
        //       this.quizzes.splice(index, 1);
        //     }
        //   }
        //   else {
        //     this.error = result.error;
        //   }
        // });
    };
    HomeComponent.prototype.categorySelected = function (category) {
        this.isFetchingQuiz = true;
        this.selectedQuiz = null;
        this.error = "";
        this.setSelectedQuiz(this._testQuiz);
    };
    HomeComponent.prototype.startQuiz = function () {
        if (!this.validateQuiz()) {
            return;
        }
        this.quizService.quiz = this.selectedQuiz;
        // quizType.Text = '0' instead of 0 causing issues
        this.quizService.quizType = parseInt("" + this.quizType, 10);
        this.router.navigate(['quiz']);
    };
    HomeComponent.prototype.setSelectedQuiz = function (quiz) {
        this.selectedQuiz = quiz;
        // TODO: If phrases.length < phrasesPerQuestion then auto select text and maybe even make multiple questions choice invalid
    };
    HomeComponent.prototype.validateQuiz = function () {
        // Make sure quiz is selected
        if (!this.selectedQuiz || this.selectedQuiz.phrases.length <= 0) {
            return false;
        }
        // Make sure quizType is a valid type
        if (!__WEBPACK_IMPORTED_MODULE_4__shared_enums_quiz_type_enum__["a" /* QuizType */][this.quizType]) {
            return false;
        }
        // Make sure the quiz has enough phrases if multiple choices is selected
        if (this.quizType === __WEBPACK_IMPORTED_MODULE_4__shared_enums_quiz_type_enum__["a" /* QuizType */].MultipleChoices && this.selectedQuiz.phrases.length < this.quizService.phrasesPerQuestion) {
            return false;
        }
        return true;
    };
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-home',
            template: __webpack_require__("../../../../../src/app/home/home.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/home.component.less")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__quiz_quiz_service__["a" /* QuizService */], __WEBPACK_IMPORTED_MODULE_1__shared_services_api_service__["a" /* ApiService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/home.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__quiz_quiz_module__ = __webpack_require__("../../../../../src/app/quiz/quiz.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var homeRouting = __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forChild([
    {
        path: "",
        component: __WEBPACK_IMPORTED_MODULE_3__home_component__["a" /* HomeComponent */]
    }
]);
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__quiz_quiz_module__["a" /* QuizModule */],
                homeRouting
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__home_component__["a" /* HomeComponent */]]
        })
    ], HomeModule);
    return HomeModule;
}());



/***/ }),

/***/ "../../../../../src/app/phrase/phrase.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhraseModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__phrases_selection_phrases_selection_component__ = __webpack_require__("../../../../../src/app/phrase/phrases-selection/phrases-selection.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PhraseModule = /** @class */ (function () {
    function PhraseModule() {
    }
    PhraseModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__phrases_selection_phrases_selection_component__["a" /* PhrasesSelectionComponent */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__phrases_selection_phrases_selection_component__["a" /* PhrasesSelectionComponent */]
            ]
        })
    ], PhraseModule);
    return PhraseModule;
}());



/***/ }),

/***/ "../../../../../src/app/phrase/phrases-selection/phrases-selection.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"phrases-by-category-list\">\r\n  <div *ngFor=\"let item of phrasesByCategory\">\r\n    <div *ngIf=\"item.phrases.length > 0\" class=\"phrases-by-category-item\">\r\n      <h3>{{item.category.name}}</h3>\r\n      <ul class=\"phrases-list\">\r\n        <li *ngFor=\"let phrase of item.phrases\" class=\"phrase-item\" title=\"{{phrase.english}}\" (click)=\"onPhraseClicked(phrase)\">\r\n          {{phrase.finnish}}\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n  <div *ngIf=\"phrases.length === 0\">\r\n    <p>\r\n      {{emptySelection}}\r\n    </p>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/phrase/phrases-selection/phrases-selection.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "h3 {\n  margin: 0;\n}\n.phrases-list {\n  margin: 0;\n  list-style: none;\n  padding: 0;\n}\n.phrases-list .phrase-item {\n  display: inline-block;\n  background: -webkit-gradient(linear, left top, left bottom, from(#badbad), to(#a6d095));\n  background: linear-gradient(#badbad, #a6d095);\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);\n  border-radius: 5px;\n  padding: 10px;\n  cursor: pointer;\n  margin-right: 5px;\n  font-weight: bold;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/phrase/phrases-selection/phrases-selection.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhrasesSelectionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PhrasesSelectionComponent = /** @class */ (function () {
    function PhrasesSelectionComponent(_iterableDiffers) {
        this._iterableDiffers = _iterableDiffers;
        this.phrases = [];
        this.phraseClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.phrasesByCategory = [];
        this.m_phrasesDiffer = this._iterableDiffers.find(this.phrases).create(null);
    }
    PhrasesSelectionComponent.prototype.ngOnInit = function () {
    };
    PhrasesSelectionComponent.prototype.ngDoCheck = function () {
        var _this = this;
        var changes = this.m_phrasesDiffer.diff(this.phrases);
        if (changes) {
            changes.forEachAddedItem(function (changeRecord) {
                _this.addPhraseToCategoryList(changeRecord.item);
            });
            changes.forEachRemovedItem(function (changeRecord) {
                _this.removePhraseFromCategoryList(changeRecord.item);
            });
            this.sortPhrasesByCategory();
        }
    };
    PhrasesSelectionComponent.prototype.onPhraseClicked = function (phrase) {
        this.phraseClick.emit(phrase);
    };
    /**
     * Add a phrase to the phrases by category list.
     * @param {Phrase} phrase
     */
    PhrasesSelectionComponent.prototype.addPhraseToCategoryList = function (phrase) {
        var phraseByCategory = this.phrasesByCategory.find(function (item) {
            return item.category.id === phrase.category.id;
        });
        if (!phraseByCategory) {
            phraseByCategory = {
                category: phrase.category,
                phrases: []
            };
            this.phrasesByCategory.push(phraseByCategory);
        }
        phraseByCategory.phrases.push(phrase);
    };
    /**
     * Remove a phrase from phrases by category list.
     * @param {Phrase} phrase
     */
    PhrasesSelectionComponent.prototype.removePhraseFromCategoryList = function (phrase) {
        var phraseByCategory = this.phrasesByCategory.find(function (item) {
            return item.category.id === phrase.category.id;
        });
        if (phraseByCategory) {
            for (var i = 0; i < phraseByCategory.phrases.length; i++) {
                if (phraseByCategory.phrases[i].id === phrase.id) {
                    phraseByCategory.phrases.splice(i, 1);
                    break;
                }
            }
            if (phraseByCategory.phrases.length <= 0) {
                var index = this.phrasesByCategory.indexOf(phraseByCategory);
                this.phrasesByCategory.splice(index, 1);
            }
        }
    };
    /**
     * Sort the phrases by category list by category name
     * Also sorts the phrases inside each category list by the phrase name.
     */
    PhrasesSelectionComponent.prototype.sortPhrasesByCategory = function () {
        // Sort based off category name
        this.phrasesByCategory.sort(function (a, b) {
            var aName = a.category.name.toLowerCase();
            var bName = b.category.name.toLowerCase();
            if (aName < bName) {
                return -1;
            }
            if (aName > bName) {
                return 1;
            }
            return 0;
        });
        this.phrasesByCategory.forEach(function (categoryList) {
            categoryList.phrases.sort(function (a, b) {
                var aName = a.finnish.toLowerCase();
                var bName = b.finnish.toLowerCase();
                if (aName < bName) {
                    return -1;
                }
                if (aName > bName) {
                    return 1;
                }
                return 0;
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], PhrasesSelectionComponent.prototype, "phrases", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], PhrasesSelectionComponent.prototype, "emptySelection", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], PhrasesSelectionComponent.prototype, "phraseClick", void 0);
    PhrasesSelectionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-phrases-selection',
            template: __webpack_require__("../../../../../src/app/phrase/phrases-selection/phrases-selection.component.html"),
            styles: [__webpack_require__("../../../../../src/app/phrase/phrases-selection/phrases-selection.component.less")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* IterableDiffers */]])
    ], PhrasesSelectionComponent);
    return PhrasesSelectionComponent;
}());



/***/ }),

/***/ "../../../../../src/app/quiz/quiz-multiple-question/quiz-multiple-question.component.html":
/***/ (function(module, exports) {

module.exports = "<ul class=\"answers\">\r\n    <li class=\"answer\" *ngFor=\"let option of question.options; let i = index;\">\r\n        <label >\r\n            <input type=\"radio\" name=\"{{'question_' + question.index}}\" value=\"{{i}}\" (change)=\"questionAnswered(i)\">\r\n            <span class=\"answer-text\">{{option.value}}</span>\r\n            <span *ngIf=\"showNote && option.note.length > 0\"> - ( {{option.note}} )</span>\r\n        </label>\r\n    </li>\r\n</ul>\r\n"

/***/ }),

/***/ "../../../../../src/app/quiz/quiz-multiple-question/quiz-multiple-question.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "ul {\n  margin: 5px 0;\n  padding: 0;\n  list-style: none;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/quiz/quiz-multiple-question/quiz-multiple-question.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuizMultipleQuestionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_models_multiple_question__ = __webpack_require__("../../../../../src/app/shared/models/multiple-question.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var QuizMultipleQuestionComponent = /** @class */ (function () {
    function QuizMultipleQuestionComponent() {
        this.question = null;
        this.answered = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.showNote = false;
    }
    QuizMultipleQuestionComponent.prototype.ngOnInit = function () {
        if (this.checkIdenticalOptions()) {
            this.showNote = true;
        }
    };
    QuizMultipleQuestionComponent.prototype.questionAnswered = function (answer) {
        this.question.answer = answer;
        this.answered.emit(this.question);
    };
    /**
     * Check if the options are identical in value.
     * It splits the /
     * @return {boolean}
     */
    QuizMultipleQuestionComponent.prototype.checkIdenticalOptions = function () {
        for (var a = 0; a < this.question.options.length; a++) {
            var optionsA = this.question.options[a].value.split('/').map(function (value) {
                return value.trim().toLowerCase();
            });
            for (var b = 0; b < this.question.options.length; b++) {
                if (b === a) {
                    continue;
                }
                var optionsB = this.question.options[b].value.split('/').map(function (value) {
                    return value.trim().toLowerCase();
                });
                for (var i = 0; i < optionsB.length; i++) {
                    if (optionsA.includes(optionsB[i])) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__shared_models_multiple_question__["a" /* MultipleQuestion */])
    ], QuizMultipleQuestionComponent.prototype, "question", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], QuizMultipleQuestionComponent.prototype, "answered", void 0);
    QuizMultipleQuestionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-quiz-multiple-question',
            template: __webpack_require__("../../../../../src/app/quiz/quiz-multiple-question/quiz-multiple-question.component.html"),
            styles: [__webpack_require__("../../../../../src/app/quiz/quiz-multiple-question/quiz-multiple-question.component.less")]
        }),
        __metadata("design:paramtypes", [])
    ], QuizMultipleQuestionComponent);
    return QuizMultipleQuestionComponent;
}());



/***/ }),

/***/ "../../../../../src/app/quiz/quiz-question/quiz-question.component.html":
/***/ (function(module, exports) {

module.exports = "<div [ngClass]=\"{ 'question-passed': (isReviewed && question.isCorrect), 'question-failed': (isReviewed && !question.isCorrect), 'question-container': true }\">\r\n  <strong class=\"question-index\">{{question.index + 1}}:</strong>\r\n  <strong class=\"question-question\">{{question.question}}</strong>\r\n  <span class=\"question-note\" *ngIf=\"question.note.length > 0\"> - ( {{question.note}} )</span>\r\n  <br>\r\n  <div class=\"question-answers\">\r\n    <app-quiz-text-question\r\n    *ngIf=\"type === QuizTypes.Text\"\r\n    [question]=\"question\"\r\n    [isReviewed]=\"isReviewed\"\r\n    (answered)=\"questionAnswered($event)\"\r\n    ></app-quiz-text-question>\r\n\r\n    <app-quiz-multiple-question\r\n      *ngIf=\"type === QuizTypes.MultipleChoices\"\r\n      [question]=\"question\"\r\n      (answered)=\"questionAnswered($event)\"\r\n    ></app-quiz-multiple-question>\r\n\r\n    <p *ngIf=\"error.length > 0\" class=\"form-error\">\r\n      {{error}};\r\n    </p>\r\n  </div>\r\n</div>\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/quiz/quiz-question/quiz-question.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".question-container {\n  padding: 5px;\n  height: 100%;\n}\n.question-question {\n  text-transform: capitalize;\n}\n.question-note {\n  font-weight: lighter;\n  font-style: italic;\n}\n.question-passed {\n  background-color: #badbad;\n}\n.question-failed {\n  background-color: lightcoral;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/quiz/quiz-question/quiz-question.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuizQuestionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_enums_quiz_type_enum__ = __webpack_require__("../../../../../src/app/shared/enums/quiz-type.enum.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_models_text_question__ = __webpack_require__("../../../../../src/app/shared/models/text-question.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_models_multiple_question__ = __webpack_require__("../../../../../src/app/shared/models/multiple-question.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var QuizQuestionComponent = /** @class */ (function () {
    function QuizQuestionComponent() {
        this.question = null;
        this.answered = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.isReviewed = false;
        this.error = "";
        this.QuizTypes = __WEBPACK_IMPORTED_MODULE_1__shared_enums_quiz_type_enum__["a" /* QuizType */];
    }
    QuizQuestionComponent.prototype.ngOnInit = function () {
        if (this.question instanceof __WEBPACK_IMPORTED_MODULE_2__shared_models_text_question__["a" /* TextQuestion */]) {
            this.type = __WEBPACK_IMPORTED_MODULE_1__shared_enums_quiz_type_enum__["a" /* QuizType */].Text;
        }
        else if (this.question instanceof __WEBPACK_IMPORTED_MODULE_3__shared_models_multiple_question__["a" /* MultipleQuestion */]) {
            this.type = __WEBPACK_IMPORTED_MODULE_1__shared_enums_quiz_type_enum__["a" /* QuizType */].MultipleChoices;
        }
        else {
            this.error = "Unknown question";
        }
    };
    QuizQuestionComponent.prototype.questionAnswered = function (question) {
        this.answered.emit(question);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], QuizQuestionComponent.prototype, "question", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], QuizQuestionComponent.prototype, "isReviewed", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], QuizQuestionComponent.prototype, "answered", void 0);
    QuizQuestionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-quiz-question',
            template: __webpack_require__("../../../../../src/app/quiz/quiz-question/quiz-question.component.html"),
            styles: [__webpack_require__("../../../../../src/app/quiz/quiz-question/quiz-question.component.less")]
        }),
        __metadata("design:paramtypes", [])
    ], QuizQuestionComponent);
    return QuizQuestionComponent;
}());



/***/ }),

/***/ "../../../../../src/app/quiz/quiz-selection/quiz-selection.component.html":
/***/ (function(module, exports) {

module.exports = "<p *ngIf=\"!items.length\">\r\n  Loading ...\r\n</p>\r\n<ul class=\"items-list\">\r\n  <li *ngFor=\"let item of items\" [title]=\"item.description\" (click)=\"itemClicked(item)\" class=\"item-item\" >\r\n    {{item.name}}\r\n  </li>\r\n</ul>\r\n"

/***/ }),

/***/ "../../../../../src/app/quiz/quiz-selection/quiz-selection.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".items-list {\n  margin: 0;\n  list-style: none;\n  padding: 0;\n}\n.items-list .item-item {\n  display: inline-block;\n  background: -webkit-gradient(linear, left top, left bottom, from(#badbad), to(#a6d095));\n  background: linear-gradient(#badbad, #a6d095);\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);\n  border-radius: 5px;\n  padding: 10px;\n  cursor: pointer;\n  margin-right: 5px;\n  font-weight: bold;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/quiz/quiz-selection/quiz-selection.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuizSelectionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var QuizSelectionComponent = /** @class */ (function () {
    function QuizSelectionComponent() {
        this.items = [];
        this.selected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    QuizSelectionComponent.prototype.ngOnInit = function () {
    };
    QuizSelectionComponent.prototype.itemClicked = function (item) {
        this.selected.emit(item);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], QuizSelectionComponent.prototype, "items", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], QuizSelectionComponent.prototype, "selected", void 0);
    QuizSelectionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-quiz-selection',
            template: __webpack_require__("../../../../../src/app/quiz/quiz-selection/quiz-selection.component.html"),
            styles: [__webpack_require__("../../../../../src/app/quiz/quiz-selection/quiz-selection.component.less")]
        }),
        __metadata("design:paramtypes", [])
    ], QuizSelectionComponent);
    return QuizSelectionComponent;
}());



/***/ }),

/***/ "../../../../../src/app/quiz/quiz-text-question/quiz-text-question.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"answers\">\r\n  <input #questionInput\r\n         class=\"answer-text-input\"\r\n         [(ngModel)]=\"question.answer\"\r\n         (change)=\"questionAnswered()\"\r\n         (keyup)=\"tryFocusNext($event)\"\r\n         [placeholder]=\"getPlaceholderText()\"\r\n         [tabindex]=\"question.isCorrect ? -1 : 0\"\r\n         [readonly]=\"question.isCorrect\"\r\n  >\r\n  <button *ngIf=\"isReviewed && !question.isCorrect && !revealAnswers\"\r\n          (click)=\"revealAnswers = true;\"\r\n          class=\"reveal\"\r\n          tabindex=\"-1\"\r\n  >Reveal Answer</button>\r\n  <sub *ngIf=\"revealAnswers && !question.isCorrect\" class=\"reveal\"> {{ question.getCorrectAnswers().join('/') }} </sub>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/quiz/quiz-text-question/quiz-text-question.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".answers {\n  padding: 5px;\n}\ninput {\n  padding: 5px;\n  width: 100%;\n}\ninput[readonly] {\n  background-color: #EEE;\n}\n.reveal {\n  margin-top: 5px;\n}\nsub.reveal {\n  font-style: italic;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/quiz/quiz-text-question/quiz-text-question.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuizTextQuestionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_models_text_question__ = __webpack_require__("../../../../../src/app/shared/models/text-question.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var QuizTextQuestionComponent = /** @class */ (function () {
    function QuizTextQuestionComponent() {
        this.question = null;
        this.isReviewed = false;
        this.answered = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.revealAnswers = false;
    }
    QuizTextQuestionComponent.prototype.ngOnInit = function () {
    };
    QuizTextQuestionComponent.prototype.questionAnswered = function () {
        this.answered.emit(this.question);
    };
    QuizTextQuestionComponent.prototype.getPlaceholderText = function () {
        if (this.question.isFinnish) {
            return "K\u00E4\u00E4nn\u00E4 \"" + this.question.question + "\" englanniksi";
        }
        else {
            return "K\u00E4\u00E4nn\u00E4 \"" + this.question.question + "\" suomeksi";
        }
    };
    QuizTextQuestionComponent.prototype.tryFocusNext = function (event) {
        // 13 == Enter
        if (event.which === 13) {
            var currentInput = this.inputElement.nativeElement;
            var nodeList = document.querySelectorAll(".answer-text-input");
            var nextInput = null;
            var foundInputElement = false;
            // Iterate over all nodelist items with tabIndex === -1
            // Check if inputElement == currentInput element to set that it has found the input element
            for (var i = 0; i < nodeList.length; i++) {
                var inputElement = nodeList.item(i);
                // Exclude the this components element
                if (inputElement === currentInput) {
                    foundInputElement = true;
                    continue;
                }
                // Exclude elements that doesn't have a tabIndex,  for example their question is correct!
                if (inputElement.tabIndex === -1) {
                    continue;
                }
                // If the foundInputElement is true then the next item we find is the nextInput element
                // Also break out of the forloop as we've found what we're looking for!
                if (foundInputElement) {
                    nextInput = inputElement;
                    break;
                }
                // If null set nextInput as first found so if there are no elements after the inputElement it'll go circle back to the first elements.
                if (!nextInput) {
                    nextInput = inputElement;
                }
            }
            // If no nextInput was found then there is no element to focus!
            if (!nextInput) {
                return;
            }
            event.preventDefault();
            nextInput.focus();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__shared_models_text_question__["a" /* TextQuestion */])
    ], QuizTextQuestionComponent.prototype, "question", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], QuizTextQuestionComponent.prototype, "isReviewed", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], QuizTextQuestionComponent.prototype, "answered", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('questionInput'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], QuizTextQuestionComponent.prototype, "inputElement", void 0);
    QuizTextQuestionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-quiz-text-question',
            template: __webpack_require__("../../../../../src/app/quiz/quiz-text-question/quiz-text-question.component.html"),
            styles: [__webpack_require__("../../../../../src/app/quiz/quiz-text-question/quiz-text-question.component.less")]
        }),
        __metadata("design:paramtypes", [])
    ], QuizTextQuestionComponent);
    return QuizTextQuestionComponent;
}());



/***/ }),

/***/ "../../../../../src/app/quiz/quiz.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"questions-list\">\r\n  <div *ngFor=\"let question of questions;\" [ngClass]=\"{ 'question-hidden': !question.visible, 'question-item': true }\">\r\n    <app-quiz-question [question]=\"question\" [isReviewed]=\"isReviewed\" (answered)=\"questionAnswered($event)\"></app-quiz-question>\r\n  </div>\r\n</div>\r\n<div *ngIf=\"answeredQuestionsCount === questions.length\" class=\"review-container\">\r\n  <ng-container *ngIf=\"correctQuestions !== questions.length; then incorrectBlock else correctBlock;\"></ng-container>\r\n  <ng-template #incorrectBlock>\r\n    <p *ngIf=\"isReviewed\">\r\n      Your score: {{correctQuestions}} of {{questions.length}}\r\n    </p>\r\n    <p *ngIf=\"!isReviewed\">\r\n      Review test to find out your score!\r\n    </p>\r\n    <button (click)=\"reviewQuiz()\">Review quiz</button>\r\n  </ng-template>\r\n  <ng-template #correctBlock>\r\n    You did it!\r\n    <br>\r\n    You nailed the quiz!\r\n    <br>\r\n    <button (click)=\"doNewQuiz()\">Do another quiz!</button>\r\n  </ng-template>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/quiz/quiz.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".questions-list {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  grid-gap: 8px;\n  margin-bottom: 5px;\n}\n.question-hidden {\n  visibility: collapse;\n}\n.question-item {\n  display: inline-block;\n  -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);\n          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);\n}\n.review-container {\n  margin-top: 10px;\n}\n.review-container p {\n  margin: 0;\n}\n@media screen and (max-width: 800px) {\n  .questions-list {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media screen and (max-width: 500px) {\n  .questions-list {\n    grid-template-columns: 1fr;\n  }\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/quiz/quiz.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuizComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__quiz_service__ = __webpack_require__("../../../../../src/app/quiz/quiz.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_enums_quiz_type_enum__ = __webpack_require__("../../../../../src/app/shared/enums/quiz-type.enum.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_models_text_question__ = __webpack_require__("../../../../../src/app/shared/models/text-question.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_models_multiple_question__ = __webpack_require__("../../../../../src/app/shared/models/multiple-question.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var QuizComponent = /** @class */ (function () {
    function QuizComponent(quizService, router) {
        this.quizService = quizService;
        this.router = router;
        this.quiz = null;
        this.type = __WEBPACK_IMPORTED_MODULE_3__shared_enums_quiz_type_enum__["a" /* QuizType */].MultipleChoices;
        this.questions = [];
        this.correctQuestions = 0;
        this.isReviewed = false;
        this.answeredQuestionsCount = 0;
        this.answeredQuestions = [];
    }
    QuizComponent.prototype.ngOnInit = function () {
        this.quiz = this.quizService.quiz;
        this.type = this.quizService.quizType;
        if (!this.quiz) {
            this.router.navigate(['']);
            return;
        }
        // Copy value by value
        var phrases = this.quiz.phrases.slice();
        // Shuffle phrases
        this.shuffleArray(phrases);
        // Generate questions
        for (var i = 0; i < phrases.length; ++i) {
            var question = this.createQuestion(i, phrases);
            this.questions.push(question);
        }
        // First one is visible!
        this.questions[0].visible = true;
    };
    /**
     * Take user back to quiz starting route
     */
    QuizComponent.prototype.doNewQuiz = function () {
        this.quizService.quiz = null;
        this.router.navigate(['']);
    };
    /**
     * Whenever a question has been answered show the question that comes after.
     * @param {Question} question
     */
    QuizComponent.prototype.questionAnswered = function (question) {
        var nextIndex = question.index + 1;
        if (nextIndex < this.questions.length && !this.questions[nextIndex].visible) {
            this.questions[nextIndex].visible = true;
        }
        if (this.answeredQuestions.indexOf(question) === -1) {
            this.answeredQuestions.push(question);
            this.answeredQuestionsCount++;
        }
    };
    QuizComponent.prototype.reviewQuiz = function () {
        this.correctQuestions = 0;
        for (var i = 0; i < this.questions.length; i++) {
            if (this.questions[i].checkAnswer()) {
                this.correctQuestions++;
            }
        }
        this.isReviewed = true;
    };
    /**
     * Create a question item.
     * Based on type it will either be Text or Multiple.
     * @param {number} index
     * @param {Phrase[]} phrases
     * @return {Question}
     */
    QuizComponent.prototype.createQuestion = function (index, phrases) {
        if (this.type === __WEBPACK_IMPORTED_MODULE_3__shared_enums_quiz_type_enum__["a" /* QuizType */].Text) {
            return this.createTextQuestion(index, phrases);
        }
        else if (this.type === __WEBPACK_IMPORTED_MODULE_3__shared_enums_quiz_type_enum__["a" /* QuizType */].MultipleChoices) {
            return this.createMultipleQuestion(index, phrases);
        }
        throw new Error("quiz type was of unknown type");
    };
    /**
     * Create a TextQuestion item.
     * @param {number} index
     * @param {Phrase[]} phrases
     * @return {TextQuestion}
     */
    QuizComponent.prototype.createTextQuestion = function (index, phrases) {
        var phrase = phrases[index];
        var questionKeys = this.getQuestionKeys();
        var question = phrase[questionKeys.question];
        var answer = phrase[questionKeys.answer];
        var answers = answer.split("/").map(function (text) {
            return text.trim().toLowerCase();
        });
        return new __WEBPACK_IMPORTED_MODULE_4__shared_models_text_question__["a" /* TextQuestion */](index, question, phrase.note, answers, questionKeys.question === "finnish");
    };
    /**
     * Create a MultipleQuestion item.
     * @param {number} index
     * @param {Phrase[]} phrases
     * @return {MultipleQuestion}
     */
    QuizComponent.prototype.createMultipleQuestion = function (index, phrases) {
        if (phrases.length < this.quizService.phrasesPerQuestion) {
            throw new Error("Too few phrases for multiple question quiz");
        }
        var correctPhrase = phrases[index];
        var questionKeys = this.getQuestionKeys();
        var question = correctPhrase[questionKeys.question];
        var indices = [index];
        // get 2 phrases
        while (indices.length < this.quizService.phrasesPerQuestion) {
            var phraseIndex = Math.floor(Math.random() * phrases.length);
            if (indices.indexOf(phraseIndex) === -1) {
                indices.push(phraseIndex);
            }
        }
        // Shuffle
        this.shuffleArray(indices);
        var correctAnswer = 0;
        var options = [];
        for (var i = 0; i < indices.length; i++) {
            var phrase = phrases[indices[i]];
            if (phrase === correctPhrase) {
                correctAnswer = i;
            }
            var option = {
                value: phrase[questionKeys.answer],
                note: phrase.note
            };
            options.push(option);
        }
        return new __WEBPACK_IMPORTED_MODULE_5__shared_models_multiple_question__["a" /* MultipleQuestion */](index, question, correctPhrase.note, options, correctAnswer);
    };
    /**
     * Based on the quiz language return the phrase property keys.
     * For example if the quiz should randomize between finnish & english it randomizes the property keys.
     * @return {IQuestionKeys}
     */
    QuizComponent.prototype.getQuestionKeys = function () {
        // + 0.5 is equivalent of * 2
        if (Math.floor(Math.random() + 0.5) === 0) {
            return {
                question: "finnish",
                answer: "english"
            };
        }
        else {
            return {
                question: "english",
                answer: "finnish"
            };
        }
    };
    /**
     * A simple shuffle array where it goes through each index and randomly changes position with any other index
     * @param {any[]} arr
     */
    QuizComponent.prototype.shuffleArray = function (arr) {
        for (var i = 0; i < arr.length; ++i) {
            // Get a random number between 0 and length
            var randomId = Math.floor(Math.random() * arr.length);
            var temp = arr[randomId];
            arr[randomId] = arr[i];
            arr[i] = temp;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], QuizComponent.prototype, "quiz", void 0);
    QuizComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-quiz',
            template: __webpack_require__("../../../../../src/app/quiz/quiz.component.html"),
            styles: [__webpack_require__("../../../../../src/app/quiz/quiz.component.less")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__quiz_service__["a" /* QuizService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]])
    ], QuizComponent);
    return QuizComponent;
}());



/***/ }),

/***/ "../../../../../src/app/quiz/quiz.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuizModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__quiz_selection_quiz_selection_component__ = __webpack_require__("../../../../../src/app/quiz/quiz-selection/quiz-selection.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__quiz_component__ = __webpack_require__("../../../../../src/app/quiz/quiz.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__quiz_service__ = __webpack_require__("../../../../../src/app/quiz/quiz.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__quiz_question_quiz_question_component__ = __webpack_require__("../../../../../src/app/quiz/quiz-question/quiz-question.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__quiz_multiple_question_quiz_multiple_question_component__ = __webpack_require__("../../../../../src/app/quiz/quiz-multiple-question/quiz-multiple-question.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__quiz_text_question_quiz_text_question_component__ = __webpack_require__("../../../../../src/app/quiz/quiz-text-question/quiz-text-question.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var quizRouting = __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* RouterModule */].forChild([
    {
        // Maybe use quiz/:id if you know the quiz id
        path: "quiz",
        component: __WEBPACK_IMPORTED_MODULE_5__quiz_component__["a" /* QuizComponent */]
    }
]);
var QuizModule = /** @class */ (function () {
    function QuizModule() {
    }
    QuizModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                quizRouting
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__quiz_selection_quiz_selection_component__["a" /* QuizSelectionComponent */],
                __WEBPACK_IMPORTED_MODULE_5__quiz_component__["a" /* QuizComponent */],
                __WEBPACK_IMPORTED_MODULE_7__quiz_question_quiz_question_component__["a" /* QuizQuestionComponent */],
                __WEBPACK_IMPORTED_MODULE_8__quiz_multiple_question_quiz_multiple_question_component__["a" /* QuizMultipleQuestionComponent */],
                __WEBPACK_IMPORTED_MODULE_9__quiz_text_question_quiz_text_question_component__["a" /* QuizTextQuestionComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__quiz_service__["a" /* QuizService */]
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_4__quiz_selection_quiz_selection_component__["a" /* QuizSelectionComponent */]]
        })
    ], QuizModule);
    return QuizModule;
}());



/***/ }),

/***/ "../../../../../src/app/quiz/quiz.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuizService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_enums_quiz_type_enum__ = __webpack_require__("../../../../../src/app/shared/enums/quiz-type.enum.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var QuizService = /** @class */ (function () {
    function QuizService() {
        this.quiz = null;
        this.quizType = __WEBPACK_IMPORTED_MODULE_1__shared_enums_quiz_type_enum__["a" /* QuizType */].MultipleChoices;
        this.phrasesPerQuestion = 3;
    }
    QuizService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], QuizService);
    return QuizService;
}());



/***/ }),

/***/ "../../../../../src/app/shared/enums/quiz-type.enum.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuizType; });
var QuizType;
(function (QuizType) {
    QuizType[QuizType["Text"] = 0] = "Text";
    QuizType[QuizType["MultipleChoices"] = 1] = "MultipleChoices";
})(QuizType || (QuizType = {}));


/***/ }),

/***/ "../../../../../src/app/shared/layout/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<header>\r\n  <nav>\r\n    <ul>\r\n      <li>\r\n        <a routerLink=\"\">Home</a>\r\n      </li>\r\n      <!--<li>-->\r\n        <!--<a routerLink=\"admin\">Admin page</a>-->\r\n      <!--</li>-->\r\n    </ul>\r\n  </nav>\r\n</header>\r\n"

/***/ }),

/***/ "../../../../../src/app/shared/layout/header/header.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/layout/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-header',
            template: __webpack_require__("../../../../../src/app/shared/layout/header/header.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/layout/header/header.component.less")]
        }),
        __metadata("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "../../../../../src/app/shared/models/multiple-question.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MultipleQuestion; });
var MultipleQuestion = /** @class */ (function () {
    function MultipleQuestion(index, question, note, options, correctAnswer) {
        this.visible = false;
        this.index = index;
        this.question = question;
        this.note = note;
        this.isCorrect = false;
        this.options = options;
        this.answer = -1;
        this.correctAnswer = correctAnswer;
    }
    MultipleQuestion.prototype.checkAnswer = function () {
        this.isCorrect = this.correctAnswer === this.answer;
        return this.isCorrect;
    };
    MultipleQuestion.prototype.hasAnswer = function () {
        return this.answer >= 0;
    };
    return MultipleQuestion;
}());



/***/ }),

/***/ "../../../../../src/app/shared/models/text-question.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextQuestion; });
var TextQuestion = /** @class */ (function () {
    function TextQuestion(index, question, note, correctAnswers, isFinnish) {
        this.visible = false;
        this.index = index;
        this.question = question;
        this.note = note;
        this.isCorrect = false;
        this.correctAnswers = correctAnswers;
        this.isFinnish = isFinnish;
    }
    /**
     * Get the correct answers array
     * @return {string[]}
     */
    TextQuestion.prototype.getCorrectAnswers = function () {
        return this.correctAnswers;
    };
    TextQuestion.prototype.checkAnswer = function () {
        // Make answer lowercase and trim whitespace
        var answer = this.answer.trim().toLowerCase();
        var isCorrect = false;
        for (var i = 0; i < this.correctAnswers.length; i++) {
            if (answer === this.correctAnswers[i]) {
                isCorrect = true;
                break;
            }
        }
        this.isCorrect = isCorrect;
        return this.isCorrect;
    };
    TextQuestion.prototype.hasAnswer = function () {
        return this.answer.length > 0;
    };
    return TextQuestion;
}());



/***/ }),

/***/ "../../../../../src/app/shared/services/api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ApiService = /** @class */ (function () {
    function ApiService(httpClient) {
        this.httpClient = httpClient;
    }
    ApiService.prototype.get = function (url, parameters) {
        var _this = this;
        if (parameters === void 0) { parameters = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */](); }
        var apiUrl = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].api_url + url;
        var promise = new Promise(function (res) {
            _this.httpClient.get(apiUrl, {
                headers: _this.getRequestHeaders(),
                params: parameters
            }).subscribe(function (result) {
                res(result);
            }, function (error) {
                res({
                    error: error.message
                });
            });
        });
        return promise;
    };
    ApiService.prototype.post = function (url, parameters) {
        var _this = this;
        if (parameters === void 0) { parameters = {}; }
        var apiUrl = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].api_url + url;
        var promise = new Promise(function (res) {
            _this.httpClient.post(apiUrl, JSON.stringify(parameters), {
                headers: _this.getRequestHeaders()
            }).subscribe(function (result) {
                res(result);
            }, function (error) {
                res({
                    error: error.message
                });
            });
        });
        return promise;
    };
    ApiService.prototype.getRequestHeaders = function () {
        return new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
    };
    ApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_api_service__ = __webpack_require__("../../../../../src/app/shared/services/api.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* RouterModule */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__services_api_service__["a" /* ApiService */]
            ],
            declarations: [],
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    api_url: "/api/"
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map