import { Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';


import { ITest} from "./../../models/itest";
import { IWord} from "./../../models/iword";
import { QuestionMultiple } from "./../../models/questionmultiple";

const wordsPerQuestion = 3;

@Component({
    selector: "question",      
    templateUrl: "examapp/components/question/question.html"    
})
export class QuestionComponent
{
    //@Input() examapp: AppComponent
    @Input() question: QuestionMultiple;  
    @Input() questionIndex: number;
    
    @Output() answered: EventEmitter<any> = new EventEmitter();

    private hasEmitted: boolean = false;
    
    
    constructor()
    { 
        
    }  

    public questionAnswered(a_answerId : number)
    {        
        this.question.m_answer = a_answerId;

        if (!this.hasEmitted)
        {
            this.hasEmitted = true;
            this.answered.emit(null);
        }
    }
}