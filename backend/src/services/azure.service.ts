import { AZURE_REGION, AZURE_SUBSCRIPTION_KEY, AZURE_TRANSLATOR_KEY } from '@/config';
import axios from 'axios';
import { HttpError } from 'routing-controllers';

export const getToken = async () => {
  if (!AZURE_REGION || !AZURE_SUBSCRIPTION_KEY) {
    throw new HttpError(400, 'Missing credentials');
  }
  try {
    const url = `https://${AZURE_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`;
    const headers = {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': AZURE_SUBSCRIPTION_KEY,
    };

    const token = await axios({ method: 'POST', url, headers });

    if (token) {
      return Promise.resolve(token.data);
    } else {
      return Promise.reject();
    }
  } catch (e) {
    throw new HttpError(501, 'Error getting Azure Token');
  }
};

interface GetTranslationOptions {
  text: string[];
  sourcelanguage: string;
  targetlanguage: string;
}

interface Translation {
  text: string;
  to: string;
}

interface TranslationData {
  translations: Translation[];
}

type TranslationResponse = TranslationData[];

export const getTranslations: (options: GetTranslationOptions) => Promise<string[]> = async ({ text, sourcelanguage, targetlanguage }) => {
  const url = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';

  const headers = {
    'Ocp-Apim-Subscription-Key': AZURE_TRANSLATOR_KEY,
    'Ocp-Apim-Subscription-Region': AZURE_REGION,
    'Content-Type': 'application/json',
  };
  try {
    const res = await axios<TranslationResponse>({
      url: `${url}&from=${sourcelanguage}&to=${targetlanguage}`,
      headers,
      data: JSON.stringify(text.map(text => ({ Text: text }))),
      method: 'POST',
    });
    const data = res?.data?.map(data => data?.translations.map(translation => translation.text)).flat();

    if (data) {
      return Promise.resolve(data);
    }
  } catch (e) {
    Promise.reject(e);
  }
};
