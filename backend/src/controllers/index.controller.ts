import { AskResponse, PaginatedResponseGroupPublic } from '@/data-contracts/intric/data-contracts';
import ApiService from '@/services/api.service';
import IntricApiService from '@/services/intric-api.service';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { ServerResponse } from 'http';
import { Body, ContentType, Controller, Get, Post, Req, Res } from 'routing-controllers';
import { Readable } from 'stream';

@Controller()
export class IndexController {
  private apiService = new ApiService();
  private intricApiService = new IntricApiService();

  @Get('/')
  async index() {
    const url = '/users/me/';
    const req = {
      user: null,
    };
    console.log('Fetching me');
    const res = await this.intricApiService.get<any>({ url });
    console.log('Fetched me:');
    console.log(res);
    const groups = await this.intricApiService.get<PaginatedResponseGroupPublic>({ url: '/groups/' });
    console.log('groups:');
    for (let item of groups.data.items) {
      console.log(item);
    }
    return 'OK';
  }
}
