import {IWord} from "./iword";
import {ExamLanguageAnswer} from "./../enums/examlanguageanswer";

export class QuestionMultiple
{
    m_id: number;
    m_question: string;
    // The answer words in text
    m_words: string[];
    //This could be hidden on server if cheating was an issue
    //The questions & answers would have to be generated on the server then aswell!
    m_correctAnswer: number;
    //Which wordId it has been answered
    m_answer: number;
    // If the question is visible to the user or not
    public m_visible: boolean;

    constructor(a_id: number, a_words: IWord[], a_wordsPerQueston: number, a_language: ExamLanguageAnswer)
    {
        this.m_id = a_id;
        this.m_words = [];        
        this.m_answer = -1;
        this.m_visible = false;

        let answers : IWord[] = this.generateAnswers(a_id, a_words, a_wordsPerQueston);

        let langKey: string = "";

        if (a_language === ExamLanguageAnswer.RANDOM)
        {
            a_language = Math.floor(Math.random() + 0.5);
        }

        //Set the question string based on a_language
        switch (a_language)
        {
            case ExamLanguageAnswer.UL:
                this.m_question = answers[this.m_correctAnswer].finnish;
                langKey = "translation";
                break;
            case ExamLanguageAnswer.FI:
                this.m_question = answers[this.m_correctAnswer].translation;
                langKey = "finnish"
                break;
        }
        
        for (var i = 0; i < answers.length; ++i)
        {
            this.m_words.push(answers[i][langKey]);
        }
    }

    public isCorrect(): boolean
    {
        return this.hasAnswer() && this.m_answer === this.m_correctAnswer;
    }

    public hasAnswer(): boolean
    {
        return this.m_answer >= 0;
    }

    private generateAnswers(a_id: number, a_words: IWord[], a_wordsPerQuestion:number) : IWord[]
    {
        let answers: IWord[] = [];
        // Push the correct answerfirst
        let correctWord = a_words[a_id];
        answers.push(correctWord);

        let takenIndices: boolean[] = [];
        takenIndices[a_id] = true;

        let wlen: number = a_words.length;        

        for (let i = 1; i < a_wordsPerQuestion; ++i)
        {
            while (true)
            {
                //Get a random number 0 -> wlen
                let randomId = Math.floor(Math.random() * wlen);

                if (!takenIndices[randomId])
                {
                    answers.push(a_words[randomId]);
                    takenIndices[randomId] = true;
                    break;
                }
            }
        }

        //1. shuffle by swapping each element with a random pos
        for (let i = 0; i < a_wordsPerQuestion; ++i)
        {
            //Get a random number 0 -> wlen
            let randomId = Math.floor(Math.random() * a_wordsPerQuestion);
            let tempWord = answers[randomId];

            answers[randomId] = answers[i];
            answers[i] = tempWord;
        }
        
        //2. find the correct word to get its position
        for (let i = 0; i < a_wordsPerQuestion; ++i)
        {
            if (answers[i] === correctWord)
            {
                this.m_correctAnswer = i;
                break;
            }
        }

        return answers;
    }
}