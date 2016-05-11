module Exam
{
    export enum ExamState
    {
        //When choosing a test
        START = 0,
        //Have chosen a test
        CURRENT = 1,
    }

    export enum ExamType
    {
        //Write the answer in a text input
        SIMPLE = 0,
        //Choose between 3 choices in a text input
        MULTIPLE = 1,
    } 
    
    //The value is what language the answer is in.
    export enum ExamLanguageAnswers
    {        
        //Questions in Finnish,  Answsers in English e.t.c.
        UL = 0,
        //Questions in English e.t.c.,   Answers in Finnish
        FI = 1,
        //Random between UL & FI
        RANDOM = 2
    }       

    export class ExamProgram
    {
        m_state: ExamState;
        private m_startController: StartController;
        private m_examSimpleController: ExamSimpleController;
        private m_examMultipleController: ExamMultipleController;

        constructor()
        {
            this.m_startController = new StartController(this);
            this.m_examSimpleController = new ExamSimpleController(this);
            this.m_examMultipleController = new ExamMultipleController(this);
        }
        
        getRootElement(): HTMLElement
        {     
               
            return document.getElementById("examwrapper");
        }

        run(): void
        {
            var examRoot: HTMLElement = this.getRootElement();
        
            //If exam root exists!
            if (examRoot)
            {                
                this.m_state = Exam.EnumConverter.ExamStateFromString(examRoot.getAttribute("data-state"));

                switch (this.m_state)
                {
                    case ExamState.START:
                        //Do start JS
                        this.m_startController.add(examRoot);
                        break;
                    case ExamState.CURRENT:
                        //Do current JS
                        break;
                    default:
                        throw new Error("State on examwrapper is missing");

                }
            }
        }

        getExamState(a_rootElement: HTMLElement): ExamState
        {
            var stateText: string = a_rootElement.getAttribute("data-state");

            switch (stateText)
            {
                case "start":
                    return ExamState.START;
                case "current":
                    return ExamState.CURRENT;
                default:
                    return ExamState.START;
            }
        }

        changeState(a_state: ExamState, a_invoker: IController, a_data: any = {})
        {
            if (a_state !== this.m_state)
            {
                this.m_state = a_state;
                //First remove the current html code!
                a_invoker.remove();

                switch (a_state)
                {
                    case ExamState.START:
                        break;
                    case ExamState.CURRENT:
                        this.stateCurrent(a_data as StartStateData);                 
                        break;
                }                
            }
        }

        stateCurrent(a_data : StartStateData): void
        {            
            var controller: IController;

            switch(a_data.type)
            {
                case ExamType.SIMPLE:
                    controller = this.m_examSimpleController;
                    break;
                case ExamType.MULTIPLE:
                    controller = this.m_examMultipleController;
                    break;
            }

            controller.add(this.getRootElement(), a_data);   
        }
    }

   
}

System.config({
    packages: {
        app: {
            format: 'register',
            defaultExtension: 'js'
        }
    }
});
System.import('app/bootstrap')
    .then(null, console.error.bind(console));

window.addEventListener("load", function ()
{
    var examProgram = new Exam.ExamProgram();
    examProgram.run();
});

