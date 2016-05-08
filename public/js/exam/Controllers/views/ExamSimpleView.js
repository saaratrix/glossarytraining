var Exam;
(function (Exam) {
    var ExamSimpleView = (function () {
        function ExamSimpleView(a_controller) {
            this.m_controller = a_controller;
        }
        ExamSimpleView.prototype.getQuestionId = function (a_id) {
            return "q_" + a_id;
        };
        ExamSimpleView.prototype.examPassed = function () {
            //DO pass rendering!
        };
        ExamSimpleView.prototype.examFailed = function () {
            //Failed rendering!
        };
        ExamSimpleView.prototype.questionPassed = function (a_question) {
            var questionELement = document.getElementById(this.getQuestionId(a_question.m_id)).querySelector(" .question-container");
            questionELement.classList.remove("failed");
            questionELement.classList.add("passed");
        };
        ExamSimpleView.prototype.questionFailed = function (a_question) {
            var questionELement = document.getElementById(this.getQuestionId(a_question.m_id)).querySelector(" .question-container");
            questionELement.classList.remove("passed");
            questionELement.classList.add("failed");
        };
        ExamSimpleView.prototype.renderQuestions = function (a_questions) {
            var qlen = a_questions.length;
            var that = this;
            var templateElement = document.getElementById("template_simple_answers");
            var questionsWrapper = document.getElementById("questions_list");
            if (!templateElement || !questionsWrapper) {
                throw new Error("Can't find questions template or questions root");
            }
            for (var i = 0; i < qlen; ++i) {
                this.renderQuestion(a_questions[i], questionsWrapper, templateElement, (i == qlen - 1));
            }
            var submitButton = document.getElementById("submit");
            submitButton.addEventListener("click", function () {
                that.m_controller.reviewExam();
            });
        };
        ExamSimpleView.prototype.renderQuestion = function (a_question, a_questionsWrapper, a_templateElement, a_isLast) {
            var that = this;
            var hasAnswer = false;
            var timeoutId;
            var timeoutTime = 2000;
            var questionRoot = a_templateElement.content.querySelector(".question-root");
            var questionIdElement = a_templateElement.content.querySelector(".id");
            var questionElement = a_templateElement.content.querySelector(".question");
            //Make the index 1 -> n based instead of 0 -> n
            questionIdElement.innerHTML = (a_question.m_id + 1).toString();
            questionElement.innerHTML = a_question.m_question;
            questionRoot.id = this.getQuestionId(a_question.m_id);
            questionRoot.setAttribute("data-id", a_question.m_id.toString());
            var clonedNode = document.importNode(a_templateElement.content, true);
            //Now do events and remove elements
            if (a_question.m_id === 0) {
                questionRoot = clonedNode.querySelector(".question-root");
                questionRoot.classList.remove("qhidden");
            }
            var showQuestionOrButton = function () {
                if (!hasAnswer) {
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                        timeoutId = null;
                    }
                    hasAnswer = true;
                    if (!a_isLast) {
                        that.showNextQuestion(a_question);
                    }
                    else {
                        that.showSubmitButton();
                    }
                }
            };
            var answersElement = clonedNode.querySelector(".answer");
            answersElement.addEventListener("input", function () {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    timeoutId = null;
                }
                timeoutId = setTimeout(function () {
                    showQuestionOrButton();
                }, timeoutTime);
                a_question.m_answer = this.value;
            });
            answersElement.addEventListener("blur", function () {
                if (this.value != "") {
                    showQuestionOrButton();
                }
            });
            //Do final touches! Like add it to the DOM! :)                    
            a_questionsWrapper.appendChild(clonedNode);
        };
        ExamSimpleView.prototype.showNextQuestion = function (a_currentQuestion) {
            var nextId = a_currentQuestion.m_id + 1;
            var nextQuestionRoot = document.getElementById(this.getQuestionId(nextId));
            if (!nextQuestionRoot) {
                throw new Error("Could not find: q_" + nextId);
            }
            nextQuestionRoot.classList.remove("qhidden");
        };
        ExamSimpleView.prototype.showSubmitButton = function () {
            var submitButton = document.getElementById("submit");
            submitButton.classList.remove("hide");
        };
        return ExamSimpleView;
    }());
    Exam.ExamSimpleView = ExamSimpleView;
})(Exam || (Exam = {}));
//# sourceMappingURL=ExamSimpleView.js.map