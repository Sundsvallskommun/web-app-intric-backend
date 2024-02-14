import { INTRIC_SALT } from '@/config';
import 'crypto';
import { createHash, createHmac } from 'crypto';

export const verifyHash = (user: string, assistant_id: string, app: string, hash: string) => {
  if (typeof user !== 'string') {
    console.log('User value missing');
    return false;
  }
  if (typeof assistant_id !== 'string') {
    console.log('Assistant id value missing');
    return false;
  }
  if (typeof app !== 'string') {
    console.log('Application id missing');
    return false;
  }
  if (typeof hash !== 'string') {
    console.log('Hash value missing');
    return false;
  }
  console.log('inbound hash:', hash);
  const salt = INTRIC_SALT;
  const input = `${user}${assistant_id}${app}${salt}`;
  console.log('Using input:');
  console.log(input);
  // const _hash = createHmac('sha256', salt).update(input).digest('base64url');
  const _hash = createHash('sha256').update(input).digest('base64');
  console.log('calculated hash:', _hash);
  return typeof hash !== 'undefined' && typeof _hash !== 'undefined' && _hash === hash;
};
