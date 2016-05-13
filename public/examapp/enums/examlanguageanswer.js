System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ExamLanguageAnswer;
    return {
        setters:[],
        execute: function() {
            //The value is what language the answer is in.
            (function (ExamLanguageAnswer) {
                //Questions in Finnish,  Answsers in English e.t.c.
                ExamLanguageAnswer[ExamLanguageAnswer["UL"] = 0] = "UL";
                //Questions in English e.t.c.,   Answers in Finnish
                ExamLanguageAnswer[ExamLanguageAnswer["FI"] = 1] = "FI";
                //Random between UL & FI
                ExamLanguageAnswer[ExamLanguageAnswer["RANDOM"] = 2] = "RANDOM";
            })(ExamLanguageAnswer || (ExamLanguageAnswer = {}));
            exports_1("ExamLanguageAnswer", ExamLanguageAnswer);
        }
    }
});
//# sourceMappingURL=examlanguageanswer.js.map