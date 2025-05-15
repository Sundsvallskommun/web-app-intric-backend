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
} from '@/data-contracts/intric/data-contracts';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

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

export class CompletionModelSparse extends DatesAndId implements CompletionModelSparseInterface {
  @IsString()
  name: string;
  @IsString()
  nickname: string;
  @IsEnum(ModelFamily)
  family: ModelFamily;
  @IsNumber()
  token_limit: number;
  @IsBoolean()
  is_deprecated: boolean;
  @IsNumber()
  @IsOptional()
  @IsNullable()
  nr_billion_parameters?: number | null;
  @IsString()
  @IsOptional()
  @IsNullable()
  hf_link?: string | null;
  @IsEnum(ModelStability)
  stability: ModelStability;
  @IsEnum(ModelHostingLocation)
  hosting: ModelHostingLocation;
  @IsBoolean()
  @IsOptional()
  @IsNullable()
  open_source?: boolean | null;
  @IsString()
  @IsOptional()
  @IsNullable()
  description?: string | null;
  @IsString()
  @IsOptional()
  @IsNullable()
  deployment_name?: string | null;
  @IsEnum(ModelOrg)
  @IsOptional()
  @IsNullable()
  org?: ModelOrg | null;
  @IsBoolean()
  vision: boolean;
  @IsBoolean()
  reasoning: boolean;
  @IsString()
  @IsOptional()
  @IsNullable()
  base_url?: string | null;
}

export class CompletionModel extends CompletionModelSparse implements CompletionModelInterface {
  @IsString()
  @IsOptional()
  is_org_enabled?: boolean;
  @IsBoolean()
  @IsOptional()
  is_org_default?: boolean;
}

export type { UseToolsInterface, ModelKwargsInterface, CompletionModelSparseInterface, CompletionModelInterface };
