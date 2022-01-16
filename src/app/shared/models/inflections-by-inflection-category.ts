import { InflectionCategory } from './inflection-category';
import { Inflection } from './inflection';

export interface InflectionsByInflectionCategory {
  inflectionCategory: InflectionCategory;
  inflections: Inflection[];
  isVisible: boolean;
}
