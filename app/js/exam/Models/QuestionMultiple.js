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
    }());
    Exam.QuestionMultiple = QuestionMultiple;
})(Exam || (Exam = {}));
//# sourceMappingURL=QuestionMultiple.js.map