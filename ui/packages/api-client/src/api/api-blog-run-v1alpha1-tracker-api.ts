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
import { CounterRequest } from "../models";
// @ts-ignore
import { VoteRequest } from "../models";
/**
 * ApiBlogRunV1alpha1TrackerApi - axios parameter creator
 * @export
 */
export const ApiBlogRunV1alpha1TrackerApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * Count an extension resource visits.
     * @param {CounterRequest} counterRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    count: async (
      counterRequest: CounterRequest,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'counterRequest' is not null or undefined
      assertParamExists("count", "counterRequest", counterRequest);
      const localVarPath = `/apis/api.blog.run/v1alpha1/trackers/counter`;
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

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        counterRequest,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Downvote an extension resource.
     * @param {VoteRequest} voteRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    downvote: async (
      voteRequest: VoteRequest,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'voteRequest' is not null or undefined
      assertParamExists("downvote", "voteRequest", voteRequest);
      const localVarPath = `/apis/api.blog.run/v1alpha1/trackers/downvote`;
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

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        voteRequest,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Upvote an extension resource.
     * @param {VoteRequest} voteRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    upvote: async (
      voteRequest: VoteRequest,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'voteRequest' is not null or undefined
      assertParamExists("upvote", "voteRequest", voteRequest);
      const localVarPath = `/apis/api.blog.run/v1alpha1/trackers/upvote`;
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

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        voteRequest,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * ApiBlogRunV1alpha1TrackerApi - functional programming interface
 * @export
 */
export const ApiBlogRunV1alpha1TrackerApiFp = function (
  configuration?: Configuration
) {
  const localVarAxiosParamCreator =
    ApiBlogRunV1alpha1TrackerApiAxiosParamCreator(configuration);
  return {
    /**
     * Count an extension resource visits.
     * @param {CounterRequest} counterRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async count(
      counterRequest: CounterRequest,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.count(
        counterRequest,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Downvote an extension resource.
     * @param {VoteRequest} voteRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async downvote(
      voteRequest: VoteRequest,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.downvote(
        voteRequest,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Upvote an extension resource.
     * @param {VoteRequest} voteRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async upvote(
      voteRequest: VoteRequest,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.upvote(
        voteRequest,
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
 * ApiBlogRunV1alpha1TrackerApi - factory interface
 * @export
 */
export const ApiBlogRunV1alpha1TrackerApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = ApiBlogRunV1alpha1TrackerApiFp(configuration);
  return {
    /**
     * Count an extension resource visits.
     * @param {ApiBlogRunV1alpha1TrackerApiCountRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    count(
      requestParameters: ApiBlogRunV1alpha1TrackerApiCountRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<void> {
      return localVarFp
        .count(requestParameters.counterRequest, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Downvote an extension resource.
     * @param {ApiBlogRunV1alpha1TrackerApiDownvoteRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    downvote(
      requestParameters: ApiBlogRunV1alpha1TrackerApiDownvoteRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<void> {
      return localVarFp
        .downvote(requestParameters.voteRequest, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Upvote an extension resource.
     * @param {ApiBlogRunV1alpha1TrackerApiUpvoteRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    upvote(
      requestParameters: ApiBlogRunV1alpha1TrackerApiUpvoteRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<void> {
      return localVarFp
        .upvote(requestParameters.voteRequest, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * Request parameters for count operation in ApiBlogRunV1alpha1TrackerApi.
 * @export
 * @interface ApiBlogRunV1alpha1TrackerApiCountRequest
 */
export interface ApiBlogRunV1alpha1TrackerApiCountRequest {
  /**
   *
   * @type {CounterRequest}
   * @memberof ApiBlogRunV1alpha1TrackerApiCount
   */
  readonly counterRequest: CounterRequest;
}

/**
 * Request parameters for downvote operation in ApiBlogRunV1alpha1TrackerApi.
 * @export
 * @interface ApiBlogRunV1alpha1TrackerApiDownvoteRequest
 */
export interface ApiBlogRunV1alpha1TrackerApiDownvoteRequest {
  /**
   *
   * @type {VoteRequest}
   * @memberof ApiBlogRunV1alpha1TrackerApiDownvote
   */
  readonly voteRequest: VoteRequest;
}

/**
 * Request parameters for upvote operation in ApiBlogRunV1alpha1TrackerApi.
 * @export
 * @interface ApiBlogRunV1alpha1TrackerApiUpvoteRequest
 */
export interface ApiBlogRunV1alpha1TrackerApiUpvoteRequest {
  /**
   *
   * @type {VoteRequest}
   * @memberof ApiBlogRunV1alpha1TrackerApiUpvote
   */
  readonly voteRequest: VoteRequest;
}

/**
 * ApiBlogRunV1alpha1TrackerApi - object-oriented interface
 * @export
 * @class ApiBlogRunV1alpha1TrackerApi
 * @extends {BaseAPI}
 */
export class ApiBlogRunV1alpha1TrackerApi extends BaseAPI {
  /**
   * Count an extension resource visits.
   * @param {ApiBlogRunV1alpha1TrackerApiCountRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiBlogRunV1alpha1TrackerApi
   */
  public count(
    requestParameters: ApiBlogRunV1alpha1TrackerApiCountRequest,
    options?: AxiosRequestConfig
  ) {
    return ApiBlogRunV1alpha1TrackerApiFp(this.configuration)
      .count(requestParameters.counterRequest, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Downvote an extension resource.
   * @param {ApiBlogRunV1alpha1TrackerApiDownvoteRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiBlogRunV1alpha1TrackerApi
   */
  public downvote(
    requestParameters: ApiBlogRunV1alpha1TrackerApiDownvoteRequest,
    options?: AxiosRequestConfig
  ) {
    return ApiBlogRunV1alpha1TrackerApiFp(this.configuration)
      .downvote(requestParameters.voteRequest, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Upvote an extension resource.
   * @param {ApiBlogRunV1alpha1TrackerApiUpvoteRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiBlogRunV1alpha1TrackerApi
   */
  public upvote(
    requestParameters: ApiBlogRunV1alpha1TrackerApiUpvoteRequest,
    options?: AxiosRequestConfig
  ) {
    return ApiBlogRunV1alpha1TrackerApiFp(this.configuration)
      .upvote(requestParameters.voteRequest, options)
      .then((request) => request(this.axios, this.basePath));
  }
}