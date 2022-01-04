import { Phrase } from "./phrase.model";
import { ImagePhrase } from './image-phrase.model';

export interface Quiz {
  id: number;
  name: string;
  description: string;
  imagePhrases: ImagePhrase[];
  phrases: Phrase[];
}
