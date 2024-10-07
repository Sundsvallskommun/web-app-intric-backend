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

export interface CreateAssistantDto {
  name: string;
  prompt: string;
  completion_model: string;
  completion_model_kwargs?: object;
  groups?: any[];
}

export interface UpdateAssistantDto {
  name?: string;
  prompt?: string;
  completion_model?: string;
  completion_model_kwargs?: object;
  groups?: any[];
}

export interface CreateGroupDto {
  name: string;
  is_public?: boolean;
  embedding_model?: string;
}

export interface UpdateGroupDto {
  name: string;
  is_public?: boolean;
}

export interface InfoBlobMetadata {
  url: string;
  title: string;
}

export interface UpdateInfoBlobDto {
  text?: string;
  metadata?: InfoBlobMetadata;
}

export interface UpdateInfoBlobsDto {
  info_blobs: UpdateInfoBlobDto[];
}

export interface TranslationDto {
  text: any[];
  sourcelanguage: string;
  targetlanguage: string;
}

export interface Assistant {
  app: string;
  assistantId: string;
  apiKey: string;
}

export interface UpdateAssistant {
  app: string;
  assistantId: string;
  apiKey?: string;
}

export interface AssistantsApiResponse {
  data: Assistant[];
  message: string;
}

export interface AssistantApiResponse {
  data: Assistant;
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

export interface ApiKeyApiResponse {
  data: string;
  message: string;
}
