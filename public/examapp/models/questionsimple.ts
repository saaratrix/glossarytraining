import {IWord} from "./iword";
import {ExamLanguageAnswer} from "./../enums/examlanguageanswer";
import {IQuestion} from "./iquestion";

export class QuestionSimple implements IQuestion
{
    m_id: number;
    m_answer: string;
    m_question: string;
    //This could be hidden on server if cheating was an issue
    m_correctAnswer: string;
    m_visible: boolean;

    constructor(a_id: number, a_word: IWord, a_language: ExamLanguageAnswer)
    {
        this.m_id = a_id;
        this.m_answer = "";
        this.m_visible = false;

        if (a_language === ExamLanguageAnswer.RANDOM)
        {
            a_language = Math.floor(Math.random() + 0.5);
        }

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
        return this.hasAnswer() && this.m_answer.toLocaleLowerCase() === this.m_correctAnswer;
    }

    hasAnswer(): boolean
    {
        return this.m_answer != "";
    }
}