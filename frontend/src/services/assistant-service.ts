import { PaginatedResponseAssistantPublic } from 'src/data-contracts/intric/data-contracts';
import { apiService } from './api-service';

export interface AskResponse {
  session_id: number;
  answer: string;
  references: any;
  model: any;
}

export const getAssistants = async () => {
  const res = await apiService.get<PaginatedResponseAssistantPublic>('assistants');
  return res.data.items;
};
