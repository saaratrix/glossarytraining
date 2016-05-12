import { Component, OnInit } from 'angular2/core';

@Component({
    selector: "exam",
    template:"<p>This is the exam</p>"
})
export class ExamComponent
{
    public test: string = "exam test value";
}