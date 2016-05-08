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
    }());
    Exam.QuestionSimple = QuestionSimple;
})(Exam || (Exam = {}));
//# sourceMappingURL=QuestionSimple.js.map