/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createVNode, createSlots, withCtx, createBlock, resolveDynamicComponent } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_switch = resolveComponent("a-switch");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    createVNode(_component_a_switch, {
      checked: _ctx.text,
      "onUpdate:checked": _cache[0] || (_cache[0] = $event => ((_ctx.text) = $event)),
      "before-change": _ctx.handleBeforeChange,
      "checked-children": _ctx.active[_ctx.labelKey],
      "checked-value": _ctx.activeValue,
      disabled: _ctx.disabled,
      loading: _ctx.loading,
      size: _ctx.size,
      "un-checked-children": _ctx.inactive[_ctx.labelKey],
      "un-checked-value": _ctx.inactiveValue,
      onClick: _ctx.handleClick
    }, createSlots({ _: 2 /* DYNAMIC */ }, [
      (_ctx.activeIcon)
        ? {
            name: "checkedChildren",
            fn: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(_ctx.activeIcon)))
            ]),
            key: "0"
          }
        : undefined,
      (_ctx.inactiveIcon)
        ? {
            name: "unCheckedChildren",
            fn: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(_ctx.inactiveIcon)))
            ]),
            key: "1"
          }
        : undefined
    ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["checked", "before-change", "checked-children", "checked-value", "disabled", "loading", "size", "un-checked-children", "un-checked-value", "onClick"])
  ], 2 /* CLASS */))
}

export { render };
