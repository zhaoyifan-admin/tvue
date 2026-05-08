/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props2.mjs';
import event from '../../core/common/event2.mjs';

var script = create({
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

export { script as default };
