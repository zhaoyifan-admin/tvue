/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createBlock, normalizeClass, createSlots, withCtx, createElementBlock, Fragment, renderList, renderSlot, createElementVNode, toDisplayString, createCommentVNode, createVNode, withModifiers, createTextVNode, resolveDynamicComponent } from 'vue';

const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = { key: 2 };
const _hoisted_4 = { style: {"margin-left":"8px"} };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_select_option = resolveComponent("a-select-option");
  const _component_a_select_opt_group = resolveComponent("a-select-opt-group");
  const _component_a_checkbox = resolveComponent("a-checkbox");
  const _component_a_spin = resolveComponent("a-spin");
  const _component_a_select = resolveComponent("a-select");

  return (openBlock(), createBlock(_component_a_select, {
    ref: "main",
    class: normalizeClass(_ctx.b()),
    value: _ctx.text,
    "onUpdate:value": _cache[2] || (_cache[2] = $event => ((_ctx.text) = $event)),
    size: _ctx.size,
    loading: _ctx.loading,
    mode: _ctx.tags ? 'tags' : (_ctx.multiple ? 'multiple' : undefined),
    "show-search": _ctx.remote ? true : _ctx.filterable,
    "allow-clear": _ctx.allowClearVal,
    placeholder: _ctx.placeholder,
    disabled: _ctx.disabled,
    "max-count": _ctx.limit,
    "max-tag-count": _ctx.tags || _ctx.collapseTags ? _ctx.maxCollapseTags || 'responsive' : undefined,
    "max-tag-placeholder": _ctx.collapseTagsTooltip ? _ctx.getCollapsedTooltip : undefined,
    "filter-option": _ctx.filterable && !_ctx.remote ? _ctx.handleFilterOption : undefined,
    "not-found-content": _ctx.noDataText,
    "dropdown-match-select-width": false,
    "dropdown-class-name": _ctx.popperClass,
    "get-popup-container": _ctx.popperAppendToBody ? undefined : triggerNode => triggerNode.parentNode,
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur,
    onRemove: _ctx.handleremoveTag,
    onSearch: _cache[3] || (_cache[3] = $event => (_ctx.remote ? _ctx.handleRemoteMethod : undefined)),
    "default-active-first-option": _ctx.defaultFirstOption
  }, createSlots({
    dropdownRender: withCtx(({ menuNode: menu }) => [
      (_ctx.dropdownRenderConfig)
        ? (openBlock(), createElementBlock("div", _hoisted_1, [
            (openBlock(), createBlock(resolveDynamicComponent(_ctx.dropdownRenderComponent), {
              menu: menu,
              option: _ctx.netDic,
              value: _ctx.text,
              multiple: _ctx.multiple,
              "custom-render": _ctx.dropdownRender,
              "show-tip": _ctx.showTip,
              "tip-text": _ctx.tipText,
              "show-progress": _ctx.showProgress,
              "progress-color": _ctx.progressColor,
              "bottom-text": _ctx.bottomText,
              "show-bottom-text": _ctx.showBottomText,
              "allow-add": _ctx.allowAdd,
              "add-placeholder": _ctx.addPlaceholder,
              "add-button-text": _ctx.addButtonText,
              "on-add-option": _ctx.onAddOption
            }, null, 40 /* PROPS, NEED_HYDRATION */, ["menu", "option", "value", "multiple", "custom-render", "show-tip", "tip-text", "show-progress", "progress-color", "bottom-text", "show-bottom-text", "allow-add", "add-placeholder", "add-button-text", "on-add-option"]))
          ]))
        : (_ctx.hasStandardContent)
          ? (openBlock(), createElementBlock("div", _hoisted_2, [
              (openBlock(), createBlock(resolveDynamicComponent(_ctx.standardDropdownRenderComponent), {
                menu: menu,
                "allow-add": _ctx.allowAdd,
                "add-placeholder": _ctx.addPlaceholder,
                "add-button-text": _ctx.addButtonText,
                "on-add-option": _ctx.onAddOption
              }, null, 40 /* PROPS, NEED_HYDRATION */, ["menu", "allow-add", "add-placeholder", "add-button-text", "on-add-option"]))
            ]))
          : (openBlock(), createElementBlock("div", _hoisted_3, [
              (openBlock(), createBlock(resolveDynamicComponent({ render: () => menu })))
            ]))
    ]),
    default: withCtx(() => [
      (_ctx.virtualize)
        ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_ctx.netDic, (item, index) => {
            return (openBlock(), createBlock(_component_a_select_option, {
              key: item[_ctx.valueKey],
              value: item[_ctx.valueKey],
              disabled: item[_ctx.disabledKey]
            }, {
              default: withCtx(() => [
                (_ctx.$slots.default)
                  ? renderSlot(_ctx.$slots, "default", {
                      key: 0,
                      label: _ctx.labelKey,
                      value: _ctx.valueKey,
                      item: item
                    })
                  : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createElementVNode("span", null, toDisplayString(_ctx.getLabelText(item)), 1 /* TEXT */),
                      (item[_ctx.descKey])
                        ? (openBlock(), createElementBlock("span", {
                            key: 0,
                            class: normalizeClass(_ctx.b('desc'))
                          }, toDisplayString(item[_ctx.descKey]), 3 /* TEXT, CLASS */))
                        : createCommentVNode("v-if", true)
                    ], 64 /* STABLE_FRAGMENT */))
              ]),
              _: 2 /* DYNAMIC */
            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "disabled"]))
          }), 128 /* KEYED_FRAGMENT */))
        : (_ctx.isGroup)
          ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createCommentVNode(" 分组模式 "),
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.netDic, (item, index) => {
                return (openBlock(), createBlock(_component_a_select_opt_group, {
                  key: index,
                  label: _ctx.getLabelText(item)
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item[_ctx.groupsKey], (citem, cindex) => {
                      return (openBlock(), createBlock(_component_a_select_option, {
                        key: citem[_ctx.valueKey],
                        value: citem[_ctx.valueKey],
                        disabled: citem[_ctx.disabledKey]
                      }, {
                        default: withCtx(() => [
                          (_ctx.$slots.default)
                            ? renderSlot(_ctx.$slots, "default", {
                                key: 0,
                                label: _ctx.labelKey,
                                value: _ctx.valueKey,
                                item: citem
                              })
                            : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                createElementVNode("span", null, toDisplayString(_ctx.getLabelText(citem)), 1 /* TEXT */),
                                (citem[_ctx.descKey])
                                  ? (openBlock(), createElementBlock("span", {
                                      key: 0,
                                      class: normalizeClass(_ctx.b('desc'))
                                    }, toDisplayString(citem[_ctx.descKey]), 3 /* TEXT, CLASS */))
                                  : createCommentVNode("v-if", true)
                              ], 64 /* STABLE_FRAGMENT */))
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "disabled"]))
                    }), 128 /* KEYED_FRAGMENT */))
                  ]),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["label"]))
              }), 128 /* KEYED_FRAGMENT */))
            ], 64 /* STABLE_FRAGMENT */))
          : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
              createCommentVNode(" 普通模式（带全选） "),
              (_ctx.all && _ctx.multiple)
                ? (openBlock(), createBlock(_component_a_select_option, {
                    key: "__all__",
                    value: null,
                    style: {"padding":"0"},
                    disabled: ""
                  }, {
                    default: withCtx(() => [
                      createElementVNode("div", {
                        class: normalizeClass(_ctx.b('check')),
                        style: {"padding":"8px 12px"}
                      }, [
                        createVNode(_component_a_checkbox, {
                          checked: _ctx.checked,
                          "onUpdate:checked": _cache[0] || (_cache[0] = $event => ((_ctx.checked) = $event)),
                          disabled: _ctx.disabled,
                          indeterminate: _ctx.indeterminate,
                          onChange: _ctx.checkChange,
                          onClick: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"])),
                          style: {"width":"100%"}
                        }, {
                          default: withCtx(() => [...(_cache[4] || (_cache[4] = [
                            createTextVNode("全选", -1 /* CACHED */)
                          ]))]),
                          _: 1 /* STABLE */
                        }, 8 /* PROPS */, ["checked", "disabled", "indeterminate", "onChange"])
                      ], 2 /* CLASS */)
                    ]),
                    _: 1 /* STABLE */
                  }))
                : createCommentVNode("v-if", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.netDic, (item, index) => {
                return (openBlock(), createBlock(_component_a_select_option, {
                  key: item[_ctx.valueKey],
                  value: item[_ctx.valueKey],
                  disabled: item[_ctx.disabledKey]
                }, {
                  default: withCtx(() => [
                    (_ctx.$slots.default)
                      ? renderSlot(_ctx.$slots, "default", {
                          key: 0,
                          label: _ctx.labelKey,
                          value: _ctx.valueKey,
                          item: item
                        })
                      : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                          createElementVNode("span", null, toDisplayString(_ctx.getLabelText(item)), 1 /* TEXT */),
                          (item[_ctx.descKey])
                            ? (openBlock(), createElementBlock("span", {
                                key: 0,
                                class: normalizeClass(_ctx.b('desc'))
                              }, toDisplayString(item[_ctx.descKey]), 3 /* TEXT, CLASS */))
                            : createCommentVNode("v-if", true)
                        ], 64 /* STABLE_FRAGMENT */))
                  ]),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "disabled"]))
              }), 128 /* KEYED_FRAGMENT */))
            ], 64 /* STABLE_FRAGMENT */))
    ]),
    _: 2 /* DYNAMIC */
  }, [
    (_ctx.loading)
      ? {
          name: "notFoundContent",
          fn: withCtx(() => [
            createVNode(_component_a_spin, { size: "small" }),
            createElementVNode("span", _hoisted_4, toDisplayString(_ctx.loadingText || '加载中...'), 1 /* TEXT */)
          ]),
          key: "0"
        }
      : undefined
  ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "value", "size", "loading", "mode", "show-search", "allow-clear", "placeholder", "disabled", "max-count", "max-tag-count", "max-tag-placeholder", "filter-option", "not-found-content", "dropdown-class-name", "get-popup-container", "onFocus", "onBlur", "onRemove", "default-active-first-option"]))
}

export { render };
