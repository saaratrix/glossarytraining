import { ImagePhrase } from '../image-phrase.model';

export interface ImagePhrasesGetResponse {
  imagePhrases: ImagePhrase[];
  error?: string;
}
