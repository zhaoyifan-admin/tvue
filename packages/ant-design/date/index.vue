<template>
  <div :class="b()">
    <a-date-picker
      v-if="type === 'ant-date'"
      v-model:value="text"
      :size="size"
      :allow-clear="clearableVal"
      :disabled="disabled"
      :format="format"
      :placeholder="placeholder || t('date.placeholder')"
      :disabled-date="getDisabledDate"
      :disabled-time="getDisabledTime"
      :default-value="defaultValue"
      :default-picker-value="defaultPickerValue"
      :show-time="showTimeConfig"
      :show-today="showNow"
      :presets="presetsConfig"
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

    <a-month-picker
      v-else-if="type === 'ant-month'"
      v-model:value="text"
      :size="size"
      :allow-clear="clearableVal"
      :disabled="disabled"
      :format="format"
      :placeholder="placeholder || t('date.monthPlaceholder')"
      :disabled-date="getDisabledDate"
      :default-value="defaultValue"
      :default-picker-value="defaultPickerValue"
      :dropdown-class-name="popperClass"
      :get-popup-container="popperAppendToBody ? undefined : triggerNode => triggerNode.parentNode"
      @change="handleChange"
      @open-change="handleOpenChange"
      @panel-change="handlePanelChange"
    >
      <template #suffixIcon v-if="prefixIcon">
        <component :is="prefixIcon" />
      </template>
    </a-month-picker>

    <a-week-picker
      v-else-if="type === 'ant-week'"
      v-model:value="text"
      :size="size"
      :allow-clear="clearableVal"
      :disabled="disabled"
      :format="format"
      :placeholder="placeholder || t('date.weekPlaceholder')"
      :disabled-date="getDisabledDate"
      :default-value="defaultValue"
      :default-picker-value="defaultPickerValue"
      :dropdown-class-name="popperClass"
      :get-popup-container="popperAppendToBody ? undefined : triggerNode => triggerNode.parentNode"
      @change="handleChange"
      @open-change="handleOpenChange"
      @panel-change="handlePanelChange"
    >
      <template #suffixIcon v-if="prefixIcon">
        <component :is="prefixIcon" />
      </template>
    </a-week-picker>

    <a-range-picker
      v-else-if="['ant-daterange', 'ant-datetimerange'].includes(type)"
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

    <a-time-picker
      v-else-if="type === 'ant-time'"
      v-model:value="text"
      :size="size"
      :allow-clear="clearableVal"
      :disabled="disabled"
      :format="format"
      :placeholder="placeholder || t('date.timePlaceholder')"
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
import 'dayjs/locale/zh-cn';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
dayjs.locale('zh-cn');

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
        // 只有当值真正改变时才更新，避免循环
        if (val !== oldVal) {
          this.initDateValue();
        }
      },
      immediate: true,
    },
  },
  computed: {
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
    initDateValue() {
      let val = this.modelValue;

      if (this.validatenull(val)) {
        this.text = undefined;
        return;
      }

      // 处理范围选择器
      if (['ant-daterange', 'ant-datetimerange'].includes(this.type)) {
        if (Array.isArray(val)) {
          this.text = val.map(v => {
            if (!v) return undefined;
            // 如果已经是 dayjs 对象，直接返回
            if (v.$isDayjsObject) return v;
            // 先尝试用 valueFormat 解析（非严格模式）
            let parsed = this.valueFormat ? dayjs(v, this.valueFormat) : dayjs(v);
            // 如果解析失败，尝试直接解析
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
      // 处理单个日期/时间
      else {
        if (!val) {
          this.text = undefined;
        } else if (val.$isDayjsObject) {
          // 如果已经是 dayjs 对象，直接使用
          this.text = val;
        } else {
          // 先尝试用 valueFormat 解析（非严格模式）
          let parsed = this.valueFormat ? dayjs(val, this.valueFormat) : dayjs(val);
          // 如果解析失败，尝试直接解析
          if (!parsed.isValid()) {
            parsed = dayjs(val);
          }
          this.text = parsed.isValid() ? parsed : undefined;
        }
      }
    },
    handleChange(date, dateString) {
      let result;

      // 空值处理
      if (this.validatenull(date)) {
        result = ['ant-daterange', 'ant-datetimerange'].includes(this.type) ? [] : undefined;
      }
      // 有 valueFormat 时，使用 format 格式化
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
      // 无 valueFormat 时，返回时间戳
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

      // 对比值是否变化
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

      // 将 dayjs 对象转换为 Date 对象，以便用户的 disabledDate 函数可以使用
      const dateObj = current.toDate();
      return this.disabledDate(dateObj);
    },
  },
});
</script>
