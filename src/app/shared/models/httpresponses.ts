import { Category } from "./category.model";
import { Phrase } from "./phrase.model";
import { Quiz } from "./quiz.model";

export interface DefaultSuccessResponse {
  error: string;
  success: boolean;
}

/**
 * Category responses
*/

export interface CategoryGetResponse {
  categories: Category[];
}

export interface CategoryGetDetailResponse {
  category: Category;
}

export interface CategoryPostCreateResponse {
  category: Category;
  error: string;
}


/**
 * Phrase responses
 */

export interface PhraseGetResponse {
  phrases: Phrase[];
}


export interface PhraseGetDetailResponse {
  phrase: Phrase;
}

export interface PhrasePostCreateResponse {
  phrase: Phrase;
  error: string;
}



/**
 * Quiz responses
 */
export interface QuizGetDetailResponse {
  quiz: Quiz;
}

export interface QuizGetResponse {
  quizzes: Quiz[];
}

export interface QuizPostCreateResponse {
  quiz: Quiz;
  error: string;
}

