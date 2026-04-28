/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createBlock, withCtx, createTextVNode, toDisplayString, createCommentVNode, createVNode, renderSlot, Fragment, renderList } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_checkbox = resolveComponent("a-checkbox");
  const _component_a_checkbox_group = resolveComponent("a-checkbox-group");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    (_ctx.all)
      ? (openBlock(), createBlock(_component_a_checkbox, {
          key: 0,
          class: normalizeClass(_ctx.b('all')),
          disabled: _ctx.disabled,
          indeterminate: _ctx.isIndeterminate,
          checked: _ctx.checkAll,
          onChange: _ctx.handleCheckAll
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.t('check.checkAll')), 1 /* TEXT */)
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["class", "disabled", "indeterminate", "checked", "onChange"]))
      : createCommentVNode("v-if", true),
    createVNode(_component_a_checkbox_group, {
      value: _ctx.textArray,
      "onUpdate:value": _cache[0] || (_cache[0] = $event => ((_ctx.textArray) = $event)),
      onChange: _ctx.handleCheckChange,
      disabled: _ctx.disabled,
      onClick: _ctx.handleClick
    }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default", {}, () => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.dic, (item, index) => {
            return (openBlock(), createBlock(_component_a_checkbox, {
              value: item[_ctx.valueKey],
              disabled: item[_ctx.disabledKey] || _ctx.disabled,
              key: index
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
    }, 8 /* PROPS */, ["value", "onChange", "disabled", "onClick"])
  ], 2 /* CLASS */))
}

export { render };
