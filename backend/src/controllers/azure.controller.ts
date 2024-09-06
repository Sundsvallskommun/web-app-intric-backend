import { AZURE_REGION } from '@/config';
import { getToken, getTranslations } from '@/services/azure.service';
import { IsArray, IsString } from 'class-validator';
import { Body, Controller, Get, HttpError, Post } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

class TranslationDto {
  @IsArray()
  text: string[];
  @IsString()
  sourcelanguage: string;
  @IsString()
  targetlanguage: string;
}

@Controller()
export class AzureController {
  @Get('/azure/login')
  @OpenAPI({
    summary: 'Get auth token for Azure Speech services',
  })
  async getAzureToken() {
    try {
      const token = await getToken();
      const region = AZURE_REGION;
      return { data: { token, region } };
    } catch (e) {
      console.log(e);
      throw new HttpError(500, 'Server error');
    }
  }

  @Post('/azure/translate')
  @OpenAPI({
    summary: 'Get translation of text',
  })
  async translate(@Body() body: TranslationDto) {
    try {
      const texts = await getTranslations(body);
      return { data: texts, message: 'success' };
    } catch (e) {
      throw new HttpError(500, e.message);
    }
  }
}
