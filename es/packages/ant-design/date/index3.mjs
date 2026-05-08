/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createBlock, createSlots, withCtx, renderSlot, toDisplayString, resolveDynamicComponent, createCommentVNode } from 'vue';

const _hoisted_1 = {
  key: 1,
  class: "ant-picker-cell-inner"
};
const _hoisted_2 = {
  key: 1,
  class: "ant-picker-cell-inner"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_date_picker = resolveComponent("a-date-picker");
  const _component_a_time_picker = resolveComponent("a-time-picker");
  const _component_a_range_picker = resolveComponent("a-range-picker");
  const _component_a_time_range_picker = resolveComponent("a-time-range-picker");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    (_ctx.isSinglePicker)
      ? (openBlock(), createBlock(_component_a_date_picker, {
          key: 0,
          value: _ctx.text,
          "onUpdate:value": _cache[0] || (_cache[0] = $event => ((_ctx.text) = $event)),
          size: _ctx.size,
          "allow-clear": _ctx.clearableVal,
          disabled: _ctx.disabled,
          format: _ctx.format,
          placeholder: _ctx.getPlaceholder(),
          "disabled-date": _ctx.getDisabledDate,
          "disabled-time": _ctx.getDisabledTime,
          "default-value": _ctx.defaultValue,
          "default-picker-value": _ctx.defaultPickerValue,
          "show-time": _ctx.showTimeConfig,
          "show-today": _ctx.showNow,
          presets: _ctx.presetsConfig,
          picker: _ctx.pickerType,
          "hour-step": _ctx.hourStep,
          "minute-step": _ctx.minuteStep,
          "second-step": _ctx.secondStep,
          "hide-disabled-options": _ctx.hideDisabledOptions,
          "dropdown-class-name": _ctx.popperClass,
          "get-popup-container": _ctx.popperAppendToBody ? undefined : triggerNode => triggerNode.parentNode,
          onChange: _ctx.handleChange,
          onOpenChange: _ctx.handleOpenChange,
          onPanelChange: _ctx.handlePanelChange
        }, createSlots({
          dateRender: withCtx(({ current, today }) => [
            (_ctx.$slots.default)
              ? renderSlot(_ctx.$slots, "default", {
                  key: 0,
                  item: { text: current.date(), renderText: current.format(_ctx.format) }
                })
              : (openBlock(), createElementBlock("div", _hoisted_1, toDisplayString(current.date()), 1 /* TEXT */))
          ]),
          _: 2 /* DYNAMIC */
        }, [
          (_ctx.prefixIcon)
            ? {
                name: "suffixIcon",
                fn: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(_ctx.prefixIcon)))
                ]),
                key: "0"
              }
            : undefined
        ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "size", "allow-clear", "disabled", "format", "placeholder", "disabled-date", "disabled-time", "default-value", "default-picker-value", "show-time", "show-today", "presets", "picker", "hour-step", "minute-step", "second-step", "hide-disabled-options", "dropdown-class-name", "get-popup-container", "onChange", "onOpenChange", "onPanelChange"]))
      : (_ctx.isSingleTimePicker)
        ? (openBlock(), createBlock(_component_a_time_picker, {
            key: 1,
            value: _ctx.text,
            "onUpdate:value": _cache[1] || (_cache[1] = $event => ((_ctx.text) = $event)),
            size: _ctx.size,
            "allow-clear": _ctx.clearableVal,
            disabled: _ctx.disabled,
            format: _ctx.format,
            placeholder: _ctx.getPlaceholder(),
            "disabled-hours": _ctx.disabledHours,
            "disabled-minutes": _ctx.disabledMinutes,
            "disabled-seconds": _ctx.disabledSeconds,
            "default-value": _ctx.defaultValue,
            "hour-step": _ctx.hourStep,
            "minute-step": _ctx.minuteStep,
            "second-step": _ctx.secondStep,
            "hide-disabled-options": _ctx.hideDisabledOptions,
            "dropdown-class-name": _ctx.popperClass,
            "get-popup-container": _ctx.popperAppendToBody ? undefined : triggerNode => triggerNode.parentNode,
            onChange: _ctx.handleChange,
            onOpenChange: _ctx.handleOpenChange
          }, createSlots({ _: 2 /* DYNAMIC */ }, [
            (_ctx.prefixIcon)
              ? {
                  name: "suffixIcon",
                  fn: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(_ctx.prefixIcon)))
                  ]),
                  key: "0"
                }
              : undefined
          ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "size", "allow-clear", "disabled", "format", "placeholder", "disabled-hours", "disabled-minutes", "disabled-seconds", "default-value", "hour-step", "minute-step", "second-step", "hide-disabled-options", "dropdown-class-name", "get-popup-container", "onChange", "onOpenChange"]))
        : (_ctx.isRangePicker)
          ? (openBlock(), createBlock(_component_a_range_picker, {
              key: 2,
              value: _ctx.text,
              "onUpdate:value": _cache[2] || (_cache[2] = $event => ((_ctx.text) = $event)),
              size: _ctx.size,
              "allow-clear": _ctx.clearableVal,
              disabled: _ctx.disabled,
              format: _ctx.format,
              placeholder: [_ctx.startPlaceholder || _ctx.t('date.start'), _ctx.endPlaceholder || _ctx.t('date.end')],
              "range-separator": _ctx.rangeSeparator,
              "disabled-date": _ctx.getDisabledDate,
              "disabled-time": _ctx.getDisabledTime,
              "default-value": _ctx.defaultValue,
              "default-picker-value": _ctx.defaultPickerValue,
              "show-time": _ctx.showTimeConfig,
              "show-today": _ctx.showNow,
              separator: _ctx.rangeSeparator,
              presets: _ctx.presetsConfig,
              picker: _ctx.pickerType,
              "dropdown-class-name": _ctx.popperClass,
              "get-popup-container": _ctx.popperAppendToBody ? undefined : triggerNode => triggerNode.parentNode,
              onChange: _ctx.handleChange,
              onOpenChange: _ctx.handleOpenChange,
              onPanelChange: _ctx.handlePanelChange
            }, createSlots({
              dateRender: withCtx(({ current, today }) => [
                (_ctx.$slots.default)
                  ? renderSlot(_ctx.$slots, "default", {
                      key: 0,
                      item: { text: current.date(), renderText: current.format(_ctx.format) }
                    })
                  : (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString(current.date()), 1 /* TEXT */))
              ]),
              _: 2 /* DYNAMIC */
            }, [
              (_ctx.prefixIcon)
                ? {
                    name: "suffixIcon",
                    fn: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(_ctx.prefixIcon)))
                    ]),
                    key: "0"
                  }
                : undefined
            ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "size", "allow-clear", "disabled", "format", "placeholder", "range-separator", "disabled-date", "disabled-time", "default-value", "default-picker-value", "show-time", "show-today", "separator", "presets", "picker", "dropdown-class-name", "get-popup-container", "onChange", "onOpenChange", "onPanelChange"]))
          : (_ctx.isTimeRangePicker)
            ? (openBlock(), createBlock(_component_a_time_range_picker, {
                key: 3,
                value: _ctx.text,
                "onUpdate:value": _cache[3] || (_cache[3] = $event => ((_ctx.text) = $event)),
                size: _ctx.size,
                "allow-clear": _ctx.clearableVal,
                disabled: _ctx.disabled,
                format: _ctx.format,
                placeholder: [_ctx.startPlaceholder || _ctx.t('time.start'), _ctx.endPlaceholder || _ctx.t('time.end')],
                "range-separator": _ctx.rangeSeparator,
                "disabled-hours": _ctx.disabledHours,
                "disabled-minutes": _ctx.disabledMinutes,
                "disabled-seconds": _ctx.disabledSeconds,
                "default-value": _ctx.defaultValue,
                "hour-step": _ctx.hourStep,
                "minute-step": _ctx.minuteStep,
                "second-step": _ctx.secondStep,
                "hide-disabled-options": _ctx.hideDisabledOptions,
                "dropdown-class-name": _ctx.popperClass,
                "get-popup-container": _ctx.popperAppendToBody ? undefined : triggerNode => triggerNode.parentNode,
                onChange: _ctx.handleChange,
                onOpenChange: _ctx.handleOpenChange
              }, createSlots({ _: 2 /* DYNAMIC */ }, [
                (_ctx.prefixIcon)
                  ? {
                      name: "suffixIcon",
                      fn: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(_ctx.prefixIcon)))
                      ]),
                      key: "0"
                    }
                  : undefined
              ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "size", "allow-clear", "disabled", "format", "placeholder", "range-separator", "disabled-hours", "disabled-minutes", "disabled-seconds", "default-value", "hour-step", "minute-step", "second-step", "hide-disabled-options", "dropdown-class-name", "get-popup-container", "onChange", "onOpenChange"]))
            : createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

export { render };
