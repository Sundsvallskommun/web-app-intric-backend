import { AZURE_REGION } from '@/config';
import { TranslationDto } from '@/dtos/azure.dto';
import ApiResponse from '@/interfaces/api-service.interface';
import { Token } from '@/interfaces/azure.interface';
import { ApiResponseAzureToken, ApiResponseTranslation } from '@/responses/azure.response';
import { getToken, getTranslations } from '@/services/azure.service';
import { logger } from '@/utils/logger';
import { Response } from 'express';
import { Body, Controller, Get, HttpError, Post, Res } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@Controller()
export class AzureController {
  @Get('/azure/login')
  @OpenAPI({
    summary: 'Get auth token for Azure Speech services',
  })
  @ResponseSchema(ApiResponseAzureToken)
  async getAzureToken(@Res() res: Response<ApiResponse<Token>>): Promise<Response<ApiResponse<Token>>> {
    try {
      const token: string = await getToken();
      const region = AZURE_REGION;
      return res.send({ data: { token, region }, message: 'success' });
    } catch (e) {
      logger.error('Error getting Azure token', e);
      throw new HttpError(500, 'Server error');
    }
  }

  @Post('/azure/translate')
  @OpenAPI({
    summary: 'Get translation of text',
  })
  @ResponseSchema(ApiResponseTranslation)
  async translate(@Body() body: TranslationDto, @Res() res: Response<ApiResponse<string[]>>): Promise<Response<ApiResponse<string[]>>> {
    try {
      const texts = await getTranslations(body);
      return res.send({ data: texts, message: 'success' });
    } catch (e) {
      logger.error("Error in AzureController's translate method", e);
      throw new HttpError(500, e.message);
    }
  }
}
