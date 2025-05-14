import { Controller, Body, Req, Get, Post, UseBefore, Res, Patch, Param, Delete } from 'routing-controllers';
import authMiddleWare from '../../middlewares/auth.middleware';
import adminMiddleware from '@/middlewares/admin.middleware';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { AssistantApiResponse, AssistantsApiResponse, Assistant, UpdateAssistant } from '../../responses/assistant.response';
import { RequestWithUser } from '@/interfaces/auth.interface';
import prisma from '@/utils/prisma';
import { Response } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import ApiResponse from '@/interfaces/api-service.interface';
import { maskApiKey } from '@/utils/mask-apikey';
import { HostApiResponse, HostsApiResponse, UpdateHost } from '@/responses/host.response';

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
    } catch {
      throw new HttpException(404, 'No assistants found');
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
    } catch {
      throw new HttpException(404, 'No assistant found');
    }
  }

  @Post('/admin/hosts')
  @OpenAPI({
    summary: 'Creates a new host',
  })
  @ResponseSchema(HostApiResponse)
  async create(@Req() req: RequestWithUser, @Body() body: UpdateHost, @Res() res: Response<HostApiResponse>): Promise<Response<HostApiResponse>> {
    try {
      const data = await prisma.host.create({ data: body });
      return res.send({ data, message: 'success' });
    } catch (e) {
      throw new HttpException(500, e.message);
    }
  }

  @Patch('/admin/hosts/:id')
  @OpenAPI({
    summary: 'Updates a host',
  })
  @ResponseSchema(HostApiResponse)
  async update(
    @Req() req: RequestWithUser,
    @Body() body: UpdateHost,
    @Param('id') id: number,
    @Res() res: Response<HostApiResponse>,
  ): Promise<Response<HostApiResponse>> {
    try {
      const data = await prisma.host.update({ where: { id }, data: body });
      return res.send({ data, message: 'success' });
    } catch (e) {
      throw new HttpException(500, e.message);
    }
  }

  @Delete('/admin/hosts/:id')
  @OpenAPI({
    summary: 'Deletes a host',
  })
  async delete(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Res() response: Response<ApiResponse<boolean>>,
  ): Promise<Response<ApiResponse<boolean>>> {
    const { name } = req.user;

    if (!name || !id) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      await prisma.host.delete({
        where: { id },
      });

      return response.send({ message: 'deleted', data: true });
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }
}
