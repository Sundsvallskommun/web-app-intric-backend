import { UserPublic as UserPublicInterface } from '@/data-contracts/intric/data-contracts';
import applicationModeMiddleware from '@/middlewares/application-mode.middleware';
import hashMiddleware from '@/middlewares/hash.middleware';
import { getApiKey } from '@/services/intric-api-key.service';
import IntricApiService from '@/services/intric-api.service';
import { Controller, Get, HttpError, Req, Res, UseBefore } from 'routing-controllers';
import { Request, Response } from 'express';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { UserPublic } from '@/responses/intric/user.response';
import { logger } from '@/utils/logger';

@UseBefore(applicationModeMiddleware)
@Controller()
export class UserController {
  private intricApiService = new IntricApiService();

  @Get('/users/me')
  @OpenAPI({
    summary: 'Get my user from Intric',
  })
  @ResponseSchema(UserPublic)
  @UseBefore(hashMiddleware)
  async get_me(@Req() req: Request, @Res() response: Response<UserPublicInterface>): Promise<Response<UserPublicInterface>> {
    const url = '/users/me';
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.get<UserPublicInterface>({ url, headers: { 'api-key': apiKey } });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error getting user.', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get user');
    }
  }
}
