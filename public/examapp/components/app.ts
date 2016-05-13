import { Component} from "angular2/core";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "angular2/router";

import {ExamState} from "./../enums/examstate";

import {ExamSelectionComponent} from "./selection/selection";

const examStateKey = "examstate";

@Component({
    selector: "exam-app",
    templateUrl: "/examapp/components/app.html",    
    directives: [ROUTER_DIRECTIVES, ExamSelectionComponent],
    providers: [
        ROUTER_PROVIDERS
    ]
})
export class AppComponent
{    
    // Tell the view template what the enum values are
    public examStates = ExamState;
    // The current state
    public currentState : ExamState
    constructor()
    {        
        let state :string = sessionStorage.getItem(examStateKey);
        this.currentState = state !== null ? parseInt(state, 10) : ExamState.Selection;    
    }
}