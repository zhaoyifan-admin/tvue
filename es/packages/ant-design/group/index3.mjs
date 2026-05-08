/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, renderSlot, createVNode, withCtx, createBlock, createSlots, createElementVNode, createCommentVNode, toDisplayString } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_collapse_panel = resolveComponent("a-collapse-panel");
  const _component_a_collapse = resolveComponent("a-collapse");

  return (_ctx.display)
    ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass([_ctx.b({'header':!_ctx.isHeader,'arrow':!_ctx.arrow})])
      }, [
        renderSlot(_ctx.$slots, "tabs"),
        createVNode(_component_a_collapse, {
          onChange: _ctx.handleChange,
          activeKey: _ctx.activeName,
          "onUpdate:activeKey": _cache[0] || (_cache[0] = $event => ((_ctx.activeName) = $event))
        }, {
          default: withCtx(() => [
            (openBlock(), createBlock(_component_a_collapse_panel, {
              key: 1,
              disabled: !_ctx.arrow
            }, createSlots({
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "default")
              ]),
              _: 2 /* DYNAMIC */
            }, [
              (_ctx.$slots.header&&_ctx.header)
                ? {
                    name: "header",
                    fn: withCtx(() => [
                      createElementVNode("div", {
                        class: normalizeClass(_ctx.b('header'))
                      }, [
                        renderSlot(_ctx.$slots, "header")
                      ], 2 /* CLASS */)
                    ]),
                    key: "0"
                  }
                : ((_ctx.label || _ctx.icon)&&_ctx.header)
                  ? {
                      name: "header",
                      fn: withCtx(() => [
                        createElementVNode("div", {
                          class: normalizeClass(_ctx.b('header'))
                        }, [
                          (_ctx.icon)
                            ? (openBlock(), createElementBlock("i", {
                                key: 0,
                                class: normalizeClass([_ctx.icon,_ctx.b('icon')])
                              }, null, 2 /* CLASS */))
                            : createCommentVNode("v-if", true),
                          (_ctx.label)
                            ? (openBlock(), createElementBlock("div", {
                                key: 1,
                                class: normalizeClass(_ctx.b('title'))
                              }, toDisplayString(_ctx.label), 3 /* TEXT, CLASS */))
                            : createCommentVNode("v-if", true)
                        ], 2 /* CLASS */)
                      ]),
                      key: "1"
                    }
                  : undefined
            ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled"]))
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["onChange", "activeKey"])
      ], 2 /* CLASS */))
    : createCommentVNode("v-if", true)
}

export { render };
