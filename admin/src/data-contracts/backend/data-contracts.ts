/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ApiKeyApiResponse {
  data: string;
  message: string;
}

export interface AssistantSetting {
  app: string;
  assistantId: string;
  apiKey: string;
}

export interface UpdateAssistantSetting {
  app: string;
  assistantId: string;
  apiKey?: string;
}

export interface AssistantSettingsApiResponse {
  data: AssistantSetting[];
  message: string;
}

export interface AssistantSettingApiResponse {
  data: AssistantSetting;
  message: string;
}

export interface User {
  name: string;
  username: string;
  isAdmin?: boolean;
  apiKey?: string;
}

export interface UserApiResponse {
  data: User;
  message: string;
}

export interface DatesAndId {
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface ModelId {
  id: string;
}

export interface ToolAssistant {
  id: string;
  handle: string;
}

export interface UseTools {
  assistants: ToolAssistant[];
}

export interface ModelKwargs {
  temperature?: number | null;
  top_p?: number | null;
}

export interface PaginatedDefaults {
  count: number;
}

export interface PaginatedPermissionsDefaults {
  permissions?: PaginatedPermissionsDefaultsPermissionsEnum[];
  count: number;
}

export interface SecurityClassificationPublic {
  name: string;
  description: string | null;
  security_level: number;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface WebSearchResultPublic {
  id: string;
  title: string;
  url: string;
}

export interface NewPrompt {
  text: string;
  description?: string | null;
}

export interface AssistantGuard {
  guardrail_active?: boolean;
  guardrail_string?: string;
  on_fail_message?: string;
}

export interface UpdateAssistantDto {
  name?: string | null;
  prompt?: NewPrompt;
  completion_model?: any;
  completion_model_kwargs?: ModelKwargs | null;
  groups?: ModelId[] | null;
  websites?: ModelId[] | null;
  logging_enabled?: boolean | null;
  space_id?: string | null;
  guardrail?: any;
  attachments?: ModelId[] | null;
  description?: string | null;
}

export interface FilePublic {
  name: string;
  mimetype: string;
  size: number;
  transcription?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface AcceptedFileType {
  mimetype: string;
  size_limit: number;
}

export interface Limit {
  max_files: number;
  max_size: number;
}

export interface FileRestrictions {
  accepted_file_types: AcceptedFileType[];
  limit: Limit;
}

export interface PaginatedResponseFilePublic {
  items: FilePublic[];
  count: number;
}

export interface EmbeddingModelPublic {
  name: string;
  family: EmbeddingModelPublicFamilyEnum;
  is_deprecated: boolean;
  open_source: boolean;
  dimensions?: number | null;
  max_input?: number | null;
  hf_link?: string | null;
  stability: EmbeddingModelPublicStabilityEnum;
  hosting: EmbeddingModelPublicHostingEnum;
  description?: string | null;
  org?: EmbeddingModelPublicOrgEnum;
  can_access: boolean;
  is_locked: boolean;
  is_org_enabled: boolean;
  security_classification?: SecurityClassificationPublic | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface TranscriptionModelPublic {
  id: string;
  name: string;
  nickname: string;
  family: TranscriptionModelPublicFamilyEnum;
  is_deprecated: boolean;
  stability: TranscriptionModelPublicStabilityEnum;
  hosting: TranscriptionModelPublicHostingEnum;
  open_source?: boolean | null;
  description?: string | null;
  hf_link?: string | null;
  org?: TranscriptionModelPublicOrgEnum;
  can_access?: boolean;
  is_locked?: boolean;
  is_org_enabled?: boolean;
  is_org_default?: boolean;
  security_classification?: SecurityClassificationPublic | null;
}

export interface EmbeddingModelPublicLegacy {
  name: string;
  family: EmbeddingModelPublicLegacyFamilyEnum;
  is_deprecated: boolean;
  open_source: boolean;
  dimensions?: number | null;
  max_input?: number | null;
  hf_link?: string | null;
  stability: EmbeddingModelPublicLegacyStabilityEnum;
  hosting: EmbeddingModelPublicLegacyHostingEnum;
  description?: string | null;
  org?: EmbeddingModelPublicLegacyOrgEnum;
  is_org_enabled?: boolean;
  can_access?: boolean;
  is_locked?: boolean;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface CompletionModelSparse {
  name: string;
  nickname: string;
  family: CompletionModelSparseFamilyEnum;
  token_limit: number;
  is_deprecated: boolean;
  nr_billion_parameters?: number | null;
  hf_link?: string | null;
  stability: CompletionModelSparseStabilityEnum;
  hosting: CompletionModelSparseHostingEnum;
  open_source?: boolean | null;
  description?: string | null;
  deployment_name?: string | null;
  org?: CompletionModelSparseOrgEnum;
  vision: boolean;
  reasoning: boolean;
  base_url?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface CompletionModel {
  is_org_enabled?: string;
  is_org_default?: boolean;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  nickname: string;
  family: CompletionModelFamilyEnum;
  token_limit: number;
  is_deprecated: boolean;
  nr_billion_parameters?: number | null;
  hf_link?: string | null;
  stability: CompletionModelStabilityEnum;
  hosting: CompletionModelHostingEnum;
  open_source?: boolean | null;
  description?: string | null;
  deployment_name?: string | null;
  org?: CompletionModelOrgEnum;
  vision: boolean;
  reasoning: boolean;
  base_url?: string | null;
}

export interface CompletionModelPublic {
  can_access?: boolean;
  is_locked?: boolean;
  security_classification?: SecurityClassificationPublic | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  nickname: string;
  family: CompletionModelPublicFamilyEnum;
  token_limit: number;
  is_deprecated: boolean;
  nr_billion_parameters?: number | null;
  hf_link?: string | null;
  stability: CompletionModelPublicStabilityEnum;
  hosting: CompletionModelPublicHostingEnum;
  open_source?: boolean | null;
  description?: string | null;
  deployment_name?: string | null;
  org?: CompletionModelPublicOrgEnum;
  vision: boolean;
  reasoning: boolean;
  base_url?: string | null;
  is_org_enabled?: string;
  is_org_default?: boolean;
}

export interface CollectionMetadata {
  num_info_blobs: number;
  size: number;
}

export interface CollectionPublic {
  permissions: CollectionPublicPermissionsEnum[];
  name: string;
  embedding_model: EmbeddingModelPublic;
  metadata: CollectionMetadata;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface PaginatedPermissionsCollectionPublic {
  items: CollectionPublic[];
  count: number;
  permissions?: PaginatedPermissionsCollectionPublicPermissionsEnum[];
}

export interface IntricWebsitesPresentationWebsiteModelsCrawlRunPublic {
  pages_crawled: number | null;
  files_downloaded: number | null;
  pages_failed: number | null;
  files_failed: number | null;
  status: IntricWebsitesPresentationWebsiteModelsCrawlRunPublicStatusEnum;
  result_location: string | null;
  finished_at: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface WebsiteMetadata {
  size: number;
}

export interface WebsitePublic {
  permissions: WebsitePublicPermissionsEnum[];
  name: string | null;
  url: string;
  space_id: string;
  download_files: boolean;
  crawl_type: WebsitePublicCrawlTypeEnum;
  update_interval: WebsitePublicUpdateIntervalEnum;
  latest_crawl: IntricWebsitesPresentationWebsiteModelsCrawlRunPublic | null;
  embedding_model: EmbeddingModelPublic;
  metadata: WebsiteMetadata;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface PaginatedPermissionsWebsitePublic {
  items: WebsitePublic[];
  count: number;
  permissions?: PaginatedPermissionsWebsitePublicPermissionsEnum[];
}

export interface RolePublic {
  name: string;
  permissions: RolePublicPermissionsEnum[];
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface UserGroupRead {
  name: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface UserSparse {
  email: string;
  username?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface UserPublic {
  quota_used?: number;
  truncated_api_key?: string | null;
  quota_limit?: number | null;
  roles: RolePublic[];
  predefined_roles: any[];
  user_groups: UserGroupRead[];
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  email: string;
  username?: string | null;
}

export interface PromptPublic {
  permissions: PromptPublicPermissionsEnum[];
  description?: string | null;
  is_selected?: boolean | null;
  user: UserSparse;
  text: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface IntegrationKnowledgeMetaData {
  size: number;
}

export interface IntegrationKnowledgePublic {
  name: string;
  url: string;
  tenant_id: string;
  space_id: string;
  user_integration_id: string;
  embedding_model: EmbeddingModelPublicLegacy;
  permissions?: IntegrationKnowledgePublicPermissionsEnum[];
  metadata: IntegrationKnowledgeMetaData;
  integration_type: IntegrationKnowledgePublicIntegrationTypeEnum;
  id: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface AssistantCommon {
  name: string;
  completion_model_kwargs: ModelKwargs;
  logging_enabled: boolean;
  permissions?: AssistantCommonPermissionsEnum[];
  published?: boolean;
  description?: string | null;
  metadata_json?: object | null;
  type: AssistantCommonTypeEnum;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface AssistantSparse {
  user_id: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  completion_model_kwargs: ModelKwargs;
  logging_enabled: boolean;
  permissions?: AssistantSparsePermissionsEnum[];
  published?: boolean;
  description?: string | null;
  metadata_json?: object | null;
  type: AssistantSparseTypeEnum;
}

export interface AssistantPublic {
  prompt?: PromptPublic | null;
  space_id: string;
  attachments: FilePublic[];
  allowed_attachments: FileRestrictions;
  groups: CollectionPublic[];
  websites: WebsitePublic[];
  integration_knowledge_list: IntegrationKnowledgePublic[];
  completion_model: CompletionModelSparse;
  user: UserSparse;
  tools: UseTools;
  insight_enabled: boolean;
  data_retention_days?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  name: string;
  completion_model_kwargs: ModelKwargs;
  logging_enabled: boolean;
  permissions?: AssistantPublicPermissionsEnum[];
  published?: boolean;
  description?: string | null;
  metadata_json?: object | null;
  type: AssistantPublicTypeEnum;
}

export interface PaginatedResponseAssistantPublic {
  items: AssistantPublic[];
  count: number;
}

export interface InfoBlobMetadata {
  url?: string | null;
  title?: string | null;
  embedding_model_id: string;
  size: number;
}

export interface InfoBlobPublicNoText {
  metadata: InfoBlobMetadata;
  group_id?: string | null;
  website_id?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface InfoBlobPublic {
  text: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  metadata: InfoBlobMetadata;
  group_id?: string | null;
  website_id?: string | null;
}

export interface PaginatedResponseInfoBlobPublicNoText {
  items: InfoBlobPublicNoText[];
  count: number;
}

export interface PaginatedResponseInfoBlobPublic {
  items: InfoBlobPublic[];
  count: number;
}

export interface JobPublic {
  name?: string | null;
  status: JobPublicStatusEnum;
  task: JobPublicTaskEnum;
  result_location?: string | null;
  finished_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface SessionMetadataPublic {
  name: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface CursorPaginatedResponseSessionMetadataPublic {
  items: SessionMetadataPublic[];
  limit?: number | null;
  next_cursor?: string | null;
  previous_cursor?: string | null;
  total_count: number;
  count: number;
}

export interface Message {
  created_at?: string | null;
  updated_at?: string | null;
  id?: string | null;
  question: string;
  answer: string;
  completion_model?: CompletionModel | null;
  references: InfoBlobPublicNoText[];
  files: FilePublic[];
  tools: UseTools[];
  generated_files: FilePublic[];
  web_search_references: WebSearchResultPublic[];
}

export interface SessionFeedback {
  value: SessionFeedbackValueEnum;
  text?: string | null;
}

export interface SessionPublic {
  name: string;
  messages: Message[];
  feedback?: SessionFeedback | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface TranslationDto {
  text: string[];
  sourcelanguage: string;
  targetlanguage: string;
}

export interface AzureToken {
  token: string;
  region: string;
}

export interface ApiResponseAzureToken {
  data: AzureToken;
  message: string;
}

export interface ApiResponseTranslation {
  data: string[];
  message: string;
}

export interface UpdateGroupDto {
  name: string;
}

export interface UpdateInfoBlobDto {
  metadata?: InfoBlobMetadata;
}

export interface UpdateInfoBlobsDto {
  info_blobs: UpdateInfoBlobDto[];
}

export interface HealthCheckStatus {
  status: string;
}

export interface InfoBlobAskAssistantPublic {
  metadata: InfoBlobMetadata;
  group_id?: string | null;
  website_id?: string | null;
  score: number;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface AskResponse {
  session_id: string;
  question: string;
  answer: string;
  files: FilePublic[];
  generated_files: FilePublic[];
  references: InfoBlobAskAssistantPublic[];
  tools: UseTools;
  web_search_references: WebSearchResultPublic[];
  model?: CompletionModelPublic | null;
}

export interface Host {
  id?: number;
  host: string;
}

export interface UpdateHost {
  host: string;
}

export interface HostsApiResponse {
  data: Host[];
  message: string;
}

export interface HostApiResponse {
  data: Host;
  message: string;
}

export interface AdditionalField {
  type: AdditionalFieldTypeEnum;
  value: object[];
}

export interface TemplateCreate {
  id: string;
  additional_fields: AdditionalField[] | null;
}

export interface CreateSpaceAssistantDto {
  name: string;
  from_template?: TemplateCreate | null;
}

export interface GroupChatSparse {
  permissions?: GroupChatSparsePermissionsEnum[];
  created_at: string;
  updated_at: string;
  name: string;
  id: string;
  user_id: string;
  published: boolean;
  type: string;
  metadata_json?: object | null;
}

export interface ServiceSparse {
  output_format?: ServiceSparseOutputFormatEnum;
  json_schema?: object | null;
  name: string;
  prompt: string;
  completion_model_kwargs?: ModelKwargs | null;
  permissions?: ServiceSparsePermissionsEnum[];
  user_id: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface AppSparse {
  permissions?: AppSparsePermissionsEnum[];
  name: string;
  description?: string | null;
  published: boolean;
  user_id: string;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface PaginatedPermissionsIntegrationKnowledgePublic {
  items: IntegrationKnowledgePublic[];
  count: number;
  permissions?: PaginatedPermissionsIntegrationKnowledgePublicPermissionsEnum[];
}

export interface Knowledge {
  groups: PaginatedPermissionsCollectionPublic;
  websites: PaginatedPermissionsWebsitePublic;
  integration_knowledge_list: PaginatedPermissionsIntegrationKnowledgePublic;
}

export interface SpaceSparse {
  permissions?: SpaceSparsePermissionsEnum[];
  name: string;
  description?: string | null;
  personal: boolean;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface PaginatedPermissionsAssistantSparse {
  items: AssistantSparse[];
  count: number;
  permissions?: PaginatedPermissionsAssistantSparsePermissionsEnum[];
}

export interface PaginatedPermissionsGroupChatSparse {
  items: GroupChatSparse[];
  count: number;
  permissions?: PaginatedPermissionsGroupChatSparsePermissionsEnum[];
}

export interface PaginatedPermissionsServiceSparse {
  items: ServiceSparse[];
  count: number;
  permissions?: PaginatedPermissionsServiceSparsePermissionsEnum[];
}

export interface PaginatedPermissionsAppSparse {
  items: AppSparse[];
  count: number;
  permissions?: PaginatedPermissionsAppSparsePermissionsEnum[];
}

export interface Applications {
  assistants: PaginatedPermissionsAssistantSparse;
  group_chats: PaginatedPermissionsGroupChatSparse;
  services: PaginatedPermissionsServiceSparse;
  apps: PaginatedPermissionsAppSparse;
}

export interface SpaceMember {
  email: string;
  username?: string | null;
  role: SpaceMemberRoleEnum;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
}

export interface PaginatedPermissionsSpaceMember {
  items: SpaceMember[];
  count: number;
  permissions?: PaginatedPermissionsSpaceMemberPermissionsEnum[];
}

export interface SpaceRole {
  value: SpaceRoleValueEnum;
  label: string;
}

export interface SpacePublic {
  applications: Applications;
  embedding_models: EmbeddingModelPublic[];
  completion_models: CompletionModelPublic[];
  transcription_models: TranscriptionModelPublic[];
  knowledge: Knowledge;
  members: PaginatedPermissionsSpaceMember;
  default_assistant: any;
  available_roles: SpaceRole[];
  security_classification: SecurityClassificationPublic | null;
  created_at?: string | null;
  updated_at?: string | null;
  id: string;
  permissions?: SpacePublicPermissionsEnum[];
  name: string;
  description?: string | null;
  personal: boolean;
}

export interface PaginatedResponseSpaceSparse {
  items: SpaceSparse[];
  count: number;
}

export interface PaginatedResponseSpacePublic {
  items: SpacePublic[];
  count: number;
}

export interface ConversationRequestDto {
  assistant_id?: string;
  group_chat_id?: string;
  session_id?: string;
  question: string;
  files?: ModelId[];
  stream?: boolean;
  use_tools?: UseTools | null;
  use_web_search?: boolean;
}

export enum PaginatedPermissionsDefaultsPermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum EmbeddingModelPublicFamilyEnum {
  Openai = 'openai',
  Mistral = 'mistral',
  Vllm = 'vllm',
  Claude = 'claude',
  Azure = 'azure',
  Ovhcloud = 'ovhcloud',
  E5 = 'e5',
}

export enum EmbeddingModelPublicStabilityEnum {
  Stable = 'stable',
  Experimental = 'experimental',
}

export enum EmbeddingModelPublicHostingEnum {
  Usa = 'usa',
  Eu = 'eu',
  Swe = 'swe',
}

export enum EmbeddingModelPublicOrgEnum {
  OpenAI = 'OpenAI',
  Meta = 'Meta',
  Microsoft = 'Microsoft',
  Anthropic = 'Anthropic',
  Mistral = 'Mistral',
  KBLab = 'KBLab',
  Google = 'Google',
}

export enum TranscriptionModelPublicFamilyEnum {
  Openai = 'openai',
  Mistral = 'mistral',
  Vllm = 'vllm',
  Claude = 'claude',
  Azure = 'azure',
  Ovhcloud = 'ovhcloud',
  E5 = 'e5',
}

export enum TranscriptionModelPublicStabilityEnum {
  Stable = 'stable',
  Experimental = 'experimental',
}

export enum TranscriptionModelPublicHostingEnum {
  Usa = 'usa',
  Eu = 'eu',
  Swe = 'swe',
}

export enum TranscriptionModelPublicOrgEnum {
  OpenAI = 'OpenAI',
  Meta = 'Meta',
  Microsoft = 'Microsoft',
  Anthropic = 'Anthropic',
  Mistral = 'Mistral',
  KBLab = 'KBLab',
  Google = 'Google',
}

export enum EmbeddingModelPublicLegacyFamilyEnum {
  Openai = 'openai',
  MiniLm = 'mini_lm',
  E5 = 'e5',
}

export enum EmbeddingModelPublicLegacyStabilityEnum {
  Stable = 'stable',
  Experimental = 'experimental',
}

export enum EmbeddingModelPublicLegacyHostingEnum {
  Usa = 'usa',
  Eu = 'eu',
  Swe = 'swe',
}

export enum EmbeddingModelPublicLegacyOrgEnum {
  OpenAI = 'OpenAI',
  Meta = 'Meta',
  Microsoft = 'Microsoft',
  Anthropic = 'Anthropic',
  Mistral = 'Mistral',
  KBLab = 'KBLab',
  Google = 'Google',
}

export enum CompletionModelSparseFamilyEnum {
  Openai = 'openai',
  Mistral = 'mistral',
  Vllm = 'vllm',
  Claude = 'claude',
  Azure = 'azure',
  Ovhcloud = 'ovhcloud',
  E5 = 'e5',
}

export enum CompletionModelSparseStabilityEnum {
  Stable = 'stable',
  Experimental = 'experimental',
}

export enum CompletionModelSparseHostingEnum {
  Usa = 'usa',
  Eu = 'eu',
  Swe = 'swe',
}

export enum CompletionModelSparseOrgEnum {
  OpenAI = 'OpenAI',
  Meta = 'Meta',
  Microsoft = 'Microsoft',
  Anthropic = 'Anthropic',
  Mistral = 'Mistral',
  KBLab = 'KBLab',
  Google = 'Google',
}

export enum CompletionModelFamilyEnum {
  Openai = 'openai',
  Mistral = 'mistral',
  Vllm = 'vllm',
  Claude = 'claude',
  Azure = 'azure',
  Ovhcloud = 'ovhcloud',
  E5 = 'e5',
}

export enum CompletionModelStabilityEnum {
  Stable = 'stable',
  Experimental = 'experimental',
}

export enum CompletionModelHostingEnum {
  Usa = 'usa',
  Eu = 'eu',
  Swe = 'swe',
}

export enum CompletionModelOrgEnum {
  OpenAI = 'OpenAI',
  Meta = 'Meta',
  Microsoft = 'Microsoft',
  Anthropic = 'Anthropic',
  Mistral = 'Mistral',
  KBLab = 'KBLab',
  Google = 'Google',
}

export enum CompletionModelPublicFamilyEnum {
  Openai = 'openai',
  Mistral = 'mistral',
  Vllm = 'vllm',
  Claude = 'claude',
  Azure = 'azure',
  Ovhcloud = 'ovhcloud',
  E5 = 'e5',
}

export enum CompletionModelPublicStabilityEnum {
  Stable = 'stable',
  Experimental = 'experimental',
}

export enum CompletionModelPublicHostingEnum {
  Usa = 'usa',
  Eu = 'eu',
  Swe = 'swe',
}

export enum CompletionModelPublicOrgEnum {
  OpenAI = 'OpenAI',
  Meta = 'Meta',
  Microsoft = 'Microsoft',
  Anthropic = 'Anthropic',
  Mistral = 'Mistral',
  KBLab = 'KBLab',
  Google = 'Google',
}

export enum CollectionPublicPermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum PaginatedPermissionsCollectionPublicPermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum IntricWebsitesPresentationWebsiteModelsCrawlRunPublicStatusEnum {
  InProgress = 'in progress',
  Queued = 'queued',
  Complete = 'complete',
  Failed = 'failed',
  NotFound = 'not found',
}

export enum WebsitePublicPermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum WebsitePublicCrawlTypeEnum {
  Crawl = 'crawl',
  Sitemap = 'sitemap',
}

export enum WebsitePublicUpdateIntervalEnum {
  Never = 'never',
  Weekly = 'weekly',
}

export enum PaginatedPermissionsWebsitePublicPermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum RolePublicPermissionsEnum {
  Assistants = 'assistants',
  GroupChats = 'group_chats',
  Apps = 'apps',
  Services = 'services',
  Collections = 'collections',
  Insights = 'insights',
  AI = 'AI',
  Editor = 'editor',
  Admin = 'admin',
  Websites = 'websites',
  IntegrationKnowledgeList = 'integration_knowledge_list',
}

export enum PromptPublicPermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum IntegrationKnowledgePublicPermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum IntegrationKnowledgePublicIntegrationTypeEnum {
  Confluence = 'confluence',
  Sharepoint = 'sharepoint',
}

export enum AssistantCommonPermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum AssistantCommonTypeEnum {
  Assistant = 'assistant',
  DefaultAssistant = 'default-assistant',
}

export enum AssistantSparsePermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum AssistantSparseTypeEnum {
  Assistant = 'assistant',
  DefaultAssistant = 'default-assistant',
}

export enum AssistantPublicPermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum AssistantPublicTypeEnum {
  Assistant = 'assistant',
  DefaultAssistant = 'default-assistant',
}

export enum JobPublicStatusEnum {
  InProgress = 'in progress',
  Queued = 'queued',
  Complete = 'complete',
  Failed = 'failed',
  NotFound = 'not found',
}

export enum JobPublicTaskEnum {
  UploadInfoBlob = 'upload_info_blob',
  Transcription = 'transcription',
  Crawl = 'crawl',
  EmbedGroup = 'embed_group',
  CrawlAllWebsites = 'crawl_all_websites',
  RunApp = 'run_app',
  PullConfluenceContent = 'pull_confluence_content',
  PullSharepointContent = 'pull_sharepoint_content',
}

export enum SessionFeedbackValueEnum {
  Value11 = 'Value11',
  Value1 = '-1',
  Value12 = 'Value1',
  Value13 = '1',
}

export enum AdditionalFieldTypeEnum {
  Attachments = 'attachments',
  Groups = 'groups',
}

export enum GroupChatSparsePermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum ServiceSparseOutputFormatEnum {
  Json = 'json',
  List = 'list',
  Boolean = 'boolean',
}

export enum ServiceSparsePermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum AppSparsePermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum PaginatedPermissionsIntegrationKnowledgePublicPermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum SpaceSparsePermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum PaginatedPermissionsAssistantSparsePermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum PaginatedPermissionsGroupChatSparsePermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum PaginatedPermissionsServiceSparsePermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum PaginatedPermissionsAppSparsePermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum SpaceMemberRoleEnum {
  Admin = 'admin',
  Editor = 'editor',
  Viewer = 'viewer',
}

export enum PaginatedPermissionsSpaceMemberPermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}

export enum SpaceRoleValueEnum {
  Admin = 'admin',
  Editor = 'editor',
  Viewer = 'viewer',
}

export enum SpacePublicPermissionsEnum {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  Add = 'add',
  Remove = 'remove',
  Publish = 'publish',
  InsightView = 'insight_view',
  InsightToggle = 'insight_toggle',
}
