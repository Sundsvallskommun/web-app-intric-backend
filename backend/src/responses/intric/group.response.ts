import { IsNullable } from '@/utils/custom-validation-classes';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import {
  CollectionPublic as CollectionPublicInterface,
  EmbeddingModelPublic as EmbeddingModelPublicInterface,
  ModelFamily,
  ModelHostingLocation,
  ModelOrg,
  ModelStability,
  ResourcePermission,
  SecurityClassificationPublic as SecurityClassificationPublicInterface,
  CollectionMetadata as CollectionMetadataInterface,
} from '@/data-contracts/intric/data-contracts';
import { Type } from 'class-transformer';
import { DatesAndId } from './common';

export class SecurityClassificationPublic extends DatesAndId implements SecurityClassificationPublicInterface {
  @IsString()
  name: string;
  @IsString()
  @IsNullable()
  description: string | null;
  @IsNumber()
  security_level: number;
}

export class EmbeddingModelPublic extends DatesAndId implements EmbeddingModelPublicInterface {
  @IsString()
  name: string;
  @IsEnum(ModelFamily)
  family: ModelFamily;
  @IsBoolean()
  is_deprecated: boolean;
  @IsBoolean()
  open_source: boolean;
  @IsNumber()
  @IsOptional()
  @IsNullable()
  dimensions?: number | null;
  @IsNumber()
  @IsOptional()
  @IsNullable()
  max_input?: number | null;
  @IsString()
  @IsOptional()
  @IsNullable()
  hf_link?: string | null;
  @IsEnum(ModelStability)
  stability: ModelStability;
  @IsEnum(ModelHostingLocation)
  hosting: ModelHostingLocation;
  @IsString()
  @IsOptional()
  @IsNullable()
  description?: string | null;
  @IsEnum(ModelOrg)
  @IsOptional()
  @IsNullable()
  org?: ModelOrg;
  @IsBoolean()
  can_access?: boolean;
  @IsBoolean()
  is_locked?: boolean;
  @IsBoolean()
  is_org_enabled?: boolean;
  @ValidateNested()
  @Type(() => SecurityClassificationPublic)
  @IsOptional()
  @IsNullable()
  security_classification?: SecurityClassificationPublicInterface | null;
}

export class CollectionMetadata implements CollectionMetadataInterface {
  @IsNumber()
  num_info_blobs: number;
  @IsNumber()
  size: number;
}

export class CollectionPublic extends DatesAndId implements CollectionPublicInterface {
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsString()
  name: string;
  @ValidateNested()
  @Type(() => EmbeddingModelPublic)
  embedding_model: EmbeddingModelPublicInterface;
  @ValidateNested()
  @Type(() => CollectionMetadata)
  metadata: CollectionMetadataInterface;
}
