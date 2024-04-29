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
import { PolicyTemplate } from "../models";
// @ts-ignore
import { PolicyTemplateList } from "../models";
/**
 * StorageBlogRunV1alpha1PolicyTemplateApi - axios parameter creator
 * @export
 */
export const StorageBlogRunV1alpha1PolicyTemplateApiAxiosParamCreator =
  function (configuration?: Configuration) {
    return {
      /**
       * Create storage.blog.run/v1alpha1/PolicyTemplate
       * @param {PolicyTemplate} [policyTemplate] Fresh policytemplate
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createstorageBlogRunV1alpha1PolicyTemplate: async (
        policyTemplate?: PolicyTemplate,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        const localVarPath = `/apis/storage.blog.run/v1alpha1/policytemplates`;
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
          policyTemplate,
          localVarRequestOptions,
          configuration
        );

        return {
          url: toPathString(localVarUrlObj),
          options: localVarRequestOptions,
        };
      },
      /**
       * Delete storage.blog.run/v1alpha1/PolicyTemplate
       * @param {string} name Name of policytemplate
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      deletestorageBlogRunV1alpha1PolicyTemplate: async (
        name: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'name' is not null or undefined
        assertParamExists(
          "deletestorageBlogRunV1alpha1PolicyTemplate",
          "name",
          name
        );
        const localVarPath =
          `/apis/storage.blog.run/v1alpha1/policytemplates/{name}`.replace(
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
       * Get storage.blog.run/v1alpha1/PolicyTemplate
       * @param {string} name Name of policytemplate
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getstorageBlogRunV1alpha1PolicyTemplate: async (
        name: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'name' is not null or undefined
        assertParamExists(
          "getstorageBlogRunV1alpha1PolicyTemplate",
          "name",
          name
        );
        const localVarPath =
          `/apis/storage.blog.run/v1alpha1/policytemplates/{name}`.replace(
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
       * List storage.blog.run/v1alpha1/PolicyTemplate
       * @param {Array<string>} [fieldSelector] Field selector for filtering.
       * @param {Array<string>} [labelSelector] Label selector for filtering.
       * @param {number} [page] The page number. Zero indicates no page.
       * @param {number} [size] Size of one page. Zero indicates no limit.
       * @param {Array<string>} [sort] Sort property and direction of the list result. Support sorting based on attribute name path.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      liststorageBlogRunV1alpha1PolicyTemplate: async (
        fieldSelector?: Array<string>,
        labelSelector?: Array<string>,
        page?: number,
        size?: number,
        sort?: Array<string>,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        const localVarPath = `/apis/storage.blog.run/v1alpha1/policytemplates`;
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
       * Update storage.blog.run/v1alpha1/PolicyTemplate
       * @param {string} name Name of policytemplate
       * @param {PolicyTemplate} [policyTemplate] Updated policytemplate
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      updatestorageBlogRunV1alpha1PolicyTemplate: async (
        name: string,
        policyTemplate?: PolicyTemplate,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'name' is not null or undefined
        assertParamExists(
          "updatestorageBlogRunV1alpha1PolicyTemplate",
          "name",
          name
        );
        const localVarPath =
          `/apis/storage.blog.run/v1alpha1/policytemplates/{name}`.replace(
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
          policyTemplate,
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
 * StorageBlogRunV1alpha1PolicyTemplateApi - functional programming interface
 * @export
 */
export const StorageBlogRunV1alpha1PolicyTemplateApiFp = function (
  configuration?: Configuration
) {
  const localVarAxiosParamCreator =
    StorageBlogRunV1alpha1PolicyTemplateApiAxiosParamCreator(configuration);
  return {
    /**
     * Create storage.blog.run/v1alpha1/PolicyTemplate
     * @param {PolicyTemplate} [policyTemplate] Fresh policytemplate
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createstorageBlogRunV1alpha1PolicyTemplate(
      policyTemplate?: PolicyTemplate,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<PolicyTemplate>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createstorageBlogRunV1alpha1PolicyTemplate(
          policyTemplate,
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
     * Delete storage.blog.run/v1alpha1/PolicyTemplate
     * @param {string} name Name of policytemplate
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deletestorageBlogRunV1alpha1PolicyTemplate(
      name: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.deletestorageBlogRunV1alpha1PolicyTemplate(
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
     * Get storage.blog.run/v1alpha1/PolicyTemplate
     * @param {string} name Name of policytemplate
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getstorageBlogRunV1alpha1PolicyTemplate(
      name: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<PolicyTemplate>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.getstorageBlogRunV1alpha1PolicyTemplate(
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
     * List storage.blog.run/v1alpha1/PolicyTemplate
     * @param {Array<string>} [fieldSelector] Field selector for filtering.
     * @param {Array<string>} [labelSelector] Label selector for filtering.
     * @param {number} [page] The page number. Zero indicates no page.
     * @param {number} [size] Size of one page. Zero indicates no limit.
     * @param {Array<string>} [sort] Sort property and direction of the list result. Support sorting based on attribute name path.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async liststorageBlogRunV1alpha1PolicyTemplate(
      fieldSelector?: Array<string>,
      labelSelector?: Array<string>,
      page?: number,
      size?: number,
      sort?: Array<string>,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<PolicyTemplateList>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.liststorageBlogRunV1alpha1PolicyTemplate(
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
     * Update storage.blog.run/v1alpha1/PolicyTemplate
     * @param {string} name Name of policytemplate
     * @param {PolicyTemplate} [policyTemplate] Updated policytemplate
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updatestorageBlogRunV1alpha1PolicyTemplate(
      name: string,
      policyTemplate?: PolicyTemplate,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<PolicyTemplate>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.updatestorageBlogRunV1alpha1PolicyTemplate(
          name,
          policyTemplate,
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
 * StorageBlogRunV1alpha1PolicyTemplateApi - factory interface
 * @export
 */
export const StorageBlogRunV1alpha1PolicyTemplateApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = StorageBlogRunV1alpha1PolicyTemplateApiFp(configuration);
  return {
    /**
     * Create storage.blog.run/v1alpha1/PolicyTemplate
     * @param {StorageBlogRunV1alpha1PolicyTemplateApiCreatestorageBlogRunV1alpha1PolicyTemplateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createstorageBlogRunV1alpha1PolicyTemplate(
      requestParameters: StorageBlogRunV1alpha1PolicyTemplateApiCreatestorageBlogRunV1alpha1PolicyTemplateRequest = {},
      options?: AxiosRequestConfig
    ): AxiosPromise<PolicyTemplate> {
      return localVarFp
        .createstorageBlogRunV1alpha1PolicyTemplate(
          requestParameters.policyTemplate,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Delete storage.blog.run/v1alpha1/PolicyTemplate
     * @param {StorageBlogRunV1alpha1PolicyTemplateApiDeletestorageBlogRunV1alpha1PolicyTemplateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deletestorageBlogRunV1alpha1PolicyTemplate(
      requestParameters: StorageBlogRunV1alpha1PolicyTemplateApiDeletestorageBlogRunV1alpha1PolicyTemplateRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<void> {
      return localVarFp
        .deletestorageBlogRunV1alpha1PolicyTemplate(
          requestParameters.name,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Get storage.blog.run/v1alpha1/PolicyTemplate
     * @param {StorageBlogRunV1alpha1PolicyTemplateApiGetstorageBlogRunV1alpha1PolicyTemplateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getstorageBlogRunV1alpha1PolicyTemplate(
      requestParameters: StorageBlogRunV1alpha1PolicyTemplateApiGetstorageBlogRunV1alpha1PolicyTemplateRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<PolicyTemplate> {
      return localVarFp
        .getstorageBlogRunV1alpha1PolicyTemplate(
          requestParameters.name,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * List storage.blog.run/v1alpha1/PolicyTemplate
     * @param {StorageBlogRunV1alpha1PolicyTemplateApiListstorageBlogRunV1alpha1PolicyTemplateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    liststorageBlogRunV1alpha1PolicyTemplate(
      requestParameters: StorageBlogRunV1alpha1PolicyTemplateApiListstorageBlogRunV1alpha1PolicyTemplateRequest = {},
      options?: AxiosRequestConfig
    ): AxiosPromise<PolicyTemplateList> {
      return localVarFp
        .liststorageBlogRunV1alpha1PolicyTemplate(
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
     * Update storage.blog.run/v1alpha1/PolicyTemplate
     * @param {StorageBlogRunV1alpha1PolicyTemplateApiUpdatestorageBlogRunV1alpha1PolicyTemplateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updatestorageBlogRunV1alpha1PolicyTemplate(
      requestParameters: StorageBlogRunV1alpha1PolicyTemplateApiUpdatestorageBlogRunV1alpha1PolicyTemplateRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<PolicyTemplate> {
      return localVarFp
        .updatestorageBlogRunV1alpha1PolicyTemplate(
          requestParameters.name,
          requestParameters.policyTemplate,
          options
        )
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * Request parameters for createstorageBlogRunV1alpha1PolicyTemplate operation in StorageBlogRunV1alpha1PolicyTemplateApi.
 * @export
 * @interface StorageBlogRunV1alpha1PolicyTemplateApiCreatestorageBlogRunV1alpha1PolicyTemplateRequest
 */
export interface StorageBlogRunV1alpha1PolicyTemplateApiCreatestorageBlogRunV1alpha1PolicyTemplateRequest {
  /**
   * Fresh policytemplate
   * @type {PolicyTemplate}
   * @memberof StorageBlogRunV1alpha1PolicyTemplateApiCreatestorageBlogRunV1alpha1PolicyTemplate
   */
  readonly policyTemplate?: PolicyTemplate;
}

/**
 * Request parameters for deletestorageBlogRunV1alpha1PolicyTemplate operation in StorageBlogRunV1alpha1PolicyTemplateApi.
 * @export
 * @interface StorageBlogRunV1alpha1PolicyTemplateApiDeletestorageBlogRunV1alpha1PolicyTemplateRequest
 */
export interface StorageBlogRunV1alpha1PolicyTemplateApiDeletestorageBlogRunV1alpha1PolicyTemplateRequest {
  /**
   * Name of policytemplate
   * @type {string}
   * @memberof StorageBlogRunV1alpha1PolicyTemplateApiDeletestorageBlogRunV1alpha1PolicyTemplate
   */
  readonly name: string;
}

/**
 * Request parameters for getstorageBlogRunV1alpha1PolicyTemplate operation in StorageBlogRunV1alpha1PolicyTemplateApi.
 * @export
 * @interface StorageBlogRunV1alpha1PolicyTemplateApiGetstorageBlogRunV1alpha1PolicyTemplateRequest
 */
export interface StorageBlogRunV1alpha1PolicyTemplateApiGetstorageBlogRunV1alpha1PolicyTemplateRequest {
  /**
   * Name of policytemplate
   * @type {string}
   * @memberof StorageBlogRunV1alpha1PolicyTemplateApiGetstorageBlogRunV1alpha1PolicyTemplate
   */
  readonly name: string;
}

/**
 * Request parameters for liststorageBlogRunV1alpha1PolicyTemplate operation in StorageBlogRunV1alpha1PolicyTemplateApi.
 * @export
 * @interface StorageBlogRunV1alpha1PolicyTemplateApiListstorageBlogRunV1alpha1PolicyTemplateRequest
 */
export interface StorageBlogRunV1alpha1PolicyTemplateApiListstorageBlogRunV1alpha1PolicyTemplateRequest {
  /**
   * Field selector for filtering.
   * @type {Array<string>}
   * @memberof StorageBlogRunV1alpha1PolicyTemplateApiListstorageBlogRunV1alpha1PolicyTemplate
   */
  readonly fieldSelector?: Array<string>;

  /**
   * Label selector for filtering.
   * @type {Array<string>}
   * @memberof StorageBlogRunV1alpha1PolicyTemplateApiListstorageBlogRunV1alpha1PolicyTemplate
   */
  readonly labelSelector?: Array<string>;

  /**
   * The page number. Zero indicates no page.
   * @type {number}
   * @memberof StorageBlogRunV1alpha1PolicyTemplateApiListstorageBlogRunV1alpha1PolicyTemplate
   */
  readonly page?: number;

  /**
   * Size of one page. Zero indicates no limit.
   * @type {number}
   * @memberof StorageBlogRunV1alpha1PolicyTemplateApiListstorageBlogRunV1alpha1PolicyTemplate
   */
  readonly size?: number;

  /**
   * Sort property and direction of the list result. Support sorting based on attribute name path.
   * @type {Array<string>}
   * @memberof StorageBlogRunV1alpha1PolicyTemplateApiListstorageBlogRunV1alpha1PolicyTemplate
   */
  readonly sort?: Array<string>;
}

/**
 * Request parameters for updatestorageBlogRunV1alpha1PolicyTemplate operation in StorageBlogRunV1alpha1PolicyTemplateApi.
 * @export
 * @interface StorageBlogRunV1alpha1PolicyTemplateApiUpdatestorageBlogRunV1alpha1PolicyTemplateRequest
 */
export interface StorageBlogRunV1alpha1PolicyTemplateApiUpdatestorageBlogRunV1alpha1PolicyTemplateRequest {
  /**
   * Name of policytemplate
   * @type {string}
   * @memberof StorageBlogRunV1alpha1PolicyTemplateApiUpdatestorageBlogRunV1alpha1PolicyTemplate
   */
  readonly name: string;

  /**
   * Updated policytemplate
   * @type {PolicyTemplate}
   * @memberof StorageBlogRunV1alpha1PolicyTemplateApiUpdatestorageBlogRunV1alpha1PolicyTemplate
   */
  readonly policyTemplate?: PolicyTemplate;
}

/**
 * StorageBlogRunV1alpha1PolicyTemplateApi - object-oriented interface
 * @export
 * @class StorageBlogRunV1alpha1PolicyTemplateApi
 * @extends {BaseAPI}
 */
export class StorageBlogRunV1alpha1PolicyTemplateApi extends BaseAPI {
  /**
   * Create storage.blog.run/v1alpha1/PolicyTemplate
   * @param {StorageBlogRunV1alpha1PolicyTemplateApiCreatestorageBlogRunV1alpha1PolicyTemplateRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof StorageBlogRunV1alpha1PolicyTemplateApi
   */
  public createstorageBlogRunV1alpha1PolicyTemplate(
    requestParameters: StorageBlogRunV1alpha1PolicyTemplateApiCreatestorageBlogRunV1alpha1PolicyTemplateRequest = {},
    options?: AxiosRequestConfig
  ) {
    return StorageBlogRunV1alpha1PolicyTemplateApiFp(this.configuration)
      .createstorageBlogRunV1alpha1PolicyTemplate(
        requestParameters.policyTemplate,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Delete storage.blog.run/v1alpha1/PolicyTemplate
   * @param {StorageBlogRunV1alpha1PolicyTemplateApiDeletestorageBlogRunV1alpha1PolicyTemplateRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof StorageBlogRunV1alpha1PolicyTemplateApi
   */
  public deletestorageBlogRunV1alpha1PolicyTemplate(
    requestParameters: StorageBlogRunV1alpha1PolicyTemplateApiDeletestorageBlogRunV1alpha1PolicyTemplateRequest,
    options?: AxiosRequestConfig
  ) {
    return StorageBlogRunV1alpha1PolicyTemplateApiFp(this.configuration)
      .deletestorageBlogRunV1alpha1PolicyTemplate(
        requestParameters.name,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Get storage.blog.run/v1alpha1/PolicyTemplate
   * @param {StorageBlogRunV1alpha1PolicyTemplateApiGetstorageBlogRunV1alpha1PolicyTemplateRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof StorageBlogRunV1alpha1PolicyTemplateApi
   */
  public getstorageBlogRunV1alpha1PolicyTemplate(
    requestParameters: StorageBlogRunV1alpha1PolicyTemplateApiGetstorageBlogRunV1alpha1PolicyTemplateRequest,
    options?: AxiosRequestConfig
  ) {
    return StorageBlogRunV1alpha1PolicyTemplateApiFp(this.configuration)
      .getstorageBlogRunV1alpha1PolicyTemplate(requestParameters.name, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * List storage.blog.run/v1alpha1/PolicyTemplate
   * @param {StorageBlogRunV1alpha1PolicyTemplateApiListstorageBlogRunV1alpha1PolicyTemplateRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof StorageBlogRunV1alpha1PolicyTemplateApi
   */
  public liststorageBlogRunV1alpha1PolicyTemplate(
    requestParameters: StorageBlogRunV1alpha1PolicyTemplateApiListstorageBlogRunV1alpha1PolicyTemplateRequest = {},
    options?: AxiosRequestConfig
  ) {
    return StorageBlogRunV1alpha1PolicyTemplateApiFp(this.configuration)
      .liststorageBlogRunV1alpha1PolicyTemplate(
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
   * Update storage.blog.run/v1alpha1/PolicyTemplate
   * @param {StorageBlogRunV1alpha1PolicyTemplateApiUpdatestorageBlogRunV1alpha1PolicyTemplateRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof StorageBlogRunV1alpha1PolicyTemplateApi
   */
  public updatestorageBlogRunV1alpha1PolicyTemplate(
    requestParameters: StorageBlogRunV1alpha1PolicyTemplateApiUpdatestorageBlogRunV1alpha1PolicyTemplateRequest,
    options?: AxiosRequestConfig
  ) {
    return StorageBlogRunV1alpha1PolicyTemplateApiFp(this.configuration)
      .updatestorageBlogRunV1alpha1PolicyTemplate(
        requestParameters.name,
        requestParameters.policyTemplate,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }
}