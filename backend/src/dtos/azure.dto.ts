import { IsArray, IsString } from 'class-validator';

export class TranslationDto {
  @IsArray()
  @IsString({ each: true })
  text: string[];
  @IsString()
  sourcelanguage: string;
  @IsString()
  targetlanguage: string;
}
