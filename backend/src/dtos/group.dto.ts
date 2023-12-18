import { CreateGroupRequest, GroupUpdatePublic, InfoBlobUpsertPublic, InfoBlobUpsertRequest } from '@/data-contracts/intric/data-contracts';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto implements CreateGroupRequest {
  @IsString()
  name: string;
  @IsBoolean()
  @IsOptional()
  is_public?: boolean;
  @IsString()
  @IsOptional()
  embedding_model?: string;
}

export class UpdateGroupDto implements GroupUpdatePublic {
  @IsString()
  name: string;
  @IsBoolean()
  @IsOptional()
  is_public?: boolean;
}
