import {
  CreateGroupRequest,
  GroupPublic,
  GroupUpdatePublic,
  InfoBlobPublic,
  InfoBlobUpsertRequest,
  PaginatedResponseGroupPublic,
  PaginatedResponseInfoBlobPublic,
} from '@/data-contracts/intric/data-contracts';
import { CreateGroupDto, UpdateGroupDto } from '@/dtos/group.dto';
import { UpdateInfoBlobsDto } from '@/dtos/info-blob.dto';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import ApiService from '@/services/api.service';
import IntricApiService from '@/services/intric-api.service';
import { fileUploadOptions } from '@/utils/fileUploadOptions';
import { logger } from '@/utils/logger';
import { Request } from 'express';
import { Body, Controller, Delete, Get, Param, Post, Req, UploadedFiles, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class GroupController {
  private apiService = new ApiService();
  private intricApiService = new IntricApiService();

  @Get('/groups')
  async get_user_groups(): Promise<PaginatedResponseGroupPublic> {
    const url = '/groups/';
    const res = await this.intricApiService.get<PaginatedResponseGroupPublic>({ url });
    return res.data;
  }

  @Get('/groups/public')
  async get_public_groups(): Promise<PaginatedResponseGroupPublic> {
    const url = '/groups/public/';
    const res = await this.intricApiService.get<PaginatedResponseGroupPublic>({ url });
    return res.data;
  }

  @Get('/groups/:id')
  async get_group_by_id(@Param('id') id: string): Promise<GroupPublic> {
    const url = `/groups/${id}/`;
    const res = await this.intricApiService.get<GroupPublic>({ url });
    return res.data;
  }

  @Post('/groups')
  @UseBefore(validationMiddleware(CreateGroupDto, 'body'))
  async create_group(@Req() req: any, @Body() body: CreateGroupDto): Promise<GroupPublic> {
    const url = `/groups/`;
    const res = await this.intricApiService.post<GroupPublic, CreateGroupRequest>({ url, data: body });
    return res.data;
  }

  @Post('/groups/:id')
  @UseBefore(validationMiddleware(UpdateGroupDto, 'body'))
  async update_group(@Req() req: Request, @Param('id') id: string, @Body() body: UpdateGroupDto): Promise<GroupPublic> {
    const url = `/groups/${id}/`;
    const res = await this.intricApiService.post<GroupPublic, GroupUpdatePublic>({ url, data: body });
    return res.data;
  }

  @Delete('/groups/:id')
  async delete_group(@Param('id') id: string): Promise<GroupPublic> {
    const url = `/groups/${id}/`;
    const res = await this.intricApiService.delete<GroupPublic>({ url });
    return res.data;
  }

  @Get('/groups/:id/info-blobs')
  async get_group_infoblobs(@Param('id') id: string): Promise<InfoBlobPublic[]> {
    const url = `/groups/${id}/info-blobs/`;
    const res = await this.intricApiService.get<PaginatedResponseInfoBlobPublic>({ url });
    return res.data.items;
  }

  @Post('/groups/:id/info-blobs')
  @OpenAPI({
    summary: 'Add info blob to a group',
  })
  @UseBefore(validationMiddleware(UpdateInfoBlobsDto, 'body'))
  async add_group_infoblobs(@Req() req: Request, @Param('id') id: string, @Body() body: UpdateInfoBlobsDto): Promise<InfoBlobPublic[]> {
    const url = `/groups/${id}/info-blobs/`;
    const res = await this.intricApiService.post<PaginatedResponseInfoBlobPublic, InfoBlobUpsertRequest>({ url, data: body });
    return res.data.items;
  }

  @Post('/groups/:id/info-blobs/upload-files')
  @OpenAPI({
    summary: 'Upload a file to a group',
  })
  async upload_files(
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
    const res = await this.intricApiService.post<PaginatedResponseInfoBlobPublic, FormData>({
      url,
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('response:');
    console.log(res.data);
    return res.data.items;
  }
}
