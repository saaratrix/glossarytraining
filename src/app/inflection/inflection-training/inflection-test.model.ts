import { InflectionQuestion } from '../inflection-question/inflection-question.model';

export interface InflectionTest {
  title: string;
  description: string;
  questions: InflectionQuestion[];
}
