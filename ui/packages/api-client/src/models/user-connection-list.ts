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
import { UserConnection } from "./user-connection";

/**
 *
 * @export
 * @interface UserConnectionList
 */
export interface UserConnectionList {
  /**
   * Indicates whether current page is the first page.
   * @type {boolean}
   * @memberof UserConnectionList
   */
  first: boolean;
  /**
   * Indicates whether current page has previous page.
   * @type {boolean}
   * @memberof UserConnectionList
   */
  hasNext: boolean;
  /**
   * Indicates whether current page has previous page.
   * @type {boolean}
   * @memberof UserConnectionList
   */
  hasPrevious: boolean;
  /**
   * A chunk of items.
   * @type {Array<UserConnection>}
   * @memberof UserConnectionList
   */
  items: Array<UserConnection>;
  /**
   * Indicates whether current page is the last page.
   * @type {boolean}
   * @memberof UserConnectionList
   */
  last: boolean;
  /**
   * Page number, starts from 1. If not set or equal to 0, it means no pagination.
   * @type {number}
   * @memberof UserConnectionList
   */
  page: number;
  /**
   * Size of each page. If not set or equal to 0, it means no pagination.
   * @type {number}
   * @memberof UserConnectionList
   */
  size: number;
  /**
   * Total elements.
   * @type {number}
   * @memberof UserConnectionList
   */
  total: number;
  /**
   * Indicates total pages.
   * @type {number}
   * @memberof UserConnectionList
   */
  totalPages: number;
}
