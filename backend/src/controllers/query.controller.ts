import {
  AskAssistant,
  AskResponse as AskResponseInterface,
  SessionPublic,
  SessionFeedback as SessionFeedbackInterface,
} from '@/data-contracts/intric/data-contracts';
import { HttpException } from '@/exceptions/HttpException';
import hashMiddleware from '@/middlewares/hash.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { AskResponse } from '@/responses/intric/query.response';
import { SessionFeedback } from '@/responses/intric/session.response';
import { getApiKey } from '@/services/intric-api-key.service';
import IntricApiService from '@/services/intric-api.service';
import { logger } from '@/utils/logger';
import { Request, Response } from 'express';
import { Body, Controller, HttpError, Param, Post, QueryParam, Req, Res, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Stream } from 'stream';

@Controller()
export class QueryController {
  private intricApiService = new IntricApiService();
  @Post('/assistants/:assistant_id/sessions')
  @OpenAPI({
    summary: 'Ask question to assistant',
  })
  @UseBefore(hashMiddleware)
  @ResponseSchema(AskResponse)
  async ask_assistant(
    @Req() req: Request,
    @Param('assistant_id') assistant_id: string,
    @QueryParam('stream') stream: boolean,
    @Body() body: Pick<AskAssistant, 'question' | 'files'> & { body?: string },
    @Res() response: Response<AskResponseInterface | Stream>,
  ): Promise<AskResponseInterface | Stream> {
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
    try {
      const res = await this.intricApiService.post<Stream, AskAssistant>({ url, headers: { 'api-key': apiKey }, responseType, data });
      const datastream = res.data;
      datastream.on('data', (buf: Buffer) => {
        return buf;
      });

      datastream.on('end', () => {
        return response.end();
      });
      return res.data;
    } catch (e) {
      logger.error('Error sending question to assistant.', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not communicate with assistant');
    }
  }

  @Post('/assistants/:assistant_id/sessions/:session_id')
  @OpenAPI({
    summary: 'Ask follow up question to assistant',
  })
  @UseBefore(hashMiddleware)
  @ResponseSchema(AskResponse)
  async ask_followup(
    @Req() req: Request,
    @Param('assistant_id') assistant_id: string,
    @Param('session_id') session_id: string,
    @QueryParam('stream') stream: boolean,
    @Body() body: Pick<AskAssistant, 'question' | 'files'> & { body?: string },
    @Res() response: Response<AskResponseInterface>,
  ): Promise<Stream> {
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
    try {
      const res = await this.intricApiService.post<Stream, AskAssistant>({ url, headers: { 'api-key': apiKey }, responseType, data });
      const datastream = res.data;
      datastream.on('data', (buf: Buffer) => {
        return buf;
      });

      datastream.on('end', () => {
        return response.end();
      });
      return res.data;
    } catch (e) {
      logger.error('Error sending question to assistant.', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not communicate with assistant');
    }
  }

  @Post('/assistants/:assistant_id/sessions/:session_id/feedback')
  @OpenAPI({
    summary: 'Leave feedback',
  })
  @ResponseSchema(SessionFeedback)
  @UseBefore(hashMiddleware)
  @UseBefore(validationMiddleware(SessionFeedback, 'body'))
  async give_feedback(
    @Req() req: Request,
    @Param('assistant_id') assistant_id: string,
    @Param('session_id') session_id: string,
    @Body() body: SessionFeedback,
    @Res() response: Response<SessionPublic>,
  ): Promise<Response<SessionPublic>> {
    if (!body || !body?.value) {
      throw new HttpError(400, 'Empty body');
    }
    const url = `/assistants/${assistant_id}/sessions/${session_id}/feedback/`;
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.post<SessionPublic, SessionFeedbackInterface>({ url, headers: { 'api-key': apiKey }, data: body });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error leaving feedback', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not give feedback');
    }
  }
}
