import { Injectable, EventEmitter } from 'angular2/core';

import { ITest} from "./../../models/itest";
import {QuestionMultiple} from "./../../models/questionmultiple";

@Injectable()
export class ReviewService
{
    public reviewEvent: EventEmitter<boolean> = new EventEmitter();

    public reviewTest(a_test: ITest, a_questions: QuestionMultiple[]) : boolean
    {
        let valid = true;

        for (let i = 0; i < a_questions.length; ++i)
        {
            var question = a_questions[i];

            if (!question.isCorrect())
            {                
                valid = false;
            }            
        }
        
        this.reviewEvent.emit(valid);       

        return valid;
    }
}