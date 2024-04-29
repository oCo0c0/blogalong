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
import { ReasonSpecAttributes } from "./reason-spec-attributes";
// May contain unused imports in some cases
// @ts-ignore
import { ReasonSubject } from "./reason-subject";

/**
 *
 * @export
 * @interface ReasonSpec
 */
export interface ReasonSpec {
  /**
   *
   * @type {ReasonSpecAttributes}
   * @memberof ReasonSpec
   */
  attributes?: ReasonSpecAttributes;
  /**
   *
   * @type {string}
   * @memberof ReasonSpec
   */
  author: string;
  /**
   *
   * @type {string}
   * @memberof ReasonSpec
   */
  reasonType: string;
  /**
   *
   * @type {ReasonSubject}
   * @memberof ReasonSpec
   */
  subject: ReasonSubject;
}
