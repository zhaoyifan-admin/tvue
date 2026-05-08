/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import locale from '../../../src/core/locale.mjs';
import props from '../../core/common/props2.mjs';
import event from '../../core/common/event2.mjs';
import dayjs from '../../../_virtual/dayjs.min.mjs';
import weekday from '../../../_virtual/weekday.mjs';
import localeData from '../../../_virtual/localeData.mjs';
import customParseFormat from '../../../_virtual/customParseFormat.mjs';
import weekOfYear from '../../../_virtual/weekOfYear.mjs';
import weekYear from '../../../_virtual/weekYear.mjs';
import advancedFormat from '../../../_virtual/advancedFormat.mjs';
import quarterOfYear from '../../../_virtual/quarterOfYear.mjs';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(advancedFormat);
dayjs.extend(quarterOfYear);

var script = create({
  name: "ant-date",
  mixins: [props(), event(), locale],
  emits: ['update:modelValue', 'focus', 'blur', 'change', 'open-change', 'panel-change'],
  props: {
    prefixIcon: String,
    disabledDate: Function,
    disabledHours: Function,
    disabledMinutes: Function,
    disabledSeconds: Function,
    showNow: {
      type: Boolean,
      default: true,
    },
    value: {},
    startPlaceholder: String,
    endPlaceholder: String,
    rangeSeparator: {
      type: String,
      default: "~",
    },
    defaultValue: [String, Array],
    defaultPickerValue: [String, Array],
    type: {
      type: String,
      default: "ant-date",
    },
    pickerType: {
      type: String,
      default: "date",
    },
    valueFormat: String,
    format: String,
    popperAppendToBody: {
      type: Boolean,
      default: true,
    },
    hourStep: {
      type: Number,
      default: 1,
    },
    minuteStep: {
      type: Number,
      default: 1,
    },
    secondStep: {
      type: Number,
      default: 1,
    },
    hideDisabledOptions: {
      type: Boolean,
      default: false,
    },
    shortcuts: {
      type: [Array, Function],
      default: () => [],
    },
  },
  watch: {
    modelValue: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.initDateValue();
        }
      },
      immediate: true,
    },
  },
  computed: {
    isSinglePicker() {
      return ['ant-date', 'ant-datetime', 'ant-month', 'ant-week'].includes(this.type);
    },
    isSingleTimePicker() {
      return this.type === 'ant-time';
    },
    isRangePicker() {
      return ['ant-daterange', 'ant-datetimerange'].includes(this.type);
    },
    isTimeRangePicker() {
      return this.type === 'ant-timerange';
    },
    showTimeConfig() {
      if (['ant-datetimerange', 'ant-datetime'].includes(this.type)) {
        return {
          disabledHours: this.disabledHours,
          disabledMinutes: this.disabledMinutes,
          disabledSeconds: this.disabledSeconds,
        };
      }
      return false;
    },
    presetsConfig() {
      if (!this.shortcuts || (Array.isArray(this.shortcuts) && this.shortcuts.length === 0)) {
        return undefined;
      }

      const shortcuts = typeof this.shortcuts === 'function' ? this.shortcuts() : this.shortcuts;

      return shortcuts.map(item => {
        const value = typeof item.value === 'function' ? item.value() : item.value;
        return {
          label: item.text,
          value: value instanceof Date ? dayjs(value) : dayjs(value),
        };
      });
    },
  },
  methods: {
    getPlaceholder() {
      const placeholderMap = {
        'ant-date': this.t('date.placeholder'),
        'ant-datetime': this.t('date.placeholder'),
        'ant-month': this.t('date.monthPlaceholder'),
        'ant-week': this.t('date.weekPlaceholder'),
        'ant-time': this.t('date.timePlaceholder'),
      };
      return this.placeholder || placeholderMap[this.type] || this.t('date.placeholder');
    },
    initDateValue() {
      let val = this.modelValue;

      if (this.validatenull(val)) {
        this.text = undefined;
        return;
      }

      if (['ant-daterange', 'ant-datetimerange', 'ant-timerange'].includes(this.type)) {
        if (Array.isArray(val)) {
          this.text = val.map(v => {
            if (!v) return undefined;
            if (v.$isDayjsObject) return v;
            let parsed = this.valueFormat ? dayjs(v, this.valueFormat) : dayjs(v);
            if (!parsed.isValid()) {
              parsed = dayjs(v);
            }
            return parsed.isValid() ? parsed : undefined;
          });
        } else if (typeof val === 'string') {
          const dates = val.split(this.rangeSeparator || '~');
          this.text = dates.map(d => {
            if (!d || !d.trim()) return undefined;
            let parsed = this.valueFormat ? dayjs(d.trim(), this.valueFormat) : dayjs(d.trim());
            if (!parsed.isValid()) {
              parsed = dayjs(d.trim());
            }
            return parsed.isValid() ? parsed : undefined;
          });
        } else {
          this.text = undefined;
        }
      }
      else {
        if (!val) {
          this.text = undefined;
        } else if (val.$isDayjsObject) {
          this.text = val;
        } else {
          let parsed = this.valueFormat ? dayjs(val, this.valueFormat) : dayjs(val);
          if (!parsed.isValid()) {
            parsed = dayjs(val);
          }
          this.text = parsed.isValid() ? parsed : undefined;
        }
      }
    },
    handleChange(date, dateString) {
      let result;

      if (this.validatenull(date)) {
        result = ['ant-daterange', 'ant-datetimerange', 'ant-timerange'].includes(this.type) ? [] : undefined;
      }
      else if (this.valueFormat) {
        if (Array.isArray(date)) {
          result = date.map(d => {
            if (d && d.$isDayjsObject && d.isValid()) {
              return d.format(this.valueFormat);
            }
            return '';
          });
        } else {
          if (date && date.$isDayjsObject && date.isValid()) {
            result = date.format(this.valueFormat);
          } else {
            result = dateString;
          }
        }
      }
      else {
        if (Array.isArray(date)) {
          result = date.map(d => {
            if (d && d.$isDayjsObject && d.isValid()) {
              return d.valueOf();
            }
            return '';
          });
        } else {
          if (date && date.$isDayjsObject && date.isValid()) {
            result = date.valueOf();
          } else {
            result = dateString;
          }
        }
      }

      const current = this.modelValue;
      let isChanged = true;

      if (Array.isArray(result) && Array.isArray(current)) {
        isChanged = JSON.stringify(result) !== JSON.stringify(current);
      } else {
        isChanged = result !== current;
      }

      if (isChanged) {
        const emitValue = this.validatenull(result) ? undefined : result;
        this.$emit('update:modelValue', emitValue);
        this.bindEvent('change', { value: emitValue, date });
      }
    },
    validatenull(val) {
      if (val === undefined || val === null || val === '') return true;
      if (Array.isArray(val) && val.length === 0) return true;
      if (typeof val === 'string' && val.trim() === '') return true;
      return false;
    },
    handleFocus(event) {
      this.bindEvent('focus', event);
    },
    handleBlur(event) {
      this.bindEvent('blur', event);
    },
    handleOpenChange(open) {
      this.$emit('open-change', open);
    },
    handlePanelChange(value, mode) {
      this.$emit('panel-change', { value, mode });
    },
    getDisabledTime(date) {
      if (this.disabledHours || this.disabledMinutes || this.disabledSeconds) {
        return {
          disabledHours: this.disabledHours,
          disabledMinutes: this.disabledMinutes,
          disabledSeconds: this.disabledSeconds,
        };
      }
      return undefined;
    },
    getDisabledDate(current) {
      if (!this.disabledDate) return false;

      const dateObj = current.toDate();
      return this.disabledDate(dateObj);
    },
  },
});

export { script as default };
