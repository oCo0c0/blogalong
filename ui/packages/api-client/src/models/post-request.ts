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

// May contain unused imports in some cases
// @ts-ignore
import { Content } from "./content";
// May contain unused imports in some cases
// @ts-ignore
import { Post } from "./post";

/**
 *
 * @export
 * @interface PostRequest
 */
export interface PostRequest {
  /**
   *
   * @type {Content}
   * @memberof PostRequest
   */
  content?: Content;
  /**
   *
   * @type {Post}
   * @memberof PostRequest
   */
  post: Post;
}
