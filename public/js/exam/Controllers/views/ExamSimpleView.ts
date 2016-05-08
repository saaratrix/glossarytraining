module Exam
{
    export class ExamSimpleView
    {
        private m_controller: ExamSimpleController;

        constructor(a_controller: ExamSimpleController)
        {
            this.m_controller = a_controller;
        }

        private getQuestionId(a_id: number) : string
        {
            return "q_" + a_id;
        }

        examPassed(): void
        {
            //DO pass rendering!
        }

        examFailed(): void
        {
            //Failed rendering!
        }

        questionPassed(a_question: QuestionSimple): void
        {
            var questionELement = document.getElementById(this.getQuestionId(a_question.m_id)).querySelector(" .question-container");

            questionELement.classList.remove("failed");
            questionELement.classList.add("passed");
        }
        questionFailed(a_question: QuestionSimple): void
        {
            var questionELement = document.getElementById(this.getQuestionId(a_question.m_id)).querySelector(" .question-container");

            questionELement.classList.remove("passed");
            questionELement.classList.add("failed");
        }

        renderQuestions(a_questions : QuestionSimple[]): void
        {
            var qlen = a_questions.length;
            var that = this;

            var templateElement: HTMLElement = document.getElementById("template_simple_answers");
            var questionsWrapper: HTMLElement = document.getElementById("questions_list");

            if (!templateElement || !questionsWrapper)
            {
                throw new Error("Can't find questions template or questions root");
            }

            for (var i = 0; i < qlen; ++i)
            {
                this.renderQuestion(a_questions[i], questionsWrapper, templateElement, (i == qlen - 1));
            }

            var submitButton = document.getElementById("submit");
            submitButton.addEventListener("click", function ()
            {
                that.m_controller.reviewExam();
            });
        }

        renderQuestion(a_question: QuestionSimple, a_questionsWrapper: HTMLElement, a_templateElement: any, a_isLast: boolean): void
        {
            var that = this;
            var hasAnswer = false;
            var timeoutId: number;
            var timeoutTime: number = 2000;

            var questionRoot: HTMLElement = a_templateElement.content.querySelector(".question-root");

            var questionIdElement: HTMLElement = a_templateElement.content.querySelector(".id");
            var questionElement: HTMLElement = a_templateElement.content.querySelector(".question");
            //Make the index 1 -> n based instead of 0 -> n
            questionIdElement.innerHTML = (a_question.m_id + 1).toString();
            questionElement.innerHTML = a_question.m_question;

            questionRoot.id = this.getQuestionId(a_question.m_id);
            questionRoot.setAttribute("data-id", a_question.m_id.toString());

            var clonedNode: DocumentFragment = document.importNode(a_templateElement.content, true) as DocumentFragment;  
            //Now do events and remove elements

            if (a_question.m_id === 0)
            {
                questionRoot = clonedNode.querySelector(".question-root") as HTMLElement;
                questionRoot.classList.remove("qhidden");
            }   
            
            var showQuestionOrButton = function()
            {
                if (!hasAnswer)
                {
                    if (timeoutId)
                    {
                        clearTimeout(timeoutId);
                        timeoutId = null;
                    }

                    hasAnswer = true;

                    if (!a_isLast)
                    {
                        that.showNextQuestion(a_question);
                    }
                    else
                    {
                        that.showSubmitButton();
                    }
                }
            };
                      

            var answersElement: HTMLInputElement = clonedNode.querySelector(".answer") as HTMLInputElement;
            answersElement.addEventListener("input", function () 
            {
                if (timeoutId)
                {
                    clearTimeout(timeoutId);
                    timeoutId = null;
                }

                timeoutId = setTimeout(function ()
                {
                    showQuestionOrButton();
                }, timeoutTime); 
                

                a_question.m_answer = this.value;
            });
            answersElement.addEventListener("blur", function ()
            {
                if (this.value != "")
                {
                    showQuestionOrButton();
                }                
            });

            //Do final touches! Like add it to the DOM! :)                    
            a_questionsWrapper.appendChild(clonedNode);
        }

        showNextQuestion(a_currentQuestion: QuestionSimple): void
        {
            var nextId = a_currentQuestion.m_id + 1;

            var nextQuestionRoot = document.getElementById(this.getQuestionId(nextId));

            if (!nextQuestionRoot)
            {
                throw new Error("Could not find: q_" + nextId);
            }

            nextQuestionRoot.classList.remove("qhidden");
        }

        showSubmitButton(): void
        {
            var submitButton = document.getElementById("submit");
            submitButton.classList.remove("hide");
        }

        

    }
}