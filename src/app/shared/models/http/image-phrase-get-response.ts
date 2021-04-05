import { ImagePhrase } from '../image-phrase.model';

export interface ImagePhraseGetResponse {
  imagePhrase: ImagePhrase;
  error?: string;
}
