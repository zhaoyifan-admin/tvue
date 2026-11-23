type WidthListener = (width: number) => void;
interface ViewportSubscription {
  listeners: Set<WidthListener>;
  stop: () => void;
}

const subscriptions = new WeakMap<object, ViewportSubscription>();

export const getViewportWidth = () => {
  const rootWidth = typeof document !== 'undefined' ? document.documentElement?.clientWidth : 0;
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const bodyWidth = typeof document !== 'undefined' ? document.body?.clientWidth : 0;
  return rootWidth || windowWidth || bodyWidth || 1024;
};

// Nested CRUD/Form instances share one observer rather than adding a window
// listener for every cell editor. The last subscriber releases both hooks.
export const subscribeViewportWidth = (callback: WidthListener) => {
  callback(getViewportWidth());
  if (typeof window === 'undefined') return () => {};
  const target = window;
  let subscription = subscriptions.get(target);
  if (!subscription) {
    const listeners = new Set<WidthListener>();
    const update = () => {
      const width = getViewportWidth();
      listeners.forEach(listener => listener(width));
    };
    target.addEventListener?.('resize', update);
    const root = typeof document !== 'undefined' ? document.documentElement : null;
    const observer = typeof target.ResizeObserver === 'function' && root
      ? new target.ResizeObserver(update) : null;
    observer?.observe(root);
    subscription = {
      listeners,
      stop() {
        target.removeEventListener?.('resize', update);
        observer?.disconnect();
      },
    };
    subscriptions.set(target, subscription);
  }
  subscription.listeners.add(callback);
  return () => {
    subscription.listeners.delete(callback);
    if (!subscription.listeners.size && subscriptions.get(target) === subscription) {
      subscription.stop();
      subscriptions.delete(target);
    }
  };
};
