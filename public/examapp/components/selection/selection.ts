import { Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';
import {Response, Http, HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from "./../app";

import { ITest} from "./../../models/itest";

@Component({
    selector: "exam-selection",      
    templateUrl: "examapp/components/selection/selection.html",
    viewProviders: [HTTP_PROVIDERS],
})
export class ExamSelectionComponent
{    
    public tests: ITest[];
    public selectedIndex: Number;

    //@Input() examapp: AppComponent
    @Output() onselected: EventEmitter<ITest> = new EventEmitter();

    //private _http: Http;

    constructor(private http: Http)
    {
        //this._http = http;        
        // Add a placeholder element, attempts so far has left it always empty when doing it in html. 
        // Most likely because ngModel is null and its bound to the selectedIndex afterall.
        this.tests = [{
            id: -1,
            name: "Please select a test",
            language: 0,
            type:0
        }];

        this.selectedIndex = 0;

        this.getTests();
    }

    public startTest()
    {
        var testItem: ITest = this.tests[this.selectedIndex];
               
        // Tell the parent component (exam app) that an item has been selected and which one it was.
        this.onselected.emit(testItem);
        
    }

    private getTests()
    {
        this.http.get("/api/exam/tests").subscribe((res: Response) =>
        {
            var data = res.json();

            for (var i = 0; i < data.tests.length; ++i)
            {
                this.tests.push(data.tests[i]);
            }       
        });
    }
}