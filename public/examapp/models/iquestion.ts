

export interface IQuestion
{
    m_id: number;
    m_question: string;    
    // If the question is visible to the user or not
    m_visible: boolean;    

    isCorrect(): boolean;
    hasAnswer(): boolean;
}