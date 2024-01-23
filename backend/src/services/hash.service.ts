import { INTRIC_SALT } from '@/config';
import 'crypto';
import { createHmac } from 'crypto';

export const verifyHash = (user: string, assistant_id: string, hash: string) => {
  if (typeof user !== 'string') {
    console.log('User value missing');
    return false;
  }
  if (typeof assistant_id !== 'string') {
    console.log('Assistant id value missing');
    return false;
  }
  if (typeof hash !== 'string') {
    console.log('Hash value missing');
    return false;
  }
  console.log('inbound hash:', hash);
  const salt = INTRIC_SALT;
  console.log('using salt:', salt);
  const input = user + assistant_id;
  console.log('Using input:');
  console.log(input);
  const _hash = createHmac('sha256', salt).update(input).digest('base64');
  console.log('calculated hash:', _hash);
  return typeof hash !== 'undefined' && typeof _hash !== 'undefined' && _hash === hash;
};
