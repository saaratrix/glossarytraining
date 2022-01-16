import type { Phrase } from './Phrase';
import type { InflectionCategory } from './InflectionCategory';

export class Inflection {
  constructor(
    public id: number,
    public inflection: string,
    public phrase: Phrase,
    public inflectionCategory: InflectionCategory,
  ) {}
}
