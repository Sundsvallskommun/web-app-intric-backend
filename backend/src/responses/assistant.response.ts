import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Assistant as AssistantType } from '../interfaces/assistant.interface';
import { Type } from 'class-transformer';
import ApiResponse from '../interfaces/api-service.interface';


export class Assistant implements AssistantType {
  @IsString()
  app:string;
  @IsString()
  assistantId: string;
  @IsString()
  apiKey: string;
}

export class UpdateAssistant implements AssistantType {
  @IsString()
  app:string;
  @IsString()
  assistantId: string;
  @IsString()
  @IsOptional()
  apiKey: string;
}

export class AssistantsApiResponse implements ApiResponse<AssistantType[]> {
  @ValidateNested({each:true})
  @Type(() => Assistant)
  data: Assistant[];
  @IsString()
  message: string;
}

export class AssistantApiResponse implements ApiResponse<AssistantType> {
  @ValidateNested()
  @Type(() => Assistant)
  data: Assistant;
  @IsString()
  message: string;
}
