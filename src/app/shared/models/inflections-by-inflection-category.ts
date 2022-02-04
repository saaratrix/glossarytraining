import type { InflectionCategory } from './inflection-category';
import type { Inflection } from './inflection';

export interface InflectionsByInflectionCategory {
  inflectionCategory: InflectionCategory;
  inflections: Inflection[];
  isVisible: boolean;
}
