module Exam
{
    export class QuestionMultiple
    {
        m_id: number;
        m_question: string;
        m_words: string[];
        //This could be hidden on server if cheating was an issue
        //The questions & answers would have to be generated on the server then aswell!
        m_correctAnswer: number;
        //Which wordId it has been answered
        m_answer: number;

        constructor(a_id :number, a_words: Word[], a_correctAnswer :number, a_language : ExamLanguageAnswers )
        {
            this.m_id = a_id;
            this.m_words = [];
            this.m_correctAnswer = a_correctAnswer;
            this.m_answer = -1;
            
            var langKey :string = "";

            //Set the question string based on a_language
            switch (a_language)
            {
                case ExamLanguageAnswers.UL:
                    this.m_question = a_words[a_correctAnswer].finnish;
                    langKey = "translation";                    
                    break;
                case ExamLanguageAnswers.FI:
                    this.m_question = a_words[a_correctAnswer].translation;
                    langKey = "finnish"
                    break;                
            }

            var wlen = a_words.length;
            for (var i = 0; i < wlen; ++i)
            {
                
                this.m_words.push( a_words[i][langKey] );
            }
        }

        isCorrect(): boolean
        {
            return this.m_answer === this.m_correctAnswer;                
        }

        hasAnswer(): boolean
        {
            return this.m_answer >= 0;
        }
    }
}