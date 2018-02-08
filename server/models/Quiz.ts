import { Phrase } from "./Phrase";

export class Quiz {
  constructor (public id: number,
               public name: string,
               public phrases: Phrase[]
              ) {
  }
}
