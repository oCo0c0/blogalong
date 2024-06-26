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
import { ExtensionDefinition } from "../models";
// @ts-ignore
import { ExtensionDefinitionList } from "../models";
/**
 * PluginBlogRunV1alpha1ExtensionDefinitionApi - axios parameter creator
 * @export
 */
export const PluginBlogRunV1alpha1ExtensionDefinitionApiAxiosParamCreator =
  function (configuration?: Configuration) {
    return {
      /**
       * Create plugin.blog.run/v1alpha1/ExtensionDefinition
       * @param {ExtensionDefinition} [extensionDefinition] Fresh extensiondefinition
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createpluginBlogRunV1alpha1ExtensionDefinition: async (
        extensionDefinition?: ExtensionDefinition,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        const localVarPath = `/apis/plugin.blog.run/v1alpha1/extensiondefinitions`;
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
          extensionDefinition,
          localVarRequestOptions,
          configuration
        );

        return {
          url: toPathString(localVarUrlObj),
          options: localVarRequestOptions,
        };
      },
      /**
       * Delete plugin.blog.run/v1alpha1/ExtensionDefinition
       * @param {string} name Name of extensiondefinition
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      deletepluginBlogRunV1alpha1ExtensionDefinition: async (
        name: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'name' is not null or undefined
        assertParamExists(
          "deletepluginBlogRunV1alpha1ExtensionDefinition",
          "name",
          name
        );
        const localVarPath =
          `/apis/plugin.blog.run/v1alpha1/extensiondefinitions/{name}`.replace(
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
       * Get plugin.blog.run/v1alpha1/ExtensionDefinition
       * @param {string} name Name of extensiondefinition
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      getpluginBlogRunV1alpha1ExtensionDefinition: async (
        name: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'name' is not null or undefined
        assertParamExists(
          "getpluginBlogRunV1alpha1ExtensionDefinition",
          "name",
          name
        );
        const localVarPath =
          `/apis/plugin.blog.run/v1alpha1/extensiondefinitions/{name}`.replace(
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
       * List plugin.blog.run/v1alpha1/ExtensionDefinition
       * @param {Array<string>} [fieldSelector] Field selector for filtering.
       * @param {Array<string>} [labelSelector] Label selector for filtering.
       * @param {number} [page] The page number. Zero indicates no page.
       * @param {number} [size] Size of one page. Zero indicates no limit.
       * @param {Array<string>} [sort] Sort property and direction of the list result. Support sorting based on attribute name path.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      listpluginBlogRunV1alpha1ExtensionDefinition: async (
        fieldSelector?: Array<string>,
        labelSelector?: Array<string>,
        page?: number,
        size?: number,
        sort?: Array<string>,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        const localVarPath = `/apis/plugin.blog.run/v1alpha1/extensiondefinitions`;
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
       * Update plugin.blog.run/v1alpha1/ExtensionDefinition
       * @param {string} name Name of extensiondefinition
       * @param {ExtensionDefinition} [extensionDefinition] Updated extensiondefinition
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      updatepluginBlogRunV1alpha1ExtensionDefinition: async (
        name: string,
        extensionDefinition?: ExtensionDefinition,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'name' is not null or undefined
        assertParamExists(
          "updatepluginBlogRunV1alpha1ExtensionDefinition",
          "name",
          name
        );
        const localVarPath =
          `/apis/plugin.blog.run/v1alpha1/extensiondefinitions/{name}`.replace(
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
          extensionDefinition,
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
 * PluginBlogRunV1alpha1ExtensionDefinitionApi - functional programming interface
 * @export
 */
export const PluginBlogRunV1alpha1ExtensionDefinitionApiFp = function (
  configuration?: Configuration
) {
  const localVarAxiosParamCreator =
    PluginBlogRunV1alpha1ExtensionDefinitionApiAxiosParamCreator(configuration);
  return {
    /**
     * Create plugin.blog.run/v1alpha1/ExtensionDefinition
     * @param {ExtensionDefinition} [extensionDefinition] Fresh extensiondefinition
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createpluginBlogRunV1alpha1ExtensionDefinition(
      extensionDefinition?: ExtensionDefinition,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<ExtensionDefinition>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createpluginBlogRunV1alpha1ExtensionDefinition(
          extensionDefinition,
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
     * Delete plugin.blog.run/v1alpha1/ExtensionDefinition
     * @param {string} name Name of extensiondefinition
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deletepluginBlogRunV1alpha1ExtensionDefinition(
      name: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.deletepluginBlogRunV1alpha1ExtensionDefinition(
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
     * Get plugin.blog.run/v1alpha1/ExtensionDefinition
     * @param {string} name Name of extensiondefinition
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getpluginBlogRunV1alpha1ExtensionDefinition(
      name: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<ExtensionDefinition>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.getpluginBlogRunV1alpha1ExtensionDefinition(
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
     * List plugin.blog.run/v1alpha1/ExtensionDefinition
     * @param {Array<string>} [fieldSelector] Field selector for filtering.
     * @param {Array<string>} [labelSelector] Label selector for filtering.
     * @param {number} [page] The page number. Zero indicates no page.
     * @param {number} [size] Size of one page. Zero indicates no limit.
     * @param {Array<string>} [sort] Sort property and direction of the list result. Support sorting based on attribute name path.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listpluginBlogRunV1alpha1ExtensionDefinition(
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
      ) => AxiosPromise<ExtensionDefinitionList>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.listpluginBlogRunV1alpha1ExtensionDefinition(
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
     * Update plugin.blog.run/v1alpha1/ExtensionDefinition
     * @param {string} name Name of extensiondefinition
     * @param {ExtensionDefinition} [extensionDefinition] Updated extensiondefinition
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updatepluginBlogRunV1alpha1ExtensionDefinition(
      name: string,
      extensionDefinition?: ExtensionDefinition,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<ExtensionDefinition>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.updatepluginBlogRunV1alpha1ExtensionDefinition(
          name,
          extensionDefinition,
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
 * PluginBlogRunV1alpha1ExtensionDefinitionApi - factory interface
 * @export
 */
export const PluginBlogRunV1alpha1ExtensionDefinitionApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp =
    PluginBlogRunV1alpha1ExtensionDefinitionApiFp(configuration);
  return {
    /**
     * Create plugin.blog.run/v1alpha1/ExtensionDefinition
     * @param {PluginBlogRunV1alpha1ExtensionDefinitionApiCreatepluginBlogRunV1alpha1ExtensionDefinitionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createpluginBlogRunV1alpha1ExtensionDefinition(
      requestParameters: PluginBlogRunV1alpha1ExtensionDefinitionApiCreatepluginBlogRunV1alpha1ExtensionDefinitionRequest = {},
      options?: AxiosRequestConfig
    ): AxiosPromise<ExtensionDefinition> {
      return localVarFp
        .createpluginBlogRunV1alpha1ExtensionDefinition(
          requestParameters.extensionDefinition,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Delete plugin.blog.run/v1alpha1/ExtensionDefinition
     * @param {PluginBlogRunV1alpha1ExtensionDefinitionApiDeletepluginBlogRunV1alpha1ExtensionDefinitionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deletepluginBlogRunV1alpha1ExtensionDefinition(
      requestParameters: PluginBlogRunV1alpha1ExtensionDefinitionApiDeletepluginBlogRunV1alpha1ExtensionDefinitionRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<void> {
      return localVarFp
        .deletepluginBlogRunV1alpha1ExtensionDefinition(
          requestParameters.name,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Get plugin.blog.run/v1alpha1/ExtensionDefinition
     * @param {PluginBlogRunV1alpha1ExtensionDefinitionApiGetpluginBlogRunV1alpha1ExtensionDefinitionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getpluginBlogRunV1alpha1ExtensionDefinition(
      requestParameters: PluginBlogRunV1alpha1ExtensionDefinitionApiGetpluginBlogRunV1alpha1ExtensionDefinitionRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<ExtensionDefinition> {
      return localVarFp
        .getpluginBlogRunV1alpha1ExtensionDefinition(
          requestParameters.name,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * List plugin.blog.run/v1alpha1/ExtensionDefinition
     * @param {PluginBlogRunV1alpha1ExtensionDefinitionApiListpluginBlogRunV1alpha1ExtensionDefinitionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listpluginBlogRunV1alpha1ExtensionDefinition(
      requestParameters: PluginBlogRunV1alpha1ExtensionDefinitionApiListpluginBlogRunV1alpha1ExtensionDefinitionRequest = {},
      options?: AxiosRequestConfig
    ): AxiosPromise<ExtensionDefinitionList> {
      return localVarFp
        .listpluginBlogRunV1alpha1ExtensionDefinition(
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
     * Update plugin.blog.run/v1alpha1/ExtensionDefinition
     * @param {PluginBlogRunV1alpha1ExtensionDefinitionApiUpdatepluginBlogRunV1alpha1ExtensionDefinitionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updatepluginBlogRunV1alpha1ExtensionDefinition(
      requestParameters: PluginBlogRunV1alpha1ExtensionDefinitionApiUpdatepluginBlogRunV1alpha1ExtensionDefinitionRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<ExtensionDefinition> {
      return localVarFp
        .updatepluginBlogRunV1alpha1ExtensionDefinition(
          requestParameters.name,
          requestParameters.extensionDefinition,
          options
        )
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * Request parameters for createpluginBlogRunV1alpha1ExtensionDefinition operation in PluginBlogRunV1alpha1ExtensionDefinitionApi.
 * @export
 * @interface PluginBlogRunV1alpha1ExtensionDefinitionApiCreatepluginBlogRunV1alpha1ExtensionDefinitionRequest
 */
export interface PluginBlogRunV1alpha1ExtensionDefinitionApiCreatepluginBlogRunV1alpha1ExtensionDefinitionRequest {
  /**
   * Fresh extensiondefinition
   * @type {ExtensionDefinition}
   * @memberof PluginBlogRunV1alpha1ExtensionDefinitionApiCreatepluginBlogRunV1alpha1ExtensionDefinition
   */
  readonly extensionDefinition?: ExtensionDefinition;
}

/**
 * Request parameters for deletepluginBlogRunV1alpha1ExtensionDefinition operation in PluginBlogRunV1alpha1ExtensionDefinitionApi.
 * @export
 * @interface PluginBlogRunV1alpha1ExtensionDefinitionApiDeletepluginBlogRunV1alpha1ExtensionDefinitionRequest
 */
export interface PluginBlogRunV1alpha1ExtensionDefinitionApiDeletepluginBlogRunV1alpha1ExtensionDefinitionRequest {
  /**
   * Name of extensiondefinition
   * @type {string}
   * @memberof PluginBlogRunV1alpha1ExtensionDefinitionApiDeletepluginBlogRunV1alpha1ExtensionDefinition
   */
  readonly name: string;
}

/**
 * Request parameters for getpluginBlogRunV1alpha1ExtensionDefinition operation in PluginBlogRunV1alpha1ExtensionDefinitionApi.
 * @export
 * @interface PluginBlogRunV1alpha1ExtensionDefinitionApiGetpluginBlogRunV1alpha1ExtensionDefinitionRequest
 */
export interface PluginBlogRunV1alpha1ExtensionDefinitionApiGetpluginBlogRunV1alpha1ExtensionDefinitionRequest {
  /**
   * Name of extensiondefinition
   * @type {string}
   * @memberof PluginBlogRunV1alpha1ExtensionDefinitionApiGetpluginBlogRunV1alpha1ExtensionDefinition
   */
  readonly name: string;
}

/**
 * Request parameters for listpluginBlogRunV1alpha1ExtensionDefinition operation in PluginBlogRunV1alpha1ExtensionDefinitionApi.
 * @export
 * @interface PluginBlogRunV1alpha1ExtensionDefinitionApiListpluginBlogRunV1alpha1ExtensionDefinitionRequest
 */
export interface PluginBlogRunV1alpha1ExtensionDefinitionApiListpluginBlogRunV1alpha1ExtensionDefinitionRequest {
  /**
   * Field selector for filtering.
   * @type {Array<string>}
   * @memberof PluginBlogRunV1alpha1ExtensionDefinitionApiListpluginBlogRunV1alpha1ExtensionDefinition
   */
  readonly fieldSelector?: Array<string>;

  /**
   * Label selector for filtering.
   * @type {Array<string>}
   * @memberof PluginBlogRunV1alpha1ExtensionDefinitionApiListpluginBlogRunV1alpha1ExtensionDefinition
   */
  readonly labelSelector?: Array<string>;

  /**
   * The page number. Zero indicates no page.
   * @type {number}
   * @memberof PluginBlogRunV1alpha1ExtensionDefinitionApiListpluginBlogRunV1alpha1ExtensionDefinition
   */
  readonly page?: number;

  /**
   * Size of one page. Zero indicates no limit.
   * @type {number}
   * @memberof PluginBlogRunV1alpha1ExtensionDefinitionApiListpluginBlogRunV1alpha1ExtensionDefinition
   */
  readonly size?: number;

  /**
   * Sort property and direction of the list result. Support sorting based on attribute name path.
   * @type {Array<string>}
   * @memberof PluginBlogRunV1alpha1ExtensionDefinitionApiListpluginBlogRunV1alpha1ExtensionDefinition
   */
  readonly sort?: Array<string>;
}

/**
 * Request parameters for updatepluginBlogRunV1alpha1ExtensionDefinition operation in PluginBlogRunV1alpha1ExtensionDefinitionApi.
 * @export
 * @interface PluginBlogRunV1alpha1ExtensionDefinitionApiUpdatepluginBlogRunV1alpha1ExtensionDefinitionRequest
 */
export interface PluginBlogRunV1alpha1ExtensionDefinitionApiUpdatepluginBlogRunV1alpha1ExtensionDefinitionRequest {
  /**
   * Name of extensiondefinition
   * @type {string}
   * @memberof PluginBlogRunV1alpha1ExtensionDefinitionApiUpdatepluginBlogRunV1alpha1ExtensionDefinition
   */
  readonly name: string;

  /**
   * Updated extensiondefinition
   * @type {ExtensionDefinition}
   * @memberof PluginBlogRunV1alpha1ExtensionDefinitionApiUpdatepluginBlogRunV1alpha1ExtensionDefinition
   */
  readonly extensionDefinition?: ExtensionDefinition;
}

/**
 * PluginBlogRunV1alpha1ExtensionDefinitionApi - object-oriented interface
 * @export
 * @class PluginBlogRunV1alpha1ExtensionDefinitionApi
 * @extends {BaseAPI}
 */
export class PluginBlogRunV1alpha1ExtensionDefinitionApi extends BaseAPI {
  /**
   * Create plugin.blog.run/v1alpha1/ExtensionDefinition
   * @param {PluginBlogRunV1alpha1ExtensionDefinitionApiCreatepluginBlogRunV1alpha1ExtensionDefinitionRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PluginBlogRunV1alpha1ExtensionDefinitionApi
   */
  public createpluginBlogRunV1alpha1ExtensionDefinition(
    requestParameters: PluginBlogRunV1alpha1ExtensionDefinitionApiCreatepluginBlogRunV1alpha1ExtensionDefinitionRequest = {},
    options?: AxiosRequestConfig
  ) {
    return PluginBlogRunV1alpha1ExtensionDefinitionApiFp(this.configuration)
      .createpluginBlogRunV1alpha1ExtensionDefinition(
        requestParameters.extensionDefinition,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Delete plugin.blog.run/v1alpha1/ExtensionDefinition
   * @param {PluginBlogRunV1alpha1ExtensionDefinitionApiDeletepluginBlogRunV1alpha1ExtensionDefinitionRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PluginBlogRunV1alpha1ExtensionDefinitionApi
   */
  public deletepluginBlogRunV1alpha1ExtensionDefinition(
    requestParameters: PluginBlogRunV1alpha1ExtensionDefinitionApiDeletepluginBlogRunV1alpha1ExtensionDefinitionRequest,
    options?: AxiosRequestConfig
  ) {
    return PluginBlogRunV1alpha1ExtensionDefinitionApiFp(this.configuration)
      .deletepluginBlogRunV1alpha1ExtensionDefinition(
        requestParameters.name,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Get plugin.blog.run/v1alpha1/ExtensionDefinition
   * @param {PluginBlogRunV1alpha1ExtensionDefinitionApiGetpluginBlogRunV1alpha1ExtensionDefinitionRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PluginBlogRunV1alpha1ExtensionDefinitionApi
   */
  public getpluginBlogRunV1alpha1ExtensionDefinition(
    requestParameters: PluginBlogRunV1alpha1ExtensionDefinitionApiGetpluginBlogRunV1alpha1ExtensionDefinitionRequest,
    options?: AxiosRequestConfig
  ) {
    return PluginBlogRunV1alpha1ExtensionDefinitionApiFp(this.configuration)
      .getpluginBlogRunV1alpha1ExtensionDefinition(
        requestParameters.name,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * List plugin.blog.run/v1alpha1/ExtensionDefinition
   * @param {PluginBlogRunV1alpha1ExtensionDefinitionApiListpluginBlogRunV1alpha1ExtensionDefinitionRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PluginBlogRunV1alpha1ExtensionDefinitionApi
   */
  public listpluginBlogRunV1alpha1ExtensionDefinition(
    requestParameters: PluginBlogRunV1alpha1ExtensionDefinitionApiListpluginBlogRunV1alpha1ExtensionDefinitionRequest = {},
    options?: AxiosRequestConfig
  ) {
    return PluginBlogRunV1alpha1ExtensionDefinitionApiFp(this.configuration)
      .listpluginBlogRunV1alpha1ExtensionDefinition(
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
   * Update plugin.blog.run/v1alpha1/ExtensionDefinition
   * @param {PluginBlogRunV1alpha1ExtensionDefinitionApiUpdatepluginBlogRunV1alpha1ExtensionDefinitionRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PluginBlogRunV1alpha1ExtensionDefinitionApi
   */
  public updatepluginBlogRunV1alpha1ExtensionDefinition(
    requestParameters: PluginBlogRunV1alpha1ExtensionDefinitionApiUpdatepluginBlogRunV1alpha1ExtensionDefinitionRequest,
    options?: AxiosRequestConfig
  ) {
    return PluginBlogRunV1alpha1ExtensionDefinitionApiFp(this.configuration)
      .updatepluginBlogRunV1alpha1ExtensionDefinition(
        requestParameters.name,
        requestParameters.extensionDefinition,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }
}
