module Exam
{
    export class ExamMultipleView
    {
        private m_controller: ExamMultipleController;          
        
        constructor(a_controller : ExamMultipleController)
        {
            this.m_controller = a_controller;
        }

        renderQuestions(a_questions: QuestionMultiple[]) :void
        {
            var qlen = a_questions.length;
            var that = this;

            var templateElement: HTMLElement = document.getElementById("template_multiple_answers");
            var questionsWrapper: HTMLElement = document.getElementById("questions_list");

            if (!templateElement || !questionsWrapper)
            {
                throw new Error("Can't find questions template or questions root");
            }

            for (var i = 0; i < qlen; ++i)
            {
                this.renderQuestion(a_questions[i], questionsWrapper, templateElement, (i == qlen - 1) );
            }

            var submitButton = document.getElementById("submit");
            submitButton.addEventListener("click", function ()
            {
                that.m_controller.reviewExam();
            });
        }

        renderQuestion(a_question: QuestionMultiple, a_questionsWrapper: HTMLElement, a_templateElement : any, a_isLast : boolean): void
        {
            var that = this;
            var hasAnswer = false;
            var questionRoot : HTMLElement = a_templateElement.content.querySelector(".question-root");

            var questionIdElement: HTMLElement = a_templateElement.content.querySelector(".id");
            var questionElement: HTMLElement = a_templateElement.content.querySelector(".question");                     

            questionIdElement.innerHTML = (a_question.m_id  + 1).toString();
            questionElement.innerHTML = a_question.m_question;

            questionRoot.id = "q_" + a_question.m_id;
            questionRoot.setAttribute("data-id", a_question.m_id.toString());      

            var clonedNode: DocumentFragment = document.importNode(a_templateElement.content, true) as DocumentFragment;  
            //Now do events and remove elements

            if (a_question.m_id === 0)
            {
                questionRoot = clonedNode.querySelector(".question-root") as HTMLElement;
                questionRoot.classList.remove("qhidden");
            }    
            
            function onAnswerClick(a_id : number) : EventListener
            {
                return function () 
                {                    
                    if (!hasAnswer)
                    {
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

                    a_question.m_answer = a_id;
                }
            };      
            
            var answersElement: NodeList = clonedNode.querySelectorAll(".answer");  
            var alen = a_question.m_words.length;
            for (var i = 0; i < alen; ++i)
            {
                var answerElement= answersElement[i] as HTMLElement;
                
                var answerInputElement: HTMLInputElement = answerElement.querySelector("input") as HTMLInputElement;
                answerInputElement.name = "q_" + a_question.m_id;             
                
                answerInputElement.addEventListener("click", onAnswerClick(i) );                                

                var answerLabeLElement: HTMLElement = answerElement.querySelector(".answer-text") as HTMLElement;
                answerLabeLElement.innerHTML = a_question.m_words[i];
            }
            
            //Do final touches!                     
            a_questionsWrapper.appendChild(clonedNode);
        }

        showNextQuestion(a_currentQuestion : QuestionMultiple) : void
        {
            var nextId = a_currentQuestion.m_id + 1;

            var nextQuestionRoot = document.getElementById("q_" + nextId);

            if (!nextQuestionRoot)
            {
                throw new Error("Could not find: q_" + nextId);
            }

            nextQuestionRoot.classList.remove("qhidden");
        }

        showSubmitButton() : void
        {
            var submitButton = document.getElementById("submit");
            submitButton.classList.remove("hide");
        }

        /*
            Exam functions
        */

        examPassed(): void
        {
            console.log("TEST PASSED!!!");
        }

        examFailed(): void
        {
            console.log("exam failed!");
        }

        questionFailed(a_question : QuestionMultiple): void
        {
            var questionELement = document.getElementById("q_" + a_question.m_id).querySelector(" .question-container");

            questionELement.classList.remove("passed");
            questionELement.classList.add("failed");
        }

        questionPassed(a_question: QuestionMultiple): void
        {
            var questionELement = document.getElementById("q_" + a_question.m_id).querySelector(" .question-container");

            questionELement.classList.remove("failed");
            questionELement.classList.add("passed");
        }

    }
}