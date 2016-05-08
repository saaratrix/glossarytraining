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
    }());
    Exam.ExamMultipleController = ExamMultipleController;
})(Exam || (Exam = {}));
//# sourceMappingURL=ExamMultipleController.js.map