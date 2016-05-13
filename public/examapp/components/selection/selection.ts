import { Component, OnInit } from 'angular2/core';
import {Response, Http, HTTP_PROVIDERS} from 'angular2/http';

import { ITest} from "./../../models/interfaces/itest";

@Component({
    selector: "exam-selection",      
    templateUrl: "examapp/components/selection/selection.html",
    viewProviders: [HTTP_PROVIDERS],
})
export class ExamSelectionComponent
{
    public body: string = "exam test value";
    public tests: ITest[];
    public selectedIndex: Number;

    private _http: Http;

    constructor(http: Http)
    {
        this._http = http;
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
        var testItem : ITest = this.tests[this.selectedIndex];

        console.log(testItem);

        // Tell the parent component (exam app) that an item has been selected and which one it was.

       
    }

    private getTests()
    {
        this._http.get("/api/exam/tests").subscribe((res: Response) =>
        {
            var data = res.json();

            for (var i = 0; i < data.tests.length; ++i)
            {
                this.tests.push(data.tests[i]);
            }       
        });
    }
}