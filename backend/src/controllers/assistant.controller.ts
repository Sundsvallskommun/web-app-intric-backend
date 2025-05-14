import {
  AssistantPublic as AssistantPublicInterface,
  CursorPaginatedResponseSessionMetadataPublic as CursorPaginatedResponseSessionMetadataPublicInterface,
  PaginatedResponseAssistantPublic as PaginatedResponseAssistantPublicInterface,
  PartialAssistantUpdatePublic,
  SessionPublic as SessionPublicInterface,
} from '@/data-contracts/intric/data-contracts';
import { UpdateAssistantDto } from '@/dtos/assistant.dto';
import applicationModeMiddleware from '@/middlewares/application-mode.middleware';
import hashMiddleware from '@/middlewares/hash.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { AssistantPublic, PaginatedResponseAssistantPublic } from '@/responses/intric/assistant.response';
import { CursorPaginatedResponseSessionMetadataPublic, SessionPublic } from '@/responses/intric/session.response';
import { getApiKey } from '@/services/intric-api-key.service';
import IntricApiService from '@/services/intric-api.service';
import { logger } from '@/utils/logger';
import { Request, Response } from 'express';
import { Body, Controller, Delete, Get, HttpError, Param, Post, QueryParam, Req, Res, UseBefore } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

@UseBefore(applicationModeMiddleware)
@Controller()
export class AssistantController {
  private intricApiService = new IntricApiService();

  @Get('/assistants')
  @ResponseSchema(PaginatedResponseAssistantPublic)
  @UseBefore(hashMiddleware)
  async get_assistants(
    @Req() req,
    @Res() response: Response<PaginatedResponseAssistantPublicInterface>,
  ): Promise<Response<PaginatedResponseAssistantPublicInterface>> {
    const url = '/assistants/';
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.get<PaginatedResponseAssistantPublicInterface>({ url, headers: { 'api-key': apiKey } });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error getting assistants: ', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get assistants');
    }
  }

  @Get('/assistants/batch')
  @UseBefore(hashMiddleware)
  @ResponseSchema(PaginatedResponseAssistantPublic)
  async batch_get_assistants_by_id(
    @Req() req,
    @QueryParam('id', { required: true, isArray: true }) ids: string[],
    @Res() response: Response<PaginatedResponseAssistantPublicInterface>,
  ): Promise<Response<PaginatedResponseAssistantPublicInterface>> {
    const url = `/assistants/`;
    const apiKey = await getApiKey(req);
    const items: AssistantPublicInterface[] = [];
    if (!ids || ids.length === 0) {
      throw new HttpError(400, 'No ids provided');
    }
    for (let index = 0; index < ids.length; index++) {
      try {
        const res = await this.intricApiService.get<AssistantPublicInterface>({ url: `${url}${ids[index]}`, headers: { 'api-key': apiKey } });
        if (res) {
          items.push(res.data);
        }
      } catch (e) {
        logger.error(e);
      }
    }

    if (items.length === 0) {
      throw new HttpError(404, 'No assistants found');
    }

    return response.send({ count: items.length, items });
  }

  @Get('/assistants/:id')
  @UseBefore(hashMiddleware)
  @ResponseSchema(AssistantPublic)
  async get_assistant_by_id(
    @Req() req,
    @Param('id') id: string,
    @Res() response: Response<AssistantPublicInterface>,
  ): Promise<Response<AssistantPublicInterface>> {
    const url = `/assistants/${id}`;
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.get<AssistantPublicInterface>({ url, headers: { 'api-key': apiKey } });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error getting assistant: ', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get assistant');
    }
  }

  @Post('/assistants/:id')
  @UseBefore(hashMiddleware)
  @UseBefore(validationMiddleware(UpdateAssistantDto, 'body'))
  @ResponseSchema(AssistantPublic)
  async update_assistant(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: UpdateAssistantDto,
    @Res() response: Response<AssistantPublicInterface>,
  ): Promise<Response<AssistantPublicInterface>> {
    const url = `/assistants/${id}/`;
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.post<AssistantPublicInterface, PartialAssistantUpdatePublic>({
        url,
        headers: { 'api-key': apiKey },
        data: body,
      });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error updating assistant: ', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not update assistant');
    }
  }

  @Delete('/assistants/:id')
  @UseBefore(hashMiddleware)
  async delete_assistant(@Req() req: Request, @Param('id') id: string, @Res() response: Response): Promise<Response> {
    const url = `/assistants/${id}/`;
    const apiKey = await getApiKey(req);
    try {
      await this.intricApiService.delete<AssistantPublic>({ url, headers: { 'api-key': apiKey } });
      return response.send();
    } catch (e) {
      logger.error('Error deleting assistant: ', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not delete assistant');
    }
  }

  @Get('/assistants/:id/sessions')
  @UseBefore(hashMiddleware)
  @ResponseSchema(CursorPaginatedResponseSessionMetadataPublic)
  async get_assistant_sessions(
    @Req() req,
    @Param('id') id: string,
    @Res() response: Response<CursorPaginatedResponseSessionMetadataPublicInterface>,
  ): Promise<Response<CursorPaginatedResponseSessionMetadataPublicInterface>> {
    const url = `/assistants/${id}/sessions/`;
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.get<CursorPaginatedResponseSessionMetadataPublicInterface>({ url, headers: { 'api-key': apiKey } });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error getting assistant sessions: ', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get assistant sessions');
    }
  }

  @Get('/assistants/:id/sessions/:session_id')
  @UseBefore(hashMiddleware)
  @ResponseSchema(SessionPublic)
  async get_assistant_session(
    @Req() req,
    @Param('id') id: string,
    @Param('session_id') session_id: string,
    @Res() response: Response<SessionPublicInterface>,
  ): Promise<Response<SessionPublicInterface>> {
    const url = `/assistants/${id}/sessions/${session_id}`;
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.get<SessionPublicInterface>({ url, headers: { 'api-key': apiKey } });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error getting session: ', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get session');
    }
  }
}
