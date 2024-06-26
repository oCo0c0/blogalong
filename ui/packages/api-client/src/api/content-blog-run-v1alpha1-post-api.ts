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
import { Post } from "../models";
// @ts-ignore
import { PostList } from "../models";
/**
 * ContentBlogRunV1alpha1PostApi - axios parameter creator
 * @export
 */
export const ContentBlogRunV1alpha1PostApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * Create content.blog.run/v1alpha1/Post
     * @param {Post} [post] Fresh post
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createcontentBlogRunV1alpha1Post: async (
      post?: Post,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/apis/content.blog.run/v1alpha1/posts`;
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
        post,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Delete content.blog.run/v1alpha1/Post
     * @param {string} name Name of post
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deletecontentBlogRunV1alpha1Post: async (
      name: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'name' is not null or undefined
      assertParamExists("deletecontentBlogRunV1alpha1Post", "name", name);
      const localVarPath =
        `/apis/content.blog.run/v1alpha1/posts/{name}`.replace(
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
     * Get content.blog.run/v1alpha1/Post
     * @param {string} name Name of post
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getcontentBlogRunV1alpha1Post: async (
      name: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'name' is not null or undefined
      assertParamExists("getcontentBlogRunV1alpha1Post", "name", name);
      const localVarPath =
        `/apis/content.blog.run/v1alpha1/posts/{name}`.replace(
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
     * List content.blog.run/v1alpha1/Post
     * @param {Array<string>} [fieldSelector] Field selector for filtering.
     * @param {Array<string>} [labelSelector] Label selector for filtering.
     * @param {number} [page] The page number. Zero indicates no page.
     * @param {number} [size] Size of one page. Zero indicates no limit.
     * @param {Array<string>} [sort] Sort property and direction of the list result. Support sorting based on attribute name path.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listcontentBlogRunV1alpha1Post: async (
      fieldSelector?: Array<string>,
      labelSelector?: Array<string>,
      page?: number,
      size?: number,
      sort?: Array<string>,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/apis/content.blog.run/v1alpha1/posts`;
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
     * Update content.blog.run/v1alpha1/Post
     * @param {string} name Name of post
     * @param {Post} [post] Updated post
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updatecontentBlogRunV1alpha1Post: async (
      name: string,
      post?: Post,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'name' is not null or undefined
      assertParamExists("updatecontentBlogRunV1alpha1Post", "name", name);
      const localVarPath =
        `/apis/content.blog.run/v1alpha1/posts/{name}`.replace(
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
        post,
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
 * ContentBlogRunV1alpha1PostApi - functional programming interface
 * @export
 */
export const ContentBlogRunV1alpha1PostApiFp = function (
  configuration?: Configuration
) {
  const localVarAxiosParamCreator =
    ContentBlogRunV1alpha1PostApiAxiosParamCreator(configuration);
  return {
    /**
     * Create content.blog.run/v1alpha1/Post
     * @param {Post} [post] Fresh post
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createcontentBlogRunV1alpha1Post(
      post?: Post,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Post>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createcontentBlogRunV1alpha1Post(
          post,
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
     * Delete content.blog.run/v1alpha1/Post
     * @param {string} name Name of post
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deletecontentBlogRunV1alpha1Post(
      name: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.deletecontentBlogRunV1alpha1Post(
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
     * Get content.blog.run/v1alpha1/Post
     * @param {string} name Name of post
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getcontentBlogRunV1alpha1Post(
      name: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Post>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.getcontentBlogRunV1alpha1Post(
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
     * List content.blog.run/v1alpha1/Post
     * @param {Array<string>} [fieldSelector] Field selector for filtering.
     * @param {Array<string>} [labelSelector] Label selector for filtering.
     * @param {number} [page] The page number. Zero indicates no page.
     * @param {number} [size] Size of one page. Zero indicates no limit.
     * @param {Array<string>} [sort] Sort property and direction of the list result. Support sorting based on attribute name path.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listcontentBlogRunV1alpha1Post(
      fieldSelector?: Array<string>,
      labelSelector?: Array<string>,
      page?: number,
      size?: number,
      sort?: Array<string>,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<PostList>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.listcontentBlogRunV1alpha1Post(
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
     * Update content.blog.run/v1alpha1/Post
     * @param {string} name Name of post
     * @param {Post} [post] Updated post
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updatecontentBlogRunV1alpha1Post(
      name: string,
      post?: Post,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Post>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.updatecontentBlogRunV1alpha1Post(
          name,
          post,
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
 * ContentBlogRunV1alpha1PostApi - factory interface
 * @export
 */
export const ContentBlogRunV1alpha1PostApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = ContentBlogRunV1alpha1PostApiFp(configuration);
  return {
    /**
     * Create content.blog.run/v1alpha1/Post
     * @param {ContentBlogRunV1alpha1PostApiCreatecontentBlogRunV1alpha1PostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createcontentBlogRunV1alpha1Post(
      requestParameters: ContentBlogRunV1alpha1PostApiCreatecontentBlogRunV1alpha1PostRequest = {},
      options?: AxiosRequestConfig
    ): AxiosPromise<Post> {
      return localVarFp
        .createcontentBlogRunV1alpha1Post(requestParameters.post, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Delete content.blog.run/v1alpha1/Post
     * @param {ContentBlogRunV1alpha1PostApiDeletecontentBlogRunV1alpha1PostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deletecontentBlogRunV1alpha1Post(
      requestParameters: ContentBlogRunV1alpha1PostApiDeletecontentBlogRunV1alpha1PostRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<void> {
      return localVarFp
        .deletecontentBlogRunV1alpha1Post(requestParameters.name, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Get content.blog.run/v1alpha1/Post
     * @param {ContentBlogRunV1alpha1PostApiGetcontentBlogRunV1alpha1PostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getcontentBlogRunV1alpha1Post(
      requestParameters: ContentBlogRunV1alpha1PostApiGetcontentBlogRunV1alpha1PostRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Post> {
      return localVarFp
        .getcontentBlogRunV1alpha1Post(requestParameters.name, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * List content.blog.run/v1alpha1/Post
     * @param {ContentBlogRunV1alpha1PostApiListcontentBlogRunV1alpha1PostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listcontentBlogRunV1alpha1Post(
      requestParameters: ContentBlogRunV1alpha1PostApiListcontentBlogRunV1alpha1PostRequest = {},
      options?: AxiosRequestConfig
    ): AxiosPromise<PostList> {
      return localVarFp
        .listcontentBlogRunV1alpha1Post(
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
     * Update content.blog.run/v1alpha1/Post
     * @param {ContentBlogRunV1alpha1PostApiUpdatecontentBlogRunV1alpha1PostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updatecontentBlogRunV1alpha1Post(
      requestParameters: ContentBlogRunV1alpha1PostApiUpdatecontentBlogRunV1alpha1PostRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Post> {
      return localVarFp
        .updatecontentBlogRunV1alpha1Post(
          requestParameters.name,
          requestParameters.post,
          options
        )
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * Request parameters for createcontentBlogRunV1alpha1Post operation in ContentBlogRunV1alpha1PostApi.
 * @export
 * @interface ContentBlogRunV1alpha1PostApiCreatecontentBlogRunV1alpha1PostRequest
 */
export interface ContentBlogRunV1alpha1PostApiCreatecontentBlogRunV1alpha1PostRequest {
  /**
   * Fresh post
   * @type {Post}
   * @memberof ContentBlogRunV1alpha1PostApiCreatecontentBlogRunV1alpha1Post
   */
  readonly post?: Post;
}

/**
 * Request parameters for deletecontentBlogRunV1alpha1Post operation in ContentBlogRunV1alpha1PostApi.
 * @export
 * @interface ContentBlogRunV1alpha1PostApiDeletecontentBlogRunV1alpha1PostRequest
 */
export interface ContentBlogRunV1alpha1PostApiDeletecontentBlogRunV1alpha1PostRequest {
  /**
   * Name of post
   * @type {string}
   * @memberof ContentBlogRunV1alpha1PostApiDeletecontentBlogRunV1alpha1Post
   */
  readonly name: string;
}

/**
 * Request parameters for getcontentBlogRunV1alpha1Post operation in ContentBlogRunV1alpha1PostApi.
 * @export
 * @interface ContentBlogRunV1alpha1PostApiGetcontentBlogRunV1alpha1PostRequest
 */
export interface ContentBlogRunV1alpha1PostApiGetcontentBlogRunV1alpha1PostRequest {
  /**
   * Name of post
   * @type {string}
   * @memberof ContentBlogRunV1alpha1PostApiGetcontentBlogRunV1alpha1Post
   */
  readonly name: string;
}

/**
 * Request parameters for listcontentBlogRunV1alpha1Post operation in ContentBlogRunV1alpha1PostApi.
 * @export
 * @interface ContentBlogRunV1alpha1PostApiListcontentBlogRunV1alpha1PostRequest
 */
export interface ContentBlogRunV1alpha1PostApiListcontentBlogRunV1alpha1PostRequest {
  /**
   * Field selector for filtering.
   * @type {Array<string>}
   * @memberof ContentBlogRunV1alpha1PostApiListcontentBlogRunV1alpha1Post
   */
  readonly fieldSelector?: Array<string>;

  /**
   * Label selector for filtering.
   * @type {Array<string>}
   * @memberof ContentBlogRunV1alpha1PostApiListcontentBlogRunV1alpha1Post
   */
  readonly labelSelector?: Array<string>;

  /**
   * The page number. Zero indicates no page.
   * @type {number}
   * @memberof ContentBlogRunV1alpha1PostApiListcontentBlogRunV1alpha1Post
   */
  readonly page?: number;

  /**
   * Size of one page. Zero indicates no limit.
   * @type {number}
   * @memberof ContentBlogRunV1alpha1PostApiListcontentBlogRunV1alpha1Post
   */
  readonly size?: number;

  /**
   * Sort property and direction of the list result. Support sorting based on attribute name path.
   * @type {Array<string>}
   * @memberof ContentBlogRunV1alpha1PostApiListcontentBlogRunV1alpha1Post
   */
  readonly sort?: Array<string>;
}

/**
 * Request parameters for updatecontentBlogRunV1alpha1Post operation in ContentBlogRunV1alpha1PostApi.
 * @export
 * @interface ContentBlogRunV1alpha1PostApiUpdatecontentBlogRunV1alpha1PostRequest
 */
export interface ContentBlogRunV1alpha1PostApiUpdatecontentBlogRunV1alpha1PostRequest {
  /**
   * Name of post
   * @type {string}
   * @memberof ContentBlogRunV1alpha1PostApiUpdatecontentBlogRunV1alpha1Post
   */
  readonly name: string;

  /**
   * Updated post
   * @type {Post}
   * @memberof ContentBlogRunV1alpha1PostApiUpdatecontentBlogRunV1alpha1Post
   */
  readonly post?: Post;
}

/**
 * ContentBlogRunV1alpha1PostApi - object-oriented interface
 * @export
 * @class ContentBlogRunV1alpha1PostApi
 * @extends {BaseAPI}
 */
export class ContentBlogRunV1alpha1PostApi extends BaseAPI {
  /**
   * Create content.blog.run/v1alpha1/Post
   * @param {ContentBlogRunV1alpha1PostApiCreatecontentBlogRunV1alpha1PostRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ContentBlogRunV1alpha1PostApi
   */
  public createcontentBlogRunV1alpha1Post(
    requestParameters: ContentBlogRunV1alpha1PostApiCreatecontentBlogRunV1alpha1PostRequest = {},
    options?: AxiosRequestConfig
  ) {
    return ContentBlogRunV1alpha1PostApiFp(this.configuration)
      .createcontentBlogRunV1alpha1Post(requestParameters.post, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Delete content.blog.run/v1alpha1/Post
   * @param {ContentBlogRunV1alpha1PostApiDeletecontentBlogRunV1alpha1PostRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ContentBlogRunV1alpha1PostApi
   */
  public deletecontentBlogRunV1alpha1Post(
    requestParameters: ContentBlogRunV1alpha1PostApiDeletecontentBlogRunV1alpha1PostRequest,
    options?: AxiosRequestConfig
  ) {
    return ContentBlogRunV1alpha1PostApiFp(this.configuration)
      .deletecontentBlogRunV1alpha1Post(requestParameters.name, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Get content.blog.run/v1alpha1/Post
   * @param {ContentBlogRunV1alpha1PostApiGetcontentBlogRunV1alpha1PostRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ContentBlogRunV1alpha1PostApi
   */
  public getcontentBlogRunV1alpha1Post(
    requestParameters: ContentBlogRunV1alpha1PostApiGetcontentBlogRunV1alpha1PostRequest,
    options?: AxiosRequestConfig
  ) {
    return ContentBlogRunV1alpha1PostApiFp(this.configuration)
      .getcontentBlogRunV1alpha1Post(requestParameters.name, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * List content.blog.run/v1alpha1/Post
   * @param {ContentBlogRunV1alpha1PostApiListcontentBlogRunV1alpha1PostRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ContentBlogRunV1alpha1PostApi
   */
  public listcontentBlogRunV1alpha1Post(
    requestParameters: ContentBlogRunV1alpha1PostApiListcontentBlogRunV1alpha1PostRequest = {},
    options?: AxiosRequestConfig
  ) {
    return ContentBlogRunV1alpha1PostApiFp(this.configuration)
      .listcontentBlogRunV1alpha1Post(
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
   * Update content.blog.run/v1alpha1/Post
   * @param {ContentBlogRunV1alpha1PostApiUpdatecontentBlogRunV1alpha1PostRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ContentBlogRunV1alpha1PostApi
   */
  public updatecontentBlogRunV1alpha1Post(
    requestParameters: ContentBlogRunV1alpha1PostApiUpdatecontentBlogRunV1alpha1PostRequest,
    options?: AxiosRequestConfig
  ) {
    return ContentBlogRunV1alpha1PostApiFp(this.configuration)
      .updatecontentBlogRunV1alpha1Post(
        requestParameters.name,
        requestParameters.post,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }
}
