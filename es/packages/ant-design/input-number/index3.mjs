/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createBlock, normalizeClass, createSlots, withCtx, createElementVNode, toDisplayString } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_input_number = resolveComponent("a-input-number");

  return (openBlock(), createBlock(_component_a_input_number, {
    value: _ctx.text,
    "onUpdate:value": _cache[2] || (_cache[2] = $event => ((_ctx.text) = $event)),
    class: normalizeClass(_ctx.b()),
    onClick: _ctx.handleClick,
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur,
    precision: _ctx.precision,
    placeholder: _ctx.placeholder,
    step: _ctx.step,
    size: _ctx.size,
    min: _ctx.min,
    max: _ctx.max,
    "step-min": _ctx.stepMin,
    controls: _ctx.controls,
    "controls-position": _ctx.controlsPosition,
    readonly: _ctx.readonly,
    disabled: _ctx.disabled,
    formatter: _ctx.formatter,
    parser: _ctx.parser,
    "string-mode": _ctx.stringMode
  }, createSlots({ _: 2 /* DYNAMIC */ }, [
    (_ctx.prefix)
      ? {
          name: "prefix",
          fn: withCtx(() => [
            createElementVNode("span", {
              onClick: _cache[0] || (_cache[0] = $event => (_ctx.prefixClick(_ctx.text)))
            }, toDisplayString(_ctx.prefix), 1 /* TEXT */)
          ]),
          key: "0"
        }
      : undefined,
    (_ctx.suffix)
      ? {
          name: "suffix",
          fn: withCtx(() => [
            createElementVNode("span", {
              onClick: _cache[1] || (_cache[1] = $event => (_ctx.suffixClick(_ctx.text)))
            }, toDisplayString(_ctx.suffix), 1 /* TEXT */)
          ]),
          key: "1"
        }
      : undefined,
    (_ctx.addonBefore)
      ? {
          name: "addonBefore",
          fn: withCtx(() => [
            createElementVNode("span", null, toDisplayString(_ctx.addonBefore), 1 /* TEXT */)
          ]),
          key: "2"
        }
      : undefined,
    (_ctx.addonAfter)
      ? {
          name: "addonAfter",
          fn: withCtx(() => [
            createElementVNode("span", null, toDisplayString(_ctx.addonAfter), 1 /* TEXT */)
          ]),
          key: "3"
        }
      : undefined
  ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "class", "onClick", "onFocus", "onBlur", "precision", "placeholder", "step", "size", "min", "max", "step-min", "controls", "controls-position", "readonly", "disabled", "formatter", "parser", "string-mode"]))
}

export { render };
