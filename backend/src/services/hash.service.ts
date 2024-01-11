import { INTRIC_SALT } from '@/config';
import 'crypto';
import { createHmac } from 'crypto';

export const verifyHash = (user: string, hash: string) => {
  if (!user || !hash) {
    return false;
  }
  const salt = INTRIC_SALT;
  const _hash = createHmac('sha256', salt).update(user).digest('hex');
  return typeof hash !== 'undefined' && typeof _hash !== 'undefined' && _hash === hash;
};
