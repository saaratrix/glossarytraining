import {IWord} from "./iword";
import {ExamLanguageAnswer} from "./../enums/examlanguageanswer";

export class QuestionSimple
{
    m_id: number;
    m_answer: string;
    m_question: string;
    //This could be hidden on server if cheating was an issue
    m_correctAnswer: string;

    constructor(a_id: number, a_word: IWord, a_language: ExamLanguageAnswer)
    {
        this.m_id = a_id;
        this.m_answer = "";

        //Set the question string based on a_language
        switch (a_language)
        {
            case ExamLanguageAnswer.UL:
                this.m_question = a_word.finnish;
                this.m_correctAnswer = a_word.translation.toLocaleLowerCase();
                break;
            case ExamLanguageAnswer.FI:
                this.m_question = a_word.translation;
                this.m_correctAnswer = a_word.finnish.toLocaleLowerCase();
                break;
        }
    }

    isCorrect(): boolean
    {
        return this.m_answer.toLocaleLowerCase() === this.m_correctAnswer;
    }

    hasAnswer(): boolean
    {
        return this.m_answer != "";
    }
}