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
import { PersonalAccessToken } from "../models";
/**
 * ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi - axios parameter creator
 * @export
 */
export const ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiAxiosParamCreator =
  function (configuration?: Configuration) {
    return {
      /**
       * Delete a PAT
       * @param {string} name
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      deletePat: async (
        name: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'name' is not null or undefined
        assertParamExists("deletePat", "name", name);
        const localVarPath =
          `/apis/api.security.blog.run/v1alpha1/personalaccesstokens/{name}`.replace(
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
       * Generate a PAT.
       * @param {PersonalAccessToken} personalAccessToken
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      generatePat: async (
        personalAccessToken: PersonalAccessToken,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'personalAccessToken' is not null or undefined
        assertParamExists(
          "generatePat",
          "personalAccessToken",
          personalAccessToken
        );
        const localVarPath = `/apis/api.security.blog.run/v1alpha1/personalaccesstokens`;
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
          personalAccessToken,
          localVarRequestOptions,
          configuration
        );

        return {
          url: toPathString(localVarUrlObj),
          options: localVarRequestOptions,
        };
      },
      /**
       * Obtain a PAT.
       * @param {string} name
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      obtainPat: async (
        name: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'name' is not null or undefined
        assertParamExists("obtainPat", "name", name);
        const localVarPath =
          `/apis/api.security.blog.run/v1alpha1/personalaccesstokens/{name}`.replace(
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
       * Obtain PAT list.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      obtainPats: async (
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        const localVarPath = `/apis/api.security.blog.run/v1alpha1/personalaccesstokens`;
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
       * Restore a PAT.
       * @param {string} name
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      restorePat: async (
        name: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'name' is not null or undefined
        assertParamExists("restorePat", "name", name);
        const localVarPath =
          `/apis/api.security.blog.run/v1alpha1/personalaccesstokens/{name}/actions/restoration`.replace(
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
       * Revoke a PAT
       * @param {string} name
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      revokePat: async (
        name: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'name' is not null or undefined
        assertParamExists("revokePat", "name", name);
        const localVarPath =
          `/apis/api.security.blog.run/v1alpha1/personalaccesstokens/{name}/actions/revocation`.replace(
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
 * ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi - functional programming interface
 * @export
 */
export const ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiFp = function (
  configuration?: Configuration
) {
  const localVarAxiosParamCreator =
    ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiAxiosParamCreator(
      configuration
    );
  return {
    /**
     * Delete a PAT
     * @param {string} name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deletePat(
      name: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deletePat(
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
     * Generate a PAT.
     * @param {PersonalAccessToken} personalAccessToken
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async generatePat(
      personalAccessToken: PersonalAccessToken,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<PersonalAccessToken>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.generatePat(
        personalAccessToken,
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
     * Obtain a PAT.
     * @param {string} name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async obtainPat(
      name: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.obtainPat(
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
     * Obtain PAT list.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async obtainPats(
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<Array<PersonalAccessToken>>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.obtainPats(
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
     * Restore a PAT.
     * @param {string} name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async restorePat(
      name: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.restorePat(
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
     * Revoke a PAT
     * @param {string} name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async revokePat(
      name: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.revokePat(
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
  };
};

/**
 * ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi - factory interface
 * @export
 */
export const ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiFactory =
  function (
    configuration?: Configuration,
    basePath?: string,
    axios?: AxiosInstance
  ) {
    const localVarFp =
      ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiFp(configuration);
    return {
      /**
       * Delete a PAT
       * @param {ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiDeletePatRequest} requestParameters Request parameters.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      deletePat(
        requestParameters: ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiDeletePatRequest,
        options?: AxiosRequestConfig
      ): AxiosPromise<void> {
        return localVarFp
          .deletePat(requestParameters.name, options)
          .then((request) => request(axios, basePath));
      },
      /**
       * Generate a PAT.
       * @param {ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiGeneratePatRequest} requestParameters Request parameters.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      generatePat(
        requestParameters: ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiGeneratePatRequest,
        options?: AxiosRequestConfig
      ): AxiosPromise<PersonalAccessToken> {
        return localVarFp
          .generatePat(requestParameters.personalAccessToken, options)
          .then((request) => request(axios, basePath));
      },
      /**
       * Obtain a PAT.
       * @param {ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiObtainPatRequest} requestParameters Request parameters.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      obtainPat(
        requestParameters: ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiObtainPatRequest,
        options?: AxiosRequestConfig
      ): AxiosPromise<void> {
        return localVarFp
          .obtainPat(requestParameters.name, options)
          .then((request) => request(axios, basePath));
      },
      /**
       * Obtain PAT list.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      obtainPats(
        options?: AxiosRequestConfig
      ): AxiosPromise<Array<PersonalAccessToken>> {
        return localVarFp
          .obtainPats(options)
          .then((request) => request(axios, basePath));
      },
      /**
       * Restore a PAT.
       * @param {ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiRestorePatRequest} requestParameters Request parameters.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      restorePat(
        requestParameters: ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiRestorePatRequest,
        options?: AxiosRequestConfig
      ): AxiosPromise<void> {
        return localVarFp
          .restorePat(requestParameters.name, options)
          .then((request) => request(axios, basePath));
      },
      /**
       * Revoke a PAT
       * @param {ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiRevokePatRequest} requestParameters Request parameters.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      revokePat(
        requestParameters: ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiRevokePatRequest,
        options?: AxiosRequestConfig
      ): AxiosPromise<void> {
        return localVarFp
          .revokePat(requestParameters.name, options)
          .then((request) => request(axios, basePath));
      },
    };
  };

/**
 * Request parameters for deletePat operation in ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi.
 * @export
 * @interface ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiDeletePatRequest
 */
export interface ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiDeletePatRequest {
  /**
   *
   * @type {string}
   * @memberof ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiDeletePat
   */
  readonly name: string;
}

/**
 * Request parameters for generatePat operation in ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi.
 * @export
 * @interface ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiGeneratePatRequest
 */
export interface ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiGeneratePatRequest {
  /**
   *
   * @type {PersonalAccessToken}
   * @memberof ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiGeneratePat
   */
  readonly personalAccessToken: PersonalAccessToken;
}

/**
 * Request parameters for obtainPat operation in ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi.
 * @export
 * @interface ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiObtainPatRequest
 */
export interface ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiObtainPatRequest {
  /**
   *
   * @type {string}
   * @memberof ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiObtainPat
   */
  readonly name: string;
}

/**
 * Request parameters for restorePat operation in ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi.
 * @export
 * @interface ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiRestorePatRequest
 */
export interface ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiRestorePatRequest {
  /**
   *
   * @type {string}
   * @memberof ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiRestorePat
   */
  readonly name: string;
}

/**
 * Request parameters for revokePat operation in ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi.
 * @export
 * @interface ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiRevokePatRequest
 */
export interface ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiRevokePatRequest {
  /**
   *
   * @type {string}
   * @memberof ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiRevokePat
   */
  readonly name: string;
}

/**
 * ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi - object-oriented interface
 * @export
 * @class ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi
 * @extends {BaseAPI}
 */
export class ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi extends BaseAPI {
  /**
   * Delete a PAT
   * @param {ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiDeletePatRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi
   */
  public deletePat(
    requestParameters: ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiDeletePatRequest,
    options?: AxiosRequestConfig
  ) {
    return ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiFp(
      this.configuration
    )
      .deletePat(requestParameters.name, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Generate a PAT.
   * @param {ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiGeneratePatRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi
   */
  public generatePat(
    requestParameters: ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiGeneratePatRequest,
    options?: AxiosRequestConfig
  ) {
    return ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiFp(
      this.configuration
    )
      .generatePat(requestParameters.personalAccessToken, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Obtain a PAT.
   * @param {ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiObtainPatRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi
   */
  public obtainPat(
    requestParameters: ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiObtainPatRequest,
    options?: AxiosRequestConfig
  ) {
    return ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiFp(
      this.configuration
    )
      .obtainPat(requestParameters.name, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Obtain PAT list.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi
   */
  public obtainPats(options?: AxiosRequestConfig) {
    return ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiFp(
      this.configuration
    )
      .obtainPats(options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Restore a PAT.
   * @param {ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiRestorePatRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi
   */
  public restorePat(
    requestParameters: ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiRestorePatRequest,
    options?: AxiosRequestConfig
  ) {
    return ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiFp(
      this.configuration
    )
      .restorePat(requestParameters.name, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Revoke a PAT
   * @param {ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiRevokePatRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi
   */
  public revokePat(
    requestParameters: ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiRevokePatRequest,
    options?: AxiosRequestConfig
  ) {
    return ApiSecurityBlogRunV1alpha1PersonalAccessTokenApiFp(
      this.configuration
    )
      .revokePat(requestParameters.name, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
