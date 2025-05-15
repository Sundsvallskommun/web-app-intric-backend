import { PaginatedResponseSpaceSparse, SpacePublic } from '@/data-contracts/intric/data-contracts';

export interface PaginatedResponseSpacePublicInterface extends Omit<PaginatedResponseSpaceSparse, 'items'> {
  items: SpacePublic[];
}
