import { ImagePhrase } from '../image-phrase.model';

export interface ImagePhraseDetailResponse {
  imagePhrase: ImagePhrase;
  error?: string;
}
