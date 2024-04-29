import { ExtensionVideo, VueNodeViewRenderer } from "@blogalong/richtext-editor";
import type { AxiosRequestConfig } from "axios";
import type { Attachment } from "@blogalong/api-client";
import VideoView from "./VideoView.vue";

interface UiVideoOptions {
  uploadVideo?: (
    file: File,
    options?: AxiosRequestConfig
  ) => Promise<Attachment>;
}

const Video = ExtensionVideo.extend<UiVideoOptions>({
  addOptions() {
    const { parent } = this;
    return {
      ...parent?.(),
      uploadVideo: undefined,
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      file: {
        default: null,
        renderHTML() {
          return {};
        },
        parseHTML() {
          return null;
        },
      },
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(VideoView);
  },
});

export default Video;
