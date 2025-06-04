import { HttpException } from '@/exceptions/HttpException';
import ApiResponse from '@/interfaces/api-service.interface';
import adminMiddleware from '@/middlewares/admin.middleware';
import { HostApiResponse, HostsApiResponse, UpdateHost } from '@/responses/host.response';
import { logger } from '@/utils/logger';
import prisma from '@/utils/prisma';
import { Response } from 'express';
import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import authMiddleWare from '../../middlewares/auth.middleware';

@UseBefore(authMiddleWare)
@UseBefore(adminMiddleware)
@Controller()
export class AdminHostsController {
  @Get('/admin/hosts')
  @OpenAPI({
    summary: 'Get all hosts',
  })
  @ResponseSchema(HostsApiResponse)
  async getMany(@Res() res: Response<HostsApiResponse>): Promise<Response<HostsApiResponse>> {
    try {
      const hosts = await prisma.host.findMany();
      return res.send({ data: hosts, message: 'success' });
    } catch (e) {
      logger.error('Error getting hosts', e);
      throw new HttpException(e?.httpCode ?? 404, e?.message ?? 'No hosts found');
    }
  }

  @Get('/admin/hosts/:id')
  @OpenAPI({
    summary: 'Get a single host',
  })
  @ResponseSchema(HostApiResponse)
  async getOne(@Param('id') id: number, @Res() res: Response<HostApiResponse>): Promise<Response<HostApiResponse>> {
    try {
      const data = await prisma.host.findFirst({ where: { id } });
      return res.send({ data, message: 'success' });
    } catch (e) {
      logger.error('Error getting host', e);
      throw new HttpException(e?.httpCode ?? 404, e?.message ?? 'No host found');
    }
  }

  @Post('/admin/hosts')
  @OpenAPI({
    summary: 'Creates a new host',
  })
  @ResponseSchema(HostApiResponse)
  async create(@Body() body: UpdateHost, @Res() res: Response<HostApiResponse>): Promise<Response<HostApiResponse>> {
    try {
      const data = await prisma.host.create({ data: body });
      return res.send({ data, message: 'success' });
    } catch (e) {
      logger.error('Error creating host', e);
      throw new HttpException(e?.httpCode ?? 500, e?.message ?? 'Could not create host');
    }
  }

  @Patch('/admin/hosts/:id')
  @OpenAPI({
    summary: 'Updates a host',
  })
  @ResponseSchema(HostApiResponse)
  async update(@Body() body: UpdateHost, @Param('id') id: number, @Res() res: Response<HostApiResponse>): Promise<Response<HostApiResponse>> {
    try {
      const data = await prisma.host.update({ where: { id }, data: body });
      return res.send({ data, message: 'success' });
    } catch (e) {
      logger.error('Error updating host', e);
      throw new HttpException(e?.httpCode ?? 500, e?.message ?? 'Could not update host');
    }
  }

  @Delete('/admin/hosts/:id')
  @OpenAPI({
    summary: 'Deletes a host',
  })
  async delete(@Param('id') id: number, @Res() response: Response<ApiResponse<boolean>>): Promise<Response<ApiResponse<boolean>>> {
    try {
      await prisma.host.delete({
        where: { id },
      });

      return response.send({ message: 'deleted', data: true });
    } catch (e) {
      logger.error('Error deleting host', e);
      throw new HttpException(e?.httpCode ?? 500, e?.message ?? 'Could not delete host');
    }
  }
}
