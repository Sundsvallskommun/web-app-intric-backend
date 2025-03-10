import { Applications, PaginatedResponseSpaceSparse, SpacePublic } from '@/data-contracts/intric/data-contracts';
import applicationModeMiddleware from '@/middlewares/application-mode.middleware';
import hashMiddleware from '@/middlewares/hash.middleware';
import { getApiKey } from '@/services/intric-api-key.service';
import IntricApiService from '@/services/intric-api.service';
import { logger } from '@/utils/logger';
import { Request } from 'express';
import { Controller, Get, Param, QueryParam, Req, Res, UseBefore } from 'routing-controllers';

@UseBefore(applicationModeMiddleware)
@Controller()
export class SpaceController {
  private intricApiService = new IntricApiService();

  @Get('/spaces')
  @UseBefore(hashMiddleware)
  async get_user_spaces(@Req() req: Request, @QueryParam('personal') personal: boolean, @Res() response: any): Promise<PaginatedResponseSpaceSparse> {
    try {
      const url = '/spaces/';
      const apiKey = await getApiKey(req);
      const res = await this.intricApiService.get<PaginatedResponseSpaceSparse>({ url, headers: { 'api-key': apiKey } });
      if (personal) {
        try {
          const personal_url = '/spaces/type/personal/';
          const personal = await this.intricApiService.get<SpacePublic>({ url: personal_url, headers: { 'api-key': apiKey } });
          const personalSpace = { ...personal.data };
          delete personalSpace.applications;
          delete personalSpace.embedding_models;
          delete personalSpace.completion_models;
          delete personalSpace.knowledge;

          return { ...res.data, count: res.data.count + 1, items: [personalSpace, ...res.data.items] };
        } catch {
          console.log('No personal space');
        }
      }
      return res.data;
    } catch (e) {
      console.error('Error getting spaces', e);
      logger.error('Error getting spaces', e);
    }
  }

  @Get('/spaces/personal')
  @UseBefore(hashMiddleware)
  async get_personal_space(@Req() req: Request, @Res() response: any): Promise<SpacePublic> {
    try {
      const url = `/spaces/type/personal/`;
      const apiKey = await getApiKey(req);
      const res = await this.intricApiService.get<SpacePublic>({ url, headers: { 'api-key': apiKey } });

      return res.data;
    } catch (e) {
      logger.error('Error getting space', e);
    }
  }

  @Get('/spaces/:id')
  @UseBefore(hashMiddleware)
  async get_single_space(@Req() req: Request, @Param(':id') id: string, @Res() response: any): Promise<SpacePublic> {
    try {
      const url = `/spaces/${id}`;
      const apiKey = await getApiKey(req);
      const res = await this.intricApiService.get<SpacePublic>({ url, headers: { 'api-key': apiKey } });

      return res.data;
    } catch (e) {
      logger.error('Error getting space', e);
    }
  }

  @Get('/spaces/:id/applications')
  @UseBefore(hashMiddleware)
  async get_single_space_applications(@Req() req: Request, @Param('id') id: string, @Res() response: any): Promise<Applications> {
    try {
      const url = `/spaces/${id}/applications`;
      const apiKey = await getApiKey(req);
      const res = await this.intricApiService.get<Applications>({ url, headers: { 'api-key': apiKey } });

      return res.data;
    } catch (e) {
      logger.error('Error getting applications from space', e);
    }
  }
}
