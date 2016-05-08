module Exam
{    
    export class StartController implements IController
    {
        private m_startButton: HTMLButtonElement;
        private m_program: ExamProgram;
        constructor(a_program: ExamProgram)
        {            
            this.m_program = a_program;
        }

        add(a_rootElement: HTMLElement, a_data: any = {})
        {
            var startWrapper: HTMLElement = this.getControllerElement();

            if (startWrapper != null)
            {
                if (this.m_startButton == null)
                {
                    this.initEvents();
                }
            }
            else
            {
                this.getDataFromServer(a_rootElement);
            }
        }

        getControllerElement()
        {
            return document.getElementById("startwrapper");
        }

        getDataFromServer(a_rootElement : HTMLElement)
        {
            Utility.AjaxPost("/exam/api/start", {}, function (a_response: StartResponse)
            {               
                //var response: StartResponse = a_response as StartResponse;

                if (a_response.error)
                {
                    //Do something
                }
                else
                {
                    //Get the html text!                   
                    var htmlText = a_response.html;
                    var placeholderElement = document.createElement("div");
                    placeholderElement.innerHTML = htmlText;

                    a_rootElement.appendChild(placeholderElement.firstChild);
                }
            });
        }

        initEvents()
        {
            var that = this;
            this.m_startButton = document.getElementById("starttest") as HTMLButtonElement;
            this.m_startButton.addEventListener("click", function ()
            {
                var testSelector: HTMLSelectElement = document.getElementById("testselector") as HTMLSelectElement;

                if (testSelector.value != "")
                {
                    var testId: number = parseInt(testSelector.value);
                    var selectedElement: HTMLOptionElement = testSelector.options[testSelector.selectedIndex] as HTMLOptionElement;

                    var type: ExamType = Exam.EnumConverter.ExamTypeFromString( selectedElement.getAttribute("data-type"));
                    var language: ExamLanguageAnswers = Exam.EnumConverter.ExamLanguageFromString(selectedElement.getAttribute("data-language"));

                    if (testId > 0)
                    {
                        var data: StartStateData = {
                            testId: testId,
                            language: language,
                            type: type
                        };

                        //This will remove the startwrapper!
                        that.m_program.changeState(ExamState.CURRENT, that, data);

                    };                        
                }
            });
        }

        remove()
        {
            var startWrapper: HTMLElement = this.getControllerElement();
            if (startWrapper != null)
            {
                //Remove the children!
                //startWrapper.innerHTML = "";
                //Remove the element from parentNode (examwrapper)
                startWrapper.parentNode.removeChild(startWrapper);
            }

            this.m_startButton = null;
        }
    }
}