import { Api } from '@data-contracts/backend/Api';
import { AssistantSetting, Host } from '@data-contracts/backend/data-contracts';
import { Resource } from '@interfaces/resource';

export const apiService = new Api({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
});

const assistants: Resource<AssistantSetting> = {
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

const hosts: Resource<Host> = {
  name: 'hosts',
  getOne: apiService.adminHostsControllerGetOne,
  getMany: apiService.adminHostsControllerGetMany,
  create: apiService.adminHostsControllerCreate,
  update: apiService.adminHostsControllerUpdate,
  remove: apiService.adminHostsControllerDelete,
  defaultValues: {
    host: '',
  },
  requiredFields: ['host'],
};
const resources = { assistants, hosts };

export default resources;
