import { AZURE_REGION, AZURE_SUBSCRIPTION_KEY, AZURE_TRANSLATOR_KEY } from '@/config';
import { GetTranslationOptions, TranslationResponse } from '@/interfaces/azure.interface';
import { logger } from '@/utils/logger';
import axios from 'axios';
import { HttpError } from 'routing-controllers';

export const getToken = async () => {
  if (!AZURE_REGION || !AZURE_SUBSCRIPTION_KEY) {
    logger.error('Missing Azure credentials');
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
      logger.info('Azure Token received');
      return Promise.resolve(token.data);
    } else {
      logger.error('Something went wrong when fetching Azure Token');
      return Promise.reject();
    }
  } catch (e) {
    logger.error('Error getting Azure Token');
    throw new HttpError(501, 'Error getting Azure Token');
  }
};

export const getTranslations: (options: GetTranslationOptions) => Promise<string[]> = async ({ text, sourcelanguage, targetlanguage }) => {
  const url = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';

  const headers = {
    'Ocp-Apim-Subscription-Key': AZURE_TRANSLATOR_KEY,
    'Ocp-Apim-Subscription-Region': AZURE_REGION,
    'Content-Type': 'application/json',
  };
  try {
    logger.info('Translating text');
    const res = await axios<TranslationResponse>({
      url: `${url}&from=${sourcelanguage}&to=${targetlanguage}`,
      headers,
      data: JSON.stringify(text.map(text => ({ Text: text }))),
      method: 'POST',
    }).catch(e => {
      logger.error('Error translating text');
      logger.error(e);
      return { data: [] };
    });
    const data = res?.data?.map(data => data?.translations.map(translation => translation.text)).flat();

    if (data) {
      logger.info('Text translated');
      return Promise.resolve(data);
    }
    logger.error('Translation failed - no data');
  } catch (e) {
    logger.error('Error translating text');
    Promise.reject(e);
  }
};
