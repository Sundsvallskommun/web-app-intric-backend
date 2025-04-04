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
    @Body() body: Pick<AskAssistant, 'question' | 'files'> & { body?: string },
    @Res() response: ServerResponse,
  ): Promise<any> {
    //NOTE: Added same type as Intric, but kept the old type for backwards compatibility
    const query = body?.question ?? body?.body;
    if (!query || query === '') {
      throw new HttpException(400, 'Empty body');
    }
    const url = `/assistants/${assistant_id}/sessions/`;
    const apiKey = await getApiKey(req);
    const responseType = 'stream';
    const data: AskAssistant = {
      question: query,
      files: body.files,
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
    @Body() body: Pick<AskAssistant, 'question' | 'files'> & { body?: string },
    @Res() response: ServerResponse,
  ): Promise<any> {
    //NOTE: Added same type as Intric, but kept the old type for backwards compatibility
    const query = body?.question ?? body?.body;
    if (!query || query === '') {
      throw new HttpException(400, 'Empty body');
    }
    const url = `/assistants/${assistant_id}/sessions/${session_id}/`;
    const apiKey = await getApiKey(req);
    const responseType = 'stream';
    const data: AskAssistant = {
      question: query,
      files: body.files,
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
    if (!body || !body?.value) {
      throw new HttpError(400, 'Empty body');
    }
    const url = `/assistants/${assistant_id}/sessions/${session_id}/feedback/`;
    const apiKey = await getApiKey(req);
    const res = await this.intricApiService.post<SessionPublic, Feedback>({ url, headers: { 'api-key': apiKey }, data: body });
    return res.data;
  }
}
