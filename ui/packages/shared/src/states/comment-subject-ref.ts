import type { Extension } from "@blogalong/api-client";
import type { RouteLocationRaw } from "vue-router";

export interface CommentSubjectRefResult {
  label: string;
  title: string;
  route?: RouteLocationRaw;
  externalUrl?: string;
}

export type CommentSubjectRefProvider = {
  kind: string;
  group: string;
  resolve: (subject: Extension) => CommentSubjectRefResult;
};
