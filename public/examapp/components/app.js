System.register(["angular2/core", "angular2/router", "./../enums/examstate", "./selection/selection"], function(exports_1, context_1) {
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
    var core_1, router_1, examstate_1, selection_1;
    var examStateKey, AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (examstate_1_1) {
                examstate_1 = examstate_1_1;
            },
            function (selection_1_1) {
                selection_1 = selection_1_1;
            }],
        execute: function() {
            examStateKey = "examstate";
            AppComponent = (function () {
                function AppComponent() {
                    // Tell the view template what the enum values are
                    this.examStates = examstate_1.ExamState;
                    var state = sessionStorage.getItem(examStateKey);
                    this.currentState = state !== null ? parseInt(state, 10) : examstate_1.ExamState.Selection;
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: "exam-app",
                        templateUrl: "/examapp/components/app.html",
                        directives: [router_1.ROUTER_DIRECTIVES, selection_1.ExamSelectionComponent],
                        providers: [
                            router_1.ROUTER_PROVIDERS
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.js.map