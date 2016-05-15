import { Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';


import { ITest} from "./../../models/itest";
import { IWord} from "./../../models/iword";
import { QuestionMultiple } from "./../../models/questionmultiple";

const wordsPerQuestion = 3;

@Component({
    selector: "exam-multiple",      
    templateUrl: "examapp/components/multipletest/multipletest.html"    
})
export class ExamMultipleComponent
{
    //@Input() examapp: AppComponent
    @Input() words: IWord[];  
    @Input() test: ITest; 

    public questions: QuestionMultiple[] = [];
    
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
    }

    public questionAnswered(a_index: number)
    {
        console.log(a_index);
    }

    private generateQuestion(a_index: number): QuestionMultiple
    {
        let question = new QuestionMultiple(a_index, this.words, wordsPerQuestion, this.test.language);

        return question;
    }
}