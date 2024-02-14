import { INTRIC_APIKEY_VUX } from '@/config';
import { Request } from 'express';

export const getApiKey = (req: Request) => {
  const app = req.headers['_skapp'] ? (req.headers['_skapp'] as string) : undefined;
  if (typeof app !== 'string') {
    console.log('Application id missing');
    return false;
  }
  console.log('inbound app:', app);
  switch (app) {
    case 'VUX':
      console.log('Returning api key for VUX:', INTRIC_APIKEY_VUX);
      return INTRIC_APIKEY_VUX;
    case 'QWERTY':
      console.log('Qwerty but still returning api key for VUX:', INTRIC_APIKEY_VUX);
      return INTRIC_APIKEY_VUX;
    default:
      return undefined;
  }
};
