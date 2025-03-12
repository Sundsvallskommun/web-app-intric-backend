import { UserPublic } from '@/data-contracts/intric/data-contracts';
import applicationModeMiddleware from '@/middlewares/application-mode.middleware';
import hashMiddleware from '@/middlewares/hash.middleware';
import { getApiKey } from '@/services/intric-api-key.service';
import IntricApiService from '@/services/intric-api.service';
import { Controller, Get, Req, Res, UseBefore } from 'routing-controllers';
import { Request } from 'express';

@UseBefore(applicationModeMiddleware)
@Controller()
export class UserController {
  private intricApiService = new IntricApiService();

  @Get('/users/me')
  @UseBefore(hashMiddleware)
  async get_me(@Req() req: Request, @Res() response: any): Promise<UserPublic> {
    const url = '/users/me';
    const apiKey = await getApiKey(req);
    const res = await this.intricApiService.get<UserPublic>({ url, headers: { 'api-key': apiKey } });
    return res.data;
  }
}
