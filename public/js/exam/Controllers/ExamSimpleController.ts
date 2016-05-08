module Exam
{
    export class ExamSimpleController implements IController
    {
        private m_program: ExamProgram;
        private m_questions: QuestionSimple[]; 

        private m_view: ExamSimpleView;

        private m_testId: number;
        private m_type: ExamType = ExamType.SIMPLE;
        private m_language: ExamLanguageAnswers;

        constructor(a_program: ExamProgram)
        {
            this.m_program = a_program;
            this.m_questions = [];
            this.m_view = new ExamSimpleView(this);
        }

        add(a_rootElement: HTMLElement, a_data: any = {})
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

            Utility.AjaxPost("/exam/api/exam", input, function (a_response: ExamSimpleResponse)
            {
                if(a_response.error)
                {
                    //Do something
                }
                else
                {                    
                    that.generateQuestions(a_response.words);                           

                    if(a_response.html != "")
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
            
            for (var i = 0; i < wlen; ++i)
            {
                var question = this.generateQuestion(i, a_words[i] );
                this.m_questions.push(question);
            }
        }

        private generateQuestion(a_id: number, a_word: Word) : QuestionSimple
        {
            var languageType: ExamLanguageAnswers = this.m_language;            
            //If random then randomize!
            if (languageType === ExamLanguageAnswers.RANDOM)
            {

                var rand = Math.floor(Math.random() + 0.5);
                languageType = EnumConverter.ExamLanguageFromString(rand.toString());
            }

            var question = new QuestionSimple(a_id, a_word, languageType); 

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
                //startWrapper.innerHTML = "";
                //Remove the element from parentNode (examwrapper)
                wrapper.parentNode.removeChild(wrapper);
            }
            this.m_questions = [];
        }
    }
}