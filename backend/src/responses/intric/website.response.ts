import {
  CrawlType,
  ResourcePermission,
  UpdateInterval,
  WebsitePublic as WebsitePublicInterface,
  IntricWebsitesPresentationWebsiteModelsCrawlRunPublic as IntricWebsitesPresentationWebsiteModelsCrawlRunPublicInterface,
  Status,
  EmbeddingModelPublic as EmbeddingModelPublicInterface,
  WebsiteMetadata as WebsiteMetadataInterface,
} from '@/data-contracts/intric/data-contracts';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { EmbeddingModelPublic } from './group.response';
import { DatesAndId } from './common';

export class IntricWebsitesPresentationWebsiteModelsCrawlRunPublic
  extends DatesAndId
  implements IntricWebsitesPresentationWebsiteModelsCrawlRunPublicInterface
{
  @IsNumber()
  @IsNullable()
  pages_crawled: number | null;
  @IsNumber()
  @IsNullable()
  files_downloaded: number | null;
  @IsNumber()
  @IsNullable()
  pages_failed: number | null;
  @IsNumber()
  @IsNullable()
  files_failed: number | null;
  @IsEnum(Status)
  status: Status;
  @IsString()
  @IsNullable()
  result_location: string | null;
  @IsString()
  @IsNullable()
  finished_at: string | null;
}

export class WebsiteMetadata implements WebsiteMetadataInterface {
  @IsNumber()
  size: number;
}

export class WebsitePublic extends DatesAndId implements WebsitePublicInterface {
  @IsEnum(ResourcePermission, { each: true })
  permissions?: ResourcePermission[];
  @IsString()
  @IsNullable()
  name: string | null;
  @IsString()
  url: string;
  @IsString()
  space_id: string;
  @IsBoolean()
  download_files: boolean;
  @IsEnum(CrawlType)
  crawl_type: CrawlType;
  @IsEnum(UpdateInterval)
  update_interval: UpdateInterval;
  @ValidateNested()
  @Type(() => IntricWebsitesPresentationWebsiteModelsCrawlRunPublic)
  @IsNullable()
  latest_crawl: IntricWebsitesPresentationWebsiteModelsCrawlRunPublicInterface;
  @ValidateNested()
  @Type(() => EmbeddingModelPublic)
  embedding_model: EmbeddingModelPublicInterface;
  @ValidateNested()
  @Type(() => WebsiteMetadata)
  metadata: WebsiteMetadataInterface;
}
