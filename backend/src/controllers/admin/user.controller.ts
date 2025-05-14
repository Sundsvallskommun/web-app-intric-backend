import { HttpException } from '../../exceptions/HttpException';
import { RequestWithUser } from '../../interfaces/auth.interface';
import { UserApiResponse } from '../../responses/user.response';
import authMiddleware from '../../middlewares/auth.middleware';
import adminMiddleware from '../../middlewares/admin.middleware';
import { Controller, Get, Req, Res, Patch, UseBefore, Body } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Response } from 'express';
import prisma from '@/utils/prisma';
import { maskApiKey } from '@/utils/mask-apikey'
import { User, UserSettings } from '@/interfaces/users.interface';


interface UserData {
  name: string;
  username: string;
  isAdmin?: boolean
  apiKey?: string;
}

@UseBefore(authMiddleware)
@Controller()
export class AdminUserController {
    @Get('/admin/me')
    @OpenAPI({ summary: 'Return current user' })
    @ResponseSchema(UserApiResponse)
    @UseBefore(authMiddleware)
    async getUser(@Req() req: RequestWithUser, @Res() response: Response<UserApiResponse>): Promise<Response<UserApiResponse>> {
      const { name, username, isAdmin, userId } = req.user;
      if (!name) {
        throw new HttpException(400, 'Bad Request');
      }
      let userSettings: UserSettings;
      try {
        userSettings = await prisma.userSettings.findFirst({where:{userId}});
        if (!userSettings) {
            userSettings = await prisma.userSettings.create({data: {userId}})
        }
      } catch (err) {
        throw new HttpException(500, err.message)
      }

      const userData: UserData = {
        name: name,
        username,
        isAdmin,
        apiKey: maskApiKey(userSettings?.apiKey)
      };
      return response.send({ data: userData, message: 'success' });
    }

    @Patch('/admin/me')
    @UseBefore(adminMiddleware)
    @OpenAPI({ summary: 'Update current user' })
    @ResponseSchema(UserApiResponse)
    @UseBefore(authMiddleware)
    async updateUser(@Req() req: RequestWithUser, @Body() body: User, @Res() response: Response<UserApiResponse>): Promise<Response<UserApiResponse>> {
      const { name, username, isAdmin, userId } = req.user;

      if (!name ||!body) {
        throw new HttpException(400, 'Bad Request');
      }
 
      try {
       const userSettings = await prisma.userSettings.update({where:{userId}, data:{apiKey:body.apiKey}});
      
        const userData: UserData = {
            name: name,
            username,
            isAdmin,
            apiKey: maskApiKey(userSettings?.apiKey)
          };
          return response.send({ data: userData, message: 'success' });
      } catch (err) {
        throw new HttpException(500, err.message)
      }

     
    }
}
