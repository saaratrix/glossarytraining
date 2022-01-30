import type { InflectionCategory } from '../../shared/models/inflection-category';
import type { Inflection } from '../../shared/models/inflection';

export interface InflectionSelection {
  inflectionCategory: InflectionCategory;
  inflections: Inflection[];
}
