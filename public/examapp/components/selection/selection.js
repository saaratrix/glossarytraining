System.register(['angular2/core', 'angular2/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var ExamSelectionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            ExamSelectionComponent = (function () {
                function ExamSelectionComponent(http) {
                    this.body = "exam test value";
                    this._http = http;
                    // Add a placeholder element, attempts so far has left it always empty when doing it in html. 
                    // Most likely because ngModel is null and its bound to the selectedIndex afterall.
                    this.tests = [{
                            id: -1,
                            name: "Please select a test",
                            language: 0,
                            type: 0
                        }];
                    this.selectedIndex = 0;
                    this.getTests();
                }
                ExamSelectionComponent.prototype.startTest = function () {
                    var testItem = this.tests[this.selectedIndex];
                    console.log(testItem);
                    // Tell the parent component (exam app) that an item has been selected and which one it was.
                };
                ExamSelectionComponent.prototype.getTests = function () {
                    var _this = this;
                    this._http.get("/api/exam/tests").subscribe(function (res) {
                        var data = res.json();
                        for (var i = 0; i < data.tests.length; ++i) {
                            _this.tests.push(data.tests[i]);
                        }
                    });
                };
                ExamSelectionComponent = __decorate([
                    core_1.Component({
                        selector: "exam-selection",
                        templateUrl: "examapp/components/selection/selection.html",
                        viewProviders: [http_1.HTTP_PROVIDERS],
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ExamSelectionComponent);
                return ExamSelectionComponent;
            }());
            exports_1("ExamSelectionComponent", ExamSelectionComponent);
        }
    }
});
//# sourceMappingURL=selection.js.map