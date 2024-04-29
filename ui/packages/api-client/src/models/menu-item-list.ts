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
import { MenuItem } from "./menu-item";

/**
 *
 * @export
 * @interface MenuItemList
 */
export interface MenuItemList {
  /**
   * Indicates whether current page is the first page.
   * @type {boolean}
   * @memberof MenuItemList
   */
  first: boolean;
  /**
   * Indicates whether current page has previous page.
   * @type {boolean}
   * @memberof MenuItemList
   */
  hasNext: boolean;
  /**
   * Indicates whether current page has previous page.
   * @type {boolean}
   * @memberof MenuItemList
   */
  hasPrevious: boolean;
  /**
   * A chunk of items.
   * @type {Array<MenuItem>}
   * @memberof MenuItemList
   */
  items: Array<MenuItem>;
  /**
   * Indicates whether current page is the last page.
   * @type {boolean}
   * @memberof MenuItemList
   */
  last: boolean;
  /**
   * Page number, starts from 1. If not set or equal to 0, it means no pagination.
   * @type {number}
   * @memberof MenuItemList
   */
  page: number;
  /**
   * Size of each page. If not set or equal to 0, it means no pagination.
   * @type {number}
   * @memberof MenuItemList
   */
  size: number;
  /**
   * Total elements.
   * @type {number}
   * @memberof MenuItemList
   */
  total: number;
  /**
   * Indicates total pages.
   * @type {number}
   * @memberof MenuItemList
   */
  totalPages: number;
}
