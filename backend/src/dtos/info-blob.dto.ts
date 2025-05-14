import { InfoBlobAddPublic, InfoBlobMetadataUpsertPublic, InfoBlobUpdatePublic, InfoBlobUpsertRequest } from '@/data-contracts/intric/data-contracts';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

export class InfoBlobMetadata implements InfoBlobMetadataUpsertPublic {
  @IsOptional()
  @IsNullable()
  @IsString()
  url?: string | null;
  @IsOptional()
  @IsNullable()
  @IsString()
  title?: string | null;
}

export class UpdateInfoBlobDto implements InfoBlobUpdatePublic {
  @IsOptional()
  @ValidateNested()
  @Type(() => InfoBlobMetadata)
  metadata: InfoBlobMetadataUpsertPublic;
}

export class UpdateInfoBlobsDto implements InfoBlobUpsertRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateInfoBlobDto)
  info_blobs: InfoBlobAddPublic[];
}
