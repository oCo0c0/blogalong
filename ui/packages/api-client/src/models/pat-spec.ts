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

/**
 *
 * @export
 * @interface PatSpec
 */
export interface PatSpec {
  /**
   *
   * @type {string}
   * @memberof PatSpec
   */
  description?: string;
  /**
   *
   * @type {string}
   * @memberof PatSpec
   */
  expiresAt?: string;
  /**
   *
   * @type {string}
   * @memberof PatSpec
   */
  lastUsed?: string;
  /**
   *
   * @type {string}
   * @memberof PatSpec
   */
  name: string;
  /**
   *
   * @type {boolean}
   * @memberof PatSpec
   */
  revoked?: boolean;
  /**
   *
   * @type {string}
   * @memberof PatSpec
   */
  revokesAt?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof PatSpec
   */
  roles?: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof PatSpec
   */
  scopes?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof PatSpec
   */
  tokenId: string;
  /**
   *
   * @type {string}
   * @memberof PatSpec
   */
  username: string;
}