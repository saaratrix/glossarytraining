module Exam
{
    export interface ExamSimpleResponse
    {
        error?: string;
        html: string;
        words: Word[];
    }
}