import { Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';


import { ITest} from "./../../models/itest";

@Component({
    selector: "exam-simple",      
    templateUrl: "examapp/components/simpletest/simpletest.html"    
})
export class ExamSimpleComponent
{
    //@Input() examapp: AppComponent
    @Input() words: Object;  

    
    constructor()
    {        
    }   

    ngOnInit()
    {
        
    }
}