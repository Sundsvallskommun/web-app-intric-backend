import { Controller, Body, Req, Get, Post, UseBefore, Res, Patch, Param, Delete } from 'routing-controllers';
import authMiddleWare from '../../middlewares/auth.middleware';
import adminMiddleware from '@/middlewares/admin.middleware';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import {AssistantApiResponse, AssistantsApiResponse, Assistant, UpdateAssistant} from '../../responses/assistant.response'
import { RequestWithUser } from '@/interfaces/auth.interface';
import prisma from '@/utils/prisma';
import { Response } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import ApiResponse from '@/interfaces/api-service.interface';
import { maskApiKey } from '@/utils/mask-apikey';

@UseBefore(authMiddleWare)
@UseBefore(adminMiddleware)
@Controller()
export class AdminAsisstantController {
    @Get('/admin/assistants')
    @OpenAPI({
        summary: 'Get all assistants',
      })
    @ResponseSchema(AssistantsApiResponse)
    async getMany(@Res() res: Response<AssistantsApiResponse>): Promise<Response<AssistantsApiResponse>>{
      
        try {
           const assistants = await prisma.assistant.findMany();

           return res.send({data:assistants.map(assistant => ({...assistant, apiKey: maskApiKey(assistant?.apiKey)})), message: "success"})
        } catch {
            throw new HttpException(404, "No assistants found")
        }
    
    }

    @Get('/admin/assistants/:id')
    @OpenAPI({
        summary: 'Get a single assistant',
      })
    @ResponseSchema(AssistantApiResponse)
    async getOne(@Param("id") id: number, @Res() res: Response<AssistantApiResponse>): Promise<Response<AssistantApiResponse>>{

        try {
           const assistant = await prisma.assistant.findFirst({where:{id}});
           return res.send({data:{...assistant, apiKey: maskApiKey(assistant?.apiKey)}, message: "success"})
        } catch {
            throw new HttpException(404, "No assistant found")
        }
    
    }

    @Post('/admin/assistants')
    @OpenAPI({
        summary: 'Creates a new assistant',
      })
    @ResponseSchema(AssistantApiResponse)
    async create(@Req() req: RequestWithUser, @Body() body:Assistant, @Res() res: Response<AssistantApiResponse>): Promise<Response<AssistantApiResponse>>{

        try {
           const assistant = await prisma.assistant.create({ data: body })
           return res.send({data:{...assistant,  apiKey: maskApiKey(assistant?.apiKey)}, message: "success"})
        } catch (e) {
            throw new HttpException(500, e.message)
        }
    
    }

    @Patch('/admin/assistants/:id')
    @OpenAPI({
        summary: 'Updates an assistant',
      })
    @ResponseSchema(AssistantApiResponse)
    async update(@Req() req: RequestWithUser, @Body() body:UpdateAssistant,  @Param('id') id: number, @Res() res: Response<AssistantApiResponse>): Promise<Response<AssistantApiResponse>>{

        try {
           const assistant = await prisma.assistant.update({ where: {id}, data: body })
           return res.send({data:{...assistant,  apiKey: maskApiKey(assistant?.apiKey)}, message: "success"})
        } catch (e) {
            throw new HttpException(500, e.message)
        }
    
    }

    @Delete('/admin/assistants/:id')
    @OpenAPI({
      summary: 'Deletes an assistant',
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
        await prisma.assistant.delete({
          where: { id },
        });
  
        return response.send({ message: 'deleted', data: true });
      } catch (err) {
        throw new HttpException(500, err.message);
      }
    }
}
