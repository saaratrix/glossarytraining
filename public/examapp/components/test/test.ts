import { Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';
import {Response, Http, HTTP_PROVIDERS} from 'angular2/http';

import { ITest} from "./../../models/itest";

@Component({
    selector: "exam-test",      
    templateUrl: "examapp/components/test/test.html"    
})
export class ExamTestComponent
{
    //@Input() examapp: AppComponent
    @Input() test: ITest;

    @Output() onfinished: EventEmitter<Object> = new EventEmitter(); 

    //private _http: Http;

    constructor()
    {        
    }   

    ngOnInit()
    {
        
    }
}