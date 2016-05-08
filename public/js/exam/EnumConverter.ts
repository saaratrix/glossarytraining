module Exam
{
    export class EnumConverter
    {
        static ExamTypeFromString(a_value: string): ExamType
        {
            var value = parseInt(a_value);
            switch (value)
            {
                case 0:
                    return ExamType.SIMPLE;
                case 1:
                    return ExamType.MULTIPLE;
                default:
                    throw new Error("invalid type");
            }
        }

        static ExamLanguageFromString(a_value: string): ExamLanguageAnswers
        {
            var value = parseInt(a_value);
            switch (value)
            {
                case 0:
                    return ExamLanguageAnswers.UL;
                case 1:
                    return ExamLanguageAnswers.FI;
                case 2:
                    return ExamLanguageAnswers.RANDOM;
                default:
                    throw new Error("invalid language enum");
            }
        }

        static ExamStateFromString(a_value: string): ExamState
        {            
            switch (a_value)
            {
                case "start":
                    return ExamState.START;
                case "current":
                    return ExamState.CURRENT;
                default:
                    throw new Error("Invalid state");
            }
        }
    }
}