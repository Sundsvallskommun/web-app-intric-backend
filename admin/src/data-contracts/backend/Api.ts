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

import {
  ApiKeyApiResponse,
  ApiResponseAzureToken,
  ApiResponseTranslation,
  Applications,
  AskResponse,
  AssistantPublic,
  AssistantSetting,
  AssistantSettingApiResponse,
  AssistantSettingsApiResponse,
  CollectionPublic,
  ConversationRequestDto,
  CreateSpaceAssistantDto,
  CursorPaginatedResponseSessionMetadataPublic,
  FilePublic,
  HealthCheckStatus,
  HostApiResponse,
  HostsApiResponse,
  InfoBlobPublic,
  JobPublic,
  PaginatedResponseAssistantPublic,
  PaginatedResponseFilePublic,
  PaginatedResponseInfoBlobPublic,
  PaginatedResponseInfoBlobPublicNoText,
  PaginatedResponseSpacePublic,
  PaginatedResponseSpaceSparse,
  SessionFeedback,
  SessionPublic,
  SpacePublic,
  TranslationDto,
  UpdateAssistantDto,
  UpdateAssistantSetting,
  UpdateGroupDto,
  UpdateHost,
  UpdateInfoBlobDto,
  UpdateInfoBlobsDto,
  UserApiResponse,
  UserPublic,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Admin Api Key
   * @name AdminApiKeyControllerGetApiKey
   * @summary Get apikey for assistant
   * @request GET:/api/admin/apikey/{id}
   */
  adminApiKeyControllerGetApiKey = (id: string, params: RequestParams = {}) =>
    this.request<ApiKeyApiResponse, any>({
      path: `/api/admin/apikey/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Asisstant
   * @name AdminAsisstantControllerGetMany
   * @summary Get all assistant settings
   * @request GET:/api/admin/assistants
   */
  adminAsisstantControllerGetMany = (params: RequestParams = {}) =>
    this.request<AssistantSettingsApiResponse, any>({
      path: `/api/admin/assistants`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Asisstant
   * @name AdminAsisstantControllerCreate
   * @summary Create new assistant setting
   * @request POST:/api/admin/assistants
   */
  adminAsisstantControllerCreate = (data?: AssistantSetting, params: RequestParams = {}) =>
    this.request<AssistantSettingApiResponse, any>({
      path: `/api/admin/assistants`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Asisstant
   * @name AdminAsisstantControllerGetOne
   * @summary Get a single assistant setting
   * @request GET:/api/admin/assistants/{id}
   */
  adminAsisstantControllerGetOne = (id: number, params: RequestParams = {}) =>
    this.request<AssistantSettingApiResponse, any>({
      path: `/api/admin/assistants/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Asisstant
   * @name AdminAsisstantControllerUpdate
   * @summary Update assistant setting
   * @request PATCH:/api/admin/assistants/{id}
   */
  adminAsisstantControllerUpdate = (id: number, data?: UpdateAssistantSetting, params: RequestParams = {}) =>
    this.request<AssistantSettingApiResponse, any>({
      path: `/api/admin/assistants/${id}`,
      method: 'PATCH',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Asisstant
   * @name AdminAsisstantControllerDelete
   * @summary Delete assistant
   * @request DELETE:/api/admin/assistants/{id}
   */
  adminAsisstantControllerDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/admin/assistants/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin User
   * @name AdminUserControllerGetUser
   * @summary Return current user
   * @request GET:/api/admin/me
   */
  adminUserControllerGetUser = (params: RequestParams = {}) =>
    this.request<UserApiResponse, any>({
      path: `/api/admin/me`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin User
   * @name AdminUserControllerUpdateUser
   * @summary Update current user
   * @request PATCH:/api/admin/me
   */
  adminUserControllerUpdateUser = (data?: any, params: RequestParams = {}) =>
    this.request<UserApiResponse, any>({
      path: `/api/admin/me`,
      method: 'PATCH',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistant
   * @name AssistantControllerGetAssistants
   * @summary Get assitants from Intric
   * @request GET:/api/assistants
   */
  assistantControllerGetAssistants = (params: RequestParams = {}) =>
    this.request<PaginatedResponseAssistantPublic, any>({
      path: `/api/assistants`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistant
   * @name AssistantControllerBatchGetAssistantsById
   * @summary Batch get assitants from Intric
   * @request GET:/api/assistants/batch
   */
  assistantControllerBatchGetAssistantsById = (
    query: {
      id: object[];
    },
    params: RequestParams = {}
  ) =>
    this.request<PaginatedResponseAssistantPublic, any>({
      path: `/api/assistants/batch`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistant
   * @name AssistantControllerGetAssistantById
   * @summary Get assitant from Intric
   * @request GET:/api/assistants/{id}
   */
  assistantControllerGetAssistantById = (id: string, params: RequestParams = {}) =>
    this.request<AssistantPublic, any>({
      path: `/api/assistants/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistant
   * @name AssistantControllerUpdateAssistant
   * @summary Update Intric assistant
   * @request POST:/api/assistants/{id}
   */
  assistantControllerUpdateAssistant = (id: string, data?: UpdateAssistantDto, params: RequestParams = {}) =>
    this.request<AssistantPublic, any>({
      path: `/api/assistants/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistant
   * @name AssistantControllerDeleteAssistant
   * @summary Delete Intric assistant
   * @request DELETE:/api/assistants/{id}
   */
  assistantControllerDeleteAssistant = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/assistants/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistant
   * @name AssistantControllerGetAssistantSessions
   * @summary Get sessions from Intric assistant
   * @request GET:/api/assistants/{id}/sessions
   */
  assistantControllerGetAssistantSessions = (id: string, params: RequestParams = {}) =>
    this.request<CursorPaginatedResponseSessionMetadataPublic, any>({
      path: `/api/assistants/${id}/sessions`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistant
   * @name AssistantControllerGetAssistantSession
   * @summary Get session from Intric assistant
   * @request GET:/api/assistants/{id}/sessions/{session_id}
   */
  assistantControllerGetAssistantSession = (id: string, sessionId: string, params: RequestParams = {}) =>
    this.request<SessionPublic, any>({
      path: `/api/assistants/${id}/sessions/${sessionId}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Azure
   * @name AzureControllerGetAzureToken
   * @summary Get auth token for Azure Speech services
   * @request GET:/api/azure/login
   */
  azureControllerGetAzureToken = (params: RequestParams = {}) =>
    this.request<ApiResponseAzureToken, any>({
      path: `/api/azure/login`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Azure
   * @name AzureControllerTranslate
   * @summary Get translation of text
   * @request POST:/api/azure/translate
   */
  azureControllerTranslate = (data?: TranslationDto, params: RequestParams = {}) =>
    this.request<ApiResponseTranslation, any>({
      path: `/api/azure/translate`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Group
   * @name GroupControllerGetGroupById
   * @summary Get group
   * @request GET:/api/groups/{id}
   */
  groupControllerGetGroupById = (id: string, params: RequestParams = {}) =>
    this.request<CollectionPublic, any>({
      path: `/api/groups/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Group
   * @name GroupControllerUpdateGroup
   * @summary Update group
   * @request POST:/api/groups/{id}
   */
  groupControllerUpdateGroup = (id: string, data?: UpdateGroupDto, params: RequestParams = {}) =>
    this.request<CollectionPublic, any>({
      path: `/api/groups/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Group
   * @name GroupControllerDeleteGroup
   * @summary Delete group
   * @request DELETE:/api/groups/{id}
   */
  groupControllerDeleteGroup = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/groups/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags Group
   * @name GroupControllerGetGroupInfoblobs
   * @summary Get infoblobs for group
   * @request GET:/api/groups/{id}/info-blobs
   */
  groupControllerGetGroupInfoblobs = (id: string, params: RequestParams = {}) =>
    this.request<PaginatedResponseInfoBlobPublicNoText, any>({
      path: `/api/groups/${id}/info-blobs`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Group
   * @name GroupControllerAddGroupInfoblobs
   * @summary Add info blob to a group
   * @request POST:/api/groups/{id}/info-blobs
   */
  groupControllerAddGroupInfoblobs = (id: string, data?: UpdateInfoBlobsDto, params: RequestParams = {}) =>
    this.request<PaginatedResponseInfoBlobPublic, any>({
      path: `/api/groups/${id}/info-blobs`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Group
   * @name GroupControllerUploadFiles
   * @summary Upload a file to a group
   * @request POST:/api/groups/{id}/info-blobs/upload-files
   */
  groupControllerUploadFiles = (
    id: string,
    data: {
      files?: File[];
    },
    params: RequestParams = {}
  ) =>
    this.request<JobPublic, any>({
      path: `/api/groups/${id}/info-blobs/upload-files`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags Health
   * @name HealthControllerUp
   * @summary Return health check
   * @request GET:/api/health/up
   */
  healthControllerUp = (params: RequestParams = {}) =>
    this.request<HealthCheckStatus, any>({
      path: `/api/health/up`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Info Blob
   * @name InfoBlobControllerGetInfoblobs
   * @summary Get info blobs
   * @request GET:/api/info-blobs
   */
  infoBlobControllerGetInfoblobs = (params: RequestParams = {}) =>
    this.request<PaginatedResponseInfoBlobPublicNoText, any>({
      path: `/api/info-blobs`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Info Blob
   * @name InfoBlobControllerGetInfoblobById
   * @summary Get info blob by id
   * @request GET:/api/info-blobs/{id}
   */
  infoBlobControllerGetInfoblobById = (id: string, params: RequestParams = {}) =>
    this.request<InfoBlobPublic, any>({
      path: `/api/info-blobs/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Info Blob
   * @name InfoBlobControllerUpdateInfoblob
   * @summary Update info blob
   * @request POST:/api/info-blobs/{id}
   */
  infoBlobControllerUpdateInfoblob = (id: string, data?: UpdateInfoBlobDto, params: RequestParams = {}) =>
    this.request<InfoBlobPublic, any>({
      path: `/api/info-blobs/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Info Blob
   * @name InfoBlobControllerDeleteInfoblob
   * @summary Delete info blob
   * @request DELETE:/api/info-blobs/{id}
   */
  infoBlobControllerDeleteInfoblob = (id: string, params: RequestParams = {}) =>
    this.request<InfoBlobPublic, any>({
      path: `/api/info-blobs/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags Query
   * @name QueryControllerAskAssistant
   * @summary Ask question to assistant
   * @request POST:/api/assistants/{assistant_id}/sessions
   */
  queryControllerAskAssistant = (
    assistantId: string,
    query?: {
      stream?: boolean;
    },
    data?: any,
    params: RequestParams = {}
  ) =>
    this.request<AskResponse, any>({
      path: `/api/assistants/${assistantId}/sessions`,
      method: 'POST',
      query: query,
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Query
   * @name QueryControllerAskFollowup
   * @summary Ask follow up question to assistant
   * @request POST:/api/assistants/{assistant_id}/sessions/{session_id}
   */
  queryControllerAskFollowup = (
    assistantId: string,
    sessionId: string,
    query?: {
      stream?: boolean;
    },
    data?: any,
    params: RequestParams = {}
  ) =>
    this.request<AskResponse, any>({
      path: `/api/assistants/${assistantId}/sessions/${sessionId}`,
      method: 'POST',
      query: query,
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Query
   * @name QueryControllerGiveFeedback
   * @summary Leave feedback
   * @request POST:/api/assistants/{assistant_id}/sessions/{session_id}/feedback
   */
  queryControllerGiveFeedback = (
    assistantId: string,
    sessionId: string,
    data?: SessionFeedback,
    params: RequestParams = {}
  ) =>
    this.request<SessionFeedback, any>({
      path: `/api/assistants/${assistantId}/sessions/${sessionId}/feedback`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Hosts
   * @name AdminHostsControllerGetMany
   * @summary Get all hosts
   * @request GET:/api/admin/hosts
   */
  adminHostsControllerGetMany = (params: RequestParams = {}) =>
    this.request<HostsApiResponse, any>({
      path: `/api/admin/hosts`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Hosts
   * @name AdminHostsControllerCreate
   * @summary Creates a new host
   * @request POST:/api/admin/hosts
   */
  adminHostsControllerCreate = (data?: UpdateHost, params: RequestParams = {}) =>
    this.request<HostApiResponse, any>({
      path: `/api/admin/hosts`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Hosts
   * @name AdminHostsControllerGetOne
   * @summary Get a single host
   * @request GET:/api/admin/hosts/{id}
   */
  adminHostsControllerGetOne = (id: number, params: RequestParams = {}) =>
    this.request<HostApiResponse, any>({
      path: `/api/admin/hosts/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Hosts
   * @name AdminHostsControllerUpdate
   * @summary Updates a host
   * @request PATCH:/api/admin/hosts/{id}
   */
  adminHostsControllerUpdate = (id: number, data?: UpdateHost, params: RequestParams = {}) =>
    this.request<HostApiResponse, any>({
      path: `/api/admin/hosts/${id}`,
      method: 'PATCH',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Hosts
   * @name AdminHostsControllerDelete
   * @summary Deletes a host
   * @request DELETE:/api/admin/hosts/{id}
   */
  adminHostsControllerDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/admin/hosts/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * @description Get spaces available for you.
   *
   * @tags Space
   * @name SpaceControllerGetUserSpaces
   * @summary Get spaces
   * @request GET:/api/spaces
   */
  spaceControllerGetUserSpaces = (
    query?: {
      /** Include your personal space */
      personal?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<PaginatedResponseSpaceSparse, any>({
      path: `/api/spaces`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Space
   * @name SpaceControllerGetPersonalSpace
   * @summary Get personal space
   * @request GET:/api/spaces/personal
   */
  spaceControllerGetPersonalSpace = (params: RequestParams = {}) =>
    this.request<SpacePublic, any>({
      path: `/api/spaces/personal`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Space
   * @name SpaceControllerBatchGetSpaces
   * @summary Batch get spaces
   * @request GET:/api/spaces/batch
   */
  spaceControllerBatchGetSpaces = (
    query: {
      /** List of space ids */
      id: object[];
    },
    params: RequestParams = {}
  ) =>
    this.request<PaginatedResponseSpacePublic, any>({
      path: `/api/spaces/batch`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Space
   * @name SpaceControllerGetSingleSpace
   * @summary Get space
   * @request GET:/api/spaces/{id}
   */
  spaceControllerGetSingleSpace = (id: string, params: RequestParams = {}) =>
    this.request<SpacePublic, any>({
      path: `/api/spaces/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Space
   * @name SpaceControllerGetSingleSpaceApplications
   * @summary Get applications for space
   * @request GET:/api/spaces/{id}/applications
   */
  spaceControllerGetSingleSpaceApplications = (id: string, params: RequestParams = {}) =>
    this.request<Applications, any>({
      path: `/api/spaces/${id}/applications`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Space
   * @name SpaceControllerCreateSpaceAssistant
   * @summary Create assistant in space
   * @request POST:/api/spaces/{id}/applications/assistants
   */
  spaceControllerCreateSpaceAssistant = (id: string, data?: CreateSpaceAssistantDto, params: RequestParams = {}) =>
    this.request<AssistantPublic, any>({
      path: `/api/spaces/${id}/applications/assistants`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name UserControllerGetMe
   * @summary Get my user from Intric
   * @request GET:/api/users/me
   */
  userControllerGetMe = (params: RequestParams = {}) =>
    this.request<UserPublic, any>({
      path: `/api/users/me`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags File
   * @name FileControllerGetFiles
   * @summary Get files
   * @request GET:/api/files
   */
  fileControllerGetFiles = (params: RequestParams = {}) =>
    this.request<PaginatedResponseFilePublic, any>({
      path: `/api/files`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags File
   * @name FileControllerUploadFile
   * @summary Upload file
   * @request POST:/api/files
   */
  fileControllerUploadFile = (
    data?: {
      /** @format binary */
      upload_file: File;
    },
    params: RequestParams = {}
  ) =>
    this.request<FilePublic, any>({
      path: `/api/files`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags File
   * @name FileControllerGetFile
   * @summary Get file
   * @request GET:/api/files/{id}
   */
  fileControllerGetFile = (id: string, params: RequestParams = {}) =>
    this.request<FilePublic, any>({
      path: `/api/files/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags File
   * @name FileControllerDeleteFile
   * @summary Delete file
   * @request DELETE:/api/files/{id}
   */
  fileControllerDeleteFile = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/files/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * @description Provide either an assistant_id or a group_chat_id to start a new conversation with an assistant or group chat. Provide session_id to continue a conversation.
   *
   * @tags Conversation
   * @name ConversationControllerConversation
   * @summary Chat with an assistant or group chat
   * @request POST:/api/conversations
   */
  conversationControllerConversation = (data?: ConversationRequestDto, params: RequestParams = {}) =>
    this.request<AskResponse, any>({
      path: `/api/conversations`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Gets conversations (sessions) for an assistant or group chat. Provide either an assistant_id or a group_chat_id.
   *
   * @tags Conversation
   * @name ConversationControllerGetConversations
   * @summary List conversations
   * @request GET:/api/conversations
   */
  conversationControllerGetConversations = (
    query?: {
      assistant_id?: string;
      group_chat_id?: string;
      limit?: number;
      cursor?: string;
      previous?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<CursorPaginatedResponseSessionMetadataPublic, any>({
      path: `/api/conversations`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description Get a specific conversation (session) by its session id.
   *
   * @tags Conversation
   * @name ConversationControllerGetConversation
   * @summary Get conversation by session id
   * @request GET:/api/conversations/{session_id}
   */
  conversationControllerGetConversation = (sessionId: string, params: RequestParams = {}) =>
    this.request<SessionPublic, any>({
      path: `/api/conversations/${sessionId}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Conversation
   * @name ConversationControllerDeleteConversation
   * @summary Delete a conversation
   * @request DELETE:/api/conversations/{session_id}
   */
  conversationControllerDeleteConversation = (sessionId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/conversations/${sessionId}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags Conversation
   * @name ConversationControllerGiveFeedback
   * @summary Leave feedback for a conversation
   * @request POST:/api/conversations/{session_id}/feedback
   */
  conversationControllerGiveFeedback = (sessionId: string, data?: SessionFeedback, params: RequestParams = {}) =>
    this.request<SessionPublic, any>({
      path: `/api/conversations/${sessionId}/feedback`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Conversation
   * @name ConversationControllerSetTitle
   * @summary Set title for a conversation
   * @request POST:/api/conversations/{session_id}/title
   */
  conversationControllerSetTitle = (sessionId: string, params: RequestParams = {}) =>
    this.request<SessionPublic, any>({
      path: `/api/conversations/${sessionId}/title`,
      method: 'POST',
      ...params,
    });
}
