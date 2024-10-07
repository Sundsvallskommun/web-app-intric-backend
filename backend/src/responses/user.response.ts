import ApiResponse from '@/interfaces/api-service.interface';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';

// export class Permissions implements IPermissions {
//   @IsBoolean()
//   canEditSystemMessages: boolean;
// }

export class User implements User {
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
  // role: InternalRole;
  // @ValidateNested()
  // @Type(() => Permissions)
  // permissions: Permissions;
}

export class UserApiResponse implements ApiResponse<User> {
  @ValidateNested()
  @Type(() => User)
  data: User;
  @IsString()
  message: string;
}
