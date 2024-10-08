import { Request } from 'express';
import prisma from '../utils/prisma';
import { INTRIC_APIKEY_PRATOMAT1, INTRIC_APIKEY_PRATOMAT2, INTRIC_APIKEY_PRATOMAT3, INTRIC_APIKEY_PRATOMAT4, INTRIC_APIKEY_PRATOMAT5, INTRIC_APIKEY_PRATOMAT6, INTRIC_APIKEY_PRATOMAT7, INTRIC_APIKEY_PRATOMAT8, INTRIC_APIKEY_QWERTY, INTRIC_APIKEY_SERVANET, INTRIC_APIKEY_VUX, INTRIC_APIKEY_WISSER } from '@/config';

export const getApiKey = async (req: Request) => {
  const app = req.headers['_skapp'] ? (req.headers['_skapp'] as string) : undefined;
  if (typeof app !== 'string') {
    console.log('Application id missing');
    return false;
  }
  console.log('inbound app:', app);

  try {
    const assistant = await prisma.assistant.findUnique({ where: { app } });
    return assistant.apiKey;
  } catch (err) {
    console.log("Not in database, looking in .env");
  }

 
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
    case 'PRATOMAT7':
      console.log('Returning api key for PRATOMAT7');
      return INTRIC_APIKEY_PRATOMAT7;
    case 'PRATOMAT8':
      console.log('Returning api key for PRATOMAT8');
      return INTRIC_APIKEY_PRATOMAT8;
    case 'VUX':
      console.log('Returning api key for VUX');
      return INTRIC_APIKEY_VUX;
    case 'SERVANET':
      console.log('Returning api key for SERVANET');
      return INTRIC_APIKEY_SERVANET;
    case 'QWERTY':
      console.log('Returning api key for QWERTY');
      return INTRIC_APIKEY_QWERTY;
    case 'WISSER':
      console.log('Returning api key for WISSER');
      return INTRIC_APIKEY_WISSER;
    default:
      return undefined;
  }
};
