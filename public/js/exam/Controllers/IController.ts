module Exam
{
    export interface IController
    {
        add(a_rootElement: HTMLElement, a_data: any): void;
        getControllerElement(): HTMLElement;
        getDataFromServer(a_rootElement: HTMLElement): void;
        initEvents(): void;
        remove(): void;
    }    
}