import type { App, Component, Plugin } from "vue";

type AnyRecord = Record<string, any>;

export interface TvueCanvasOptions {
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

export interface TvueOptionWarning {
  path: string;
  message: string;
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
  optionValidate?: boolean;
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
  validateOption(option?: AnyRecord, component?: string): TvueOptionWarning[];
  warnOption(warnings?: TvueOptionWarning[], component?: string): void;
}

export type TvueDialogFormOpener = (opt?: AnyRecord) => any;
export type TvueDialogFormFactory = (context: any) => TvueDialogFormOpener;

export type TvueImagePreviewOpener = (
  datas?: any[],
  index?: number,
  ops?: AnyRecord
) => any;
export type TvueImagePreviewFactory = (context: any) => TvueImagePreviewOpener;

export interface TvueClipboardOptions {
  text: string | number | null | undefined;
  fallback?: boolean;
}

export interface TvueScreenshotOptions extends AnyRecord {
  download?: boolean;
  filename?: string;
  type?: string;
  quality?: number;
  onSuccess?: (canvas: HTMLCanvasElement) => void;
  onError?: (error: Error) => void;
}

export interface TvueWatermarkOptions extends AnyRecord {
  id?: string | HTMLElement;
  text?: string;
  width?: number;
  height?: number;
  fontSize?: string | number;
  fontStyle?: string;
  color?: string;
  degree?: number;
  zIndex?: number;
}

export interface TvueWatermarkInstance {
  remove(): void;
  Repaint(option?: TvueWatermarkOptions): TvueWatermarkInstance;
}

export interface TvuePrintOptions extends AnyRecord {
  noPrint?: string;
  documentTitle?: string;
  timeout?: number;
  onReady?: () => void;
  onBeforePrint?: () => void;
  onAfterPrint?: () => void;
  onError?: (error: Error) => void;
}

export interface TvueExcelPlugin {
  excel(params: AnyRecord): Promise<{ filename: string; sheetName: string; rows: number }>;
  xlsx(file: File, options?: AnyRecord): Promise<{ header: any[]; results: any[]; sheetName: string }>;
  [key: string]: any;
}

export interface TvuePluginExports extends TvueUtilityExports {
  $DialogForm: TvueDialogFormFactory;
  $ImagePreview: TvueImagePreviewFactory;
  $Export: TvueExcelPlugin;
  $Print: (dom: string | HTMLElement | { $el: HTMLElement }, options?: TvuePrintOptions) => any;
  $Clipboard: (options: TvueClipboardOptions) => Promise<void>;
  $Watermark: (option?: TvueWatermarkOptions) => TvueWatermarkInstance;
  $Log: any;
  $Screenshot: (doc: HTMLElement, option?: TvueScreenshotOptions) => Promise<HTMLCanvasElement>;
}

export interface TvueComponentExports {
  Arrays: Component;
  Article: Component;
  Captcha: Component;
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
  FileManager: Component;
  FilterBuilder: Component;
  Flow: Component;
  Form: Component;
  Group: Component;
  Iframe: Component;
  Input: Component;
  InputColor: Component;
  InputCron: Component;
  InputIcon: Component;
  InputMap: Component;
  InputNumber: Component;
  InputOtp: Component;
  InputTable: Component;
  InputTag: Component;
  InputTree: Component;
  License: Component;
  Login: Component;
  Mention: Component;
  Radio: Component;
  Rate: Component;
  QRCode: Component;
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

export const version: string;
export const locale: TvueLocale;
export function install(app: App, options?: TvueInstallOptions): void;
export const $DialogForm: TvueDialogFormFactory;
export const $ImagePreview: TvueImagePreviewFactory;
export const $Export: TvueExcelPlugin;
export const $Print: (dom: string | HTMLElement | { $el: HTMLElement }, options?: TvuePrintOptions) => any;
export const $Clipboard: (options: TvueClipboardOptions) => Promise<void>;
export const $Watermark: (option?: TvueWatermarkOptions) => TvueWatermarkInstance;
export const $Log: any;
export const $Screenshot: (doc: HTMLElement, option?: TvueScreenshotOptions) => Promise<HTMLCanvasElement>;
export const deepClone: TvueUtilityExports["deepClone"];
export const dataURLtoFile: TvueUtilityExports["dataURLtoFile"];
export const isJson: TvueUtilityExports["isJson"];
export const setPx: TvueUtilityExports["setPx"];
export const validData: TvueUtilityExports["validData"];
export const findArray: TvueUtilityExports["findArray"];
export const findNode: TvueUtilityExports["findNode"];
export const validatenull: TvueUtilityExports["validatenull"];
export const downFile: TvueUtilityExports["downFile"];
export const loadScript: TvueUtilityExports["loadScript"];
export const findObject: TvueUtilityExports["findObject"];
export const randomId: TvueUtilityExports["randomId"];
export const validateOption: TvueUtilityExports["validateOption"];
export const warnOption: TvueUtilityExports["warnOption"];
export const Arrays: Component;
export const Article: Component;
export const Captcha: Component;
export const Cascader: Component;
export const Chat: Component;
export const Checkbox: Component;
export const Comment: Component;
export const CountUp: Component;
export const Crud: Component;
export const DataBox: Component;
export const DataCard: Component;
export const DataCardText: Component;
export const DataCountdown: Component;
export const DataDashboard: Component;
export const DataDisplay: Component;
export const DataIcons: Component;
export const DataImgText: Component;
export const DataList: Component;
export const DataNotice: Component;
export const DataOperaText: Component;
export const DataPanel: Component;
export const DataPay: Component;
export const DataPrice: Component;
export const DataProduct: Component;
export const DataProfile: Component;
export const DataProgress: Component;
export const DataRank: Component;
export const DataRotate: Component;
export const DataStatistic: Component;
export const DataTabs: Component;
export const DataTask: Component;
export const DataWeather: Component;
export const Date: Component;
export const Draggable: Component;
export const Dynamic: Component;
export const FileManager: Component;
export const FilterBuilder: Component;
export const Flow: Component;
export const Form: Component;
export const Group: Component;
export const Iframe: Component;
export const Input: Component;
export const InputColor: Component;
export const InputCron: Component;
export const InputIcon: Component;
export const InputMap: Component;
export const InputNumber: Component;
export const InputOtp: Component;
export const InputTable: Component;
export const InputTag: Component;
export const InputTree: Component;
export const License: Component;
export const Login: Component;
export const Mention: Component;
export const Radio: Component;
export const Rate: Component;
export const QRCode: Component;
export const Search: Component;
export const Select: Component;
export const Sign: Component;
export const Slider: Component;
export const Switchs: Component;
export const Tabs: Component;
export const Time: Component;
export const Title: Component;
export const Tree: Component;
export const Upload: Component;
export const Video: Component;
export const textEllipsis: Component;
export default Tvue;

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties extends TvueUtilityExports {
    $TVUE: AnyRecord;
    $DialogForm: TvueDialogFormOpener;
    $ImagePreview: TvueImagePreviewOpener;
    $Export: TvueExcelPlugin;
    $Print: (dom: string | HTMLElement | { $el: HTMLElement }, options?: TvuePrintOptions) => any;
    $Clipboard: (options: TvueClipboardOptions) => Promise<void>;
    $Watermark: (option?: TvueWatermarkOptions) => TvueWatermarkInstance;
    $Log: any;
    $Screenshot: (doc: HTMLElement, option?: TvueScreenshotOptions) => Promise<HTMLCanvasElement>;
    $axios: any;
    $uploadFun: (column?: AnyRecord, safe?: any) => AnyRecord;
  }
}

export {};
