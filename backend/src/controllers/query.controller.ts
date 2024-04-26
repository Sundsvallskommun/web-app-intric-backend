import { AskAssistant, SessionPublic } from '@/data-contracts/intric/data-contracts';
import { HttpException } from '@/exceptions/HttpException';
import { Feedback } from '@/interfaces/feedback';
import hashMiddleware from '@/middlewares/hash.middleware';
import { getApiKey } from '@/services/intric-api-key.service';
import IntricApiService from '@/services/intric-api.service';
import { ServerResponse } from 'http';
import { Body, Controller, HttpError, Param, Post, QueryParam, Req, Res, UseBefore } from 'routing-controllers';
import { Stream } from 'stream';

@Controller()
export class QueryController {
  private intricApiService = new IntricApiService();

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
      throw new HttpException(400, 'Empty body');
    }
    const query = body?.body;
    console.log({ query });
    const url = `/assistants/${assistant_id}/sessions/`;
    const apiKey = getApiKey(req);
    const responseType = 'stream';
    const data: AskAssistant = {
      question: body.body,
      stream,
    };
    const res = await this.intricApiService.post<Stream, AskAssistant>({ url, headers: { 'api-key': apiKey }, responseType, data });
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
    const apiKey = getApiKey(req);
    const responseType = 'stream';
    const data: AskAssistant = {
      question: body.body,
      stream,
    };
    const res = await this.intricApiService.post<Stream, AskAssistant>({ url, headers: { 'api-key': apiKey }, responseType, data });
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

  @Post('/assistants/:assistant_id/sessions/:session_id/feedback')
  @UseBefore(hashMiddleware)
  async give_feedback(
    @Req() req,
    @Param('assistant_id') assistant_id: string,
    @Param('session_id') session_id: string,
    @Body() body: Feedback,
  ): Promise<any> {
    console.log('Feedback body: ', body);
    if (!body || !body?.value) {
      throw new HttpError(400, 'Empty body');
    }
    const url = `/assistants/${assistant_id}/sessions/${session_id}/feedback/`;
    const apiKey = getApiKey(req);
    console.log('posting body: ', body);
    const res = await this.intricApiService.post<SessionPublic, Feedback>({ url, headers: { 'api-key': apiKey }, data: body });
    console.log('Feedback response: ', res.data);
    return res.data;
  }
}
