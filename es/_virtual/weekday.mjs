/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { getDefaultExportFromCjs } from './_commonjsHelpers.mjs';
import { __require as requireWeekday } from '../node_modules/.pnpm/dayjs@1.11.20/node_modules/dayjs/plugin/weekday.mjs';

var weekdayExports = requireWeekday();
var weekday = /*@__PURE__*/getDefaultExportFromCjs(weekdayExports);

export { weekday as default };
