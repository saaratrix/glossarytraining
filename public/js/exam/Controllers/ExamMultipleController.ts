module Exam
{
    export class ExamMultipleController implements IController
    {
        static WordsPerQuestion: number = 3;

        private m_program: ExamProgram;
        private m_questions: QuestionMultiple[];

        private m_view: ExamMultipleView;

        private m_testId: number;
        private m_type: ExamType = ExamType.MULTIPLE;
        private m_language: ExamLanguageAnswers;

        constructor(a_program: ExamProgram)
        {
            this.m_program = a_program;
            this.m_questions = [];

            this.m_view = new ExamMultipleView(this);
        }

        add(a_rootElement: HTMLElement, a_data: StartStateData)
        {
            
            //Check if questions are added
            if (this.m_questions.length == 0)
            {
                this.m_testId = a_data.testId;
                this.m_language = a_data.language;

                this.getDataFromServer(a_rootElement);
            }
        }

        getControllerElement()
        {
            return document.getElementById("");
        }

        getDataFromServer(a_rootElement: HTMLElement)
        {
            var input = {
                testId: this.m_testId
            };

            var that = this;

            Utility.AjaxPost("/exam/api/exam", input, function (a_response: ExamMultiResponse)
            {
                if (a_response.error)
                {
                    //Do something
                }
                else
                {                    
                    that.generateQuestions(a_response.words);                           

                    if (a_response.html != "")
                    {
                        //Get the html text!                   
                        var htmlText = a_response.html;
                        var placeholderElement = document.createElement("div");
                        placeholderElement.innerHTML = htmlText;

                        a_rootElement.appendChild(placeholderElement.firstChild);

                        that.m_view.renderQuestions(that.m_questions);
                    }                    
                }
            });
        }

        private generateQuestions(a_words: Word[]): void
        {
            var wlen = a_words.length;
            this.m_questions = [];

            var questionString: string;            

            if (wlen < ExamMultipleController.WordsPerQuestion)
            {
                throw new Error("Not enough words to have multiple answers!");
            }

            for (var i = 0; i < wlen; ++i)
            {
                var question = this.generateQuestion(i, a_words);
                this.m_questions.push(question);
            }          
        }

        private generateQuestion(a_id: number, a_words: Word[]) : QuestionMultiple
        {
            var chosenWords: Word[] = [];
            var takenIndices: boolean[] = [];
            //Get correct word and add to indices
            var correctWord = a_words[a_id];
            takenIndices[a_id] = true;
            //Add the correct word to chosenWords.
            chosenWords.push(correctWord);     
            
            var len = ExamMultipleController.WordsPerQuestion;
            var wlen = a_words.length;
            //Add random words to the words list!
            for (var i = 1; i < len; ++i)
            {
                while (true)
                {
                    //Get a random number 0 -> wlen
                    var rand = Math.floor(Math.random() * wlen);

                    if (!takenIndices[rand])
                    {
                        chosenWords.push(a_words[rand] );
                        takenIndices[rand] = true;
                        //Break out of the while loop lolol!
                        break;
                    }
                }                
            }                
            
            //1. shuffle by swapping each element with a random pos
            for (var i = 0; i < len; ++i)
            {
                //Get a random number 0 -> wlen
                var rand = Math.floor(Math.random() * len);
                var tempWord = chosenWords[rand];

                chosenWords[rand] = chosenWords[i];
                chosenWords[i] = tempWord;
            }
            var correctAnswer :number = -1;
            //2. find the correct word to get its position
            for (var i = 0; i < len; ++i)
            {
                if (chosenWords[i] === correctWord)
                {
                    correctAnswer = i;
                    break;
                }
            }

            var languageType: ExamLanguageAnswers = this.m_language;            
            //If random then randomize!
            if (languageType === ExamLanguageAnswers.RANDOM)
            {
                
                var rand = Math.floor(Math.random() + 0.5);                
                languageType = EnumConverter.ExamLanguageFromString(rand.toString() );
            }

            var question: QuestionMultiple = new QuestionMultiple(a_id, chosenWords, correctAnswer, languageType);           
            
            return question;
        }

        reviewExam(): void
        {
            var qlen = this.m_questions.length;
            var valid = true;

            for (var i = 0; i < qlen; ++i)
            {
                var question = this.m_questions[i];

                if (!question.hasAnswer() || !question.isCorrect())
                {
                    this.m_view.questionFailed(question);
                    valid = false;

                }
                else
                {
                    this.m_view.questionPassed(question);
                }
            }

            if (valid)
            {
                //All questions were ok!
                this.m_view.examPassed();
                //Finish test?
                //Tell server 
            }
            else
            {
                this.m_view.examFailed();
            }            
        }

        initEvents()
        {
            var that = this;
        }

        remove()
        {
            var wrapper: HTMLElement = this.getControllerElement();
            if (wrapper != null)
            {
                //Remove the children!                
                wrapper.parentNode.removeChild(wrapper);
            }

            this.m_questions = [];
        }
    }
}