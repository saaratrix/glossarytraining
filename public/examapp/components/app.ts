import { Component} from "angular2/core";
//import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "angular2/router";

import {ExamState} from "./../enums/examstate";
import { ITest} from "./../models/itest";

import {ExamSelectionComponent} from "./selection/selection";
import {ExamTestComponent} from "./test/test";

const examStateKey = "examstate";
const examTestKey = "examtest";

@Component({
    selector: "exam-app",
    templateUrl: "/examapp/components/app.html",    
    directives: [ExamSelectionComponent, ExamTestComponent]    
})
export class AppComponent
{    
    // Tell the view template what the enum values are
    public examStates = ExamState;
    // The current state
    public currentState: ExamState;
    public currentTest: ITest;    

    constructor()
    {   
        let state: string = sessionStorage.getItem(examStateKey);
        let currentTest = sessionStorage.getItem(examTestKey);
        if (currentTest)
        {
            this.currentTest = JSON.parse(currentTest);
        }
        this.currentState = state !== null ? parseInt(state, 10) : ExamState.Selection;    
    }

    public onselected(a_test : ITest)
    {
        if (a_test)
        {                        
            console.log(a_test);           
            this.setTest(a_test);
            this.setState(ExamState.Started);
        }
    }

    private setState(a_state: ExamState)
    {
        this.currentState = a_state;
        
        sessionStorage.setItem(examStateKey, this.currentState.toString());
    }

    private setTest(a_test: ITest)
    {
        this.currentTest = a_test;
        sessionStorage.setItem(examTestKey, JSON.stringify(a_test));
    }
}