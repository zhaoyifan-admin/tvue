type ResourceElement = HTMLScriptElement | HTMLLinkElement;
type ResourceEntry = { element: ResourceElement; promise: Promise<void> };

const resources = new WeakMap<HTMLElement, Map<string, ResourceEntry>>();
const DEFAULT_TIMEOUT = 15000;

const absoluteUrl = (url: string) => {
  try { return new URL(url, document.baseURI).href; } catch { return url; }
};

/** Concurrent callers wait for the same resource; failed loads may be retried. */
export function loadScript(type = 'js', url?: string, dom = 'body', timeout = DEFAULT_TIMEOUT): Promise<void> {
  if (typeof document === 'undefined') return Promise.reject(new Error('当前环境无法加载资源。'));
  if (!url || !url.trim()) return Promise.reject(new TypeError('请提供有效的资源地址。'));
  const parent = dom === 'head' ? document.getElementsByTagName('head')[0] : document.body;
  if (!parent) return Promise.reject(new Error('未找到资源挂载节点。'));
  const isScript = type === 'js';
  const source = absoluteUrl(url);
  const key = `${isScript ? 'js' : 'css'}:${source}`;
  let entries = resources.get(parent);
  if (!entries) { entries = new Map(); resources.set(parent, entries); }
  const cached = entries.get(key);
  if (cached && cached.element.parentNode === parent) return cached.promise;

  const existing = Array.from(parent.children).find(child => {
    const element = child as ResourceElement;
    if (element.tagName.toLowerCase() !== (isScript ? 'script' : 'link')) return false;
    if (!isScript && (element as HTMLLinkElement).rel && (element as HTMLLinkElement).rel !== 'stylesheet') return false;
    const address = isScript ? (element as HTMLScriptElement).src : (element as HTMLLinkElement).href;
    return address && absoluteUrl(address) === source;
  }) as ResourceElement | undefined;
  const element = existing || document.createElement(isScript ? 'script' : 'link');
  // Keep reuse of externally managed tags compatible. Their creator owns the
  // readiness contract; presence/async/document.readyState cannot prove it.
  // Resources started here always use the shared pending promise above.
  if (existing) {
    return Promise.resolve();
  }

  let resolve!: () => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<void>((yes, no) => { resolve = yes; reject = no; });
  const entry = { element, promise };
  entries.set(key, entry);
  let timer: ReturnType<typeof setTimeout> | undefined;
  let settled = false;
  const finish = (error?: Error) => {
    if (settled) return;
    settled = true;
    if (timer !== undefined) clearTimeout(timer);
    element.removeEventListener('load', onLoad);
    element.removeEventListener('error', onError);
    if (error) {
      if (entries!.get(key) === entry) entries!.delete(key);
      if (!existing) element.remove();
      reject(error);
    } else {
      resolve();
    }
  };
  const onLoad = () => finish();
  const onError = () => finish(new Error(`资源加载失败：${url}`));
  element.addEventListener('load', onLoad);
  element.addEventListener('error', onError);
  const wait = Number(timeout);
  const delay = Number.isFinite(wait) ? wait : DEFAULT_TIMEOUT;
  if (delay > 0) timer = setTimeout(() => finish(new Error(`资源加载超时：${url}`)), delay);
  if (!existing) {
    try {
      if (isScript) {
        (element as HTMLScriptElement).type = 'text/javascript';
        (element as HTMLScriptElement).src = source;
      } else {
        (element as HTMLLinkElement).rel = 'stylesheet';
        (element as HTMLLinkElement).type = 'text/css';
        (element as HTMLLinkElement).href = source;
      }
      parent.appendChild(element);
    } catch (error) { finish(error instanceof Error ? error : new Error(String(error))); }
  }
  return promise;
}
