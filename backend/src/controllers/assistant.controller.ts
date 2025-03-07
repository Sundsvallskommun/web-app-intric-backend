import {
  AssistantPublic,
  CursorPaginatedResponseSessionMetadataPublic,
  PaginatedResponseAssistantPublic,
  PartialAssistantUpdatePublic,
  SessionPublic,
} from '@/data-contracts/intric/data-contracts';
import { UpdateAssistantDto } from '@/dtos/assistant.dto';
import applicationModeMiddleware from '@/middlewares/application-mode.middleware';
import hashMiddleware from '@/middlewares/hash.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { getApiKey } from '@/services/intric-api-key.service';
import IntricApiService from '@/services/intric-api.service';
import { Request } from 'express';
import { Body, Controller, Delete, Get, Param, Post, Req, UseBefore } from 'routing-controllers';

@UseBefore(applicationModeMiddleware)
@Controller()
export class AssistantController {
  private intricApiService = new IntricApiService();
  @Get('/assistants')
  @UseBefore(hashMiddleware)
  async get_assistants(@Req() req) {
    const url = '/assistants/';
    const apiKey = await getApiKey(req);
    const res = await this.intricApiService.get<PaginatedResponseAssistantPublic>({ url, headers: { 'api-key': apiKey } });
    return res.data;
  }

  @Get('/assistants/:id')
  @UseBefore(hashMiddleware)
  async get_assistant_by_id(@Req() req, @Param('id') id: string) {
    const url = `/assistants/${id}`;
    const apiKey = await getApiKey(req);
    const res = await this.intricApiService.get<AssistantPublic>({ url, headers: { 'api-key': apiKey } });
    return res.data;
  }

  @Post('/assistants/:id')
  @UseBefore(hashMiddleware)
  @UseBefore(validationMiddleware(UpdateAssistantDto, 'body'))
  async update_assistant(@Req() req: Request, @Param('id') id: string, @Body() body: UpdateAssistantDto): Promise<AssistantPublic> {
    const url = `/assistants/${id}/`;
    const apiKey = await getApiKey(req);
    const res = await this.intricApiService.post<AssistantPublic, PartialAssistantUpdatePublic>({ url, headers: { 'api-key': apiKey }, data: body });
    return res.data;
  }

  @Delete('/assistants/:id')
  @UseBefore(hashMiddleware)
  async delete_assistant(@Req() req: Request, @Param('id') id: string): Promise<AssistantPublic> {
    const url = `/assistants/${id}/`;
    const apiKey = await getApiKey(req);
    const res = await this.intricApiService.delete<AssistantPublic>({ url, headers: { 'api-key': apiKey } });
    return res.data;
  }

  @Get('/assistants/:id/sessions')
  @UseBefore(hashMiddleware)
  async get_assistant_sessions(@Req() req, @Param('id') id: string) {
    const url = `/assistants/${id}/sessions/`;
    const apiKey = await getApiKey(req);
    const res = await this.intricApiService.get<CursorPaginatedResponseSessionMetadataPublic>({ url, headers: { 'api-key': apiKey } });
    return res.data;
  }

  @Get('/assistants/:id/sessions/:session_id')
  @UseBefore(hashMiddleware)
  async get_assistant_session(@Req() req, @Param('id') id: string, @Param('session_id') session_id: string) {
    const url = `/assistants/${id}/sessions/${session_id}`;
    const apiKey = await getApiKey(req);
    const res = await this.intricApiService.get<SessionPublic>({ url, headers: { 'api-key': apiKey } });
    return res.data;
  }
}
