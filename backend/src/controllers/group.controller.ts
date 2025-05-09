import {
  CollectionPublic,
  CollectionUpdate,
  InfoBlobUpsertRequest,
  JobPublic,
  PaginatedResponseInfoBlobPublic,
  PaginatedResponseInfoBlobPublicNoText,
} from '@/data-contracts/intric/data-contracts';
import { UpdateGroupDto } from '@/dtos/group.dto';
import { UpdateInfoBlobsDto } from '@/dtos/info-blob.dto';
import applicationModeMiddleware from '@/middlewares/application-mode.middleware';
import hashMiddleware from '@/middlewares/hash.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { getApiKey } from '@/services/intric-api-key.service';
import IntricApiService from '@/services/intric-api.service';
import { fileUploadOptions } from '@/utils/fileUploadOptions';
import { logger } from '@/utils/logger';
import { Request, Response } from 'express';
import { Body, Controller, Delete, Get, HttpError, Param, Post, Req, Res, UploadedFiles, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@UseBefore(applicationModeMiddleware)
@Controller()
export class GroupController {
  private intricApiService = new IntricApiService();

  @Get('/groups/:id')
  @UseBefore(hashMiddleware)
  async get_group_by_id(
    @Req() req: Request,
    @Param('id') id: string,
    @Res() response: Response<CollectionPublic>,
  ): Promise<Response<CollectionPublic>> {
    const url = `/groups/${id}/`;
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.get<CollectionPublic>({ url, headers: { 'api-key': apiKey } });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error getting group:', e);
      throw new HttpError(e?.httpCode ?? 500, 'Server error');
    }
  }

  @Post('/groups/:id')
  @UseBefore(hashMiddleware)
  @UseBefore(validationMiddleware(UpdateGroupDto, 'body'))
  async update_group(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: UpdateGroupDto,
    @Res() response: Response<CollectionPublic>,
  ): Promise<Response<CollectionPublic>> {
    const url = `/groups/${id}/`;
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.post<CollectionPublic, CollectionUpdate>({
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
  @UseBefore(hashMiddleware)
  async delete_group(@Req() req: Request, @Param('id') id: string): Promise<boolean> {
    const url = `/groups/${id}/`;
    const apiKey = await getApiKey(req);
    try {
      await this.intricApiService.delete({ url, headers: { 'api-key': apiKey } });
      return true;
    } catch (e) {
      logger.error('Error deleting group:', e);
      throw new HttpError(e?.httpCode ?? 500, 'Server error');
    }
  }

  @Get('/groups/:id/info-blobs')
  @UseBefore(hashMiddleware)
  async get_group_infoblobs(
    @Req() req: Request,
    @Param('id') id: string,
    @Res() response: Response<PaginatedResponseInfoBlobPublicNoText>,
  ): Promise<Response<PaginatedResponseInfoBlobPublicNoText>> {
    const url = `/groups/${id}/info-blobs/`;
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.get<PaginatedResponseInfoBlobPublicNoText>({ url, headers: { 'api-key': apiKey } });
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
  @UseBefore(hashMiddleware)
  @UseBefore(validationMiddleware(UpdateInfoBlobsDto, 'body'))
  async add_group_infoblobs(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: UpdateInfoBlobsDto,
    @Res() response: Response<PaginatedResponseInfoBlobPublic>,
  ): Promise<Response<PaginatedResponseInfoBlobPublic>> {
    const url = `/groups/${id}/info-blobs/`;
    const apiKey = await getApiKey(req);
    try {
      const res = await this.intricApiService.post<PaginatedResponseInfoBlobPublic, InfoBlobUpsertRequest>({
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
  @UseBefore(hashMiddleware)
  async upload_files(
    @Req() req: Request,
    @Param('id') id: string,
    @UploadedFiles('files', { options: fileUploadOptions, required: false }) files: Express.Multer.File[],
    @Res() response: Response<JobPublic>,
  ): Promise<Response<JobPublic>> {
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
      const res = await this.intricApiService.post<JobPublic, FormData>({
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
