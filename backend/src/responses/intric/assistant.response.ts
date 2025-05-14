import {
  AssistantPublic as AssistantPublicInterface,
  AssistantType,
  CollectionPublic as CollectionPublicInterface,
  EmbeddingModelFamily,
  EmbeddingModelPublicLegacy as EmbeddingModelPublicLegacyInterface,
  FilePublic as FilePublicInterface,
  FileRestrictions as FileRestrictionsInterface,
  IntegrationKnowledgeMetaData as IntegrationKnowledgeMetaDataInterface,
  IntegrationKnowledgePublicIntegrationTypeEnum,
  IntegrationKnowledgePublic as IntegrationKnowledgePublicInterface,
  ModelHostingLocation,
  ModelOrg,
  ModelStability,
  PaginatedResponseAssistantPublic as PaginatedResponseAssistantPublicInterface,
  PromptPublic as PromptPublicInterface,
  ResourcePermission,
  UserSparse as UserSparseInterface,
  WebsitePublic as WebsitePublicInterface,
} from '@/data-contracts/intric/data-contracts';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import {
  CompletionModelSparse,
  CompletionModelSparseInterface,
  DatesAndId,
  ModelKwargs,
  ModelKwargsInterface,
  UseTools,
  UseToolsInterface,
} from './common';
import { FilePublic, FileRestrictions } from './file.response';
import { CollectionPublic } from './group.response';
import { WebsitePublic } from './website.response';

class UserSparse extends DatesAndId implements UserSparseInterface {
  @IsString()
  email: string;
  @IsString()
  @IsOptional()
  @IsNullable()
  username?: string | null;
}

class PromptPublic extends DatesAndId implements PromptPublicInterface {
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsString()
  @IsOptional()
  @IsNullable()
  description?: string | null;
  @IsBoolean()
  @IsOptional()
  @IsNullable()
  is_selected?: boolean | null;
  @ValidateNested()
  @Type(() => UserSparse)
  user: UserSparseInterface;
  @IsString()
  text: string;
}

class EmbeddingModelPublicLegacy extends DatesAndId implements EmbeddingModelPublicLegacyInterface {
  @IsString()
  name: string;
  @IsEnum(EmbeddingModelFamily)
  family: EmbeddingModelFamily;
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
  org?: ModelOrg | null;
  @IsBoolean()
  @IsOptional()
  is_org_enabled?: boolean;
  @IsBoolean()
  @IsOptional()
  can_access?: boolean;
  @IsBoolean()
  @IsOptional()
  is_locked?: boolean;
}

class IntegrationKnowledgeMetaData implements IntegrationKnowledgeMetaDataInterface {
  @IsNumber()
  size: number;
}

class IntegrationKnowledgePublic extends DatesAndId implements IntegrationKnowledgePublicInterface {
  @IsString()
  name: string;
  @IsString()
  url: string;
  @IsString()
  tenant_id: string;
  @IsString()
  space_id: string;
  @IsString()
  user_integration_id: string;
  @ValidateNested()
  @Type(() => EmbeddingModelPublicLegacy)
  embedding_model: EmbeddingModelPublicLegacyInterface;
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @ValidateNested()
  @Type(() => IntegrationKnowledgeMetaData)
  metadata: IntegrationKnowledgeMetaDataInterface;
  @IsEnum(IntegrationKnowledgePublicIntegrationTypeEnum)
  integration_type: IntegrationKnowledgePublicIntegrationTypeEnum;
  task: any;
}

export class AssistantPublic extends DatesAndId implements AssistantPublicInterface {
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsString()
  name: string;
  @ValidateNested()
  @Type(() => PromptPublic)
  @IsOptional()
  @IsNullable()
  prompt?: PromptPublicInterface | null;
  @IsString()
  space_id: string;
  @ValidateNested()
  @Type(() => ModelKwargs)
  completion_model_kwargs: ModelKwargsInterface;
  @IsBoolean()
  logging_enabled: boolean;
  @ValidateNested({ each: true })
  @Type(() => FilePublic)
  attachments: FilePublicInterface[];
  @ValidateNested()
  @Type(() => FileRestrictions)
  allowed_attachments: FileRestrictionsInterface;
  @ValidateNested({ each: true })
  @Type(() => CollectionPublic)
  groups: CollectionPublicInterface[];
  @ValidateNested({ each: true })
  @Type(() => WebsitePublic)
  websites: WebsitePublicInterface[];
  @ValidateNested({ each: true })
  @Type(() => IntegrationKnowledgePublic)
  integration_knowledge_list: IntegrationKnowledgePublicInterface[];
  @ValidateNested()
  @Type(() => CompletionModelSparse)
  completion_model: CompletionModelSparseInterface;
  @IsBoolean()
  @IsOptional()
  published?: boolean;
  @ValidateNested()
  @Type(() => UserSparse)
  user: UserSparseInterface;
  @ValidateNested()
  @Type(() => UseTools)
  tools: UseToolsInterface;
  @IsEnum(AssistantType)
  type: AssistantType;
  @IsString()
  @IsOptional()
  @IsNullable()
  description?: string | null;
  @IsBoolean()
  insight_enabled: boolean;
  @IsNumber()
  @IsOptional()
  @IsNullable()
  data_retention_days?: number | null;
  @IsObject()
  @IsOptional()
  @IsNullable()
  metadata_json?: object | null;
}

export class PaginatedResponseAssistantPublic implements PaginatedResponseAssistantPublicInterface {
  @ValidateNested({ each: true })
  @Type(() => AssistantPublic)
  items: AssistantPublicInterface[];
  @IsInt()
  count: number;
}
