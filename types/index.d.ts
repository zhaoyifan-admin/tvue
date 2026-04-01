import type { App, Plugin } from "vue";

export interface TvueInstallOptions {
  size?: string;
  calcHeight?: number;
  menuType?: string;
  formOption?: Record<string, any>;
  crudOption?: Record<string, any>;
  appendToBody?: boolean;
  canvas?: Record<string, any>;
  qiniu?: Record<string, any>;
  ali?: Record<string, any>;
  locale?: any;
  i18n?: any;
  axios?: any;
  [key: string]: any;
}

export interface TvuePlugin extends Plugin {
  version: string;
  locale: any;
  install(app: App, options?: TvueInstallOptions): void;
  [key: string]: any;
}

declare const Tvue: TvuePlugin;

export const version: string;
export const locale: any;
export function install(app: App, options?: TvueInstallOptions): void;
export default Tvue;

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $TVUE: Record<string, any>;
    $DialogForm: any;
    $ImagePreview: any;
    $Export: any;
    $Print: any;
    $Clipboard: any;
    $Watermark: any;
    $Log: any;
    $Screenshot: any;
    $axios: any;
    $uploadFun: (column?: Record<string, any>, safe?: any) => Record<string, any>;
  }
}

export {};
