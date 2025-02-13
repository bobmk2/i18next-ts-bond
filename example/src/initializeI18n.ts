import i18n, { BackendModule, InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

export function initializeI18n(options?: InitOptions) {
  i18n
    .use(LazyImportLocalesPlugin)
    .use(initReactI18next)
    .init({
      fallbackLng: "ja",
      lng: "ja",
      react: {
        useSuspense: true,
      },
      ...options,
    });
}

export const LazyImportLocalesPlugin: BackendModule = {
  type: "backend",
  init: function () {},
  read: function (language, _namespace, callback) {
    import(/* webpackChunkName: "i18n/[request]" */ `./locales/${language}.json`).then((obj) => {
      callback(null, obj);
    });
  },

  save: function () {},

  create: function () {},
};
