import { FilePublic, PaginatedResponseFilePublic } from '@/data-contracts/intric/data-contracts';
import hashMiddleware from '@/middlewares/hash.middleware';
import { getApiKey } from '@/services/intric-api-key.service';
import IntricApiService from '@/services/intric-api.service';
import { fileUploadOptions } from '@/utils/fileUploadOptions';
import { logger } from '@/utils/logger';
import { Request, Response } from 'express';
import { Controller, Delete, Get, HttpError, Param, Post, Req, Res, UploadedFile, UseBefore } from 'routing-controllers';

@Controller()
export class FileController {
  private intricApiService = new IntricApiService();

  @Get('/files')
  @UseBefore(hashMiddleware)
  async get_files(@Req() req: Request, @Res() response: Response<PaginatedResponseFilePublic>): Promise<Response<PaginatedResponseFilePublic>> {
    try {
      const url = '/files/';
      const apiKey = await getApiKey(req);
      const res = await this.intricApiService.get<PaginatedResponseFilePublic>({ url, headers: { 'api-key': apiKey } });
      return response.send(res.data);
    } catch (e) {
      console.log('Error getting files', e);
      logger.error('Error getting files', e);
      throw new HttpError(e?.code ?? 500, e?.message ?? 'Internal server error');
    }
  }

  @Get('/files/:id')
  @UseBefore(hashMiddleware)
  async get_file(@Req() req: Request, @Param('id') id: string, @Res() response: Response<FilePublic>): Promise<Response<FilePublic>> {
    try {
      const url = `/files/${id}`;
      const apiKey = await getApiKey(req);
      const res = await this.intricApiService.get<FilePublic>({ url, headers: { 'api-key': apiKey } });
      return response.send(res.data);
    } catch (e) {
      console.log('Error getting file', e);
      logger.error('Error getting file', e);
      throw new HttpError(e?.code ?? 500, e?.message ?? 'Internal server error');
    }
  }

  @Post('/files')
  @UseBefore(hashMiddleware)
  async upload_file(
    @Req() req: Request,
    @UploadedFile('upload_file', { options: fileUploadOptions, required: true }) file: Express.Multer.File,
    @Res() response: Response<FilePublic>,
  ): Promise<Response<FilePublic>> {
    const formData = new FormData();
    const blob = new Blob([file.buffer], { type: file.mimetype });
    const upload_file = new File([blob], file.originalname, { type: file.mimetype });

    formData.append('upload_file', upload_file, file.originalname);

    try {
      const url = '/files/';
      const apiKey = await getApiKey(req);
      const res = await this.intricApiService.post<FilePublic, any>({
        url,
        headers: { 'api-key': apiKey, Accept: 'multipart/form-data', 'Content-Type': 'multipart/form-data' },
        data: formData,
      });
      return response.send(res.data);
    } catch (e) {
      console.log('Error uploading file', e);
      logger.error('Error uploading file', e);
      throw new HttpError(e?.status ?? e?.httpCode ?? 500, e?.message ?? 'Internal server error');
    }
  }

  @Delete('/files/:id')
  @UseBefore(hashMiddleware)
  async delete_file(@Req() req: Request, @Param('id') id: string, @Res() response: Response<Boolean>): Promise<Response<Boolean>> {
    try {
      const url = `/files/${id}`;
      const apiKey = await getApiKey(req);
      const res = await this.intricApiService.delete({ url, headers: { 'api-key': apiKey } });
      if (res) {
        return response.send(true);
      }
    } catch (e) {
      console.log('Error deleting file', e);
      logger.error('Error deleting file', e);
      throw new HttpError(e?.code ?? 500, e?.message ?? 'Internal server error');
    }
  }
}
