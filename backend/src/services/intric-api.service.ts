import { HttpException } from '@/exceptions/HttpException';
import { logger } from '@/utils/logger';
import { intricApiURL } from '@/utils/util';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import FormData from 'form-data';

class IntricApiResponse<T> {
  data: T;
  message: string;
}

class IntricApiService {
  public formDataFromMulterFile = (file: Express.Multer.File, fieldName: string) => {
    const data = new FormData();

    data.append(fieldName, file.buffer, file.originalname);
    return data;
  };

  private async request<T>(config: AxiosRequestConfig): Promise<IntricApiResponse<T>> {
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };
    const defaultParams = {};

    const preparedConfig: AxiosRequestConfig = {
      ...config,
      headers: { ...defaultHeaders, ...config.headers },
      params: { ...defaultParams, ...config.params },
      url: intricApiURL(config.url),
    };

    try {
      const res = await axios<T>(preparedConfig);
      return { data: res.data, message: 'success' };
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error) && (error as AxiosError).response?.status === 404) {
        throw new HttpException(404, 'Not found');
      }
      // NOTE: did you subscribe to the API called?
      const response = (error as AxiosError).response;
      console.log('RESPONSE: ', response);
      logger.error('Error:', (error as AxiosError).message);
      throw new HttpException(response.status, `Intric: ${(response.data as any)?.message}`);
    }
  }

  public async get<T>(config: AxiosRequestConfig): Promise<IntricApiResponse<T>> {
    console.log('GET to url', config.url);
    console.log('with headers:', JSON.stringify(config.headers));
    return this.request<T>({ ...config, method: 'GET' });
  }

  public async post<T, U>(config: AxiosRequestConfig<U>): Promise<IntricApiResponse<T>> {
    console.log('POST to url', config.url);
    return this.request<T>({ ...config, method: 'POST' });
  }

  public async patch<T, U>(config: AxiosRequestConfig<U>): Promise<IntricApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }

  public async put<T, U>(config: AxiosRequestConfig<U>): Promise<IntricApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PUT' });
  }

  public async delete<T>(config: AxiosRequestConfig): Promise<IntricApiResponse<T>> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
}

export default IntricApiService;
