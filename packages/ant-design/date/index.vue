<template>
  <div :class="b()">
    <a-date-picker
      v-if="isSinglePicker && !isTimePicker"
      v-model:value="text"
      :size="size"
      :allow-clear="clearableVal"
      :disabled="disabled"
      :format="format"
      :placeholder="getPlaceholder()"
      :disabled-date="getDisabledDate"
      :disabled-time="getDisabledTime"
      :default-value="defaultValue"
      :default-picker-value="defaultPickerValue"
      :show-time="showTimeConfig"
      :show-today="showNow"
      :presets="presetsConfig"
      :picker="pickerType"
      :hour-step="hourStep"
      :minute-step="minuteStep"
      :second-step="secondStep"
      :hide-disabled-options="hideDisabledOptions"
      :dropdown-class-name="popperClass"
      :get-popup-container="popperAppendToBody ? undefined : triggerNode => triggerNode.parentNode"
      @change="handleChange"
      @open-change="handleOpenChange"
      @panel-change="handlePanelChange"
    >
      <template #dateRender="{ current, today }">
        <slot :item="{ text: current.date(), renderText: current.format(format) }" v-if="$slots.default">
        </slot>
        <div class="ant-picker-cell-inner" v-else>
          {{ current.date() }}
        </div>
      </template>
      <template #suffixIcon v-if="prefixIcon">
        <component :is="prefixIcon" />
      </template>
    </a-date-picker>

    <a-time-picker
      v-else-if="isTimePicker"
      v-model:value="text"
      :size="size"
      :allow-clear="clearableVal"
      :disabled="disabled"
      :format="format"
      :placeholder="getPlaceholder()"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
      :default-value="defaultValue"
      :hour-step="hourStep"
      :minute-step="minuteStep"
      :second-step="secondStep"
      :hide-disabled-options="hideDisabledOptions"
      :dropdown-class-name="popperClass"
      :get-popup-container="popperAppendToBody ? undefined : triggerNode => triggerNode.parentNode"
      @change="handleChange"
      @open-change="handleOpenChange"
    >
      <template #suffixIcon v-if="prefixIcon">
        <component :is="prefixIcon" />
      </template>
    </a-time-picker>

    <a-range-picker
      v-else-if="isRangePicker"
      v-model:value="text"
      :size="size"
      :allow-clear="clearableVal"
      :disabled="disabled"
      :format="format"
      :placeholder="[startPlaceholder || t('date.start'), endPlaceholder || t('date.end')]"
      :range-separator="rangeSeparator"
      :disabled-date="getDisabledDate"
      :disabled-time="getDisabledTime"
      :default-value="defaultValue"
      :default-picker-value="defaultPickerValue"
      :show-time="showTimeConfig"
      :show-today="showNow"
      :separator="rangeSeparator"
      :presets="presetsConfig"
      :picker="pickerType"
      :dropdown-class-name="popperClass"
      :get-popup-container="popperAppendToBody ? undefined : triggerNode => triggerNode.parentNode"
      @change="handleChange"
      @open-change="handleOpenChange"
      @panel-change="handlePanelChange"
    >
      <template #dateRender="{ current, today }">
        <slot :item="{ text: current.date(), renderText: current.format(format) }" v-if="$slots.default">
        </slot>
        <div class="ant-picker-cell-inner" v-else>
          {{ current.date() }}
        </div>
      </template>
      <template #suffixIcon v-if="prefixIcon">
        <component :is="prefixIcon" />
      </template>
    </a-range-picker>
  </div>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
import props from "common/common/props.js";
import event from "common/common/event.js";
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(advancedFormat);
dayjs.extend(quarterOfYear);

export default create({
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
      return ['ant-date', 'ant-datetime', 'ant-month', 'ant-week', 'ant-time'].includes(this.type);
    },
    isRangePicker() {
      return ['ant-daterange', 'ant-datetimerange'].includes(this.type);
    },
    isTimePicker() {
      return this.type === 'ant-time';
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

      if (['ant-daterange', 'ant-datetimerange'].includes(this.type)) {
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
        result = ['ant-daterange', 'ant-datetimerange'].includes(this.type) ? [] : undefined;
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
</script>

