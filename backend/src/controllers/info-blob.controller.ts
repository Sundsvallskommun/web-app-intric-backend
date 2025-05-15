import {
  InfoBlobPublic as InfoBlobPublicInterface,
  InfoBlobUpdatePublic,
  PaginatedResponseInfoBlobPublicNoText as PaginatedResponseInfoBlobPublicNoTextInterface,
} from '@/data-contracts/intric/data-contracts';
import { UpdateInfoBlobDto } from '@/dtos/info-blob.dto';
import applicationModeMiddleware from '@/middlewares/application-mode.middleware';
import hashMiddleware from '@/middlewares/hash.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { InfoBlobPublic, PaginatedResponseInfoBlobPublicNoText } from '@/responses/intric/info-blob.response';
import { getApiKey } from '@/services/intric-api-key.service';
import IntricApiService from '@/services/intric-api.service';
import { logger } from '@/utils/logger';
import { Request, Response } from 'express';
import { Body, Controller, Delete, Get, HttpError, Param, Post, Req, Res, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@UseBefore(applicationModeMiddleware)
@UseBefore(hashMiddleware)
@Controller()
export class InfoBlobController {
  private intricApiService = new IntricApiService();

  @Get('/info-blobs')
  @OpenAPI({
    summary: 'Get info blobs',
  })
  @ResponseSchema(PaginatedResponseInfoBlobPublicNoText)
  async get_infoblobs(
    @Req() req: Request,
    @Res() response: Response<PaginatedResponseInfoBlobPublicNoTextInterface>,
  ): Promise<Response<PaginatedResponseInfoBlobPublicNoTextInterface>> {
    const url = '/info-blobs/';
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.get<PaginatedResponseInfoBlobPublicNoTextInterface>({ url, headers: { 'api-key': apiKey } });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error getting info blobs.', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get info blobs');
    }
  }

  @Get('/info-blobs/:id')
  @OpenAPI({
    summary: 'Get info blob by id',
  })
  @ResponseSchema(InfoBlobPublic)
  async get_infoblob_by_id(
    @Req() req: Request,
    @Param('id') id: string,
    @Res() response: Response<InfoBlobPublic>,
  ): Promise<Response<InfoBlobPublicInterface>> {
    const url = `/info-blobs/${id}/`;
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.get<InfoBlobPublicInterface>({ url, headers: { 'api-key': apiKey } });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error getting info blob', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not get info blob');
    }
  }

  @Post('/info-blobs/:id')
  @OpenAPI({
    summary: 'Update info blob',
  })
  @ResponseSchema(InfoBlobPublic)
  @UseBefore(validationMiddleware(UpdateInfoBlobDto, 'body'))
  async update_infoblob(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: UpdateInfoBlobDto,
    @Res() response: Response<InfoBlobPublic>,
  ): Promise<Response<InfoBlobPublicInterface>> {
    const url = `/info-blobs/${id}/`;
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.post<InfoBlobPublicInterface, InfoBlobUpdatePublic>({
        url,
        data: body,
        headers: { 'api-key': apiKey },
      });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error updating info blob', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not update info blob');
    }
  }

  @Delete('/info-blobs/:id')
  @OpenAPI({
    summary: 'Delete info blob',
  })
  @ResponseSchema(InfoBlobPublic)
  async delete_infoblob(
    @Req() req: Request,
    @Param('id') id: string,
    @Res() response: Response<InfoBlobPublic>,
  ): Promise<Response<InfoBlobPublicInterface>> {
    const url = `/info-blobs/${id}/`;
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.delete<InfoBlobPublicInterface>({ url, headers: { 'api-key': apiKey } });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error deleting info blob', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Could not delete info blob');
    }
  }
}
