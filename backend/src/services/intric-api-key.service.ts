import {
  INTRIC_APIKEY_SERVANET,
  INTRIC_APIKEY_VUX,
  INTRIC_APIKEY_PRATOMAT1,
  INTRIC_APIKEY_PRATOMAT2,
  INTRIC_APIKEY_PRATOMAT3,
  INTRIC_APIKEY_PRATOMAT4,
  INTRIC_APIKEY_PRATOMAT5,
  INTRIC_APIKEY_PRATOMAT6,
} from '@/config';
import { Request } from 'express';

export const getApiKey = (req: Request) => {
  const app = req.headers['_skapp'] ? (req.headers['_skapp'] as string) : undefined;
  if (typeof app !== 'string') {
    console.log('Application id missing');
    return false;
  }
  console.log('inbound app:', app);
  switch (app) {
    case 'PRATOMAT1':
      console.log('Returning api key for PRATOMAT1');
      return INTRIC_APIKEY_PRATOMAT1;
    case 'PRATOMAT2':
      console.log('Returning api key for PRATOMAT2');
      return INTRIC_APIKEY_PRATOMAT2;
    case 'PRATOMAT3':
      console.log('Returning api key for PRATOMAT3');
      return INTRIC_APIKEY_PRATOMAT3;
    case 'PRATOMAT4':
      console.log('Returning api key for PRATOMAT4');
      return INTRIC_APIKEY_PRATOMAT4;
    case 'PRATOMAT5':
      console.log('Returning api key for PRATOMAT5');
      return INTRIC_APIKEY_PRATOMAT5;
    case 'PRATOMAT6':
      console.log('Returning api key for PRATOMAT6');
      return INTRIC_APIKEY_PRATOMAT6;
    case 'VUX':
      console.log('Returning api key for VUX');
      return INTRIC_APIKEY_VUX;
    case 'SERVANET':
      console.log('Returning api key for SERVANET');
      return INTRIC_APIKEY_SERVANET;
    case 'QWERTY':
      console.log('Qwerty but still returning api key for VUX');
      return INTRIC_APIKEY_VUX;
    default:
      return undefined;
  }
};
