/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createBlock, normalizeClass, withCtx, renderSlot, createElementBlock, toDisplayString } from 'vue';

const _hoisted_1 = { key: 1 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_cascader = resolveComponent("a-cascader");

  return (openBlock(), createBlock(_component_a_cascader, {
    ref: "cascader",
    class: normalizeClass(_ctx.b()),
    value: _ctx.text,
    "onUpdate:value": _cache[0] || (_cache[0] = $event => ((_ctx.text) = $event)),
    options: _ctx.dicOptions,
    placeholder: _ctx.placeholder,
    size: _ctx.size,
    disabled: _ctx.disabled,
    "allow-clear": _ctx.clearableVal,
    "show-search": _ctx.filterable ? { filter: _ctx.filter } : false,
    multiple: _ctx.multiple,
    "max-tag-count": _ctx.tags || _ctx.collapseTags ? _ctx.maxCollapseTags || 'responsive' : undefined,
    "max-tag-placeholder": _ctx.collapseTagsTooltip ? _ctx.getCollapsedTooltip : undefined,
    "dropdown-class-name": _ctx.popperClass,
    "field-names": _ctx.fieldNames,
    "change-on-select": _ctx.checkStrictly,
    "load-data": _ctx.lazyLoadData,
    "show-checked-strategy": _ctx.showCheckedStrategyValue,
    onChange: _ctx.handleValueChange,
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur
  }, {
    displayRender: withCtx(({ labels, selectedOptions }) => [
      (_ctx.$slots.default)
        ? renderSlot(_ctx.$slots, "default", {
            key: 0,
            data: selectedOptions,
            labels: labels
          })
        : (openBlock(), createElementBlock("span", _hoisted_1, toDisplayString(labels.join(_ctx.separator || '/')), 1 /* TEXT */))
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class", "value", "options", "placeholder", "size", "disabled", "allow-clear", "show-search", "multiple", "max-tag-count", "max-tag-placeholder", "dropdown-class-name", "field-names", "change-on-select", "load-data", "show-checked-strategy", "onChange", "onFocus", "onBlur"]))
}

export { render };
