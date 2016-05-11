var Exam;
(function (Exam) {
    var ExamMultipleView = (function () {
        function ExamMultipleView(a_controller) {
            this.m_controller = a_controller;
        }
        ExamMultipleView.prototype.renderQuestions = function (a_questions) {
            var qlen = a_questions.length;
            var that = this;
            var templateElement = document.getElementById("template_multiple_answers");
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
        ExamMultipleView.prototype.renderQuestion = function (a_question, a_questionsWrapper, a_templateElement, a_isLast) {
            var that = this;
            var hasAnswer = false;
            var questionRoot = a_templateElement.content.querySelector(".question-root");
            var questionIdElement = a_templateElement.content.querySelector(".id");
            var questionElement = a_templateElement.content.querySelector(".question");
            questionIdElement.innerHTML = (a_question.m_id + 1).toString();
            questionElement.innerHTML = a_question.m_question;
            questionRoot.id = "q_" + a_question.m_id;
            questionRoot.setAttribute("data-id", a_question.m_id.toString());
            var clonedNode = document.importNode(a_templateElement.content, true);
            //Now do events and remove elements
            if (a_question.m_id === 0) {
                questionRoot = clonedNode.querySelector(".question-root");
                questionRoot.classList.remove("qhidden");
            }
            function onAnswerClick(a_id) {
                return function () {
                    if (!hasAnswer) {
                        hasAnswer = true;
                        if (!a_isLast) {
                            that.showNextQuestion(a_question);
                        }
                        else {
                            that.showSubmitButton();
                        }
                    }
                    a_question.m_answer = a_id;
                };
            }
            ;
            var answersElement = clonedNode.querySelectorAll(".answer");
            var alen = a_question.m_words.length;
            for (var i = 0; i < alen; ++i) {
                var answerElement = answersElement[i];
                var answerInputElement = answerElement.querySelector("input");
                answerInputElement.name = "q_" + a_question.m_id;
                answerInputElement.addEventListener("click", onAnswerClick(i));
                var answerLabeLElement = answerElement.querySelector(".answer-text");
                answerLabeLElement.innerHTML = a_question.m_words[i];
            }
            //Do final touches!                     
            a_questionsWrapper.appendChild(clonedNode);
        };
        ExamMultipleView.prototype.showNextQuestion = function (a_currentQuestion) {
            var nextId = a_currentQuestion.m_id + 1;
            var nextQuestionRoot = document.getElementById("q_" + nextId);
            if (!nextQuestionRoot) {
                throw new Error("Could not find: q_" + nextId);
            }
            nextQuestionRoot.classList.remove("qhidden");
        };
        ExamMultipleView.prototype.showSubmitButton = function () {
            var submitButton = document.getElementById("submit");
            submitButton.classList.remove("hide");
        };
        /*
            Exam functions
        */
        ExamMultipleView.prototype.examPassed = function () {
            console.log("TEST PASSED!!!");
        };
        ExamMultipleView.prototype.examFailed = function () {
            console.log("exam failed!");
        };
        ExamMultipleView.prototype.questionFailed = function (a_question) {
            var questionELement = document.getElementById("q_" + a_question.m_id).querySelector(" .question-container");
            questionELement.classList.remove("passed");
            questionELement.classList.add("failed");
        };
        ExamMultipleView.prototype.questionPassed = function (a_question) {
            var questionELement = document.getElementById("q_" + a_question.m_id).querySelector(" .question-container");
            questionELement.classList.remove("failed");
            questionELement.classList.add("passed");
        };
        return ExamMultipleView;
    }());
    Exam.ExamMultipleView = ExamMultipleView;
})(Exam || (Exam = {}));
//# sourceMappingURL=ExamMultipleView.js.map