import {
  InfoBlobMetadata as InfoBlobMetadataInterface,
  InfoBlobPublicNoText as InfoBlobPublicNoTextInterface,
  InfoBlobPublic as InfoBlobPublicInterface,
} from '@/data-contracts/intric/data-contracts';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { DatesAndId } from './common';

class InfoBlobMetadata implements InfoBlobMetadataInterface {
  @IsString()
  @IsOptional()
  @IsNullable()
  url?: string;
  @IsString()
  @IsOptional()
  @IsNullable()
  title?: string;
  @IsString()
  embedding_model_id: string;
  @IsNumber()
  size: number;
}

export class InfoBlobPublicNoText extends DatesAndId implements InfoBlobPublicNoTextInterface {
  @ValidateNested()
  @Type(() => InfoBlobMetadata)
  metadata: InfoBlobMetadataInterface;
  @IsString()
  @IsOptional()
  @IsNullable()
  group_id?: string | null;
  @IsString()
  @IsOptional()
  @IsNullable()
  website_id?: string | null;
}

export class InfoBlobPublic extends InfoBlobPublicNoText implements InfoBlobPublicInterface {
  @IsString()
  text: string;
}
