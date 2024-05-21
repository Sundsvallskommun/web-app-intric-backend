import { AZURE_REGION } from '@/config';
import { getToken } from '@/services/azure.service';
import { Controller, Get, HttpError } from 'routing-controllers';

@Controller()
export class AzureControlller {
  @Get('/azure/login')
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
}
