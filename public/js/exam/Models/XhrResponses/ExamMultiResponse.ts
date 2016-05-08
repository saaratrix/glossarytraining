module Exam
{
    export interface ExamMultiResponse
    {
        error?: string;
        html: string;
        words: Word[];
    }       
}