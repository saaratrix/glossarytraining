import { Phrase } from './phrase.model';
import { InflectionCategory } from './inflection-category';

export interface Inflection {
  id: number;
  inflection: string;
  phrase: Phrase | undefined;
  inflectionCategory: InflectionCategory | undefined;
}
