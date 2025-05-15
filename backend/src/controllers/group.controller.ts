import {
  CollectionPublic as CollectionPublicInterface,
  CollectionUpdate,
  InfoBlobUpsertRequest,
  JobPublic as JobPublicInterface,
  PaginatedResponseInfoBlobPublic as PaginatedResponseInfoBlobPublicInterface,
  PaginatedResponseInfoBlobPublicNoText as PaginatedResponseInfoBlobPublicNoTextInterface,
} from '@/data-contracts/intric/data-contracts';
import { UpdateGroupDto } from '@/dtos/group.dto';
import { UpdateInfoBlobsDto } from '@/dtos/info-blob.dto';
import applicationModeMiddleware from '@/middlewares/application-mode.middleware';
import hashMiddleware from '@/middlewares/hash.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { CollectionPublic } from '@/responses/intric/group.response';
import { JobPublic, PaginatedResponseInfoBlobPublic, PaginatedResponseInfoBlobPublicNoText } from '@/responses/intric/info-blob.response';
import { getApiKey } from '@/services/intric-api-key.service';
import IntricApiService from '@/services/intric-api.service';
import { fileUploadOptions } from '@/utils/fileUploadOptions';
import { logger } from '@/utils/logger';
import { Request, Response } from 'express';
import { Body, Controller, Delete, Get, HttpError, Param, Post, Req, Res, UploadedFiles, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@UseBefore(applicationModeMiddleware)
@Controller()
export class GroupController {
  private intricApiService = new IntricApiService();

  @Get('/groups/:id')
  @OpenAPI({
    summary: 'Get group',
  })
  @ResponseSchema(CollectionPublic)
  @UseBefore(hashMiddleware)
  async get_group_by_id(
    @Req() req: Request,
    @Param('id') id: string,
    @Res() response: Response<CollectionPublicInterface>,
  ): Promise<Response<CollectionPublicInterface>> {
    const url = `/groups/${id}/`;
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.get<CollectionPublicInterface>({ url, headers: { 'api-key': apiKey } });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error getting group:', e);
      throw new HttpError(e?.httpCode ?? 500, 'Server error');
    }
  }

  @Post('/groups/:id')
  @OpenAPI({
    summary: 'Update group',
  })
  @ResponseSchema(CollectionPublic)
  @UseBefore(hashMiddleware)
  @UseBefore(validationMiddleware(UpdateGroupDto, 'body'))
  async update_group(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: UpdateGroupDto,
    @Res() response: Response<CollectionPublicInterface>,
  ): Promise<Response<CollectionPublicInterface>> {
    const url = `/groups/${id}/`;
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.post<CollectionPublicInterface, CollectionUpdate>({
        url,
        headers: { 'api-key': apiKey },
        data: body,
      });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error updating group:', e);
      throw new HttpError(e?.httpCode ?? 500, 'Server error');
    }
  }

  @Delete('/groups/:id')
  @OpenAPI({
    summary: 'Delete group',
  })
  @UseBefore(hashMiddleware)
  async delete_group(@Req() req: Request, @Param('id') id: string, @Res() res: Response): Promise<Response> {
    const url = `/groups/${id}/`;
    const apiKey = await getApiKey(req);
    try {
      await this.intricApiService.delete({ url, headers: { 'api-key': apiKey } });
      return res.send();
    } catch (e) {
      logger.error('Error deleting group:', e);
      throw new HttpError(e?.httpCode ?? 500, 'Server error');
    }
  }

  @Get('/groups/:id/info-blobs')
  @OpenAPI({
    summary: 'Get infoblobs for group',
  })
  @ResponseSchema(PaginatedResponseInfoBlobPublicNoText)
  @UseBefore(hashMiddleware)
  async get_group_infoblobs(
    @Req() req: Request,
    @Param('id') id: string,
    @Res() response: Response<PaginatedResponseInfoBlobPublicNoTextInterface>,
  ): Promise<Response<PaginatedResponseInfoBlobPublicNoTextInterface>> {
    const url = `/groups/${id}/info-blobs/`;
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.get<PaginatedResponseInfoBlobPublicNoTextInterface>({ url, headers: { 'api-key': apiKey } });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error getting group info blobs:', e);
      throw new HttpError(e?.httpCode ?? 500, 'Server error');
    }
  }

  @Post('/groups/:id/info-blobs')
  @OpenAPI({
    summary: 'Add info blob to a group',
  })
  @ResponseSchema(PaginatedResponseInfoBlobPublic)
  @UseBefore(hashMiddleware)
  @UseBefore(validationMiddleware(UpdateInfoBlobsDto, 'body'))
  async add_group_infoblobs(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: UpdateInfoBlobsDto,
    @Res() response: Response<PaginatedResponseInfoBlobPublicInterface>,
  ): Promise<Response<PaginatedResponseInfoBlobPublicInterface>> {
    const url = `/groups/${id}/info-blobs/`;
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.post<PaginatedResponseInfoBlobPublicInterface, InfoBlobUpsertRequest>({
        url,
        headers: { 'api-key': apiKey },
        data: body,
      });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error adding group info blobs:', e);
      throw new HttpError(e?.httpCode ?? 500, 'Server error');
    }
  }

  @Post('/groups/:id/info-blobs/upload-files')
  @OpenAPI({
    summary: 'Upload a file to a group',
  })
  @ResponseSchema(JobPublic)
  @UseBefore(hashMiddleware)
  async upload_files(
    @Req() req: Request,
    @Param('id') id: string,
    @UploadedFiles('files', { options: fileUploadOptions, required: false }) files: Express.Multer.File[],
    @Res() response: Response<JobPublicInterface>,
  ): Promise<Response<JobPublicInterface>> {
    let data = new FormData();
    if (files && files.length > 0) {
      files.forEach(f => {
        const blob = new Blob([f.buffer], { type: f.mimetype });
        data.append(`files`, blob, f.originalname);
      });
    } else {
      logger.error('Trying to save attachment without name or data');
      throw new Error('File missing');
    }

    const url = `/groups/${id}/info-blobs/upload-files/`;
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.post<JobPublicInterface, FormData>({
        url,
        data,
        headers: { 'Content-Type': 'multipart/form-data', 'api-key': apiKey },
      });

      return response.send(res.data);
    } catch (e) {
      logger.error('Error uploading files:', e);
      throw new HttpError(e?.httpCode ?? 500, 'Server error');
    }
  }
}
