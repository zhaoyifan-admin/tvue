/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createCommentVNode, createVNode, withCtx, Fragment, renderList, createBlock, createElementVNode, toDisplayString, withKeys, createSlots, resolveDynamicComponent, createTextVNode } from 'vue';

const _hoisted_1 = {
  key: 0,
  class: "tvue-input__phone"
};
const _hoisted_2 = { style: {"float":"left"} };
const _hoisted_3 = { style: {"float":"right","color":"#8492a6","font-size":"12px"} };
const _hoisted_4 = { class: "tvue-input__code" };
const _hoisted_5 = ["value", "disabled", "readonly", "onInput", "onKeydown"];
const _hoisted_6 = { class: "tvue-input__plate" };
const _hoisted_7 = { class: "tvue-input__ip" };
const _hoisted_8 = ["value", "disabled", "readonly", "onInput", "onKeydown"];
const _hoisted_9 = {
  key: 0,
  class: "tvue-input__ip-dot"
};
const _hoisted_10 = { class: "tvue-input__mac" };
const _hoisted_11 = ["value", "disabled", "readonly", "onInput", "onKeydown"];
const _hoisted_12 = {
  key: 0,
  class: "tvue-input__mac-sep"
};
const _hoisted_13 = { class: "tvue-textarea__word-limit" };
const _hoisted_14 = { class: "tvue-input__bank-card-type" };
const _hoisted_15 = { class: "tvue-input__id-card-info" };
const _hoisted_16 = { class: "tvue-input__email-valid" };
const _hoisted_17 = { class: "tvue-input__uscc-valid" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_select_option = resolveComponent("a-select-option");
  const _component_a_select = resolveComponent("a-select");
  const _component_a_input = resolveComponent("a-input");
  const _component_a_textarea = resolveComponent("a-textarea");
  const _component_a_button = resolveComponent("a-button");
  const _component_a_tooltip = resolveComponent("a-tooltip");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    createCommentVNode(" 手机号输入（带国际区号，需要特殊布局） "),
    (_ctx.isPhone)
      ? (openBlock(), createElementBlock("div", _hoisted_1, [
          createVNode(_component_a_select, {
            value: _ctx.phoneCode,
            "onUpdate:value": _cache[0] || (_cache[0] = $event => ((_ctx.phoneCode) = $event)),
            class: "tvue-input__phone-code",
            size: _ctx.size,
            disabled: _ctx.disabled,
            placeholder: _ctx.phoneCodePlaceholder,
            "show-search": "",
            style: {"width":"120px"}
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.phoneCodeList, (item) => {
                return (openBlock(), createBlock(_component_a_select_option, {
                  key: item.code,
                  value: item.code
                }, {
                  default: withCtx(() => [
                    createElementVNode("span", _hoisted_2, toDisplayString(item.name), 1 /* TEXT */),
                    createElementVNode("span", _hoisted_3, toDisplayString(item.code), 1 /* TEXT */)
                  ]),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["value"]))
              }), 128 /* KEYED_FRAGMENT */))
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["value", "size", "disabled", "placeholder"]),
          createVNode(_component_a_input, {
            class: "tvue-input__phone-input",
            size: _ctx.size,
            value: _ctx.phoneNumber,
            "onUpdate:value": _cache[1] || (_cache[1] = $event => ((_ctx.phoneNumber) = $event)),
            onKeyup: _cache[2] || (_cache[2] = withKeys($event => (_ctx.isSearch ? _ctx.appendClick(_ctx.text) : ''), ["enter"])),
            onClick: _ctx.handleClick,
            maxlength: _ctx.phoneMaxLength,
            readonly: _ctx.readonly,
            placeholder: _ctx.phonePlaceholder,
            onFocus: _ctx.handleFocus,
            onBlur: _ctx.handlePhoneBlur,
            disabled: _ctx.disabled,
            style: {"flex":"1"}
          }, createSlots({ _: 2 /* DYNAMIC */ }, [
            (_ctx.prefixIcon)
              ? {
                  name: "prefix",
                  fn: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(_ctx.prefixIcon)))
                  ]),
                  key: "0"
                }
              : undefined,
            (_ctx.suffixIcon)
              ? {
                  name: "suffix",
                  fn: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(_ctx.suffixIcon)))
                  ]),
                  key: "1"
                }
              : undefined
          ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["size", "value", "onClick", "maxlength", "readonly", "placeholder", "onFocus", "onBlur", "disabled"])
        ]))
      : (_ctx.isCode)
        ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createCommentVNode(" 验证码输入（分段输入框） "),
            createElementVNode("div", _hoisted_4, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.codeValues, (val, index) => {
                return (openBlock(), createElementBlock("input", {
                  key: index,
                  type: "text",
                  maxlength: "1",
                  class: normalizeClass(["tvue-input__code-item", { 'is-disabled': _ctx.disabled }]),
                  value: val,
                  disabled: _ctx.disabled,
                  readonly: _ctx.readonly,
                  onInput: $event => (_ctx.handleCodeInput($event, index)),
                  onKeydown: $event => (_ctx.handleCodeKeydown($event, index)),
                  onPaste: _cache[3] || (_cache[3] = $event => (_ctx.handleCodePaste($event))),
                  onFocus: _cache[4] || (_cache[4] = (...args) => (_ctx.handleFocus && _ctx.handleFocus(...args))),
                  onBlur: _cache[5] || (_cache[5] = (...args) => (_ctx.handleBlur && _ctx.handleBlur(...args))),
                  ref_for: true,
                  ref: el => _ctx.codeRefs[index] = el
                }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_5))
              }), 128 /* KEYED_FRAGMENT */))
            ])
          ], 64 /* STABLE_FRAGMENT */))
        : (_ctx.isPlate)
          ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
              createCommentVNode(" 车牌号输入（省份选择 + 车牌号） "),
              createElementVNode("div", _hoisted_6, [
                createVNode(_component_a_select, {
                  value: _ctx.plateProvince,
                  "onUpdate:value": _cache[6] || (_cache[6] = $event => ((_ctx.plateProvince) = $event)),
                  class: "tvue-input__plate-province",
                  size: _ctx.size,
                  disabled: _ctx.disabled,
                  style: {"width":"70px"}
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.plateProvinceList, (item) => {
                      return (openBlock(), createBlock(_component_a_select_option, {
                        key: item,
                        value: item
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item), 1 /* TEXT */)
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["value"]))
                    }), 128 /* KEYED_FRAGMENT */))
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["value", "size", "disabled"]),
                createVNode(_component_a_input, {
                  class: "tvue-input__plate-number",
                  size: _ctx.size,
                  value: _ctx.plateNumber,
                  "onUpdate:value": _cache[7] || (_cache[7] = $event => ((_ctx.plateNumber) = $event)),
                  onClick: _ctx.handleClick,
                  maxlength: 7,
                  readonly: _ctx.readonly,
                  placeholder: _ctx.platePlaceholder,
                  onFocus: _ctx.handleFocus,
                  onBlur: _ctx.handlePlateBlur,
                  onInput: _ctx.handlePlateInput,
                  disabled: _ctx.disabled,
                  style: {"flex":"1"}
                }, null, 8 /* PROPS */, ["size", "value", "onClick", "readonly", "placeholder", "onFocus", "onBlur", "onInput", "disabled"])
              ])
            ], 64 /* STABLE_FRAGMENT */))
          : (_ctx.isIp)
            ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                createCommentVNode(" IP 地址输入（4 段输入框） "),
                createElementVNode("div", _hoisted_7, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.ipSegments, (seg, index) => {
                    return (openBlock(), createElementBlock(Fragment, { key: index }, [
                      createElementVNode("input", {
                        type: "text",
                        class: normalizeClass(["tvue-input__ip-segment", { 'is-disabled': _ctx.disabled }]),
                        maxlength: "3",
                        value: seg,
                        disabled: _ctx.disabled,
                        readonly: _ctx.readonly,
                        onInput: $event => (_ctx.handleIpInput($event, index)),
                        onKeydown: $event => (_ctx.handleIpKeydown($event, index)),
                        onFocus: _cache[8] || (_cache[8] = (...args) => (_ctx.handleFocus && _ctx.handleFocus(...args))),
                        onBlur: _cache[9] || (_cache[9] = (...args) => (_ctx.handleBlur && _ctx.handleBlur(...args))),
                        ref_for: true,
                        ref: el => _ctx.ipRefs[index] = el
                      }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_8),
                      (index < 3)
                        ? (openBlock(), createElementBlock("span", _hoisted_9, "."))
                        : createCommentVNode("v-if", true)
                    ], 64 /* STABLE_FRAGMENT */))
                  }), 128 /* KEYED_FRAGMENT */))
                ])
              ], 64 /* STABLE_FRAGMENT */))
            : (_ctx.isMac)
              ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
                  createCommentVNode(" MAC 地址输入（6 段输入框） "),
                  createElementVNode("div", _hoisted_10, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.macSegments, (seg, index) => {
                      return (openBlock(), createElementBlock(Fragment, { key: index }, [
                        createElementVNode("input", {
                          type: "text",
                          class: normalizeClass(["tvue-input__mac-segment", { 'is-disabled': _ctx.disabled }]),
                          maxlength: "2",
                          value: seg,
                          disabled: _ctx.disabled,
                          readonly: _ctx.readonly,
                          onInput: $event => (_ctx.handleMacInput($event, index)),
                          onKeydown: $event => (_ctx.handleMacKeydown($event, index)),
                          onFocus: _cache[10] || (_cache[10] = (...args) => (_ctx.handleFocus && _ctx.handleFocus(...args))),
                          onBlur: _cache[11] || (_cache[11] = (...args) => (_ctx.handleBlur && _ctx.handleBlur(...args))),
                          ref_for: true,
                          ref: el => _ctx.macRefs[index] = el
                        }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_11),
                        (index < 5)
                          ? (openBlock(), createElementBlock("span", _hoisted_12, toDisplayString(_ctx.macSeparator), 1 /* TEXT */))
                          : createCommentVNode("v-if", true)
                      ], 64 /* STABLE_FRAGMENT */))
                    }), 128 /* KEYED_FRAGMENT */))
                  ])
                ], 64 /* STABLE_FRAGMENT */))
              : (_ctx.isTextarea)
                ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [
                    createCommentVNode(" 统一输入框（货币、银行卡、身份证、邮箱、社会信用代码、默认类型） "),
                    createVNode(_component_a_textarea, {
                      class: normalizeClass(_ctx.textareaClass),
                      size: _ctx.size,
                      value: _ctx.inputValue,
                      "onUpdate:value": _cache[12] || (_cache[12] = $event => ((_ctx.inputValue) = $event)),
                      onClick: _ctx.handleClick,
                      maxlength: _ctx.maxlength,
                      minlength: _ctx.minlength,
                      rows: _ctx.computedRows,
                      readonly: _ctx.readonly,
                      placeholder: _ctx.placeholder,
                      onFocus: _ctx.onFocus,
                      onBlur: _ctx.onBlur,
                      onInput: _ctx.onInput,
                      disabled: _ctx.disabled,
                      autocomplete: _ctx.autocomplete,
                      "allow-clear": _ctx.allowClear,
                      "auto-size": _ctx.autoSize
                    }, createSlots({ _: 2 /* DYNAMIC */ }, [
                      (_ctx.showWordLimit && _ctx.maxlength)
                        ? {
                            name: "suffix",
                            fn: withCtx(() => [
                              createElementVNode("span", _hoisted_13, toDisplayString(_ctx.inputValue ? _ctx.inputValue.length : 0) + "/" + toDisplayString(_ctx.maxlength), 1 /* TEXT */)
                            ]),
                            key: "0"
                          }
                        : undefined
                    ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "size", "value", "onClick", "maxlength", "minlength", "rows", "readonly", "placeholder", "onFocus", "onBlur", "onInput", "disabled", "autocomplete", "allow-clear", "auto-size"])
                  ], 64 /* STABLE_FRAGMENT */))
                : (openBlock(), createElementBlock(Fragment, { key: 6 }, [
                    createCommentVNode(" 统一输入框（货币、银行卡、身份证、邮箱、社会信用代码、默认类型） "),
                    createVNode(_component_a_input, {
                      class: normalizeClass(_ctx.inputClass),
                      size: _ctx.size,
                      "allow-clear": _ctx.clearableVal,
                      value: _ctx.inputValue,
                      "onUpdate:value": _cache[16] || (_cache[16] = $event => ((_ctx.inputValue) = $event)),
                      onKeyup: _cache[17] || (_cache[17] = withKeys($event => (_ctx.isSearch ? _ctx.appendClick(_ctx.text) : ''), ["enter"])),
                      onClick: _ctx.handleClick,
                      type: _ctx.inputType,
                      maxlength: _ctx.inputMaxlength,
                      minlength: _ctx.minlength,
                      rows: _ctx.rows,
                      readonly: _ctx.readonly,
                      placeholder: _ctx.inputPlaceholder,
                      "show-word-limit": _ctx.isDefault && _ctx.showWordLimit,
                      onFocus: _ctx.onFocus,
                      onBlur: _ctx.onBlur,
                      onInput: _ctx.onInput,
                      disabled: _ctx.disabled,
                      autocomplete: _ctx.autocomplete,
                      status: _ctx.inputStatus
                    }, createSlots({ _: 2 /* DYNAMIC */ }, [
                      (_ctx.showPrepend)
                        ? {
                            name: "addonBefore",
                            fn: withCtx(() => [
                              createElementVNode("span", {
                                onClick: _cache[13] || (_cache[13] = $event => (_ctx.prependClick && _ctx.prependClick(_ctx.text)))
                              }, toDisplayString(_ctx.prependText), 1 /* TEXT */)
                            ]),
                            key: "0"
                          }
                        : undefined,
                      (_ctx.showAppend)
                        ? {
                            name: "addonAfter",
                            fn: withCtx(() => [
                              createElementVNode("span", {
                                onClick: _cache[14] || (_cache[14] = $event => (_ctx.appendClick && _ctx.appendClick(_ctx.text)))
                              }, toDisplayString(_ctx.appendText), 1 /* TEXT */)
                            ]),
                            key: "1"
                          }
                        : (_ctx.isSearch)
                          ? {
                              name: "addonAfter",
                              fn: withCtx(() => [
                                createVNode(_component_a_button, {
                                  onClick: _cache[15] || (_cache[15] = $event => (_ctx.appendClick(_ctx.text)))
                                }, {
                                  icon: withCtx(() => [
                                    (openBlock(), createBlock(resolveDynamicComponent('SearchOutlined')))
                                  ]),
                                  _: 1 /* STABLE */
                                })
                              ]),
                              key: "2"
                            }
                          : undefined,
                      (_ctx.inputPrefixIcon)
                        ? {
                            name: "prefix",
                            fn: withCtx(() => [
                              (_ctx.isAntdIcon(_ctx.inputPrefixIcon))
                                ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.getIconComponent(_ctx.inputPrefixIcon)), { key: 0 }))
                                : (_ctx.isIconfont(_ctx.inputPrefixIcon))
                                  ? (openBlock(), createElementBlock("i", {
                                      key: 1,
                                      class: normalizeClass(_ctx.getIconfontClass(_ctx.inputPrefixIcon))
                                    }, null, 2 /* CLASS */))
                                  : createCommentVNode("v-if", true)
                            ]),
                            key: "3"
                          }
                        : undefined,
                      (_ctx.isBankCard && _ctx.showBankCardType && _ctx.bankCardType)
                        ? {
                            name: "suffix",
                            fn: withCtx(() => [
                              createElementVNode("span", _hoisted_14, toDisplayString(_ctx.bankCardType), 1 /* TEXT */)
                            ]),
                            key: "4"
                          }
                        : (_ctx.isIdCard && _ctx.showIdCardInfo && _ctx.idCardInfo)
                          ? {
                              name: "suffix",
                              fn: withCtx(() => [
                                createVNode(_component_a_tooltip, {
                                  title: _ctx.idCardInfoText,
                                  placement: "top"
                                }, {
                                  default: withCtx(() => [
                                    createElementVNode("span", _hoisted_15, toDisplayString(_ctx.idCardValid ? '✓' : '✗'), 1 /* TEXT */)
                                  ]),
                                  _: 1 /* STABLE */
                                }, 8 /* PROPS */, ["title"]),
                                (_ctx.isAntdIcon(_ctx.inputSuffixIcon))
                                  ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.getIconComponent(_ctx.inputSuffixIcon)), { key: 0 }))
                                  : (_ctx.isIconfont(_ctx.inputSuffixIcon))
                                    ? (openBlock(), createElementBlock("i", {
                                        key: 1,
                                        class: normalizeClass(_ctx.getIconfontClass(_ctx.inputSuffixIcon))
                                      }, null, 2 /* CLASS */))
                                    : createCommentVNode("v-if", true)
                              ]),
                              key: "5"
                            }
                          : (_ctx.isEmail && _ctx.emailValid !== null)
                            ? {
                                name: "suffix",
                                fn: withCtx(() => [
                                  createElementVNode("span", _hoisted_16, toDisplayString(_ctx.emailValid ? '✓' : '✗'), 1 /* TEXT */)
                                ]),
                                key: "6"
                              }
                            : (_ctx.isUscc && _ctx.usccValid !== null)
                              ? {
                                  name: "suffix",
                                  fn: withCtx(() => [
                                    createElementVNode("span", _hoisted_17, toDisplayString(_ctx.usccValid ? '✓' : '✗'), 1 /* TEXT */)
                                  ]),
                                  key: "7"
                                }
                              : (_ctx.inputSuffixIcon)
                                ? {
                                    name: "suffix",
                                    fn: withCtx(() => [
                                      (_ctx.isAntdIcon(_ctx.inputSuffixIcon))
                                        ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.getIconComponent(_ctx.inputSuffixIcon)), { key: 0 }))
                                        : (_ctx.isIconfont(_ctx.inputSuffixIcon))
                                          ? (openBlock(), createElementBlock("i", {
                                              key: 1,
                                              class: normalizeClass(_ctx.getIconfontClass(_ctx.inputSuffixIcon))
                                            }, null, 2 /* CLASS */))
                                          : createCommentVNode("v-if", true)
                                    ]),
                                    key: "8"
                                  }
                                : undefined
                    ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "size", "allow-clear", "value", "onClick", "type", "maxlength", "minlength", "rows", "readonly", "placeholder", "show-word-limit", "onFocus", "onBlur", "onInput", "disabled", "autocomplete", "status"])
                  ], 64 /* STABLE_FRAGMENT */))
  ], 2 /* CLASS */))
}

export { render };
