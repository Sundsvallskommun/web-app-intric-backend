import { Host as HostType } from '@/interfaces/host.interface';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import ApiResponse from '../interfaces/api-service.interface';

export class Host implements HostType {
  @IsInt()
  @IsOptional()
  id?: number;
  @IsString()
  host: string;
}

export class UpdateHost implements HostType {
  @IsString()
  host: string;
}

export class HostsApiResponse implements ApiResponse<HostType[]> {
  @ValidateNested({ each: true })
  @Type(() => Host)
  data: Host[];
  @IsString()
  message: string;
}

export class HostApiResponse implements ApiResponse<Host> {
  @ValidateNested()
  @Type(() => Host)
  data: Host;
  @IsString()
  message: string;
}
