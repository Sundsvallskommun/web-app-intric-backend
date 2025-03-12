import { PartialGroupUpdatePublic } from '@/data-contracts/intric/data-contracts';
import { IsString } from 'class-validator';

export class UpdateGroupDto implements PartialGroupUpdatePublic {
  @IsString()
  name: string;
}
