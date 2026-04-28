/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createBlock, withCtx, resolveDynamicComponent, createCommentVNode, Fragment, renderList, createElementVNode, createVNode, createSlots, toDisplayString } from 'vue';

const _hoisted_1 = { class: "tvue-array__word-limit" };
const _hoisted_2 = {
  key: 0,
  class: "tvue-array__preview"
};
const _hoisted_3 = {
  key: 1,
  class: "tvue-array__link"
};
const _hoisted_4 = ["href", "target"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_button = resolveComponent("a-button");
  const _component_a_input = resolveComponent("a-input");
  const _component_a_tooltip = resolveComponent("a-tooltip");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    (_ctx.validatenull(_ctx.text))
      ? (openBlock(), createBlock(_component_a_button, {
          key: 0,
          type: "primary",
          size: _ctx.size,
          disabled: _ctx.disabled,
          onClick: _cache[0] || (_cache[0] = $event => (_ctx.add()))
        }, {
          icon: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent('PlusOutlined')))
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["size", "disabled"]))
      : createCommentVNode("v-if", true),
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.text, (item, index) => {
      return (openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.b('item')),
        key: index
      }, [
        createElementVNode("div", {
          class: normalizeClass(_ctx.b('input'))
        }, [
          createVNode(_component_a_tooltip, {
            placement: "bottom",
            title: (!_ctx.isImg && !_ctx.isUrl) || _ctx.validatenull(item) ? '' : _ctx.tooltipContent(item)
          }, {
            default: withCtx(() => [
              createVNode(_component_a_input, {
                value: _ctx.text[index],
                "onUpdate:value": $event => ((_ctx.text[index]) = $event),
                size: _ctx.size,
                maxlength: _ctx.maxlength,
                minlength: _ctx.minlength,
                placeholder: _ctx.placeholder,
                disabled: _ctx.disabled
              }, createSlots({ _: 2 /* DYNAMIC */ }, [
                (_ctx.showWordLimit && _ctx.maxlength)
                  ? {
                      name: "suffix",
                      fn: withCtx(() => [
                        createElementVNode("span", _hoisted_1, toDisplayString((_ctx.text[index] || '').length) + "/" + toDisplayString(_ctx.maxlength), 1 /* TEXT */)
                      ]),
                      key: "0"
                    }
                  : undefined
              ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "onUpdate:value", "size", "maxlength", "minlength", "placeholder", "disabled"])
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["title"]),
          createCommentVNode(" 图片或链接预览 "),
          (_ctx.isImg && !_ctx.validatenull(item))
            ? (openBlock(), createElementBlock("div", _hoisted_2, [
                (openBlock(), createBlock(resolveDynamicComponent(_ctx.isMediaType(item)), {
                  style: {"width":"200px","cursor":"pointer"},
                  src: item,
                  onClick: $event => (_ctx.openImg(index)),
                  controls: "controls"
                }, null, 8 /* PROPS */, ["src", "onClick"]))
              ]))
            : (_ctx.isUrl && !_ctx.validatenull(item))
              ? (openBlock(), createElementBlock("div", _hoisted_3, [
                  createElementVNode("a", {
                    href: item,
                    target: _ctx.target,
                    class: "tvue-array__link-text"
                  }, toDisplayString(item), 9 /* TEXT, PROPS */, _hoisted_4)
                ]))
              : createCommentVNode("v-if", true),
          (!(_ctx.disabled || _ctx.readonly || _ctx.alone))
            ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                (!_ctx.isLimit)
                  ? (openBlock(), createBlock(_component_a_button, {
                      key: 0,
                      type: "primary",
                      size: _ctx.size,
                      disabled: _ctx.disabled,
                      onClick: $event => (_ctx.add(index))
                    }, {
                      icon: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent('PlusOutlined')))
                      ]),
                      _: 1 /* STABLE */
                    }, 8 /* PROPS */, ["size", "disabled", "onClick"]))
                  : createCommentVNode("v-if", true),
                createVNode(_component_a_button, {
                  danger: "",
                  size: _ctx.size,
                  disabled: _ctx.disabled,
                  onClick: $event => (_ctx.remove(index))
                }, {
                  icon: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent('MinusOutlined')))
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["size", "disabled", "onClick"])
              ], 64 /* STABLE_FRAGMENT */))
            : createCommentVNode("v-if", true)
        ], 2 /* CLASS */)
      ], 2 /* CLASS */))
    }), 128 /* KEYED_FRAGMENT */))
  ], 2 /* CLASS */))
}

export { render };
