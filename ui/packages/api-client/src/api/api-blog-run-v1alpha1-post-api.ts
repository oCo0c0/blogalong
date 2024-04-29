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
// @ts-ignore
import { PostHits } from "../models";
/**
 * ApiBlogRunV1alpha1PostApi - axios parameter creator
 * @export
 */
export const ApiBlogRunV1alpha1PostApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * Search posts with fuzzy query
     * @param {string} keyword
     * @param {string} [highlightPostTag]
     * @param {string} [highlightPreTag]
     * @param {number} [limit]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    searchPost: async (
      keyword: string,
      highlightPostTag?: string,
      highlightPreTag?: string,
      limit?: number,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'keyword' is not null or undefined
      assertParamExists("searchPost", "keyword", keyword);
      const localVarPath = `/apis/api.blog.run/v1alpha1/indices/post`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
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

      if (highlightPostTag !== undefined) {
        localVarQueryParameter["highlightPostTag"] = highlightPostTag;
      }

      if (highlightPreTag !== undefined) {
        localVarQueryParameter["highlightPreTag"] = highlightPreTag;
      }

      if (keyword !== undefined) {
        localVarQueryParameter["keyword"] = keyword;
      }

      if (limit !== undefined) {
        localVarQueryParameter["limit"] = limit;
      }

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
 * ApiBlogRunV1alpha1PostApi - functional programming interface
 * @export
 */
export const ApiBlogRunV1alpha1PostApiFp = function (
  configuration?: Configuration
) {
  const localVarAxiosParamCreator =
    ApiBlogRunV1alpha1PostApiAxiosParamCreator(configuration);
  return {
    /**
     * Search posts with fuzzy query
     * @param {string} keyword
     * @param {string} [highlightPostTag]
     * @param {string} [highlightPreTag]
     * @param {number} [limit]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async searchPost(
      keyword: string,
      highlightPostTag?: string,
      highlightPreTag?: string,
      limit?: number,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<PostHits>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.searchPost(
        keyword,
        highlightPostTag,
        highlightPreTag,
        limit,
        options
      );
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
 * ApiBlogRunV1alpha1PostApi - factory interface
 * @export
 */
export const ApiBlogRunV1alpha1PostApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = ApiBlogRunV1alpha1PostApiFp(configuration);
  return {
    /**
     * Search posts with fuzzy query
     * @param {ApiBlogRunV1alpha1PostApiSearchPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    searchPost(
      requestParameters: ApiBlogRunV1alpha1PostApiSearchPostRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<PostHits> {
      return localVarFp
        .searchPost(
          requestParameters.keyword,
          requestParameters.highlightPostTag,
          requestParameters.highlightPreTag,
          requestParameters.limit,
          options
        )
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * Request parameters for searchPost operation in ApiBlogRunV1alpha1PostApi.
 * @export
 * @interface ApiBlogRunV1alpha1PostApiSearchPostRequest
 */
export interface ApiBlogRunV1alpha1PostApiSearchPostRequest {
  /**
   *
   * @type {string}
   * @memberof ApiBlogRunV1alpha1PostApiSearchPost
   */
  readonly keyword: string;

  /**
   *
   * @type {string}
   * @memberof ApiBlogRunV1alpha1PostApiSearchPost
   */
  readonly highlightPostTag?: string;

  /**
   *
   * @type {string}
   * @memberof ApiBlogRunV1alpha1PostApiSearchPost
   */
  readonly highlightPreTag?: string;

  /**
   *
   * @type {number}
   * @memberof ApiBlogRunV1alpha1PostApiSearchPost
   */
  readonly limit?: number;
}

/**
 * ApiBlogRunV1alpha1PostApi - object-oriented interface
 * @export
 * @class ApiBlogRunV1alpha1PostApi
 * @extends {BaseAPI}
 */
export class ApiBlogRunV1alpha1PostApi extends BaseAPI {
  /**
   * Search posts with fuzzy query
   * @param {ApiBlogRunV1alpha1PostApiSearchPostRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiBlogRunV1alpha1PostApi
   */
  public searchPost(
    requestParameters: ApiBlogRunV1alpha1PostApiSearchPostRequest,
    options?: AxiosRequestConfig
  ) {
    return ApiBlogRunV1alpha1PostApiFp(this.configuration)
      .searchPost(
        requestParameters.keyword,
        requestParameters.highlightPostTag,
        requestParameters.highlightPreTag,
        requestParameters.limit,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }
}
