var Exam;
(function (Exam) {
    var EnumConverter = (function () {
        function EnumConverter() {
        }
        EnumConverter.ExamTypeFromString = function (a_value) {
            var value = parseInt(a_value);
            switch (value) {
                case 0:
                    return Exam.ExamType.SIMPLE;
                case 1:
                    return Exam.ExamType.MULTIPLE;
                default:
                    throw new Error("invalid type");
            }
        };
        EnumConverter.ExamLanguageFromString = function (a_value) {
            var value = parseInt(a_value);
            switch (value) {
                case 0:
                    return Exam.ExamLanguageAnswers.UL;
                case 1:
                    return Exam.ExamLanguageAnswers.FI;
                case 2:
                    return Exam.ExamLanguageAnswers.RANDOM;
                default:
                    throw new Error("invalid language enum");
            }
        };
        EnumConverter.ExamStateFromString = function (a_value) {
            switch (a_value) {
                case "start":
                    return Exam.ExamState.START;
                case "current":
                    return Exam.ExamState.CURRENT;
                default:
                    throw new Error("Invalid state");
            }
        };
        return EnumConverter;
    }());
    Exam.EnumConverter = EnumConverter;
})(Exam || (Exam = {}));
//# sourceMappingURL=EnumConverter.js.map