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
import { Reason } from "../models";
// @ts-ignore
import { ReasonList } from "../models";
/**
 * NotificationBlogRunV1alpha1ReasonApi - axios parameter creator
 * @export
 */
export const NotificationBlogRunV1alpha1ReasonApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * Create notification.blog.run/v1alpha1/Reason
     * @param {Reason} [reason] Fresh reason
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createnotificationBlogRunV1alpha1Reason: async (
      reason?: Reason,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/apis/notification.blog.run/v1alpha1/reasons`;
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
        reason,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Delete notification.blog.run/v1alpha1/Reason
     * @param {string} name Name of reason
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deletenotificationBlogRunV1alpha1Reason: async (
      name: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'name' is not null or undefined
      assertParamExists(
        "deletenotificationBlogRunV1alpha1Reason",
        "name",
        name
      );
      const localVarPath =
        `/apis/notification.blog.run/v1alpha1/reasons/{name}`.replace(
          `{${"name"}}`,
          encodeURIComponent(String(name))
        );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "DELETE",
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
    /**
     * Get notification.blog.run/v1alpha1/Reason
     * @param {string} name Name of reason
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getnotificationBlogRunV1alpha1Reason: async (
      name: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'name' is not null or undefined
      assertParamExists("getnotificationBlogRunV1alpha1Reason", "name", name);
      const localVarPath =
        `/apis/notification.blog.run/v1alpha1/reasons/{name}`.replace(
          `{${"name"}}`,
          encodeURIComponent(String(name))
        );
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
    /**
     * List notification.blog.run/v1alpha1/Reason
     * @param {Array<string>} [fieldSelector] Field selector for filtering.
     * @param {Array<string>} [labelSelector] Label selector for filtering.
     * @param {number} [page] The page number. Zero indicates no page.
     * @param {number} [size] Size of one page. Zero indicates no limit.
     * @param {Array<string>} [sort] Sort property and direction of the list result. Support sorting based on attribute name path.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listnotificationBlogRunV1alpha1Reason: async (
      fieldSelector?: Array<string>,
      labelSelector?: Array<string>,
      page?: number,
      size?: number,
      sort?: Array<string>,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/apis/notification.blog.run/v1alpha1/reasons`;
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

      if (fieldSelector) {
        localVarQueryParameter["fieldSelector"] = fieldSelector;
      }

      if (labelSelector) {
        localVarQueryParameter["labelSelector"] = labelSelector;
      }

      if (page !== undefined) {
        localVarQueryParameter["page"] = page;
      }

      if (size !== undefined) {
        localVarQueryParameter["size"] = size;
      }

      if (sort) {
        localVarQueryParameter["sort"] = Array.from(sort);
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
    /**
     * Update notification.blog.run/v1alpha1/Reason
     * @param {string} name Name of reason
     * @param {Reason} [reason] Updated reason
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updatenotificationBlogRunV1alpha1Reason: async (
      name: string,
      reason?: Reason,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'name' is not null or undefined
      assertParamExists(
        "updatenotificationBlogRunV1alpha1Reason",
        "name",
        name
      );
      const localVarPath =
        `/apis/notification.blog.run/v1alpha1/reasons/{name}`.replace(
          `{${"name"}}`,
          encodeURIComponent(String(name))
        );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "PUT",
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
        reason,
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
 * NotificationBlogRunV1alpha1ReasonApi - functional programming interface
 * @export
 */
export const NotificationBlogRunV1alpha1ReasonApiFp = function (
  configuration?: Configuration
) {
  const localVarAxiosParamCreator =
    NotificationBlogRunV1alpha1ReasonApiAxiosParamCreator(configuration);
  return {
    /**
     * Create notification.blog.run/v1alpha1/Reason
     * @param {Reason} [reason] Fresh reason
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createnotificationBlogRunV1alpha1Reason(
      reason?: Reason,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Reason>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createnotificationBlogRunV1alpha1Reason(
          reason,
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
     * Delete notification.blog.run/v1alpha1/Reason
     * @param {string} name Name of reason
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deletenotificationBlogRunV1alpha1Reason(
      name: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.deletenotificationBlogRunV1alpha1Reason(
          name,
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
     * Get notification.blog.run/v1alpha1/Reason
     * @param {string} name Name of reason
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getnotificationBlogRunV1alpha1Reason(
      name: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Reason>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.getnotificationBlogRunV1alpha1Reason(
          name,
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
     * List notification.blog.run/v1alpha1/Reason
     * @param {Array<string>} [fieldSelector] Field selector for filtering.
     * @param {Array<string>} [labelSelector] Label selector for filtering.
     * @param {number} [page] The page number. Zero indicates no page.
     * @param {number} [size] Size of one page. Zero indicates no limit.
     * @param {Array<string>} [sort] Sort property and direction of the list result. Support sorting based on attribute name path.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listnotificationBlogRunV1alpha1Reason(
      fieldSelector?: Array<string>,
      labelSelector?: Array<string>,
      page?: number,
      size?: number,
      sort?: Array<string>,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<ReasonList>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.listnotificationBlogRunV1alpha1Reason(
          fieldSelector,
          labelSelector,
          page,
          size,
          sort,
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
     * Update notification.blog.run/v1alpha1/Reason
     * @param {string} name Name of reason
     * @param {Reason} [reason] Updated reason
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updatenotificationBlogRunV1alpha1Reason(
      name: string,
      reason?: Reason,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Reason>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.updatenotificationBlogRunV1alpha1Reason(
          name,
          reason,
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
 * NotificationBlogRunV1alpha1ReasonApi - factory interface
 * @export
 */
export const NotificationBlogRunV1alpha1ReasonApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = NotificationBlogRunV1alpha1ReasonApiFp(configuration);
  return {
    /**
     * Create notification.blog.run/v1alpha1/Reason
     * @param {NotificationBlogRunV1alpha1ReasonApiCreatenotificationBlogRunV1alpha1ReasonRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createnotificationBlogRunV1alpha1Reason(
      requestParameters: NotificationBlogRunV1alpha1ReasonApiCreatenotificationBlogRunV1alpha1ReasonRequest = {},
      options?: AxiosRequestConfig
    ): AxiosPromise<Reason> {
      return localVarFp
        .createnotificationBlogRunV1alpha1Reason(
          requestParameters.reason,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Delete notification.blog.run/v1alpha1/Reason
     * @param {NotificationBlogRunV1alpha1ReasonApiDeletenotificationBlogRunV1alpha1ReasonRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deletenotificationBlogRunV1alpha1Reason(
      requestParameters: NotificationBlogRunV1alpha1ReasonApiDeletenotificationBlogRunV1alpha1ReasonRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<void> {
      return localVarFp
        .deletenotificationBlogRunV1alpha1Reason(
          requestParameters.name,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Get notification.blog.run/v1alpha1/Reason
     * @param {NotificationBlogRunV1alpha1ReasonApiGetnotificationBlogRunV1alpha1ReasonRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getnotificationBlogRunV1alpha1Reason(
      requestParameters: NotificationBlogRunV1alpha1ReasonApiGetnotificationBlogRunV1alpha1ReasonRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Reason> {
      return localVarFp
        .getnotificationBlogRunV1alpha1Reason(requestParameters.name, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * List notification.blog.run/v1alpha1/Reason
     * @param {NotificationBlogRunV1alpha1ReasonApiListnotificationBlogRunV1alpha1ReasonRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listnotificationBlogRunV1alpha1Reason(
      requestParameters: NotificationBlogRunV1alpha1ReasonApiListnotificationBlogRunV1alpha1ReasonRequest = {},
      options?: AxiosRequestConfig
    ): AxiosPromise<ReasonList> {
      return localVarFp
        .listnotificationBlogRunV1alpha1Reason(
          requestParameters.fieldSelector,
          requestParameters.labelSelector,
          requestParameters.page,
          requestParameters.size,
          requestParameters.sort,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Update notification.blog.run/v1alpha1/Reason
     * @param {NotificationBlogRunV1alpha1ReasonApiUpdatenotificationBlogRunV1alpha1ReasonRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updatenotificationBlogRunV1alpha1Reason(
      requestParameters: NotificationBlogRunV1alpha1ReasonApiUpdatenotificationBlogRunV1alpha1ReasonRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Reason> {
      return localVarFp
        .updatenotificationBlogRunV1alpha1Reason(
          requestParameters.name,
          requestParameters.reason,
          options
        )
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * Request parameters for createnotificationBlogRunV1alpha1Reason operation in NotificationBlogRunV1alpha1ReasonApi.
 * @export
 * @interface NotificationBlogRunV1alpha1ReasonApiCreatenotificationBlogRunV1alpha1ReasonRequest
 */
export interface NotificationBlogRunV1alpha1ReasonApiCreatenotificationBlogRunV1alpha1ReasonRequest {
  /**
   * Fresh reason
   * @type {Reason}
   * @memberof NotificationBlogRunV1alpha1ReasonApiCreatenotificationBlogRunV1alpha1Reason
   */
  readonly reason?: Reason;
}

/**
 * Request parameters for deletenotificationBlogRunV1alpha1Reason operation in NotificationBlogRunV1alpha1ReasonApi.
 * @export
 * @interface NotificationBlogRunV1alpha1ReasonApiDeletenotificationBlogRunV1alpha1ReasonRequest
 */
export interface NotificationBlogRunV1alpha1ReasonApiDeletenotificationBlogRunV1alpha1ReasonRequest {
  /**
   * Name of reason
   * @type {string}
   * @memberof NotificationBlogRunV1alpha1ReasonApiDeletenotificationBlogRunV1alpha1Reason
   */
  readonly name: string;
}

/**
 * Request parameters for getnotificationBlogRunV1alpha1Reason operation in NotificationBlogRunV1alpha1ReasonApi.
 * @export
 * @interface NotificationBlogRunV1alpha1ReasonApiGetnotificationBlogRunV1alpha1ReasonRequest
 */
export interface NotificationBlogRunV1alpha1ReasonApiGetnotificationBlogRunV1alpha1ReasonRequest {
  /**
   * Name of reason
   * @type {string}
   * @memberof NotificationBlogRunV1alpha1ReasonApiGetnotificationBlogRunV1alpha1Reason
   */
  readonly name: string;
}

/**
 * Request parameters for listnotificationBlogRunV1alpha1Reason operation in NotificationBlogRunV1alpha1ReasonApi.
 * @export
 * @interface NotificationBlogRunV1alpha1ReasonApiListnotificationBlogRunV1alpha1ReasonRequest
 */
export interface NotificationBlogRunV1alpha1ReasonApiListnotificationBlogRunV1alpha1ReasonRequest {
  /**
   * Field selector for filtering.
   * @type {Array<string>}
   * @memberof NotificationBlogRunV1alpha1ReasonApiListnotificationBlogRunV1alpha1Reason
   */
  readonly fieldSelector?: Array<string>;

  /**
   * Label selector for filtering.
   * @type {Array<string>}
   * @memberof NotificationBlogRunV1alpha1ReasonApiListnotificationBlogRunV1alpha1Reason
   */
  readonly labelSelector?: Array<string>;

  /**
   * The page number. Zero indicates no page.
   * @type {number}
   * @memberof NotificationBlogRunV1alpha1ReasonApiListnotificationBlogRunV1alpha1Reason
   */
  readonly page?: number;

  /**
   * Size of one page. Zero indicates no limit.
   * @type {number}
   * @memberof NotificationBlogRunV1alpha1ReasonApiListnotificationBlogRunV1alpha1Reason
   */
  readonly size?: number;

  /**
   * Sort property and direction of the list result. Support sorting based on attribute name path.
   * @type {Array<string>}
   * @memberof NotificationBlogRunV1alpha1ReasonApiListnotificationBlogRunV1alpha1Reason
   */
  readonly sort?: Array<string>;
}

/**
 * Request parameters for updatenotificationBlogRunV1alpha1Reason operation in NotificationBlogRunV1alpha1ReasonApi.
 * @export
 * @interface NotificationBlogRunV1alpha1ReasonApiUpdatenotificationBlogRunV1alpha1ReasonRequest
 */
export interface NotificationBlogRunV1alpha1ReasonApiUpdatenotificationBlogRunV1alpha1ReasonRequest {
  /**
   * Name of reason
   * @type {string}
   * @memberof NotificationBlogRunV1alpha1ReasonApiUpdatenotificationBlogRunV1alpha1Reason
   */
  readonly name: string;

  /**
   * Updated reason
   * @type {Reason}
   * @memberof NotificationBlogRunV1alpha1ReasonApiUpdatenotificationBlogRunV1alpha1Reason
   */
  readonly reason?: Reason;
}

/**
 * NotificationBlogRunV1alpha1ReasonApi - object-oriented interface
 * @export
 * @class NotificationBlogRunV1alpha1ReasonApi
 * @extends {BaseAPI}
 */
export class NotificationBlogRunV1alpha1ReasonApi extends BaseAPI {
  /**
   * Create notification.blog.run/v1alpha1/Reason
   * @param {NotificationBlogRunV1alpha1ReasonApiCreatenotificationBlogRunV1alpha1ReasonRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NotificationBlogRunV1alpha1ReasonApi
   */
  public createnotificationBlogRunV1alpha1Reason(
    requestParameters: NotificationBlogRunV1alpha1ReasonApiCreatenotificationBlogRunV1alpha1ReasonRequest = {},
    options?: AxiosRequestConfig
  ) {
    return NotificationBlogRunV1alpha1ReasonApiFp(this.configuration)
      .createnotificationBlogRunV1alpha1Reason(
        requestParameters.reason,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Delete notification.blog.run/v1alpha1/Reason
   * @param {NotificationBlogRunV1alpha1ReasonApiDeletenotificationBlogRunV1alpha1ReasonRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NotificationBlogRunV1alpha1ReasonApi
   */
  public deletenotificationBlogRunV1alpha1Reason(
    requestParameters: NotificationBlogRunV1alpha1ReasonApiDeletenotificationBlogRunV1alpha1ReasonRequest,
    options?: AxiosRequestConfig
  ) {
    return NotificationBlogRunV1alpha1ReasonApiFp(this.configuration)
      .deletenotificationBlogRunV1alpha1Reason(requestParameters.name, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Get notification.blog.run/v1alpha1/Reason
   * @param {NotificationBlogRunV1alpha1ReasonApiGetnotificationBlogRunV1alpha1ReasonRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NotificationBlogRunV1alpha1ReasonApi
   */
  public getnotificationBlogRunV1alpha1Reason(
    requestParameters: NotificationBlogRunV1alpha1ReasonApiGetnotificationBlogRunV1alpha1ReasonRequest,
    options?: AxiosRequestConfig
  ) {
    return NotificationBlogRunV1alpha1ReasonApiFp(this.configuration)
      .getnotificationBlogRunV1alpha1Reason(requestParameters.name, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * List notification.blog.run/v1alpha1/Reason
   * @param {NotificationBlogRunV1alpha1ReasonApiListnotificationBlogRunV1alpha1ReasonRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NotificationBlogRunV1alpha1ReasonApi
   */
  public listnotificationBlogRunV1alpha1Reason(
    requestParameters: NotificationBlogRunV1alpha1ReasonApiListnotificationBlogRunV1alpha1ReasonRequest = {},
    options?: AxiosRequestConfig
  ) {
    return NotificationBlogRunV1alpha1ReasonApiFp(this.configuration)
      .listnotificationBlogRunV1alpha1Reason(
        requestParameters.fieldSelector,
        requestParameters.labelSelector,
        requestParameters.page,
        requestParameters.size,
        requestParameters.sort,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Update notification.blog.run/v1alpha1/Reason
   * @param {NotificationBlogRunV1alpha1ReasonApiUpdatenotificationBlogRunV1alpha1ReasonRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof NotificationBlogRunV1alpha1ReasonApi
   */
  public updatenotificationBlogRunV1alpha1Reason(
    requestParameters: NotificationBlogRunV1alpha1ReasonApiUpdatenotificationBlogRunV1alpha1ReasonRequest,
    options?: AxiosRequestConfig
  ) {
    return NotificationBlogRunV1alpha1ReasonApiFp(this.configuration)
      .updatenotificationBlogRunV1alpha1Reason(
        requestParameters.name,
        requestParameters.reason,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }
}
