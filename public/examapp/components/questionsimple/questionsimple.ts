﻿import { Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';


import { ITest} from "./../../models/itest";
import { IWord} from "./../../models/iword";
import { QuestionSimple } from "./../../models/questionsimple";

import {ReviewService} from "./../../services/review/review";

const wordsPerQuestion = 3;

@Component({
    selector: "question-simple",      
    templateUrl: "examapp/components/questionsimple/questionsimple.html"   
})
export class QuestionSimpleComponent
{
    //@Input() examapp: AppComponent
    @Input() question: QuestionSimple;  
    @Input() questionIndex: number;
    
    @Output() answered: EventEmitter<any> = new EventEmitter();

    public isCorrect: boolean;
    public isReviewed: boolean;

    private reviewSubscription: any;

    private hasEmitted: boolean = false;    
    
    constructor(private reviewService: ReviewService)
    { 
        this.reviewSubscription = this.reviewService.reviewEvent.subscribe(success => this.onReview(success));
        
        this.isCorrect = false;
        this.isReviewed = false;
    }  
   
    public questionAnswered()
    {       
        if (!this.hasEmitted)
        {
            this.hasEmitted = true;
            this.answered.emit(null);
        }
    }
   
    public ngOnDestroy()
    {
        // Remove event listener when this component is destroyed
        this.reviewSubscription.unsubscribe();
    }

    public onReview(a_success: boolean)
    {        
        if (a_success)
        {
            this.isCorrect = true;
        }
        else
        {
            // If the success is false then check the question if its true or not
            this.isCorrect = this.question.isCorrect();
        }

        this.isReviewed = true;
    }
}