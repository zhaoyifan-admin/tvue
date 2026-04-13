<template>
  <a-input-number
    v-model:value="text"
    :class="b()"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
    :precision="precision"
    :placeholder="placeholder"
    :step="step"
    :size="size"
    :min="min"
    :max="max"
    :step-min="stepMin"
    :controls="controls"
    :controls-position="controlsPosition"
    :readonly="readonly"
    :disabled="disabled"
    :formatter="formatter"
    :parser="parser"
    :string-mode="stringMode"
  >
    <template #prefix v-if="prefix">
      <span @click="prefixClick(text)">{{ prefix }}</span>
    </template>
    <template #suffix v-if="suffix">
      <span @click="suffixClick(text)">{{ suffix }}</span>
    </template>
    <template #addonBefore v-if="addonBefore">
      <span>{{ addonBefore }}</span>
    </template>
    <template #addonAfter v-if="addonAfter">
      <span>{{ addonAfter }}</span>
    </template>
  </a-input-number>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";

export default create({
  name: "ant-input-number",
  mixins: [props(), event()],
  data() {
    return {};
  },
  props: {
    precision: {
      type: Number,
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    step: {
      type: Number,
      default: 1,
    },
    stepMin: {
      type: Number,
      default: 1,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    controlsPosition: {
      type: String,
      default: "",
    },
    prefix: {
      type: String,
    },
    prefixClick: {
      type: Function,
      default: () => {},
    },
    suffix: {
      type: String,
    },
    suffixClick: {
      type: Function,
      default: () => {},
    },
    addonBefore: {
      type: String,
    },
    addonAfter: {
      type: String,
    },
    formatter: {
      type: Function,
    },
    parser: {
      type: Function,
    },
    stringMode: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  mounted() {},
  methods: {},
});
</script>
