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
import { Attachment } from "../models";

/**
 * UcApiContentBlogRunV1alpha1AttachmentApi - axios parameter creator
 * @export
 */
export const UcApiContentBlogRunV1alpha1AttachmentApiAxiosParamCreator =
  function (configuration?: Configuration) {
    return {
      /**
       * Create attachment for the given post.
       * @param {File} file
       * @param {boolean} [waitForPermalink] Wait for permalink.
       * @param {string} [postName] Post name.
       * @param {string} [singlePageName] Single page name.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createAttachmentForPost: async (
        file: File,
        waitForPermalink?: boolean,
        postName?: string,
        singlePageName?: string,
        options: AxiosRequestConfig = {}
      ): Promise<RequestArgs> => {
        // verify required parameter 'file' is not null or undefined
        assertParamExists("createAttachmentForPost", "file", file);
        const localVarPath = `/apis/uc.api.content.blog.run/v1alpha1/attachments`;
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
        const localVarFormParams = new ((configuration &&
          configuration.formDataCtor) ||
          FormData)();

        // authentication BasicAuth required
        // http basic authentication required
        setBasicAuthToObject(localVarRequestOptions, configuration);

        // authentication BearerAuth required
        // http bearer authentication required
        await setBearerAuthToObject(localVarHeaderParameter, configuration);

        if (waitForPermalink !== undefined) {
          localVarQueryParameter["waitForPermalink"] = waitForPermalink;
        }

        if (file !== undefined) {
          localVarFormParams.append("file", file as any);
        }

        if (postName !== undefined) {
          localVarFormParams.append("postName", postName as any);
        }

        if (singlePageName !== undefined) {
          localVarFormParams.append("singlePageName", singlePageName as any);
        }

        localVarHeaderParameter["Content-Type"] = "multipart/form-data";

        setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions =
          baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = {
          ...localVarHeaderParameter,
          ...headersFromBaseOptions,
          ...options.headers,
        };
        localVarRequestOptions.data = localVarFormParams;

        return {
          url: toPathString(localVarUrlObj),
          options: localVarRequestOptions,
        };
      },
    };
  };

/**
 * UcApiContentBlogRunV1alpha1AttachmentApi - functional programming interface
 * @export
 */
export const UcApiContentBlogRunV1alpha1AttachmentApiFp = function (
  configuration?: Configuration
) {
  const localVarAxiosParamCreator =
    UcApiContentBlogRunV1alpha1AttachmentApiAxiosParamCreator(configuration);
  return {
    /**
     * Create attachment for the given post.
     * @param {File} file
     * @param {boolean} [waitForPermalink] Wait for permalink.
     * @param {string} [postName] Post name.
     * @param {string} [singlePageName] Single page name.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createAttachmentForPost(
      file: File,
      waitForPermalink?: boolean,
      postName?: string,
      singlePageName?: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Attachment>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createAttachmentForPost(
          file,
          waitForPermalink,
          postName,
          singlePageName,
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
 * UcApiContentBlogRunV1alpha1AttachmentApi - factory interface
 * @export
 */
export const UcApiContentBlogRunV1alpha1AttachmentApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = UcApiContentBlogRunV1alpha1AttachmentApiFp(configuration);
  return {
    /**
     * Create attachment for the given post.
     * @param {UcApiContentBlogRunV1alpha1AttachmentApiCreateAttachmentForPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createAttachmentForPost(
      requestParameters: UcApiContentBlogRunV1alpha1AttachmentApiCreateAttachmentForPostRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Attachment> {
      return localVarFp
        .createAttachmentForPost(
          requestParameters.file,
          requestParameters.waitForPermalink,
          requestParameters.postName,
          requestParameters.singlePageName,
          options
        )
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * Request parameters for createAttachmentForPost operation in UcApiContentBlogRunV1alpha1AttachmentApi.
 * @export
 * @interface UcApiContentBlogRunV1alpha1AttachmentApiCreateAttachmentForPostRequest
 */
export interface UcApiContentBlogRunV1alpha1AttachmentApiCreateAttachmentForPostRequest {
  /**
   *
   * @type {File}
   * @memberof UcApiContentBlogRunV1alpha1AttachmentApiCreateAttachmentForPost
   */
  readonly file: File;

  /**
   * Wait for permalink.
   * @type {boolean}
   * @memberof UcApiContentBlogRunV1alpha1AttachmentApiCreateAttachmentForPost
   */
  readonly waitForPermalink?: boolean;

  /**
   * Post name.
   * @type {string}
   * @memberof UcApiContentBlogRunV1alpha1AttachmentApiCreateAttachmentForPost
   */
  readonly postName?: string;

  /**
   * Single page name.
   * @type {string}
   * @memberof UcApiContentBlogRunV1alpha1AttachmentApiCreateAttachmentForPost
   */
  readonly singlePageName?: string;
}

/**
 * UcApiContentBlogRunV1alpha1AttachmentApi - object-oriented interface
 * @export
 * @class UcApiContentBlogRunV1alpha1AttachmentApi
 * @extends {BaseAPI}
 */
export class UcApiContentBlogRunV1alpha1AttachmentApi extends BaseAPI {
  /**
   * Create attachment for the given post.
   * @param {UcApiContentBlogRunV1alpha1AttachmentApiCreateAttachmentForPostRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UcApiContentBlogRunV1alpha1AttachmentApi
   */
  public createAttachmentForPost(
    requestParameters: UcApiContentBlogRunV1alpha1AttachmentApiCreateAttachmentForPostRequest,
    options?: AxiosRequestConfig
  ) {
    return UcApiContentBlogRunV1alpha1AttachmentApiFp(this.configuration)
      .createAttachmentForPost(
        requestParameters.file,
        requestParameters.waitForPermalink,
        requestParameters.postName,
        requestParameters.singlePageName,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }
}
