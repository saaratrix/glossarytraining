/// <reference path="../../node_modules/angular2/typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../../node_modules/angular2/typings/es6-collections/es6-collections.d.ts" />
/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />
/// <reference path="../../node_modules/angular2/src/common/directives/ng_class.d.ts" />
System.register(["angular2/platform/browser", "./components/app"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, app_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_1.AppComponent);
        }
    }
});
//# sourceMappingURL=main.js.map