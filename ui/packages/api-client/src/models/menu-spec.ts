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
 * The spec of menu.
 * @export
 * @interface MenuSpec
 */
export interface MenuSpec {
  /**
   * The display name of the menu.
   * @type {string}
   * @memberof MenuSpec
   */
  displayName: string;
  /**
   * Names of menu children below this menu.
   * @type {Array<string>}
   * @memberof MenuSpec
   */
  menuItems?: Array<string>;
}
