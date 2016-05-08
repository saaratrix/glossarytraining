var Exam;
(function (Exam) {
    var ExamMultipleController = (function () {
        function ExamMultipleController(a_program) {
            this.m_type = Exam.ExamType.MULTIPLE;
            this.m_program = a_program;
            this.m_questions = [];
            this.m_view = new Exam.ExamMultipleView(this);
        }
        ExamMultipleController.prototype.add = function (a_rootElement, a_data) {
            //Check if questions are added
            if (this.m_questions.length == 0) {
                this.m_testId = a_data.testId;
                this.m_language = a_data.language;
                this.getDataFromServer(a_rootElement);
            }
        };
        ExamMultipleController.prototype.getControllerElement = function () {
            return document.getElementById("");
        };
        ExamMultipleController.prototype.getDataFromServer = function (a_rootElement) {
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
        ExamMultipleController.prototype.generateQuestions = function (a_words) {
            var wlen = a_words.length;
            this.m_questions = [];
            var questionString;
            if (wlen < ExamMultipleController.WordsPerQuestion) {
                throw new Error("Not enough words to have multiple answers!");
            }
            for (var i = 0; i < wlen; ++i) {
                var question = this.generateQuestion(i, a_words);
                this.m_questions.push(question);
            }
        };
        ExamMultipleController.prototype.generateQuestion = function (a_id, a_words) {
            var chosenWords = [];
            var takenIndices = [];
            //Get correct word and add to indices
            var correctWord = a_words[a_id];
            takenIndices[a_id] = true;
            //Add the correct word to chosenWords.
            chosenWords.push(correctWord);
            var len = ExamMultipleController.WordsPerQuestion;
            var wlen = a_words.length;
            //Add random words to the words list!
            for (var i = 1; i < len; ++i) {
                while (true) {
                    //Get a random number 0 -> wlen
                    var rand = Math.floor(Math.random() * wlen);
                    if (!takenIndices[rand]) {
                        chosenWords.push(a_words[rand]);
                        takenIndices[rand] = true;
                        //Break out of the while loop lolol!
                        break;
                    }
                }
            }
            //1. shuffle by swapping each element with a random pos
            for (var i = 0; i < len; ++i) {
                //Get a random number 0 -> wlen
                var rand = Math.floor(Math.random() * len);
                var tempWord = chosenWords[rand];
                chosenWords[rand] = chosenWords[i];
                chosenWords[i] = tempWord;
            }
            var correctAnswer = -1;
            //2. find the correct word to get its position
            for (var i = 0; i < len; ++i) {
                if (chosenWords[i] === correctWord) {
                    correctAnswer = i;
                    break;
                }
            }
            var languageType = this.m_language;
            //If random then randomize!
            if (languageType === Exam.ExamLanguageAnswers.RANDOM) {
                var rand = Math.floor(Math.random() + 0.5);
                languageType = Exam.EnumConverter.ExamLanguageFromString(rand.toString());
            }
            var question = new Exam.QuestionMultiple(a_id, chosenWords, correctAnswer, languageType);
            return question;
        };
        ExamMultipleController.prototype.reviewExam = function () {
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
        ExamMultipleController.prototype.initEvents = function () {
            var that = this;
        };
        ExamMultipleController.prototype.remove = function () {
            var wrapper = this.getControllerElement();
            if (wrapper != null) {
                //Remove the children!                
                wrapper.parentNode.removeChild(wrapper);
            }
            this.m_questions = [];
        };
        ExamMultipleController.WordsPerQuestion = 3;
        return ExamMultipleController;
    })();
    Exam.ExamMultipleController = ExamMultipleController;
})(Exam || (Exam = {}));
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
    })();
    Exam.ExamSimpleController = ExamSimpleController;
})(Exam || (Exam = {}));
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
    })();
    Exam.ExamMultipleView = ExamMultipleView;
})(Exam || (Exam = {}));
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
    })();
    Exam.ExamSimpleView = ExamSimpleView;
})(Exam || (Exam = {}));
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
    })();
    Exam.EnumConverter = EnumConverter;
})(Exam || (Exam = {}));
var Exam;
(function (Exam) {
    var QuestionMultiple = (function () {
        function QuestionMultiple(a_id, a_words, a_correctAnswer, a_language) {
            this.m_id = a_id;
            this.m_words = [];
            this.m_correctAnswer = a_correctAnswer;
            this.m_answer = -1;
            var langKey = "";
            //Set the question string based on a_language
            switch (a_language) {
                case Exam.ExamLanguageAnswers.UL:
                    this.m_question = a_words[a_correctAnswer].finnish;
                    langKey = "translation";
                    break;
                case Exam.ExamLanguageAnswers.FI:
                    this.m_question = a_words[a_correctAnswer].translation;
                    langKey = "finnish";
                    break;
            }
            var wlen = a_words.length;
            for (var i = 0; i < wlen; ++i) {
                this.m_words.push(a_words[i][langKey]);
            }
        }
        QuestionMultiple.prototype.isCorrect = function () {
            return this.m_answer === this.m_correctAnswer;
        };
        QuestionMultiple.prototype.hasAnswer = function () {
            return this.m_answer >= 0;
        };
        return QuestionMultiple;
    })();
    Exam.QuestionMultiple = QuestionMultiple;
})(Exam || (Exam = {}));
var Exam;
(function (Exam) {
    var QuestionSimple = (function () {
        function QuestionSimple(a_id, a_word, a_language) {
            this.m_id = a_id;
            this.m_answer = "";
            //Set the question string based on a_language
            switch (a_language) {
                case Exam.ExamLanguageAnswers.UL:
                    this.m_question = a_word.finnish;
                    this.m_correctAnswer = a_word.translation.toLocaleLowerCase();
                    break;
                case Exam.ExamLanguageAnswers.FI:
                    this.m_question = a_word.translation;
                    this.m_correctAnswer = a_word.finnish.toLocaleLowerCase();
                    break;
            }
        }
        QuestionSimple.prototype.isCorrect = function () {
            return this.m_answer.toLocaleLowerCase() === this.m_correctAnswer;
        };
        QuestionSimple.prototype.hasAnswer = function () {
            return this.m_answer != "";
        };
        return QuestionSimple;
    })();
    Exam.QuestionSimple = QuestionSimple;
})(Exam || (Exam = {}));
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
    })();
    Exam.ExamProgram = ExamProgram;
})(Exam || (Exam = {}));
window.addEventListener("load", function () {
    var examProgram = new Exam.ExamProgram();
    examProgram.run();
});
var Exam;
(function (Exam) {
    var StartController = (function () {
        function StartController(a_program) {
            this.m_program = a_program;
        }
        StartController.prototype.add = function (a_rootElement, a_data) {
            if (a_data === void 0) { a_data = {}; }
            var startWrapper = this.getControllerElement();
            if (startWrapper != null) {
                if (this.m_startButton == null) {
                    this.initEvents();
                }
            }
            else {
                this.getDataFromServer(a_rootElement);
            }
        };
        StartController.prototype.getControllerElement = function () {
            return document.getElementById("startwrapper");
        };
        StartController.prototype.getDataFromServer = function (a_rootElement) {
            Exam.Utility.AjaxPost("/exam/api/start", {}, function (a_response) {
                //var response: StartResponse = a_response as StartResponse;
                if (a_response.error) {
                }
                else {
                    //Get the html text!                   
                    var htmlText = a_response.html;
                    var placeholderElement = document.createElement("div");
                    placeholderElement.innerHTML = htmlText;
                    a_rootElement.appendChild(placeholderElement.firstChild);
                }
            });
        };
        StartController.prototype.initEvents = function () {
            var that = this;
            this.m_startButton = document.getElementById("starttest");
            this.m_startButton.addEventListener("click", function () {
                var testSelector = document.getElementById("testselector");
                if (testSelector.value != "") {
                    var testId = parseInt(testSelector.value);
                    var selectedElement = testSelector.options[testSelector.selectedIndex];
                    var type = Exam.EnumConverter.ExamTypeFromString(selectedElement.getAttribute("data-type"));
                    var language = Exam.EnumConverter.ExamLanguageFromString(selectedElement.getAttribute("data-language"));
                    if (testId > 0) {
                        var data = {
                            testId: testId,
                            language: language,
                            type: type
                        };
                        //This will remove the startwrapper!
                        that.m_program.changeState(Exam.ExamState.CURRENT, that, data);
                    }
                    ;
                }
            });
        };
        StartController.prototype.remove = function () {
            var startWrapper = this.getControllerElement();
            if (startWrapper != null) {
                //Remove the children!
                //startWrapper.innerHTML = "";
                //Remove the element from parentNode (examwrapper)
                startWrapper.parentNode.removeChild(startWrapper);
            }
            this.m_startButton = null;
        };
        return StartController;
    })();
    Exam.StartController = StartController;
})(Exam || (Exam = {}));
var Exam;
(function (Exam) {
    var Utility = (function () {
        function Utility() {
        }
        Utility.AjaxPost = function (a_url, a_data, a_callback) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.addEventListener("load", function () {
                a_callback(JSON.parse(xmlhttp.response));
            }, false);
            xmlhttp.addEventListener("error", function () {
                a_callback({ error: "XMLHttpRequest failed" }, true);
            }, false);
            xmlhttp.open("POST", a_url);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify(a_data));
        };
        return Utility;
    })();
    Exam.Utility = Utility;
})(Exam || (Exam = {}));
//# sourceMappingURL=exam.js.map