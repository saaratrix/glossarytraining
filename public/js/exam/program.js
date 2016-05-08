var Exam;
(function (Exam) {
    (function (ExamState) {
        //When choosing a test
        ExamState[ExamState["START"] = 0] = "START";
        //Have chosen a test
        ExamState[ExamState["CURRENT"] = 1] = "CURRENT";
    })(Exam.ExamState || (Exam.ExamState = {}));
    var ExamState = Exam.ExamState;
    (function (ExamType) {
        //Write the answer in a text input
        ExamType[ExamType["SIMPLE"] = 0] = "SIMPLE";
        //Choose between 3 choices in a text input
        ExamType[ExamType["MULTIPLE"] = 1] = "MULTIPLE";
    })(Exam.ExamType || (Exam.ExamType = {}));
    var ExamType = Exam.ExamType;
    //The value is what language the answer is in.
    (function (ExamLanguageAnswers) {
        //Questions in Finnish,  Answsers in English e.t.c.
        ExamLanguageAnswers[ExamLanguageAnswers["UL"] = 0] = "UL";
        //Questions in English e.t.c.,   Answers in Finnish
        ExamLanguageAnswers[ExamLanguageAnswers["FI"] = 1] = "FI";
        //Random between UL & FI
        ExamLanguageAnswers[ExamLanguageAnswers["RANDOM"] = 2] = "RANDOM";
    })(Exam.ExamLanguageAnswers || (Exam.ExamLanguageAnswers = {}));
    var ExamLanguageAnswers = Exam.ExamLanguageAnswers;
    var ExamProgram = (function () {
        function ExamProgram() {
            this.m_startController = new Exam.StartController(this);
            this.m_examSimpleController = new Exam.ExamSimpleController(this);
            this.m_examMultipleController = new Exam.ExamMultipleController(this);
        }
        ExamProgram.prototype.getRootElement = function () {
            return document.getElementById("examwrapper");
        };
        ExamProgram.prototype.run = function () {
            var examRoot = this.getRootElement();
            //If exam root exists!
            if (examRoot) {
                this.m_state = Exam.EnumConverter.ExamStateFromString(examRoot.getAttribute("data-state"));
                switch (this.m_state) {
                    case ExamState.START:
                        //Do start JS
                        this.m_startController.add(examRoot);
                        break;
                    case ExamState.CURRENT:
                        //Do current JS
                        break;
                    default:
                        throw new Error("State on examwrapper is missing");
                }
            }
        };
        ExamProgram.prototype.getExamState = function (a_rootElement) {
            var stateText = a_rootElement.getAttribute("data-state");
            switch (stateText) {
                case "start":
                    return ExamState.START;
                case "current":
                    return ExamState.CURRENT;
                default:
                    return ExamState.START;
            }
        };
        ExamProgram.prototype.changeState = function (a_state, a_invoker, a_data) {
            if (a_data === void 0) { a_data = {}; }
            if (a_state !== this.m_state) {
                this.m_state = a_state;
                //First remove the current html code!
                a_invoker.remove();
                switch (a_state) {
                    case ExamState.START:
                        break;
                    case ExamState.CURRENT:
                        this.stateCurrent(a_data);
                        break;
                }
            }
        };
        ExamProgram.prototype.stateCurrent = function (a_data) {
            var controller;
            switch (a_data.type) {
                case ExamType.SIMPLE:
                    controller = this.m_examSimpleController;
                    break;
                case ExamType.MULTIPLE:
                    controller = this.m_examMultipleController;
                    break;
            }
            controller.add(this.getRootElement(), a_data);
        };
        return ExamProgram;
    }());
    Exam.ExamProgram = ExamProgram;
})(Exam || (Exam = {}));
window.addEventListener("load", function () {
    var examProgram = new Exam.ExamProgram();
    examProgram.run();
});
//# sourceMappingURL=program.js.map