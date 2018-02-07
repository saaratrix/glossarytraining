import { Phrase } from "./Phrase";

export class Quiz {
  constructor (public id: number,
               public name: string,
               public type: QuizType,
               public phrases: Phrase[]
              ) {
  }
}

export enum QuizType {
  Text = 0,
  MultipleChoices = 1
}
