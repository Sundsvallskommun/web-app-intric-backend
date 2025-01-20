import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import validateEnv from '@utils/validateEnv';
import { AdminApiKeyController } from './controllers/admin/apikey.controller';
import { AdminAsisstantController } from './controllers/admin/assistant.controller';
import { AdminUserController } from './controllers/admin/user.controller';
import { AssistantController } from './controllers/assistant.controller';
import { AzureController } from './controllers/azure.controller';
import { GroupController } from './controllers/group.controller';
import { HealthController } from './controllers/health.controller';
import { InfoBlobController } from './controllers/info-blob.controller';
import { QueryController } from './controllers/query.controller';
import { AdminHostsController } from './controllers/admin/hosts.controller';

validateEnv();

const app = new App([
  AzureController,
  IndexController,
  HealthController,
  AssistantController,
  GroupController,
  InfoBlobController,
  QueryController,
  AdminAsisstantController,
  AdminUserController,
  AdminApiKeyController,
  AdminHostsController,
]);

app.listen();
