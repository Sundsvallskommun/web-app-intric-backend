import { CollectionUpdate } from '@/data-contracts/intric/data-contracts';
import { IsString } from 'class-validator';

export class UpdateGroupDto implements CollectionUpdate {
  @IsString()
  name: string;
}
