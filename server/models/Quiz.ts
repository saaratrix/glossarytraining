import { Phrase } from "./Phrase";
import { ImagePhrase } from './ImagePhrase';

export class Quiz {
  constructor (
    public id: number,
    public name: string,
    public description: string,
    public phrases: Phrase[],
    public imagePhrases: ImagePhrase[],
  ) { }
}
