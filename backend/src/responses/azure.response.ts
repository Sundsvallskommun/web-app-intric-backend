import ApiResponse from '@/interfaces/api-service.interface';
import { Token } from '@/interfaces/azure.interface';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

class AzureToken implements Token {
  @IsString()
  token: string;
  @IsString()
  region: string;
}

export class ApiResponseAzureToken implements ApiResponse<Token> {
  @ValidateNested()
  @Type(() => AzureToken)
  data: AzureToken;
  @IsString()
  message: string;
}

export class ApiResponseTranslation implements ApiResponse<string[]> {
  @IsString({ each: true })
  data: string[];
  @IsString()
  message: string;
}
