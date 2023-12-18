import {
  CreateGroupRequest,
  GroupPublic,
  InfoBlobMetaDataUpsertPublic,
  InfoBlobPublic,
  InfoBlobUpsertPublic,
  PaginatedResponseGroupPublic,
  PaginatedResponseInfoBlobPublic,
} from '@/data-contracts/intric/data-contracts';
import { CreateGroupDto, UpdateGroupDto } from '@/dtos/group.dto';
import { UpdateInfoBlobDto } from '@/dtos/info-blob.dto';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import ApiService from '@/services/api.service';
import IntricApiService from '@/services/intric-api.service';
import { Body, Controller, Delete, Get, Param, Post, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class InfoBlobController {
  private apiService = new ApiService();
  private intricApiService = new IntricApiService();

  @Get('/info-blobs')
  @OpenAPI({
    summary: 'Get info blobs',
  })
  async get_infoblobs(): Promise<PaginatedResponseInfoBlobPublic> {
    const url = '/info-blobs/';
    const res = await this.intricApiService.get<PaginatedResponseInfoBlobPublic>({ url });
    return res.data;
  }

  @Get('/info-blobs/:id')
  @OpenAPI({
    summary: 'Get info blob by id',
  })
  async get_infoblob_by_id(@Param('id') id: string): Promise<InfoBlobPublic> {
    const url = `/info-blobs/${id}/`;
    const res = await this.intricApiService.get<InfoBlobPublic>({ url });
    return res.data;
  }

  @Post('/info-blobs/:id')
  @OpenAPI({
    summary: 'Update info blob',
  })
  @UseBefore(validationMiddleware(UpdateInfoBlobDto, 'body'))
  async update_infoblob(@Param('id') id: string, @Body() body: UpdateInfoBlobDto): Promise<InfoBlobPublic> {
    const url = `/info-blobs/${id}/`;
    const res = await this.intricApiService.post<InfoBlobPublic, InfoBlobUpsertPublic>({ url, data: body });
    return res.data;
  }

  @Delete('/info-blobs/:id')
  @OpenAPI({
    summary: 'Delete info blob',
  })
  async delete_infoblob(@Param('id') id: string): Promise<GroupPublic> {
    const url = `/info-blobs/${id}/`;
    const res = await this.intricApiService.delete<GroupPublic>({ url });
    return res.data;
  }
}
