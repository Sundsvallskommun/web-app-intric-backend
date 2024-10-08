import { Api } from '@data-contracts/backend/Api';
import { Assistant } from '@data-contracts/backend/data-contracts';
import { Resource } from '@interfaces/resource';

export const apiService = new Api({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
});

const assistants: Resource<Assistant> = {
  name: 'assistants',
  getOne: apiService.adminAsisstantControllerGetOne,
  getMany: apiService.adminAsisstantControllerGetMany,
  create: apiService.adminAsisstantControllerCreate,
  update: apiService.adminAsisstantControllerUpdate,
  remove: apiService.adminAsisstantControllerDelete,
  defaultValues: {
    app: '',
    apiKey: '',
    assistantId: '',
  },
  requiredFields: ['app', 'apiKey', 'assistantId'],
};

const resources = { assistants };

export default resources;
