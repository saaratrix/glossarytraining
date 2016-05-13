System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ExamType, ExamLanguageAnswers;
    return {
        setters:[],
        execute: function() {
            (function (ExamType) {
                //Write the answer in a text input
                ExamType[ExamType["Simple"] = 0] = "Simple";
                //Choose between 3 choices in a text input
                ExamType[ExamType["Multiple"] = 1] = "Multiple";
            })(ExamType || (ExamType = {}));
            exports_1("ExamType", ExamType);
            //The value is what language the answer is in.
            (function (ExamLanguageAnswers) {
                //Questions in Finnish,  Answsers in English e.t.c.
                ExamLanguageAnswers[ExamLanguageAnswers["UL"] = 0] = "UL";
                //Questions in English e.t.c.,   Answers in Finnish
                ExamLanguageAnswers[ExamLanguageAnswers["FI"] = 1] = "FI";
                //Random between UL & FI
                ExamLanguageAnswers[ExamLanguageAnswers["RANDOM"] = 2] = "RANDOM";
            })(ExamLanguageAnswers || (ExamLanguageAnswers = {}));
            exports_1("ExamLanguageAnswers", ExamLanguageAnswers);
        }
    }
});
//# sourceMappingURL=examtype.js.map