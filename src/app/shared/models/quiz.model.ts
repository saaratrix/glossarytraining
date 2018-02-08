import { Phrase } from "./phrase.model";

export interface Quiz {
  id: number;
  name: string;
  phrases: Phrase[];
}
