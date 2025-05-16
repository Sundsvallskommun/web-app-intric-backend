import { HttpException } from '@/exceptions/HttpException';
import ApiResponse from '@/interfaces/api-service.interface';
import adminMiddleware from '@/middlewares/admin.middleware';
import { logger } from '@/utils/logger';
import { maskApiKey } from '@/utils/mask-apikey';
import prisma from '@/utils/prisma';
import { Response } from 'express';
import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import authMiddleWare from '../../middlewares/auth.middleware';
import {
  AssistantSetting,
  AssistantSettingApiResponse,
  AssistantSettingsApiResponse,
  UpdateAssistantSetting,
} from '../../responses/assistant-setting.response';

@UseBefore(authMiddleWare)
@UseBefore(adminMiddleware)
@Controller()
export class AdminAsisstantController {
  @Get('/admin/assistants')
  @OpenAPI({
    summary: 'Get all assistant settings',
  })
  @ResponseSchema(AssistantSettingsApiResponse)
  async getMany(@Res() res: Response<AssistantSettingsApiResponse>): Promise<Response<AssistantSettingsApiResponse>> {
    try {
      const assistants = await prisma.assistant.findMany();
      return res.send({ data: assistants.map(assistant => ({ ...assistant, apiKey: maskApiKey(assistant?.apiKey) })), message: 'success' });
    } catch (e) {
      logger.error('Error getting assistant settings', e);
      throw new HttpException(e?.httpCode ?? 404, e?.message ?? 'No assistant settings found');
    }
  }

  @Get('/admin/assistants/:id')
  @OpenAPI({
    summary: 'Get a single assistant setting',
  })
  @ResponseSchema(AssistantSettingApiResponse)
  async getOne(@Param('id') id: number, @Res() res: Response<AssistantSettingApiResponse>): Promise<Response<AssistantSettingApiResponse>> {
    try {
      const assistant = await prisma.assistant.findFirst({ where: { id } });
      return res.send({ data: { ...assistant, apiKey: maskApiKey(assistant?.apiKey) }, message: 'success' });
    } catch (e) {
      logger.error('Error getting assistant setting', e);
      throw new HttpException(e?.httpCode ?? 404, e?.message ?? 'No assistant setting found');
    }
  }

  @Post('/admin/assistants')
  @OpenAPI({
    summary: 'Create new assistant setting',
  })
  @ResponseSchema(AssistantSettingApiResponse)
  async create(@Body() body: AssistantSetting, @Res() res: Response<AssistantSettingApiResponse>): Promise<Response<AssistantSettingApiResponse>> {
    try {
      const assistant = await prisma.assistant.create({ data: body });
      return res.send({ data: { ...assistant, apiKey: maskApiKey(assistant?.apiKey) }, message: 'success' });
    } catch (e) {
      logger.error('Error creating assistant setting', e);
      throw new HttpException(e?.httpCode ?? 500, e?.message ?? 'Could not create assistant setting');
    }
  }

  @Patch('/admin/assistants/:id')
  @OpenAPI({
    summary: 'Update assistant setting',
  })
  @ResponseSchema(AssistantSettingApiResponse)
  async update(
    @Body() body: UpdateAssistantSetting,
    @Param('id') id: number,
    @Res() res: Response<AssistantSettingApiResponse>,
  ): Promise<Response<AssistantSettingApiResponse>> {
    try {
      const assistant = await prisma.assistant.update({ where: { id }, data: body });
      return res.send({ data: { ...assistant, apiKey: maskApiKey(assistant?.apiKey) }, message: 'success' });
    } catch (e) {
      logger.error('Error updating assistant setting', e);
      throw new HttpException(e?.httpCode ?? 500, e?.message ?? 'Could not update assistant setting');
    }
  }

  @Delete('/admin/assistants/:id')
  @OpenAPI({
    summary: 'Delete assistant',
  })
  async delete(@Param('id') id: number, @Res() response: Response<ApiResponse<boolean>>): Promise<Response<ApiResponse<boolean>>> {
    try {
      await prisma.assistant.delete({
        where: { id },
      });
      return response.send({ message: 'deleted', data: true });
    } catch (e) {
      logger.error('Error deleting assistant setting', e);
      throw new HttpException(e?.httpCode ?? 500, e?.message ?? 'Could not delete assistant setting');
    }
  }
}
