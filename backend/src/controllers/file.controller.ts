import {
  FilePublic as FilePublicInterface,
  PaginatedResponseFilePublic as PaginatedResponseFilePublicInterface,
} from '@/data-contracts/intric/data-contracts';
import { UploadFileDto } from '@/dtos/file.dto';
import hashMiddleware from '@/middlewares/hash.middleware';
import { FilePublic, PaginatedResponseFilePublic } from '@/responses/intric/file.response';
import { getApiKey } from '@/services/intric-api-key.service';
import IntricApiService from '@/services/intric-api.service';
import { fileUploadOptions } from '@/utils/fileUploadOptions';
import { logger } from '@/utils/logger';
import { Request, Response } from 'express';
import { Body, Controller, Delete, Get, HttpError, Param, Post, Req, Res, UploadedFile, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@Controller()
export class FileController {
  private intricApiService = new IntricApiService();

  @Get('/files')
  @OpenAPI({
    summary: 'Get files',
  })
  @UseBefore(hashMiddleware)
  @ResponseSchema(PaginatedResponseFilePublic)
  async get_files(
    @Req() req: Request,
    @Res() response: Response<PaginatedResponseFilePublicInterface>,
  ): Promise<Response<PaginatedResponseFilePublicInterface>> {
    try {
      const url = '/files/';
      const apiKey = await getApiKey(req);
      const res = await this.intricApiService.get<PaginatedResponseFilePublicInterface>({ url, headers: { 'api-key': apiKey } });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error getting files', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Internal server error');
    }
  }

  @Get('/files/:id')
  @OpenAPI({
    summary: 'Get file',
  })
  @UseBefore(hashMiddleware)
  @ResponseSchema(FilePublic)
  async get_file(
    @Req() req: Request,
    @Param('id') id: string,
    @Res() response: Response<FilePublicInterface>,
  ): Promise<Response<FilePublicInterface>> {
    try {
      const url = `/files/${id}`;
      const apiKey = await getApiKey(req);
      const res = await this.intricApiService.get<FilePublicInterface>({ url, headers: { 'api-key': apiKey } });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error getting file', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Internal server error');
    }
  }

  @Post('/files')
  @OpenAPI({
    summary: 'Upload file',
  })
  @UseBefore(hashMiddleware)
  @ResponseSchema(FilePublic)
  async upload_file(
    @Req() req: Request,
    @Body() body: UploadFileDto,
    @UploadedFile('upload_file', { options: fileUploadOptions, required: true }) file: Express.Multer.File,
    @Res() response: Response<FilePublicInterface>,
  ): Promise<Response<FilePublicInterface>> {
    const data = this.intricApiService.formDataFromMulterFile(file, 'upload_file');

    try {
      const url = '/files/';
      const apiKey = await getApiKey(req);
      const res = await this.intricApiService.post<FilePublicInterface, any>({
        url,
        headers: { 'api-key': apiKey, Accept: 'multipart/form-data', 'Content-Type': 'multipart/form-data' },
        data,
      });
      return response.send(res.data);
    } catch (e) {
      logger.error('Error uploading file', e);
      throw new HttpError(e?.httpCode ?? 500, e?.message ?? 'Internal server error');
    }
  }

  @Delete('/files/:id')
  @OpenAPI({
    summary: 'Delete file',
  })
  @UseBefore(hashMiddleware)
  async delete_file(@Req() req: Request, @Param('id') id: string, @Res() response: Response): Promise<Response> {
    try {
      const url = `/files/${id}`;
      const apiKey = await getApiKey(req);
      const res = await this.intricApiService.delete({ url, headers: { 'api-key': apiKey } });
      if (res) {
        return response.send();
      }
    } catch (e) {
      logger.error('Error deleting file', e);
      throw new HttpError(e?.code ?? 500, e?.message ?? 'Internal server error');
    }
  }
}
