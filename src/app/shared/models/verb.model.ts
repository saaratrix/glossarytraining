// Can't use ä (minä) because of angular Lexer.
export interface Verb {
  id: number;
  finnish: string;
  english: string;
  note: string;
  mina: string;
  sina: string;
  han: string;
  me: string;
  te: string;
  he: string;
  ei: string;
}
