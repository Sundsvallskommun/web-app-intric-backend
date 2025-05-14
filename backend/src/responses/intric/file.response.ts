import {
  AcceptedFileType as AcceptedFileTypeInterface,
  FilePublic as FilePublicInterface,
  FileRestrictions as FileRestrictionsInterface,
  Limit as LimitInterface,
} from '@/data-contracts/intric/data-contracts';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { DatesAndId } from './common';

export class FilePublic extends DatesAndId implements FilePublicInterface {
  @IsString()
  name: string;
  @IsString()
  mimetype: string;
  @IsNumber()
  size: number;
  @IsString()
  @IsOptional()
  @IsNullable()
  transcription?: string;
}

export class AcceptedFileType implements AcceptedFileTypeInterface {
  @IsString()
  mimetype: string;
  @IsNumber()
  size_limit: number;
}

export class Limit implements LimitInterface {
  @IsNumber()
  max_files: number;
  @IsNumber()
  max_size: number;
}

export class FileRestrictions implements FileRestrictionsInterface {
  @ValidateNested({ each: true })
  @Type(() => AcceptedFileType)
  accepted_file_types: AcceptedFileTypeInterface[];
  @ValidateNested()
  @Type(() => Limit)
  limit: LimitInterface;
}
