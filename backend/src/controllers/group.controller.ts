import {
  DeleteGroupResponse,
  GroupPublicWithMetadata,
  InfoBlobPublic,
  InfoBlobUpsertRequest,
  PaginatedResponseGroupPublicWithMetadata,
  PaginatedResponseInfoBlobPublic,
  PartialGroupUpdatePublic,
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
import { Request } from 'express';
import { Body, Controller, Delete, Get, Param, Post, Req, Res, UploadedFiles, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@UseBefore(applicationModeMiddleware)
@Controller()
export class GroupController {
  private intricApiService = new IntricApiService();

  @Get('/groups')
  @UseBefore(hashMiddleware)
  async get_user_groups(@Req() req: Request, @Res() response: any): Promise<PaginatedResponseGroupPublicWithMetadata> {
    const url = '/groups/';
    const apiKey = await getApiKey(req);
    const res = await this.intricApiService.get<PaginatedResponseGroupPublicWithMetadata>({ url, headers: { 'api-key': apiKey } });
    return res.data;
  }

  @Get('/groups/public')
  @UseBefore(hashMiddleware)
  async get_public_groups(@Req() req: Request): Promise<PaginatedResponseGroupPublicWithMetadata> {
    const url = '/groups/public/';
    const apiKey = await getApiKey(req);
    const res = await this.intricApiService.get<PaginatedResponseGroupPublicWithMetadata>({ url, headers: { 'api-key': apiKey } });
    return res.data;
  }

  @Get('/groups/:id')
  @UseBefore(hashMiddleware)
  async get_group_by_id(@Req() req: Request, @Param('id') id: string): Promise<GroupPublicWithMetadata> {
    const url = `/groups/${id}/`;
    const apiKey = await getApiKey(req);
    const res = await this.intricApiService.get<GroupPublicWithMetadata>({ url, headers: { 'api-key': apiKey } });
    return res.data;
  }

  @Post('/groups/:id')
  @UseBefore(hashMiddleware)
  @UseBefore(validationMiddleware(UpdateGroupDto, 'body'))
  async update_group(@Req() req: Request, @Param('id') id: string, @Body() body: UpdateGroupDto): Promise<GroupPublicWithMetadata> {
    const url = `/groups/${id}/`;
    const apiKey = await getApiKey(req);
    const res = await this.intricApiService.post<GroupPublicWithMetadata, PartialGroupUpdatePublic>({
      url,
      headers: { 'api-key': apiKey },
      data: body,
    });
    return res.data;
  }

  @Delete('/groups/:id')
  @UseBefore(hashMiddleware)
  async delete_group(@Req() req: Request, @Param('id') id: string): Promise<DeleteGroupResponse> {
    const url = `/groups/${id}/`;
    const apiKey = await getApiKey(req);
    const res = await this.intricApiService.delete<DeleteGroupResponse>({ url, headers: { 'api-key': apiKey } });
    return res.data;
  }

  @Get('/groups/:id/info-blobs')
  @UseBefore(hashMiddleware)
  async get_group_infoblobs(@Req() req: Request, @Param('id') id: string): Promise<InfoBlobPublic[]> {
    const url = `/groups/${id}/info-blobs/`;
    const apiKey = await getApiKey(req);
    const res = await this.intricApiService.get<PaginatedResponseInfoBlobPublic>({ url, headers: { 'api-key': apiKey } });
    return res.data.items;
  }

  @Post('/groups/:id/info-blobs')
  @OpenAPI({
    summary: 'Add info blob to a group',
  })
  @UseBefore(hashMiddleware)
  @UseBefore(validationMiddleware(UpdateInfoBlobsDto, 'body'))
  async add_group_infoblobs(@Req() req: Request, @Param('id') id: string, @Body() body: UpdateInfoBlobsDto): Promise<InfoBlobPublic[]> {
    const url = `/groups/${id}/info-blobs/`;
    const apiKey = await getApiKey(req);
    const res = await this.intricApiService.post<PaginatedResponseInfoBlobPublic, InfoBlobUpsertRequest>({
      url,
      headers: { 'api-key': apiKey },
      data: body,
    });
    return res.data.items;
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
  ): Promise<InfoBlobPublic[]> {
    console.log('received');
    console.log(files);
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
    console.log('data:');
    console.log(data);
    const url = `/groups/${id}/info-blobs/upload-files/`;
    const apiKey = await getApiKey(req);
    const res = await this.intricApiService.post<PaginatedResponseInfoBlobPublic, FormData>({
      url,
      data,
      headers: { 'Content-Type': 'multipart/form-data', 'api-key': apiKey },
    });
    console.log('response:');
    console.log(res.data);
    return res.data.items;
  }
}
