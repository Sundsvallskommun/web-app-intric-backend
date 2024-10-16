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
  Assistant,
  AssistantApiResponse,
  AssistantsApiResponse,
  CreateAssistantDto,
  CreateGroupDto,
  TranslationDto,
  UpdateAssistant,
  UpdateAssistantDto,
  UpdateGroupDto,
  UpdateInfoBlobDto,
  UpdateInfoBlobsDto,
  UserApiResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Health
   * @name HealthControllerUp
   * @summary Return health check
   * @request GET:/api/health/up
   */
  healthControllerUp = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/health/up`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistant
   * @name AssistantControllerGetAssistants
   * @summary Get assistants
   * @request GET:/api/assistants
   */
  assistantControllerGetAssistants = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/assistants`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistant
   * @name AssistantControllerCreateAssistant
   * @summary Create assistant
   * @request POST:/api/assistants
   */
  assistantControllerCreateAssistant = (data?: CreateAssistantDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/assistants`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistant
   * @name AssistantControllerGetAssistantById
   * @summary Get assistant by id
   * @request GET:/api/assistants/{id}
   */
  assistantControllerGetAssistantById = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/assistants/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistant
   * @name AssistantControllerUpdateAssistant
   * @summary Update assistant
   * @request POST:/api/assistants/{id}
   */
  assistantControllerUpdateAssistant = (id: string, data?: UpdateAssistantDto, params: RequestParams = {}) =>
    this.request<void, any>({
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
   * @summary Delete assistant
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
   * @summary Get assistant sessions
   * @request GET:/api/assistants/{id}/sessions
   */
  assistantControllerGetAssistantSessions = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/assistants/${id}/sessions`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Assistant
   * @name AssistantControllerGetAssistantSession
   * @summary Get assistant session
   * @request GET:/api/assistants/{id}/sessions/{session_id}
   */
  assistantControllerGetAssistantSession = (id: string, sessionId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/assistants/${id}/sessions/${sessionId}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Group
   * @name GroupControllerGetUserGroups
   * @summary Get user groups
   * @request GET:/api/groups
   */
  groupControllerGetUserGroups = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/groups`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Group
   * @name GroupControllerCreateGroup
   * @summary Create group
   * @request POST:/api/groups
   */
  groupControllerCreateGroup = (data?: CreateGroupDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/groups`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Group
   * @name GroupControllerGetPublicGroups
   * @summary Get public groups
   * @request GET:/api/groups/public
   */
  groupControllerGetPublicGroups = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/groups/public`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Group
   * @name GroupControllerGetGroupById
   * @summary Get group by id
   * @request GET:/api/groups/{id}
   */
  groupControllerGetGroupById = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
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
    this.request<void, any>({
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
   * @summary Get group infoblobs
   * @request GET:/api/groups/{id}/info-blobs
   */
  groupControllerGetGroupInfoblobs = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
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
    this.request<void, any>({
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
  groupControllerUploadFiles = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/groups/${id}/info-blobs/upload-files`,
      method: 'POST',
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
    this.request<void, any>({
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
    this.request<void, any>({
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
    this.request<void, any>({
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
    this.request<void, any>({
      path: `/api/info-blobs/${id}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags Query
   * @name QueryControllerAskAssistant
   * @summary Ask assistant
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
    this.request<void, any>({
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
   * @summary Ask followup
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
    this.request<void, any>({
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
   * @summary Give feedback
   * @request POST:/api/assistants/{assistant_id}/sessions/{session_id}/feedback
   */
  queryControllerGiveFeedback = (assistantId: string, sessionId: string, data?: any, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/assistants/${assistantId}/sessions/${sessionId}/feedback`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
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
    this.request<void, any>({
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
    this.request<void, any>({
      path: `/api/azure/translate`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Asisstant
   * @name AdminAsisstantControllerGetMany
   * @summary Get all assistants
   * @request GET:/api/admin/assistants
   */
  adminAsisstantControllerGetMany = (params: RequestParams = {}) =>
    this.request<AssistantsApiResponse, any>({
      path: `/api/admin/assistants`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Asisstant
   * @name AdminAsisstantControllerCreate
   * @summary Creates a new assistant
   * @request POST:/api/admin/assistants
   */
  adminAsisstantControllerCreate = (data?: Assistant, params: RequestParams = {}) =>
    this.request<AssistantApiResponse, any>({
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
   * @summary Get a single assistant
   * @request GET:/api/admin/assistants/{id}
   */
  adminAsisstantControllerGetOne = (id: number, params: RequestParams = {}) =>
    this.request<AssistantApiResponse, any>({
      path: `/api/admin/assistants/${id}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Asisstant
   * @name AdminAsisstantControllerUpdate
   * @summary Updates an assistant
   * @request PATCH:/api/admin/assistants/{id}
   */
  adminAsisstantControllerUpdate = (id: number, data?: UpdateAssistant, params: RequestParams = {}) =>
    this.request<AssistantApiResponse, any>({
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
   * @summary Deletes an assistant
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
}
