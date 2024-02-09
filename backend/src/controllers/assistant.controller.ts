import {
  AskAssistant,
  AskResponse,
  AssistantCreatePublic,
  AssistantPublic,
  AssistantUpsertPublic,
  InstorageAiModelsCompletionModelsLlmsModelFamily,
  PaginatedResponseAssistantPublic,
  PaginatedResponseSessionMetadataPublic,
  SessionPublic,
} from '@/data-contracts/intric/data-contracts';
import { CreateAssistantDto, UpdateAssistantDto } from '@/dtos/assistant.dto';
import hashMiddleware from '@/middlewares/hash.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import ApiService from '@/services/api.service';
import IntricApiService from '@/services/intric-api.service';
import { ServerResponse } from 'http';
import { Body, Controller, Delete, Get, HttpError, Param, Post, QueryParam, Req, Res, UseBefore } from 'routing-controllers';
import { Stream } from 'stream';
@Controller()
export class AssistantController {
  private intricApiService = new IntricApiService();
  @Get('/assistants')
  async get_assistants() {
    const url = '/assistants/';
    const res = await this.intricApiService.get<PaginatedResponseAssistantPublic>({ url });
    return res.data;
  }

  @Post('/assistants')
  @UseBefore(validationMiddleware(CreateAssistantDto, 'body'))
  async create_assistant(@Body() body: CreateAssistantDto): Promise<AssistantPublic> {
    const url = `/assistsants/`;
    const res = await this.intricApiService.post<AssistantPublic, AssistantCreatePublic>({ url, data: body });
    return res.data;
  }

  @Get('/assistants/:id')
  async get_assistant_by_id(@Param('id') id: string) {
    const url = `/assistants/${id}`;
    const res = await this.intricApiService.get<AssistantPublic>({ url });
    return res.data;
  }

  @Post('/assistants/:id')
  @UseBefore(validationMiddleware(UpdateAssistantDto, 'body'))
  async update_assistant(@Req() req: Request, @Param('id') id: string, @Body() body: UpdateAssistantDto): Promise<AssistantPublic> {
    const url = `/groups/${id}/`;
    const res = await this.intricApiService.post<AssistantPublic, AssistantUpsertPublic>({ url, data: body });
    return res.data;
  }

  @Delete('/assistants/:id')
  async delete_assistant(@Param('id') id: string): Promise<AssistantPublic> {
    const url = `/groups/${id}/`;
    const res = await this.intricApiService.delete<AssistantPublic>({ url });
    return res.data;
  }

  @Get('/assistants/:id/sessions')
  async get_assistant_sessions(@Param('id') id: string) {
    const url = `/assistants/${id}/sessions/`;
    const res = await this.intricApiService.get<PaginatedResponseSessionMetadataPublic>({ url });
    return res.data;
  }

  @Get('/assistants/:id/sessions/:session_id')
  async get_assistant_session(@Param('id') id: string, @Param('session_id') session_id: string) {
    const url = `/assistants/${id}/sessions/${session_id}`;
    const res = await this.intricApiService.get<SessionPublic>({ url });
    return res.data;
  }

  @Post('/assistants/:assistant_id/sessions')
  @UseBefore(hashMiddleware)
  async ask_assistant(
    @Req() req: any,
    @Param('assistant_id') assistant_id: string,
    @QueryParam('stream') stream: boolean,
    @Body() body,
    @Res() response: ServerResponse,
  ): Promise<any> {
    if (!body?.body || body?.body === '') {
      throw new HttpError(400, 'Empty body');
    }
    const query = body?.body;
    console.log({ query });
    const url = `/assistants/${assistant_id}/sessions/`;
    const responseType = 'stream';
    const data: AskAssistant = {
      question: body.body,
      stream,
    };
    const res = await this.intricApiService.post<Stream, AskAssistant>({ url, responseType, data });
    const datastream = res.data;
    let i = 0;
    datastream.on('data', (buf: Buffer) => {
      return buf;
    });

    datastream.on('end', () => {
      console.log('stream done');
      return response.end();
    });
    return res.data;
  }

  @Post('/assistants/:assistant_id/sessions/:session_id')
  @UseBefore(hashMiddleware)
  async ask_followup(
    @Req() req: any,
    @Param('assistant_id') assistant_id: string,
    @Param('session_id') session_id: string,
    @QueryParam('stream') stream: boolean,
    @Body() body,
    @Res() response: ServerResponse,
  ): Promise<any> {
    if (!body?.body || body?.body === '') {
      throw new HttpError(400, 'Empty body');
    }
    const query = body?.body;
    console.log({ query });
    const url = `/assistants/${assistant_id}/sessions/${session_id}/`;
    const responseType = 'stream';
    const data: AskAssistant = {
      question: body.body,
      stream,
    };
    const res = await this.intricApiService.post<Stream, AskAssistant>({ url, responseType, data });
    const datastream = res.data;
    let i = 0;
    datastream.on('data', (buf: Buffer) => {
      console.log(buf.toString());
      return buf;
    });

    datastream.on('end', () => {
      console.log('stream done');
      return response.end();
    });
    return res.data;
  }
}
