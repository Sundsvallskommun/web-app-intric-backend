import ApiResponse from '@/interfaces/api-service.interface';
import { UserData } from '@/interfaces/users.interface';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';

export class User implements UserData {
  @IsString()
  name: string;
  @IsString()
  username: string;
  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
  @IsString()
  @IsOptional()
  apiKey?: string;
}

export class UserApiResponse implements ApiResponse<UserData> {
  @ValidateNested()
  @Type(() => User)
  data: User;
  @IsString()
  message: string;
}
