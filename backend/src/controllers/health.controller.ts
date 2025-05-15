import { HealthCheckStatus } from '@/responses/health.controller';
import ApiService from '@/services/api.service';
import { logger } from '@/utils/logger';
import { Response } from 'express';
import { Controller, Get, HttpCode, HttpError, Res } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@Controller()
export class HealthController {
  private apiService = new ApiService();

  @Get('/health/up')
  @OpenAPI({ summary: 'Return health check' })
  @ResponseSchema(HealthCheckStatus)
  async up(@Res() response: Response<Record<string, string>>): Promise<Response<Record<string, string>>> {
    const url = `simulatorserver/2.0/simulations/response?status=200%20OK`;
    const data = {
      status: 'OK',
    };
    try {
      const res = await this.apiService.post<Record<string, string>>({ url, data });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error when doing health check:', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Error when doing health check');
    }
  }
}
