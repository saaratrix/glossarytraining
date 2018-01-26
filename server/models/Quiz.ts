export class Quiz {
  constructor (public id: number,
               public name: string,
               public type: QuizType)
  {}

}

export enum QuizType {
  Text = 0,
  MultipleChoices = 1
}
