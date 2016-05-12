import { Component} from "angular2/core";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "angular2/router";

import {ExamComponent} from "./exam/exam";

@Component({
    selector: "exam-app",
    template: "<h1>Hello world</h1>",
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS
    ]
})
@RouteConfig([
    {
        path: "/exam",
        name: "Exam",
        component: ExamComponent,
        useAsDefault: true
    }
])
export class AppComponent
{
    public title: string = "Hello world!";
}