import {
  ToolAssistant as ToolAssistantInterface,
  UseTools as UseToolsInterface,
  ModelKwargs as ModelKwargsInterface,
  ModelFamily,
  ModelStability,
  ModelHostingLocation,
  ModelOrg,
  CompletionModel as CompletionModelInterface,
  CompletionModelSparse as CompletionModelSparseInterface,
  PaginatedPermissionsAppSparse,
  ResourcePermission,
  SecurityClassificationPublic as SecurityClassificationPublicInterface,
  EmbeddingModelPublic as EmbeddingModelPublicInterface,
  CompletionModelPublic as CompletionModelPublicInterface,
  TranscriptionModelPublic as TranscriptionModelPublicInterface,
  Knowledge as KnowledgeInterface,
  PaginatedPermissionsCollectionPublic as PaginatedPermissionsCollectionPublicInterface,
  PaginatedPermissionsWebsitePublic as PaginatedPermissionsWebsitePublicInterface,
} from '@/data-contracts/intric/data-contracts';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PaginatedPermissionsCollectionPublic } from './group.response';
import { PaginatedPermissionsWebsitePublic } from './website.response';

export class DatesAndId {
  @IsString()
  @IsOptional()
  @IsNullable()
  created_at?: string | null;
  @IsString()
  @IsOptional()
  @IsNullable()
  updated_at?: string | null;
  @IsString()
  id: string;
}

class ToolAssistant implements ToolAssistantInterface {
  @IsString()
  id: string;
  @IsString()
  handle: string;
}

export class UseTools implements UseToolsInterface {
  @ValidateNested({ each: true })
  @Type(() => ToolAssistant)
  assistants: ToolAssistantInterface[];
}

export class ModelKwargs implements ModelKwargsInterface {
  @IsNumber()
  @IsOptional()
  @IsNullable()
  temperature?: number | null;
  @IsNumber()
  @IsOptional()
  @IsNullable()
  top_p?: number | null;
}

export class PaginatedDefaults implements Pick<PaginatedPermissionsAppSparse, 'count' | 'permissions'> {
  @IsInt()
  count: number;
}
export class PaginatedPermissionsDefaults extends PaginatedDefaults implements Pick<PaginatedPermissionsAppSparse, 'count' | 'permissions'> {
  @IsEnum(ResourcePermission, { each: true })
  @IsOptional()
  permissions?: ResourcePermission[];
}
export class SecurityClassificationPublic extends DatesAndId implements SecurityClassificationPublicInterface {
  @IsString()
  name: string;
  @IsString()
  @IsNullable()
  description: string | null;
  @IsNumber()
  security_level: number;
}

export { DatesAndId, UseTools, ModelKwargs };
export type { UseToolsInterface, ModelKwargsInterface, SecurityClassificationPublicInterface };
