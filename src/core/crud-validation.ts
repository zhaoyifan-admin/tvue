import Schema, { Rules } from 'async-validator';
import get from 'lodash/get';
import has from 'lodash/has';
import toPath from 'lodash/toPath';
import { cloneModel } from './model';
import { validatenull } from '../utils/validate';

type Column = Record<string, any>;
export interface CrudFieldError {
  prop: string;
  message: string;
}

const COMPLEX_TYPES = new Set([
  'title', 'dynamic', 'upload', 'img', 'input-table', 'input-tree',
  'input-map', 'map', 'tree', 'cascader',
]);

// Group headers are presentation only. Imports use their writable leaves.
export const getCrudDataColumns = (columns: Column[] | Record<string, Column> = [], _mode: 'import') => {
  const result: Column[] = [];
  const seen = new Set<string>();
  const visit = (input: Column[] | Record<string, Column>) => {
    const list = Array.isArray(input) ? input : Object.keys(input || {}).map((prop) => ({ ...input[prop], prop: input[prop]?.prop || prop }));
    list.forEach((column) => {
      if (!column || typeof column !== 'object') return;
      const display = validatenull(column.display) ? column.addDisplay : column.display;
      if (column.disabled === true || column.readonly === true || column.detail === true ||
          display === false || column.addDisabled === true ||
          column.addReadonly === true || column.addDetail === true || column.import === false) return;
      if (Array.isArray(column.children)) {
        visit(column.children);
        return;
      }
      if (typeof column.prop !== 'string' || !column.prop || seen.has(column.prop) ||
          COMPLEX_TYPES.has(column.type) || column.component || column.render || column.renderForm) return;
      seen.add(column.prop);
      result.push(cloneModel(column));
    });
  };
  visit(columns);
  return result;
};

export const validateCrudRow = async (
  row: Record<string, any>,
  columns: Column[],
  options: { requiredMessage?: (column: Column) => string } = {},
): Promise<CrudFieldError[]> => {
  const source = cloneModel(row);
  const rules: Rules = {};
  columns.forEach((column) => {
    if (!column.prop) return;
    // Existing rows may contain only Form's alias. A missing nested path must
    // not erase it, while an explicitly present undefined remains a clear.
    if (column.bind && has(source, toPath(column.bind))) {
      source[column.prop] = cloneModel(get(source, toPath(column.bind)));
    }
    const fieldRules: any[] = cloneModel(Array.isArray(column.rules) ? column.rules : []);
    if (column.required === true && !fieldRules.some((rule) => rule.required === true)) {
      fieldRules.unshift({ required: true, message: options.requiredMessage?.(column) });
    }
    fieldRules.forEach((rule) => {
      if (rule.required && !rule.message && options.requiredMessage) rule.message = options.requiredMessage(column);
      delete rule.trigger;
    });
    if (fieldRules.length) rules[column.prop] = fieldRules;
  });
  if (!Object.keys(rules).length) return [];
  try {
    await new Schema(rules).validate(source, { firstFields: true, suppressWarning: true, suppressValidatorError: true });
    return [];
  } catch (error) {
    const issues = Array.isArray(error?.errors) ? error.errors : [error];
    return issues.map((issue: any) => ({
      prop: String(issue?.field || ''),
      message: String(issue?.message || issue || 'Validation failed'),
    }));
  }
};
