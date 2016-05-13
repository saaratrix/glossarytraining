System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ExamState;
    return {
        setters:[],
        execute: function() {
            (function (ExamState) {
                //When choosing a test
                ExamState[ExamState["Selection"] = 0] = "Selection";
                //Have chosen a test and is doing it
                ExamState[ExamState["Started"] = 1] = "Started";
                ExamState[ExamState["Finished"] = 2] = "Finished";
            })(ExamState || (ExamState = {}));
            exports_1("ExamState", ExamState);
        }
    }
});
//# sourceMappingURL=examstate.js.map