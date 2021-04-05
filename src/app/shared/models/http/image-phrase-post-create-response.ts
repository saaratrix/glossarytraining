import { ImagePhrase } from '../image-phrase.model';

export interface ImagePhrasePostCreateResponse {
  imagePhrase: ImagePhrase;
  error?: string;
}
