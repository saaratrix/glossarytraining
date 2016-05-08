var Exam;
(function (Exam) {
    var ExamSimpleController = (function () {
        function ExamSimpleController(a_program) {
            this.m_type = Exam.ExamType.SIMPLE;
            this.m_program = a_program;
            this.m_questions = [];
            this.m_view = new Exam.ExamSimpleView(this);
        }
        ExamSimpleController.prototype.add = function (a_rootElement, a_data) {
            if (a_data === void 0) { a_data = {}; }
            //Check if questions are added
            if (this.m_questions.length == 0) {
                this.m_testId = a_data.testId;
                this.m_language = a_data.language;
                this.getDataFromServer(a_rootElement);
            }
        };
        ExamSimpleController.prototype.getControllerElement = function () {
            return document.getElementById("");
        };
        ExamSimpleController.prototype.getDataFromServer = function (a_rootElement) {
            var input = {
                testId: this.m_testId
            };
            var that = this;
            Exam.Utility.AjaxPost("/exam/api/exam", input, function (a_response) {
                if (a_response.error) {
                }
                else {
                    that.generateQuestions(a_response.words);
                    if (a_response.html != "") {
                        //Get the html text!                   
                        var htmlText = a_response.html;
                        var placeholderElement = document.createElement("div");
                        placeholderElement.innerHTML = htmlText;
                        a_rootElement.appendChild(placeholderElement.firstChild);
                        that.m_view.renderQuestions(that.m_questions);
                    }
                }
            });
        };
        ExamSimpleController.prototype.generateQuestions = function (a_words) {
            var wlen = a_words.length;
            this.m_questions = [];
            for (var i = 0; i < wlen; ++i) {
                var question = this.generateQuestion(i, a_words[i]);
                this.m_questions.push(question);
            }
        };
        ExamSimpleController.prototype.generateQuestion = function (a_id, a_word) {
            var languageType = this.m_language;
            //If random then randomize!
            if (languageType === Exam.ExamLanguageAnswers.RANDOM) {
                var rand = Math.floor(Math.random() + 0.5);
                languageType = Exam.EnumConverter.ExamLanguageFromString(rand.toString());
            }
            var question = new Exam.QuestionSimple(a_id, a_word, languageType);
            return question;
        };
        ExamSimpleController.prototype.reviewExam = function () {
            var qlen = this.m_questions.length;
            var valid = true;
            for (var i = 0; i < qlen; ++i) {
                var question = this.m_questions[i];
                if (!question.hasAnswer() || !question.isCorrect()) {
                    this.m_view.questionFailed(question);
                    valid = false;
                }
                else {
                    this.m_view.questionPassed(question);
                }
            }
            if (valid) {
                //All questions were ok!
                this.m_view.examPassed();
            }
            else {
                this.m_view.examFailed();
            }
        };
        ExamSimpleController.prototype.initEvents = function () {
            var that = this;
        };
        ExamSimpleController.prototype.remove = function () {
            var wrapper = this.getControllerElement();
            if (wrapper != null) {
                //Remove the children!
                //startWrapper.innerHTML = "";
                //Remove the element from parentNode (examwrapper)
                wrapper.parentNode.removeChild(wrapper);
            }
            this.m_questions = [];
        };
        return ExamSimpleController;
    }());
    Exam.ExamSimpleController = ExamSimpleController;
})(Exam || (Exam = {}));
//# sourceMappingURL=ExamSimpleController.js.map