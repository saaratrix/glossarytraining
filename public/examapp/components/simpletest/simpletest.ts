import { Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';


import { ITest} from "./../../models/itest";
import { IWord} from "./../../models/iword";
import { QuestionSimple } from "./../../models/questionsimple";
import { QuestionSimpleComponent} from "./../questionsimple/questionsimple";


import {ReviewService} from "./../../services/review/review";

@Component({
    selector: "exam-simple",      
    templateUrl: "examapp/components/simpletest/simpletest.html",
    directives: [QuestionSimpleComponent ]  
})
export class ExamSimpleComponent
{    
    @Input() test: ITest; 
    @Input() words: IWord[];  

    public questions: QuestionSimple[] = [];

    private answeredCount: number = 0;
    
    constructor(private reviewService : ReviewService)
    {           
    }   

    ngOnInit()
    {  
        for (let i: number = 0; i < this.words.length; ++i)
        {
            this.questions.push(this.generateQuestion(i));
        }

        // Shuffle questions
        for (let i = 0; i < this.questions.length; ++i)
        {
            //Get a random number 0 -> wlen
            let randomId = Math.floor(Math.random() * this.questions.length);
            let temp: QuestionSimple = this.questions[randomId];

            this.questions[randomId] = this.questions[i];
            this.questions[i] = temp;
        }

        console.log(this.questions);

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
        if (this.reviewService.reviewTest(this.test, this.questions))
        {
            console.log("Congratulations, you beat the test!");
        }   
    }

    private generateQuestion(a_index: number) : QuestionSimple
    {
        let question = new QuestionSimple(a_index, this.words[a_index], this.test.language);

        return question;
    }
}