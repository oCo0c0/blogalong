import {
  ApiConsoleBlogRunV1alpha1PluginApi,
  ApiConsoleBlogRunV1alpha1PostApi,
  ApiConsoleBlogRunV1alpha1SinglePageApi,
  ApiConsoleBlogRunV1alpha1ThemeApi,
  ApiConsoleBlogRunV1alpha1UserApi,
  ApiConsoleBlogRunV1alpha1CommentApi,
  ApiConsoleBlogRunV1alpha1ReplyApi,
  ApiConsoleBlogRunV1alpha1StatsApi,
  ApiConsoleBlogRunV1alpha1AttachmentApi,
  ApiConsoleBlogRunV1alpha1IndicesApi,
  ApiConsoleBlogRunV1alpha1AuthProviderApi,
  ApiConsoleBlogRunV1alpha1SystemApi,
  ApiConsoleBlogRunV1alpha1NotifierApi,
  ApiNotificationBlogRunV1alpha1NotificationApi,
  ContentBlogRunV1alpha1CategoryApi,
  ContentBlogRunV1alpha1CommentApi,
  ContentBlogRunV1alpha1PostApi,
  ContentBlogRunV1alpha1ReplyApi,
  ContentBlogRunV1alpha1SnapshotApi,
  ContentBlogRunV1alpha1TagApi,
  ContentBlogRunV1alpha1SinglePageApi,
  PluginBlogRunV1alpha1PluginApi,
  PluginBlogRunV1alpha1ReverseProxyApi,
  StorageBlogRunV1alpha1AttachmentApi,
  StorageBlogRunV1alpha1GroupApi,
  StorageBlogRunV1alpha1PolicyApi,
  StorageBlogRunV1alpha1PolicyTemplateApi,
  ThemeBlogRunV1alpha1ThemeApi,
  V1alpha1ConfigMapApi,
  V1alpha1MenuApi,
  V1alpha1MenuItemApi,
  V1alpha1RoleApi,
  V1alpha1RoleBindingApi,
  V1alpha1SettingApi,
  V1alpha1UserApi,
  V1alpha1AnnotationSettingApi,
  V1alpha1CacheApi,
  LoginApi,
  AuthBlogRunV1alpha1AuthProviderApi,
  AuthBlogRunV1alpha1UserConnectionApi,
  ApiBlogRunV1alpha1UserApi,
  MigrationBlogRunV1alpha1BackupApi,
  ApiConsoleMigrationBlogRunV1alpha1MigrationApi,
  NotificationBlogRunV1alpha1NotifierDescriptorApi,
  ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi,
  SecurityBlogRunV1alpha1PersonalAccessTokenApi,
  ApiSecurityBlogRunV1alpha1AuthenticationTwoFactorApi,
  UcApiContentBlogRunV1alpha1AttachmentApi,
  UcApiContentBlogRunV1alpha1PostApi,
  UcApiContentBlogRunV1alpha1SnapshotApi,
} from "@blogalong/api-client";
import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";
import { useUserStore } from "@/stores/user";
import { Toast } from "@blogalong/components";
import { i18n } from "@/locales";

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export interface ProblemDetail {
  detail: string;
  instance: string;
  status: number;
  title: string;
  type?: string;
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ProblemDetail>) => {
    if (error.code === "ERR_CANCELED") {
      return Promise.reject(error);
    }

    if (/Network Error/.test(error.message)) {
      // @ts-ignore
      Toast.error(i18n.global.t("core.common.toast.network_error"));
      return Promise.reject(error);
    }

    const errorResponse = error.response;

    if (!errorResponse) {
      Toast.error(i18n.global.t("core.common.toast.network_error"));
      return Promise.reject(error);
    }

    // Don't show error toast
    if (errorResponse.config.mute) {
      return Promise.reject(error);
    }

    const { status } = errorResponse;
    const { title, detail } = errorResponse.data;

    if (status === 401) {
      const userStore = useUserStore();
      userStore.loginModalVisible = true;
      Toast.warning(i18n.global.t("core.common.toast.login_expired"));

      return Promise.reject(error);
    }

    if (title || detail) {
      Toast.error(detail || title);
      return Promise.reject(error);
    }

    Toast.error(i18n.global.t("core.common.toast.unknown_error"));

    return Promise.reject(error);
  }
);

axiosInstance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const apiClient = setupApiClient(axiosInstance);

function setupApiClient(axios: AxiosInstance) {
  return {
    extension: {
      configMap: new V1alpha1ConfigMapApi(undefined, baseURL, axios),
      roleBinding: new V1alpha1RoleBindingApi(undefined, baseURL, axios),
      role: new V1alpha1RoleApi(undefined, baseURL, axios),
      setting: new V1alpha1SettingApi(undefined, baseURL, axios),
      reverseProxy: new PluginBlogRunV1alpha1ReverseProxyApi(
        undefined,
        baseURL,
        axios
      ),
      plugin: new PluginBlogRunV1alpha1PluginApi(undefined, baseURL, axios),
      user: new V1alpha1UserApi(undefined, baseURL, axios),
      theme: new ThemeBlogRunV1alpha1ThemeApi(undefined, baseURL, axios),
      menu: new V1alpha1MenuApi(undefined, baseURL, axios),
      menuItem: new V1alpha1MenuItemApi(undefined, baseURL, axios),
      post: new ContentBlogRunV1alpha1PostApi(undefined, baseURL, axios),
      singlePage: new ContentBlogRunV1alpha1SinglePageApi(
        undefined,
        baseURL,
        axios
      ),
      category: new ContentBlogRunV1alpha1CategoryApi(
        undefined,
        baseURL,
        axios
      ),
      tag: new ContentBlogRunV1alpha1TagApi(undefined, baseURL, axios),
      snapshot: new ContentBlogRunV1alpha1SnapshotApi(
        undefined,
        baseURL,
        axios
      ),
      comment: new ContentBlogRunV1alpha1CommentApi(undefined, baseURL, axios),
      reply: new ContentBlogRunV1alpha1ReplyApi(undefined, baseURL, axios),
      storage: {
        group: new StorageBlogRunV1alpha1GroupApi(undefined, baseURL, axios),
        attachment: new StorageBlogRunV1alpha1AttachmentApi(
          undefined,
          baseURL,
          axios
        ),
        policy: new StorageBlogRunV1alpha1PolicyApi(undefined, baseURL, axios),
        policyTemplate: new StorageBlogRunV1alpha1PolicyTemplateApi(
          undefined,
          baseURL,
          axios
        ),
      },
      annotationSetting: new V1alpha1AnnotationSettingApi(
        undefined,
        baseURL,
        axios
      ),
      authProvider: new AuthBlogRunV1alpha1AuthProviderApi(
        undefined,
        baseURL,
        axios
      ),
      userConnection: new AuthBlogRunV1alpha1UserConnectionApi(
        undefined,
        baseURL,
        axios
      ),
      backup: new MigrationBlogRunV1alpha1BackupApi(undefined, baseURL, axios),
      notifierDescriptors: new NotificationBlogRunV1alpha1NotifierDescriptorApi(
        undefined,
        baseURL,
        axios
      ),
      pat: new SecurityBlogRunV1alpha1PersonalAccessTokenApi(
        undefined,
        baseURL,
        axios
      ),
    },
    // custom endpoints
    user: new ApiConsoleBlogRunV1alpha1UserApi(undefined, baseURL, axios),
    plugin: new ApiConsoleBlogRunV1alpha1PluginApi(undefined, baseURL, axios),
    theme: new ApiConsoleBlogRunV1alpha1ThemeApi(undefined, baseURL, axios),
    post: new ApiConsoleBlogRunV1alpha1PostApi(undefined, baseURL, axios),
    singlePage: new ApiConsoleBlogRunV1alpha1SinglePageApi(
      undefined,
      baseURL,
      axios
    ),
    comment: new ApiConsoleBlogRunV1alpha1CommentApi(undefined, baseURL, axios),
    reply: new ApiConsoleBlogRunV1alpha1ReplyApi(undefined, baseURL, axios),
    stats: new ApiConsoleBlogRunV1alpha1StatsApi(undefined, baseURL, axios),
    attachment: new ApiConsoleBlogRunV1alpha1AttachmentApi(
      undefined,
      baseURL,
      axios
    ),
    login: new LoginApi(undefined, baseURL, axios),
    indices: new ApiConsoleBlogRunV1alpha1IndicesApi(undefined, baseURL, axios),
    authProvider: new ApiConsoleBlogRunV1alpha1AuthProviderApi(
      undefined,
      baseURL,
      axios
    ),
    common: {
      user: new ApiBlogRunV1alpha1UserApi(undefined, baseURL, axios),
    },
    cache: new V1alpha1CacheApi(undefined, baseURL, axios),
    migration: new ApiConsoleMigrationBlogRunV1alpha1MigrationApi(
      undefined,
      baseURL,
      axios
    ),
    system: new ApiConsoleBlogRunV1alpha1SystemApi(undefined, baseURL, axios),
    notifier: new ApiConsoleBlogRunV1alpha1NotifierApi(
      undefined,
      baseURL,
      axios
    ),
    notification: new ApiNotificationBlogRunV1alpha1NotificationApi(
      undefined,
      baseURL,
      axios
    ),
    pat: new ApiSecurityBlogRunV1alpha1PersonalAccessTokenApi(
      undefined,
      baseURL,
      axios
    ),
    twoFactor: new ApiSecurityBlogRunV1alpha1AuthenticationTwoFactorApi(
      undefined,
      baseURL,
      axios
    ),
    uc: {
      post: new UcApiContentBlogRunV1alpha1PostApi(undefined, baseURL, axios),
      attachment: new UcApiContentBlogRunV1alpha1AttachmentApi(
        undefined,
        baseURL,
        axios
      ),
      snapshot: new UcApiContentBlogRunV1alpha1SnapshotApi(
        undefined,
        baseURL,
        axios
      ),
    },
  };
}

export { apiClient, axiosInstance };
