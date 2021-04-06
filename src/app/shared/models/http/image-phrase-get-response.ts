import { ImagePhrase } from '../image-phrase.model';

export interface ImagePhraseGetResponse {
  imagePhrases: ImagePhrase[];
  error?: string;
}
