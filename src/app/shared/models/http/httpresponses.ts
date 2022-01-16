import { Category } from "../category.model";
import { Phrase } from "../phrase.model";
import { Quiz } from "../quiz.model";
import { Verb } from "../verb.model";
import { InflectionCategory } from '../inflection-category';
import { Inflection } from '../inflection';

export interface DefaultSuccessResponse {
  error: string;
  success: boolean;
}

/**
 * Category responses
*/

export interface CategoryGetResponse {
  categories: Category[];
  error?: string;
}

export interface CategoryGetDetailResponse {
  category: Category;
  error?: string;
}

export interface CategoryPostCreateResponse {
  category: Category;
  error?: string;
}


/**
 * Phrase responses
 */

export interface PhraseGetResponse {
  phrases: Phrase[];
  error?: string;
}


export interface PhraseGetDetailResponse {
  phrase: Phrase;
  error?: string;
}

export interface PhrasePostCreateResponse {
  phrase: Phrase;
  error?: string;
}



/**
 * Quiz responses
 */
export interface QuizGetDetailResponse {
  quiz: Quiz;
  error?: string;
}

export interface QuizGetResponse {
  quizzes: Quiz[];
  error?: string;
}

export interface QuizPostCreateResponse {
  quiz: Quiz;
  error: string;
}

/**
 * Verb responses
 */
export interface VerbGetResponse {
  verbs: Verb[];
  error?: string;
}

export interface VerbGetDetailResponse {
  verb: Verb;
  error?: string;
}

export interface VerbPostCreateResponse {
  verb: Verb;
  error: string;
}

/**
 * Inflection Category responses
 */

export interface InflectionCategoryGetResponse {
  inflectionCategories: InflectionCategory[];
  error?: string;
}

export interface InflectionCategoryGetDetailResponse {
  inflectionCategory: InflectionCategory;
  error?: string;
}

export interface InflectionCategoryPostCreateResponse {
  inflectionCategory: InflectionCategory;
  error: string;
}

/**
 * Inflection responses
 */
export interface InflectionGetResponse {
  inflections: Inflection[];
  error?: string;
}

export interface InflectionGetDetailResponse {
  inflection: Inflection;
  error?: string;
}

export interface InflectionPostCreateResponse {
  inflection: Inflection;
  error: string;
}

