import {
  Applications as ApplicationsInterface,
  AssistantPublic as AssistantPublicInterface,
  CreateSpaceAssistantRequest,
  PaginatedResponseSpaceSparse as PaginatedResponseSpaceSparseInterface,
  SpacePublic as SpacePublicInterface,
} from '@/data-contracts/intric/data-contracts';
import { CreateSpaceAssistantDto } from '@/dtos/space.dto';
import { PaginatedResponseSpacePublicInterface } from '@/interfaces/space.interface';
import applicationModeMiddleware from '@/middlewares/application-mode.middleware';
import hashMiddleware from '@/middlewares/hash.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { AssistantPublic } from '@/responses/intric/assistant.response';
import { Applications, PaginatedResponseSpacePublic, PaginatedResponseSpaceSparse, SpacePublic } from '@/responses/intric/space.response';
import { getApiKey } from '@/services/intric-api-key.service';
import IntricApiService from '@/services/intric-api.service';
import { logger } from '@/utils/logger';
import { Request, Response } from 'express';
import { Body, Controller, Get, HttpError, Param, Post, QueryParam, Req, Res, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@UseBefore(applicationModeMiddleware)
@Controller()
export class SpaceController {
  private intricApiService = new IntricApiService();

  @Get('/spaces')
  @OpenAPI({
    summary: 'Get spaces',
    description: 'Get spaces available for you.',
    parameters: [{ name: 'personal', description: 'Include your personal space', in: 'query' }],
  })
  @ResponseSchema(PaginatedResponseSpaceSparse)
  @UseBefore(hashMiddleware)
  async get_user_spaces(
    @Req() req: Request,
    @QueryParam('personal') personal: boolean,
    @Res() response: Response<PaginatedResponseSpaceSparseInterface>,
  ): Promise<Response<PaginatedResponseSpaceSparseInterface>> {
    try {
      const url = '/spaces/';
      const apiKey = await getApiKey(req);
      const res = await this.intricApiService.get<PaginatedResponseSpaceSparseInterface>({ url, headers: { 'api-key': apiKey } });
      if (personal) {
        try {
          const personal_url = '/spaces/type/personal/';
          const personal = await this.intricApiService.get<SpacePublic>({ url: personal_url, headers: { 'api-key': apiKey } });
          const personalSpace = { ...personal.data };
          delete personalSpace.applications;
          delete personalSpace.embedding_models;
          delete personalSpace.completion_models;
          delete personalSpace.knowledge;

          return response.send({ ...res.data, count: res.data.count + 1, items: [personalSpace, ...res.data.items] });
        } catch {
          console.log('No personal space');
        }
      }
      return response.send(res.data);
    } catch (e) {
      logger.error('Error getting spaces', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get spaces');
    }
  }

  @Get('/spaces/personal')
  @OpenAPI({
    summary: 'Get personal space',
  })
  @ResponseSchema(SpacePublic)
  @UseBefore(hashMiddleware)
  async get_personal_space(@Req() req: Request, @Res() response: Response<SpacePublicInterface>): Promise<Response<SpacePublicInterface>> {
    try {
      const url = `/spaces/type/personal/`;
      const apiKey = await getApiKey(req);
      const res = await this.intricApiService.get<SpacePublicInterface>({ url, headers: { 'api-key': apiKey } });

      return response.send(res.data);
    } catch (e) {
      logger.error('Error getting space', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Error getting personal space');
    }
  }

  @Get('/spaces/batch')
  @OpenAPI({
    summary: 'Batch get spaces',
    parameters: [{ name: 'id', description: 'List of space ids', in: 'query' }],
  })
  @ResponseSchema(PaginatedResponseSpacePublic)
  @UseBefore(hashMiddleware)
  async batch_get_spaces(
    @Req() req: Request,
    @QueryParam('id', { isArray: true, required: true }) ids: Array<string>,
    @Res() response: Response<PaginatedResponseSpacePublicInterface>,
  ): Promise<Response<PaginatedResponseSpacePublicInterface>> {
    const url = `/spaces/`;
    const spaces: SpacePublicInterface[] = [];
    const apiKey = await getApiKey(req);
    if (!ids || ids?.length === 0) {
      throw new HttpError(400, 'No ids provided');
    }

    for (let index = 0; index < ids.length; index++) {
      try {
        const res = await this.intricApiService.get<SpacePublicInterface>({ url: `${url}${ids[index]}`, headers: { 'api-key': apiKey } });
        if (res) {
          spaces.push(res.data);
        }
      } catch (e) {
        logger.error('Error getting space', e);
      }
    }

    if (spaces.length === 0) {
      throw new HttpError(404, 'No spaces found');
    }

    return response.send({ items: spaces, count: spaces.length });
  }

  @Get('/spaces/:id')
  @OpenAPI({
    summary: 'Get space',
    parameters: [{ name: 'id', description: 'Id of space', in: 'path' }],
  })
  @ResponseSchema(SpacePublic)
  @UseBefore(hashMiddleware)
  async get_single_space(
    @Req() req: Request,
    @Param('id') id: string,
    @Res() response: Response<SpacePublicInterface>,
  ): Promise<Response<SpacePublicInterface>> {
    try {
      const url = `/spaces/${id}`;
      const apiKey = await getApiKey(req);
      const res = await this.intricApiService.get<SpacePublicInterface>({ url, headers: { 'api-key': apiKey } });

      return response.send(res.data);
    } catch (e) {
      logger.error('Error getting space', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get space');
    }
  }

  @Get('/spaces/:id/applications')
  @OpenAPI({
    summary: 'Get applications for space',
    parameters: [{ name: 'id', description: 'Id of space', in: 'path' }],
  })
  @ResponseSchema(Applications)
  @UseBefore(hashMiddleware)
  async get_single_space_applications(
    @Req() req: Request,
    @Param('id') id: string,
    @Res() response: Response<ApplicationsInterface>,
  ): Promise<Response<ApplicationsInterface>> {
    try {
      const url = `/spaces/${id}/applications`;
      const apiKey = await getApiKey(req);
      const res = await this.intricApiService.get<ApplicationsInterface>({ url, headers: { 'api-key': apiKey } });

      return response.send(res.data);
    } catch (e) {
      logger.error('Error getting applications from space', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get applications');
    }
  }

  @Post('/spaces/:id/applications/assistants')
  @OpenAPI({
    summary: 'Create assistant in space',
    parameters: [{ name: 'id', description: 'Id of space', in: 'path' }],
  })
  @ResponseSchema(AssistantPublic)
  @UseBefore(hashMiddleware)
  @UseBefore(validationMiddleware(CreateSpaceAssistantDto, 'body'))
  async create_space_assistant(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: CreateSpaceAssistantDto,
    @Res() response: Response<AssistantPublicInterface>,
  ): Promise<Response<AssistantPublicInterface>> {
    try {
      const url = `/spaces/${id}/applications/assistants`;
      const apiKey = await getApiKey(req);
      const res = await this.intricApiService.post<AssistantPublicInterface, CreateSpaceAssistantRequest>({
        url,
        headers: { 'api-key': apiKey },
        data: body,
      });

      return response.send(res.data);
    } catch (e) {
      logger.error('Error saving assistant to space', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not save assistant');
    }
  }
}
