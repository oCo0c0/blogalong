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
import { Attachment } from "../models";
// @ts-ignore
import { AttachmentList } from "../models";
import {UcContentBlogRunV1alpha1PostApiAxiosParamCreator} from "./uc-content-blog-run-v1alpha1-post-api";
/**
 * StorageBlogRunV1alpha1AttachmentApi - axios parameter creator
 * @export
 */
export const StorageBlogRunV1alpha1AttachmentApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * Create storage.blog.run/v1alpha1/Attachment
     * @param {Attachment} [attachment] Fresh attachment
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createstorageBlogRunV1alpha1Attachment: async (
      attachment?: Attachment,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/apis/storage.blog.run/v1alpha1/attachments`;
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
        attachment,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Delete storage.blog.run/v1alpha1/Attachment
     * @param {string} name Name of attachment
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deletestorageBlogRunV1alpha1Attachment: async (
      name: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'name' is not null or undefined
      assertParamExists("deletestorageBlogRunV1alpha1Attachment", "name", name);
      const localVarPath =
        `/apis/storage.blog.run/v1alpha1/attachments/{name}`.replace(
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
     * Get storage.blog.run/v1alpha1/Attachment
     * @param {string} name Name of attachment
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getstorageBlogRunV1alpha1Attachment: async (
      name: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'name' is not null or undefined
      assertParamExists("getstorageBlogRunV1alpha1Attachment", "name", name);
      const localVarPath =
        `/apis/storage.blog.run/v1alpha1/attachments/{name}`.replace(
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
     * List storage.blog.run/v1alpha1/Attachment
     * @param {Array<string>} [fieldSelector] Field selector for filtering.
     * @param {Array<string>} [labelSelector] Label selector for filtering.
     * @param {number} [page] The page number. Zero indicates no page.
     * @param {number} [size] Size of one page. Zero indicates no limit.
     * @param {Array<string>} [sort] Sort property and direction of the list result. Support sorting based on attribute name path.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    liststorageBlogRunV1alpha1Attachment: async (
      fieldSelector?: Array<string>,
      labelSelector?: Array<string>,
      page?: number,
      size?: number,
      sort?: Array<string>,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/apis/storage.blog.run/v1alpha1/attachments`;
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
     * Update storage.blog.run/v1alpha1/Attachment
     * @param {string} name Name of attachment
     * @param {Attachment} [attachment] Updated attachment
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updatestorageBlogRunV1alpha1Attachment: async (
      name: string,
      attachment?: Attachment,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'name' is not null or undefined
      assertParamExists("updatestorageBlogRunV1alpha1Attachment", "name", name);
      const localVarPath =
        `/apis/storage.blog.run/v1alpha1/attachments/{name}`.replace(
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
        attachment,
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
 * StorageBlogRunV1alpha1AttachmentApi - functional programming interface
 * @export
 */
export const StorageBlogRunV1alpha1AttachmentApiFp = function (
  configuration?: Configuration
) {
  const localVarAxiosParamCreator =
    StorageBlogRunV1alpha1AttachmentApiAxiosParamCreator(configuration);
  return {
    /**
     * Create storage.blog.run/v1alpha1/Attachment
     * @param {Attachment} [attachment] Fresh attachment
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createstorageBlogRunV1alpha1Attachment(
      attachment?: Attachment,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Attachment>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createstorageBlogRunV1alpha1Attachment(
          attachment,
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
     * Delete storage.blog.run/v1alpha1/Attachment
     * @param {string} name Name of attachment
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deletestorageBlogRunV1alpha1Attachment(
      name: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.deletestorageBlogRunV1alpha1Attachment(
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
     * Get storage.blog.run/v1alpha1/Attachment
     * @param {string} name Name of attachment
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getstorageBlogRunV1alpha1Attachment(
      name: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Attachment>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.getstorageBlogRunV1alpha1Attachment(
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
     * List storage.blog.run/v1alpha1/Attachment
     * @param {Array<string>} [fieldSelector] Field selector for filtering.
     * @param {Array<string>} [labelSelector] Label selector for filtering.
     * @param {number} [page] The page number. Zero indicates no page.
     * @param {number} [size] Size of one page. Zero indicates no limit.
     * @param {Array<string>} [sort] Sort property and direction of the list result. Support sorting based on attribute name path.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async liststorageBlogRunV1alpha1Attachment(
      fieldSelector?: Array<string>,
      labelSelector?: Array<string>,
      page?: number,
      size?: number,
      sort?: Array<string>,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<AttachmentList>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.liststorageBlogRunV1alpha1Attachment(
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
     * Update storage.blog.run/v1alpha1/Attachment
     * @param {string} name Name of attachment
     * @param {Attachment} [attachment] Updated attachment
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updatestorageBlogRunV1alpha1Attachment(
      name: string,
      attachment?: Attachment,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Attachment>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.updatestorageBlogRunV1alpha1Attachment(
          name,
          attachment,
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
 * StorageBlogRunV1alpha1AttachmentApi - factory interface
 * @export
 */
export const StorageBlogRunV1alpha1AttachmentApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = StorageBlogRunV1alpha1AttachmentApiFp(configuration);
  return {
    /**
     * Create storage.blog.run/v1alpha1/Attachment
     * @param {StorageBlogRunV1alpha1AttachmentApiCreatestorageBlogRunV1alpha1AttachmentRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createstorageBlogRunV1alpha1Attachment(
      requestParameters: StorageBlogRunV1alpha1AttachmentApiCreatestorageBlogRunV1alpha1AttachmentRequest = {},
      options?: AxiosRequestConfig
    ): AxiosPromise<Attachment> {
      return localVarFp
        .createstorageBlogRunV1alpha1Attachment(
          requestParameters.attachment,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Delete storage.blog.run/v1alpha1/Attachment
     * @param {StorageBlogRunV1alpha1AttachmentApiDeletestorageBlogRunV1alpha1AttachmentRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deletestorageBlogRunV1alpha1Attachment(
      requestParameters: StorageBlogRunV1alpha1AttachmentApiDeletestorageBlogRunV1alpha1AttachmentRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<void> {
      return localVarFp
        .deletestorageBlogRunV1alpha1Attachment(requestParameters.name, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Get storage.blog.run/v1alpha1/Attachment
     * @param {StorageBlogRunV1alpha1AttachmentApiGetstorageBlogRunV1alpha1AttachmentRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getstorageBlogRunV1alpha1Attachment(
      requestParameters: StorageBlogRunV1alpha1AttachmentApiGetstorageBlogRunV1alpha1AttachmentRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Attachment> {
      return localVarFp
        .getstorageBlogRunV1alpha1Attachment(requestParameters.name, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * List storage.blog.run/v1alpha1/Attachment
     * @param {StorageBlogRunV1alpha1AttachmentApiListstorageBlogRunV1alpha1AttachmentRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    liststorageBlogRunV1alpha1Attachment(
      requestParameters: StorageBlogRunV1alpha1AttachmentApiListstorageBlogRunV1alpha1AttachmentRequest = {},
      options?: AxiosRequestConfig
    ): AxiosPromise<AttachmentList> {
      return localVarFp
        .liststorageBlogRunV1alpha1Attachment(
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
     * Update storage.blog.run/v1alpha1/Attachment
     * @param {StorageBlogRunV1alpha1AttachmentApiUpdatestorageBlogRunV1alpha1AttachmentRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updatestorageBlogRunV1alpha1Attachment(
      requestParameters: StorageBlogRunV1alpha1AttachmentApiUpdatestorageBlogRunV1alpha1AttachmentRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Attachment> {
      return localVarFp
        .updatestorageBlogRunV1alpha1Attachment(
          requestParameters.name,
          requestParameters.attachment,
          options
        )
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * Request parameters for createstorageBlogRunV1alpha1Attachment operation in StorageBlogRunV1alpha1AttachmentApi.
 * @export
 * @interface StorageBlogRunV1alpha1AttachmentApiCreatestorageBlogRunV1alpha1AttachmentRequest
 */
export interface StorageBlogRunV1alpha1AttachmentApiCreatestorageBlogRunV1alpha1AttachmentRequest {
  /**
   * Fresh attachment
   * @type {Attachment}
   * @memberof StorageBlogRunV1alpha1AttachmentApiCreatestorageBlogRunV1alpha1Attachment
   */
  readonly attachment?: Attachment;
}

/**
 * Request parameters for deletestorageBlogRunV1alpha1Attachment operation in StorageBlogRunV1alpha1AttachmentApi.
 * @export
 * @interface StorageBlogRunV1alpha1AttachmentApiDeletestorageBlogRunV1alpha1AttachmentRequest
 */
export interface StorageBlogRunV1alpha1AttachmentApiDeletestorageBlogRunV1alpha1AttachmentRequest {
  /**
   * Name of attachment
   * @type {string}
   * @memberof StorageBlogRunV1alpha1AttachmentApiDeletestorageBlogRunV1alpha1Attachment
   */
  readonly name: string;
}

/**
 * Request parameters for getstorageBlogRunV1alpha1Attachment operation in StorageBlogRunV1alpha1AttachmentApi.
 * @export
 * @interface StorageBlogRunV1alpha1AttachmentApiGetstorageBlogRunV1alpha1AttachmentRequest
 */
export interface StorageBlogRunV1alpha1AttachmentApiGetstorageBlogRunV1alpha1AttachmentRequest {
  /**
   * Name of attachment
   * @type {string}
   * @memberof StorageBlogRunV1alpha1AttachmentApiGetstorageBlogRunV1alpha1Attachment
   */
  readonly name: string;
}

/**
 * Request parameters for liststorageBlogRunV1alpha1Attachment operation in StorageBlogRunV1alpha1AttachmentApi.
 * @export
 * @interface StorageBlogRunV1alpha1AttachmentApiListstorageBlogRunV1alpha1AttachmentRequest
 */
export interface StorageBlogRunV1alpha1AttachmentApiListstorageBlogRunV1alpha1AttachmentRequest {
  /**
   * Field selector for filtering.
   * @type {Array<string>}
   * @memberof StorageBlogRunV1alpha1AttachmentApiListstorageBlogRunV1alpha1Attachment
   */
  readonly fieldSelector?: Array<string>;

  /**
   * Label selector for filtering.
   * @type {Array<string>}
   * @memberof StorageBlogRunV1alpha1AttachmentApiListstorageBlogRunV1alpha1Attachment
   */
  readonly labelSelector?: Array<string>;

  /**
   * The page number. Zero indicates no page.
   * @type {number}
   * @memberof StorageBlogRunV1alpha1AttachmentApiListstorageBlogRunV1alpha1Attachment
   */
  readonly page?: number;

  /**
   * Size of one page. Zero indicates no limit.
   * @type {number}
   * @memberof StorageBlogRunV1alpha1AttachmentApiListstorageBlogRunV1alpha1Attachment
   */
  readonly size?: number;

  /**
   * Sort property and direction of the list result. Support sorting based on attribute name path.
   * @type {Array<string>}
   * @memberof StorageBlogRunV1alpha1AttachmentApiListstorageBlogRunV1alpha1Attachment
   */
  readonly sort?: Array<string>;
}

/**
 * Request parameters for updatestorageBlogRunV1alpha1Attachment operation in StorageBlogRunV1alpha1AttachmentApi.
 * @export
 * @interface StorageBlogRunV1alpha1AttachmentApiUpdatestorageBlogRunV1alpha1AttachmentRequest
 */
export interface StorageBlogRunV1alpha1AttachmentApiUpdatestorageBlogRunV1alpha1AttachmentRequest {
  /**
   * Name of attachment
   * @type {string}
   * @memberof StorageBlogRunV1alpha1AttachmentApiUpdatestorageBlogRunV1alpha1Attachment
   */
  readonly name: string;

  /**
   * Updated attachment
   * @type {Attachment}
   * @memberof StorageBlogRunV1alpha1AttachmentApiUpdatestorageBlogRunV1alpha1Attachment
   */
  readonly attachment?: Attachment;
}

/**
 * StorageBlogRunV1alpha1AttachmentApi - object-oriented interface
 * @export
 * @class StorageBlogRunV1alpha1AttachmentApi
 * @extends {BaseAPI}
 */
export class StorageBlogRunV1alpha1AttachmentApi extends BaseAPI {
  /**
   * Create storage.blog.run/v1alpha1/Attachment
   * @param {StorageBlogRunV1alpha1AttachmentApiCreatestorageBlogRunV1alpha1AttachmentRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof StorageBlogRunV1alpha1AttachmentApi
   */
  public createstorageBlogRunV1alpha1Attachment(
    requestParameters: StorageBlogRunV1alpha1AttachmentApiCreatestorageBlogRunV1alpha1AttachmentRequest = {},
    options?: AxiosRequestConfig
  ) {
    return StorageBlogRunV1alpha1AttachmentApiFp(this.configuration)
      .createstorageBlogRunV1alpha1Attachment(
        requestParameters.attachment,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Delete storage.blog.run/v1alpha1/Attachment
   * @param {StorageBlogRunV1alpha1AttachmentApiDeletestorageBlogRunV1alpha1AttachmentRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof StorageBlogRunV1alpha1AttachmentApi
   */
  public deletestorageBlogRunV1alpha1Attachment(
    requestParameters: StorageBlogRunV1alpha1AttachmentApiDeletestorageBlogRunV1alpha1AttachmentRequest,
    options?: AxiosRequestConfig
  ) {
    return StorageBlogRunV1alpha1AttachmentApiFp(this.configuration)
      .deletestorageBlogRunV1alpha1Attachment(requestParameters.name, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Get storage.blog.run/v1alpha1/Attachment
   * @param {StorageBlogRunV1alpha1AttachmentApiGetstorageBlogRunV1alpha1AttachmentRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof StorageBlogRunV1alpha1AttachmentApi
   */
  public getstorageBlogRunV1alpha1Attachment(
    requestParameters: StorageBlogRunV1alpha1AttachmentApiGetstorageBlogRunV1alpha1AttachmentRequest,
    options?: AxiosRequestConfig
  ) {
    return StorageBlogRunV1alpha1AttachmentApiFp(this.configuration)
      .getstorageBlogRunV1alpha1Attachment(requestParameters.name, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * List storage.blog.run/v1alpha1/Attachment
   * @param {StorageBlogRunV1alpha1AttachmentApiListstorageBlogRunV1alpha1AttachmentRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof StorageBlogRunV1alpha1AttachmentApi
   */
  public liststorageBlogRunV1alpha1Attachment(
    requestParameters: StorageBlogRunV1alpha1AttachmentApiListstorageBlogRunV1alpha1AttachmentRequest = {},
    options?: AxiosRequestConfig
  ) {
    return StorageBlogRunV1alpha1AttachmentApiFp(this.configuration)
      .liststorageBlogRunV1alpha1Attachment(
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
   * Update storage.blog.run/v1alpha1/Attachment
   * @param {StorageBlogRunV1alpha1AttachmentApiUpdatestorageBlogRunV1alpha1AttachmentRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof StorageBlogRunV1alpha1AttachmentApi
   */
  public updatestorageBlogRunV1alpha1Attachment(
    requestParameters: StorageBlogRunV1alpha1AttachmentApiUpdatestorageBlogRunV1alpha1AttachmentRequest,
    options?: AxiosRequestConfig
  ) {
    return StorageBlogRunV1alpha1AttachmentApiFp(this.configuration)
      .updatestorageBlogRunV1alpha1Attachment(
        requestParameters.name,
        requestParameters.attachment,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }
}
