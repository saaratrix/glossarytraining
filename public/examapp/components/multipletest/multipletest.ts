import { Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';


import { ITest} from "./../../models/itest";
import { IWord} from "./../../models/iword";
import { QuestionMultiple } from "./../../models/questionmultiple";
import { QuestionComponent} from "./../question/question";

const wordsPerQuestion = 3;

@Component({
    selector: "exam-multiple",      
    templateUrl: "examapp/components/multipletest/multipletest.html",
    directives:[ QuestionComponent] 
})
export class ExamMultipleComponent
{
    //@Input() examapp: AppComponent
    @Input() words: IWord[];  
    @Input() test: ITest; 

    public questions: QuestionMultiple[] = [];

    private answeredCount: number = 0;
    
    constructor()
    { 
        
    }   

    ngOnInit()
    {
        // Generate the questions 
        if (this.words.length < wordsPerQuestion)
        {
            throw new Error("Not enough words to have multiple answers");    
        }

        for (let i: number = 0; i < this.words.length; ++i)
        {
            this.questions.push(this.generateQuestion(i));
        }
        
        // Shuffle questions
        for (let i = 0; i < this.questions.length; ++i)
        {
            //Get a random number 0 -> wlen
            let randomId = Math.floor(Math.random() * this.questions.length);
            let temp : QuestionMultiple = this.questions[randomId];

            this.questions[randomId] = this.questions[i];
            this.questions[i] = temp;
        }   

        this.questions[0].m_visible = true;
    }

    public questionAnswered()
    {       
        this.answeredCount++;

        if (this.answeredCount < this.questions.length)
        {
            this.questions[this.answeredCount].m_visible = true;
        }   
    }

    public reviewTest()
    {        
        let valid = true;

        for (let i = 0; i < this.questions.length; ++i)
        {
            var question = this.questions[i];

            if (!question.hasAnswer() || !question.isCorrect())
            {
                //this.m_view.questionFailed(question);
                valid = false;

            }
            else
            {
                //this.m_view.questionPassed(question);
            }
        }

        if (valid)
        {
            //All questions were ok!
            //this.m_view.examPassed();
            //Finish test?
            //Tell server 
        }
        else
        {
            //this.m_view.examFailed();
        }            
    }

    private generateQuestion(a_index: number): QuestionMultiple
    {
        let question = new QuestionMultiple(a_index, this.words, wordsPerQuestion, this.test.language);

        return question;
    }
}