import { Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';
import {Response, Http, HTTP_PROVIDERS, Headers} from 'angular2/http';

import { ExamType } from "./../../enums/examtype";

import { ITest} from "./../../models/itest";
import { IWord} from "./../../models/iword";

import { ExamMultipleComponent } from "./../multipletest/multipletest";
import { ExamSimpleComponent } from "./../simpletest/simpletest";

@Component({
    selector: "exam-test",      
    templateUrl: "examapp/components/test/test.html",
    viewProviders: [HTTP_PROVIDERS],
    directives: [ExamMultipleComponent, ExamSimpleComponent]    
})
export class ExamTestComponent
{
    //@Input() examapp: AppComponent
    @Input() test: ITest;

    @Output() onfinished: EventEmitter<Object> = new EventEmitter();   

    public words: IWord[];
    public examTypes;

    constructor(private http: Http)
    {       
        this.words = [];
        this.examTypes = ExamType;
    }   

    ngOnInit()
    {
        let body = JSON.stringify({
            testId: this.test.id
        });

        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        this.http.post("/api/exam/words", body, {headers:headers}).subscribe((a_response: Response) =>
        {
            var data = a_response.json(); 
            
            this.words = data.words;
        });
    }
}