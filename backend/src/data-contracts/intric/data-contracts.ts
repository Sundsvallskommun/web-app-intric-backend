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

/** AccessToken */
export interface AccessToken {
  /** Access Token */
  access_token: string;
  /** Token Type */
  token_type: string;
}

/** Ask */
export interface Ask {
  /** Session Id */
  session_id?: number;
  /** Question */
  question: string;
  filter?: InfoBlobMetadataFilterPublic;
  /** Model */
  model?: string;
  /**
   * Model Kwargs
   * @default {}
   */
  model_kwargs?: object;
}

/** AskAssistant */
export interface AskAssistant {
  /** Question */
  question: string;
  /**
   * Stream
   * @default false
   */
  stream?: boolean;
}

/** AskResponse */
export interface AskResponse {
  /** Session Id */
  session_id: number;
  /** Answer */
  answer: string;
  /** References */
  references: InfoBlobPublic[];
  model: CompletionModel;
}

/** AssistantCreatePublic */
export interface AssistantCreatePublic {
  /** Name */
  name: string;
  /** Prompt */
  prompt: string;
  /** Completion Model */
  completion_model: string;
  /**
   * Completion Model Kwargs
   * @default {}
   */
  completion_model_kwargs?: object;
  /** Groups */
  groups?: GroupId[];
}

/** AssistantPublic */
export interface AssistantPublic {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Prompt */
  prompt: string;
  /** Completion Model */
  completion_model: string;
  /**
   * Completion Model Kwargs
   * @default {}
   */
  completion_model_kwargs?: object;
  /** Groups */
  groups: GroupPublic[];
}

/** AssistantUpsertPublic */
export interface AssistantUpsertPublic {
  /** Name */
  name?: string;
  /** Prompt */
  prompt?: string;
  /** Completion Model */
  completion_model?: string;
  /**
   * Completion Model Kwargs
   * @default {}
   */
  completion_model_kwargs?: object;
  /** Groups */
  groups?: GroupId[];
}

/** Body_Login_api_v1_users_login_token__post */
export interface BodyLoginApiV1UsersLoginTokenPost {
  /**
   * Grant Type
   * @pattern password
   */
  grant_type?: string;
  /** Username */
  username: string;
  /** Password */
  password: string;
  /**
   * Scope
   * @default ""
   */
  scope?: string;
  /** Client Id */
  client_id?: string;
  /** Client Secret */
  client_secret?: string;
}

/** Body_upload_files_api_v1_groups__id__info_blobs_upload_files__post */
export interface BodyUploadFilesApiV1GroupsIdInfoBlobsUploadFilesPost {
  /** Files */
  files: File[];
}

/** CompletionModel */
export interface CompletionModel {
  /** Name */
  name: string;
  /** Nickname */
  nickname: string;
  /** An enumeration. */
  family: InstorageAiModelsCompletionModelsLlmsModelFamily;
  /** Token Limit */
  token_limit: number;
  /** Selectable */
  selectable: boolean;
}

/** CreateGroupRequest */
export interface CreateGroupRequest {
  /** Name */
  name: string;
  /**
   * Is Public
   * @default false
   */
  is_public?: boolean;
  /** Embedding Model */
  embedding_model?: string;
}

/** DeleteResponse */
export interface DeleteResponse {
  /** Success */
  success: boolean;
}

/** EmbeddingModel */
export interface EmbeddingModel {
  /** Name */
  name: string;
  /** An enumeration. */
  family: InstorageAiModelsEmbeddingModelsEmbeddingModelsModelFamily;
  /** Open Source */
  open_source: boolean;
  /** Selectable */
  selectable: boolean;
}

/** GeneralError */
export interface GeneralError {
  /** Message */
  message: string;
}

/** GetModelsResponse */
export interface GetModelsResponse {
  /** Completion Models */
  completion_models: CompletionModel[];
  /** Embedding Models */
  embedding_models: EmbeddingModel[];
}

/** GroupId */
export interface GroupId {
  /**
   * Id
   * @format uuid
   */
  id: string;
}

/** GroupPublic */
export interface GroupPublic {
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Is Public */
  is_public: boolean;
  /** Embedding Model */
  embedding_model?: string;
}

/** GroupUpdatePublic */
export interface GroupUpdatePublic {
  /** Name */
  name?: string;
  /** Is Public */
  is_public?: boolean;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** InfoBlobMetaDataUpsertPublic */
export interface InfoBlobMetaDataUpsertPublic {
  /** Url */
  url?: string;
  /** Title */
  title?: string;
}

/** InfoBlobMetadata */
export interface InfoBlobMetadata {
  /** Url */
  url?: string;
  /** Title */
  title?: string;
  /** Embedding Model */
  embedding_model?: string;
}

/** InfoBlobMetadataFilterPublic */
export interface InfoBlobMetadataFilterPublic {
  /** Group Ids */
  group_ids?: string[];
  /** Title */
  title?: string;
}

/** InfoBlobPublic */
export interface InfoBlobPublic {
  /** Id */
  id: string;
  /** Text */
  text?: string;
  metadata: InfoBlobMetadata;
  /**
   * Group Id
   * @format uuid
   */
  group_id?: string;
}

/** InfoBlobUpsertPublic */
export interface InfoBlobUpsertPublic {
  /** Text */
  text?: string;
  metadata?: InfoBlobMetaDataUpsertPublic;
}

/** InfoBlobUpsertRequest */
export interface InfoBlobUpsertRequest {
  /** Info Blobs */
  info_blobs: InfoBlobUpsertPublic[];
}

/** PaginatedResponse[AssistantPublic] */
export interface PaginatedResponseAssistantPublic {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: AssistantPublic[];
}

/** PaginatedResponse[GroupPublic] */
export interface PaginatedResponseGroupPublic {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: GroupPublic[];
}

/** PaginatedResponse[InfoBlobPublic] */
export interface PaginatedResponseInfoBlobPublic {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: InfoBlobPublic[];
}

/** PaginatedResponse[ServicePublic] */
export interface PaginatedResponseServicePublic {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: ServicePublic[];
}

/** PaginatedResponse[ServiceRun] */
export interface PaginatedResponseServiceRun {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: ServiceRun[];
}

/** PaginatedResponse[SessionPublic] */
export interface PaginatedResponseSessionPublic {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: SessionPublic[];
}

/** PaginatedResponse[TenantInDB] */
export interface PaginatedResponseTenantInDB {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: TenantInDB[];
}

/** PaginatedResponse[UserInDB] */
export interface PaginatedResponseUserInDB {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: UserInDB[];
}

/** QuestionPublic */
export interface QuestionPublic {
  /** Question */
  question: string;
  /** Answer */
  answer: string;
  completion_model?: CompletionModel;
  /** References */
  references: InfoBlobPublic[];
}

/** RunService */
export interface RunService {
  /** Input */
  input: string;
}

/** ServiceCreatePublic */
export interface ServiceCreatePublic {
  /** Name */
  name: string;
  /** Prompt */
  prompt: string;
  /** Completion Model */
  completion_model: string;
  /**
   * Completion Model Kwargs
   * @default {}
   */
  completion_model_kwargs?: object;
  /** Groups */
  groups?: GroupId[];
  /** Output Format */
  output_format?: ServiceCreatePublicOutputFormatEnum;
  /** Json Schema */
  json_schema?: object;
}

/** ServiceOutput */
export interface ServiceOutput {
  /** Output */
  output: object | any[] | string;
}

/** ServicePublic */
export interface ServicePublic {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Prompt */
  prompt: string;
  /** Completion Model */
  completion_model: string;
  /**
   * Completion Model Kwargs
   * @default {}
   */
  completion_model_kwargs?: object;
  /** Groups */
  groups: GroupPublic[];
  /** Output Format */
  output_format?: ServicePublicOutputFormatEnum;
  /** Json Schema */
  json_schema?: object;
}

/** ServiceRun */
export interface ServiceRun {
  /** Input */
  input: string;
  /** Output */
  output: object | any[] | string;
  completion_model: CompletionModel;
  /** References */
  references: InfoBlobPublic[];
}

/** ServiceUpsertPublic */
export interface ServiceUpsertPublic {
  /** Name */
  name?: string;
  /** Prompt */
  prompt?: string;
  /** Completion Model */
  completion_model?: string;
  /**
   * Completion Model Kwargs
   * @default {}
   */
  completion_model_kwargs?: object;
  /** Groups */
  groups?: GroupId[];
  /** Output Format */
  output_format?: ServiceUpsertPublicOutputFormatEnum;
  /** Json Schema */
  json_schema?: object;
}

/** SessionIds */
export interface SessionIds {
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Name */
  name: string;
  /** Id */
  id: number;
}

/** SessionPublic */
export interface SessionPublic {
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Name */
  name: string;
  /** Id */
  id: number;
  /** Messages */
  messages?: QuestionPublic[];
}

/** SessionResponse */
export interface SessionResponse {
  /** Sessions */
  sessions: SessionIds[];
}

/** SessionUpdateRequest */
export interface SessionUpdateRequest {
  /** Name */
  name: string;
  /** Id */
  id: number;
}

/** SettingsPublic */
export interface SettingsPublic {
  /** Chat Model */
  chat_model?: string;
  /** Chat Model Prompt */
  chat_model_prompt?: string;
  /** Embedding Model */
  embedding_model?: string;
  /** Chatbot Widget */
  chatbot_widget?: object;
}

/** TenantBase */
export interface TenantBase {
  /** Name */
  name: string;
  /**
   * Default Embedding Model
   * @default "text-embedding-ada-002"
   */
  default_embedding_model?: string;
}

/** TenantInDB */
export interface TenantInDB {
  /** Id */
  id: number;
  /**
   * Uuid
   * @format uuid
   */
  uuid: string;
  /** Name */
  name: string;
  /**
   * Default Embedding Model
   * @default "text-embedding-ada-002"
   */
  default_embedding_model?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
}

/**
 * UserAddPublic
 * Leaving off password and salt from base model
 */
export interface UserAddPublic {
  /**
   * Email
   * @format email
   */
  email: string;
  /** Username */
  username: string;
  /**
   * Password
   * @minLength 7
   * @maxLength 100
   */
  password: string;
  /**
   * Tenant
   * Company name or organization
   */
  tenant: string;
  /**
   * Is Superuser
   * @default false
   */
  is_superuser?: boolean;
  /**
   * Quota Size
   * Size in bytes
   */
  quota_size?: number;
}

/**
 * UserCreated
 * Add in created_at, updated_at
 */
export interface UserCreated {
  /**
   * Email
   * @format email
   */
  email: string;
  /** Username */
  username: string;
  /** Id */
  id?: number;
  /**
   * Password
   * @minLength 7
   * @maxLength 100
   */
  password: string;
  /** Salt */
  salt: string;
  /**
   * Used Tokens
   * @default 0
   */
  used_tokens?: number;
  /**
   * Email Verified
   * @default false
   */
  email_verified?: boolean;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  /**
   * Is Superuser
   * @default false
   */
  is_superuser?: boolean;
  /** Api Key */
  api_key?: string;
  /** Tenant Id */
  tenant_id?: number;
  /** Quota Size */
  quota_size?: number;
  /**
   * Quota Used
   * @default 0
   */
  quota_used?: number;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  access_token?: AccessToken;
}

/**
 * UserInDB
 * Add in created_at, updated_at
 */
export interface UserInDB {
  /**
   * Email
   * @format email
   */
  email: string;
  /** Username */
  username: string;
  /** Id */
  id?: number;
  /**
   * Password
   * @minLength 7
   * @maxLength 100
   */
  password: string;
  /** Salt */
  salt: string;
  /**
   * Used Tokens
   * @default 0
   */
  used_tokens?: number;
  /**
   * Email Verified
   * @default false
   */
  email_verified?: boolean;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  /**
   * Is Superuser
   * @default false
   */
  is_superuser?: boolean;
  /** Api Key */
  api_key?: string;
  /** Tenant Id */
  tenant_id?: number;
  /** Quota Size */
  quota_size?: number;
  /**
   * Quota Used
   * @default 0
   */
  quota_used?: number;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
}

/**
 * UserPublicNoAccessToken
 * Leaving off password and salt from base model
 */
export interface UserPublicNoAccessToken {
  /**
   * Email
   * @format email
   */
  email: string;
  /** Username */
  username: string;
  /** Api Key */
  api_key: string;
}

/**
 * UserUpdatePublic
 * Leaving off password and salt from base model
 */
export interface UserUpdatePublic {
  /**
   * Email
   * @format email
   */
  email?: string;
  /** Username */
  username?: string;
  /**
   * Password
   * @minLength 7
   * @maxLength 100
   */
  password?: string;
  /** Quota Size */
  quota_size?: number;
  /** Is Superuser */
  is_superuser?: boolean;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

/**
 * ModelFamily
 * An enumeration.
 */
export enum InstorageAiModelsCompletionModelsLlmsModelFamily {
  Openai = 'openai',
  GptSw3 = 'gpt-sw3',
  Llama = 'llama',
  AlpacaTunedTgiHosted = 'alpaca-tuned-tgi-hosted',
}

/**
 * ModelFamily
 * An enumeration.
 */
export enum InstorageAiModelsEmbeddingModelsEmbeddingModelsModelFamily {
  Openai = 'openai',
  MiniLm = 'mini_lm',
  E5 = 'e5',
}

/** Output Format */
export enum ServiceCreatePublicOutputFormatEnum {
  Json = 'json',
  List = 'list',
}

/** Output Format */
export enum ServicePublicOutputFormatEnum {
  Json = 'json',
  List = 'list',
}

/** Output Format */
export enum ServiceUpsertPublicOutputFormatEnum {
  Json = 'json',
  List = 'list',
}
