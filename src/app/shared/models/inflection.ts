import type { Phrase } from './phrase.model';
import type { InflectionCategory } from './inflection-category';

export interface Inflection {
  id: number;
  inflection: string;
  note: string;
  phrase: Phrase | undefined;
  inflectionCategory: InflectionCategory | undefined;
}
