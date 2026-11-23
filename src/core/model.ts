import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { toRaw } from 'vue';

// Props, the editable model and emitted payloads must not share mutable values.
export const cloneModel = <T>(value: T): T => cloneDeep(toRaw(value));

export const isModelEqual = (left: any, right: any): boolean =>
  isEqual(left, right);

// Form has historically merged root fields. Preserve omitted fields and keep
// unchanged nested references stable so an echoed v-model does not retrigger it.
export const syncModel = (
  target: Record<string, any>,
  source: Record<string, any> = {},
): boolean => {
  let changed = false;
  Object.keys(source || {}).forEach((prop) => {
    if (!Object.prototype.hasOwnProperty.call(target, prop) ||
        !isModelEqual(target[prop], source[prop])) {
      target[prop] = cloneModel(source[prop]);
      changed = true;
    }
  });
  return changed;
};
