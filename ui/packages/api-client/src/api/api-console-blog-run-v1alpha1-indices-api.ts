/* tslint:disable */
/* eslint-disable */
/**
 * Blog Next API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { Configuration } from "../configuration";
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from "axios";
import globalAxios from "axios";
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from "../common";
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from "../base";
/**
 * ApiConsoleBlogRunV1alpha1IndicesApi - axios parameter creator
 * @export
 */
export const ApiConsoleBlogRunV1alpha1IndicesApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * Build or rebuild post indices for full text search
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    buildPostIndices: async (
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/apis/api.console.blog.run/v1alpha1/indices/post`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication BasicAuth required
      // http basic authentication required
      setBasicAuthToObject(localVarRequestOptions, configuration);

      // authentication BearerAuth required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * ApiConsoleBlogRunV1alpha1IndicesApi - functional programming interface
 * @export
 */
export const ApiConsoleBlogRunV1alpha1IndicesApiFp = function (
  configuration?: Configuration
) {
  const localVarAxiosParamCreator =
    ApiConsoleBlogRunV1alpha1IndicesApiAxiosParamCreator(configuration);
  return {
    /**
     * Build or rebuild post indices for full text search
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async buildPostIndices(
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.buildPostIndices(options);
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
  };
};

/**
 * ApiConsoleBlogRunV1alpha1IndicesApi - factory interface
 * @export
 */
export const ApiConsoleBlogRunV1alpha1IndicesApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = ApiConsoleBlogRunV1alpha1IndicesApiFp(configuration);
  return {
    /**
     * Build or rebuild post indices for full text search
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    buildPostIndices(options?: AxiosRequestConfig): AxiosPromise<void> {
      return localVarFp
        .buildPostIndices(options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * ApiConsoleBlogRunV1alpha1IndicesApi - object-oriented interface
 * @export
 * @class ApiConsoleBlogRunV1alpha1IndicesApi
 * @extends {BaseAPI}
 */
export class ApiConsoleBlogRunV1alpha1IndicesApi extends BaseAPI {
  /**
   * Build or rebuild post indices for full text search
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiConsoleBlogRunV1alpha1IndicesApi
   */
  public buildPostIndices(options?: AxiosRequestConfig) {
    return ApiConsoleBlogRunV1alpha1IndicesApiFp(this.configuration)
      .buildPostIndices(options)
      .then((request) => request(this.axios, this.basePath));
  }
}
