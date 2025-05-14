export interface GetTranslationOptions {
  text: string[];
  sourcelanguage: string;
  targetlanguage: string;
}

export interface Translation {
  text: string;
  to: string;
}

export interface TranslationData {
  translations: Translation[];
}

export type TranslationResponse = TranslationData[];

export interface Token {
  token: string;
  region: string;
}
