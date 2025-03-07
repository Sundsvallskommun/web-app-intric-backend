import {
  AssistantGuard as AssistantGuardType,
  ModelId as ModelIdType,
  ModelKwargs,
  PartialAssistantUpdatePublic,
  PromptCreate,
} from '@/data-contracts/intric/data-contracts';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class NewPrompt implements PromptCreate {
  @IsString()
  text: string;
  @IsString()
  @IsOptional()
  @IsNullable()
  description?: string | null;
}

export class ModelId implements ModelIdType {
  @IsString()
  id: string;
}

export class CompletionModelKwargs implements ModelKwargs {
  @IsNumber()
  @IsOptional()
  @IsNullable()
  temperature?: number | null;
  @IsNumber()
  @IsOptional()
  @IsNullable()
  top_p?: number | null;
}

export class AssistantGuard implements AssistantGuardType {
  @IsBoolean()
  @IsOptional()
  guardrail_active?: boolean;
  @IsString()
  @IsOptional()
  guardrail_string?: string;
  @IsString()
  @IsOptional()
  on_fail_message?: string;
}
export class UpdateAssistantDto implements PartialAssistantUpdatePublic {
  @IsString()
  @IsOptional()
  @IsNullable()
  name: string | null;
  @IsOptional()
  @Type(() => NewPrompt)
  @ValidateNested()
  prompt: PromptCreate;
  @IsNullable()
  @IsOptional()
  @Type(() => ModelId)
  completion_model: ModelIdType;
  @IsOptional()
  @IsNullable()
  @Type(() => CompletionModelKwargs)
  completion_model_kwargs?: ModelKwargs | null;
  @Type(() => ModelId)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsNullable()
  groups?: ModelIdType[] | null;
  @Type(() => ModelId)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsNullable()
  websites?: ModelIdType[] | null;
  @IsBoolean()
  @IsOptional()
  @IsNullable()
  logging_enabled?: boolean | null;
  @IsString()
  @IsOptional()
  @IsNullable()
  space_id?: string | null;
  @IsOptional()
  @IsNullable()
  @Type(() => AssistantGuard)
  guardrail?: AssistantGuardType | null;
  @IsOptional()
  @IsNullable()
  @Type(() => ModelId)
  @ValidateNested({ each: true })
  attachments?: ModelIdType[] | null;
}
