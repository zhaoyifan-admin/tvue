/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props2.mjs';
import event from '../../core/common/event2.mjs';

var script = create({
  name: "ant-radio",
  mixins: [props(), event()],
  data() {
    return {
      name: 'radio',
    };
  },
  props: {
    modelValue: {},
    defaultValue: {
      type: [String, Number, Boolean],
      default: undefined
    },
    buttonStyle: {
      type: String,
      default: 'outline'
    },
    optionType: {
      type: String,
      default: 'default'
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    radioComponent() {
      return this.button ? 'a-radio-button' : 'a-radio';
    }
  },
  methods: {
    handleChangeGroup(e) {
      const value = e.target.value;
      this.handleChange(value);
    },
    getOptionValue(option) {
      if (typeof option === 'string' || typeof option === 'number') {
        return option;
      }
      return option.value;
    },
    getOptionLabel(option) {
      if (typeof option === 'string' || typeof option === 'number') {
        return option;
      }
      return option.label;
    },
    getOptionDisabled(option) {
      if (typeof option === 'string' || typeof option === 'number') {
        return false;
      }
      return option.disabled || false;
    }
  }
});

export { script as default };
