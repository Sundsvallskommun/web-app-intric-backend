import { AZURE_REGION, AZURE_SUBSCRIPTION_KEY } from '@/config';
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
