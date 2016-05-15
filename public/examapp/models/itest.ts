import {ExamType} from "./../enums/examtype";
import {ExamLanguageAnswer} from "./../enums/examlanguageanswer";

export interface ITest
{
    id: Number,
    name: string,
    type: ExamType,
    language: ExamLanguageAnswer
}