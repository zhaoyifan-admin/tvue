/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createVNode, withCtx, renderSlot, Fragment, renderList, createBlock, resolveDynamicComponent, createTextVNode, toDisplayString } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_radio_group = resolveComponent("a-radio-group");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    createVNode(_component_a_radio_group, {
      value: _ctx.text,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => ((_ctx.text) = $event)),
      size: _ctx.size,
      disabled: _ctx.disabled,
      name: _ctx.name,
      "button-style": _ctx.buttonStyle,
      "option-type": _ctx.optionType,
      "default-value": _ctx.defaultValue,
      onChange: _ctx.handleChangeGroup,
      onClick: _ctx.handleClick
    }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default", {}, () => [
          (_ctx.options && _ctx.options.length > 0)
            ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_ctx.options, (item, index) => {
                return (openBlock(), createBlock(resolveDynamicComponent(_ctx.radioComponent), {
                  key: index,
                  value: _ctx.getOptionValue(item),
                  disabled: _ctx.getOptionDisabled(item)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.getOptionLabel(item)), 1 /* TEXT */)
                  ]),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "disabled"]))
              }), 128 /* KEYED_FRAGMENT */))
            : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(_ctx.dic, (item, index) => {
                return (openBlock(), createBlock(resolveDynamicComponent(_ctx.radioComponent), {
                  key: index,
                  value: item[_ctx.valueKey],
                  disabled: item[_ctx.disabledKey] || _ctx.disabled
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(item[_ctx.labelKey]), 1 /* TEXT */)
                  ]),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "disabled"]))
              }), 128 /* KEYED_FRAGMENT */))
        ])
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["value", "size", "disabled", "name", "button-style", "option-type", "default-value", "onChange", "onClick"])
  ], 2 /* CLASS */))
}

export { render };
