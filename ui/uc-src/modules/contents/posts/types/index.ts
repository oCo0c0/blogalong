import type { PostSpecVisibleEnum } from "@blogalong/api-client";

export interface PostFormState {
  title: string;
  slug: string;
  categories?: string[];
  tags?: string[];
  excerptAutoGenerate: boolean;
  excerptRaw?: string;
  allowComment: boolean;
  pinned: boolean;
  visible: PostSpecVisibleEnum;
  publishTime?: string;
  cover?: string;
}
