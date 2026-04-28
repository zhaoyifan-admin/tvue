import type { App, Component, Plugin } from "vue";

type AnyRecord = Record<string, any>;

export interface TvueInstallOptions {
  text?: string;
  fontFamily?: string;
  color?: string;
  fontSize?: number;
  opacity?: number;
  bottom?: number;
  right?: number;
  ratio?: number;
  [key: string]: any;
}

export interface TvueQiniuOptions {
  AK?: string;
  SK?: string;
  scope?: string;
  url?: string;
  bucket?: string;
  deadline?: number;
  [key: string]: any;
}

export interface TvueAliOptions {
  region?: string;
  endpoint?: string;
  stsToken?: string;
  accessKeyId?: string;
  accessKeySecret?: string;
  bucket?: string;
  [key: string]: any;
}

export type TvueLocalePrimitive = string | number | boolean;

export interface TvueLocaleMessages {
  [key: string]:
    | TvueLocalePrimitive
    | TvueLocaleMessages
    | Array<TvueLocalePrimitive | TvueLocaleMessages>;
}

export type TvueLocaleInput = string | TvueLocaleMessages | null | undefined;

export type TvueTranslateHandler = (
  this: any,
  path: string,
  options?: any,
  locale?: TvueLocaleMessages
) => unknown;

export interface TvueLocale {
  register(code: string, locale: TvueLocaleMessages, aliases?: string[]): TvueLocaleMessages;
  use(locale?: TvueLocaleInput, override?: TvueLocaleMessages): TvueLocaleMessages;
  t(path: string, options?: any): any;
  i18n(handler?: TvueTranslateHandler | null): TvueTranslateHandler | null;
  getLocale(code?: string): TvueLocaleMessages;
  getLocaleCode(): string;
}

export interface TvueInstallOptions {
  size?: string;
  calcHeight?: number;
  menuType?: string;
  formOption?: AnyRecord;
  crudOption?: AnyRecord;
  appendToBody?: boolean;
  canvas?: TvueCanvasOptions;
  qiniu?: TvueQiniuOptions;
  ali?: TvueAliOptions;
  locale?: string | TvueLocaleMessages;
  i18n?: any;
  axios?: any;
  [key: string]: any;
}

export interface TvueUtilityExports {
  deepClone<T>(data: T): T;
  dataURLtoFile(dataurl: string, filename: string): File;
  isJson(value: any): boolean;
  setPx(value: string | number, defaultValue?: string | number): string;
  validData<T>(value: T, defaultValue: T): T;
  findArray<T = any>(
    list?: T[],
    value?: any,
    valueKey?: string,
    index?: boolean
  ): T | number | undefined;
  findNode<T = AnyRecord>(
    list?: T[],
    props?: AnyRecord,
    value?: any
  ): T | undefined;
  validatenull(value: any): boolean;
  downFile(url: string | Blob, saveName?: string): void;
  loadScript(type?: "js" | "css", url?: string, dom?: "head" | "body"): Promise<void>;
  findObject<T = AnyRecord>(list?: T[], value?: any, prop?: string): T | undefined;
  randomId(): string;
}

export type TvueDialogFormOpener = (opt?: AnyRecord) => any;
export type TvueDialogFormFactory = (context: any) => TvueDialogFormOpener;

export type TvueImagePreviewOpener = (
  datas?: any[],
  index?: number,
  ops?: AnyRecord
) => any;
export type TvueImagePreviewFactory = (context: any) => TvueImagePreviewOpener;

export interface TvuePluginExports extends TvueUtilityExports {
  $DialogForm: TvueDialogFormFactory;
  $ImagePreview: TvueImagePreviewFactory;
  $Export: any;
  $Print: any;
  $Clipboard: ({ text }: { text: string }) => Promise<void>;
  $Watermark: any;
  $Log: any;
  $Screenshot: (doc: HTMLElement, option?: AnyRecord) => any;
}

export interface TvueComponentExports {
  Arrays: Component;
  Article: Component;
  Card: Component;
  Cascader: Component;
  Chat: Component;
  Checkbox: Component;
  Comment: Component;
  CountUp: Component;
  Crud: Component;
  DataBox: Component;
  DataCard: Component;
  DataCardText: Component;
  DataCountdown: Component;
  DataDashboard: Component;
  DataDisplay: Component;
  DataIcons: Component;
  DataImgText: Component;
  DataList: Component;
  DataNotice: Component;
  DataOperaText: Component;
  DataPanel: Component;
  DataPay: Component;
  DataPrice: Component;
  DataProduct: Component;
  DataProfile: Component;
  DataProgress: Component;
  DataRank: Component;
  DataRotate: Component;
  DataStatistic: Component;
  DataTabs: Component;
  DataTask: Component;
  DataWeather: Component;
  Date: Component;
  Draggable: Component;
  Dynamic: Component;
  Flow: Component;
  Form: Component;
  Group: Component;
  Input: Component;
  InputColor: Component;
  InputCron: Component;
  InputIcon: Component;
  InputMap: Component;
  InputNumber: Component;
  InputTable: Component;
  InputTag: Component;
  InputTree: Component;
  License: Component;
  Login: Component;
  Mention: Component;
  Radio: Component;
  Rate: Component;
  Search: Component;
  Select: Component;
  Sign: Component;
  Slider: Component;
  Switchs: Component;
  Tabs: Component;
  Time: Component;
  Title: Component;
  Tree: Component;
  Upload: Component;
  Verifys: Component;
  Video: Component;
  textEllipsis: Component;
}

export interface TvuePlugin
  extends Plugin,
    TvueComponentExports,
    TvuePluginExports {
  version: string;
  locale: TvueLocale;
  install(app: App, options?: TvueInstallOptions): void;
}

declare const Tvue: TvuePlugin;

export function install(app: App, options?: TvueInstallOptions): void;
export default Tvue;

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties extends TvueUtilityExports {
    $TVUE: AnyRecord;
    $DialogForm: TvueDialogFormOpener;
    $ImagePreview: TvueImagePreviewOpener;
    $Export: any;
    $Print: any;
    $Clipboard: ({ text }: { text: string }) => Promise<void>;
    $Watermark: any;
    $Log: any;
    $Screenshot: (doc: HTMLElement, option?: AnyRecord) => any;
    $axios: any;
    $uploadFun: (column?: AnyRecord, safe?: any) => AnyRecord;
  }
}

export {};
