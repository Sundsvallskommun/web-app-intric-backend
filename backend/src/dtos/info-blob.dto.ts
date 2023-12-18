import { InfoBlobMetaDataUpsertPublic, InfoBlobUpsertPublic, InfoBlobUpsertRequest } from '@/data-contracts/intric/data-contracts';
import { Type } from 'class-transformer';
import { IsArray, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

export class InfoBlobMetadata implements InfoBlobMetaDataUpsertPublic {
  @IsString()
  url: string;
  @IsString()
  title: string;
}

export class UpdateInfoBlobDto implements InfoBlobUpsertPublic {
  @IsString()
  @IsOptional()
  text?: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => InfoBlobMetadata)
  metadata?: InfoBlobMetaDataUpsertPublic;
}

export class UpdateInfoBlobsDto implements InfoBlobUpsertRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateInfoBlobDto)
  info_blobs: InfoBlobUpsertPublic[];
}
