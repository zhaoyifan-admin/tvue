/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props2.mjs';
import event from '../../core/common/event2.mjs';

var script = create({
  name: "ant-switch",
  mixins: [props(), event()],
  props: {
    size: {
      type: String,
      default: 'default'
    },
    activeIcon: String,
    inactiveIcon: String,
    beforeChange: Function
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    active() {
      return this.dic[1] || {};
    },
    inactive() {
      return this.dic[0] || {};
    },
    activeValue() {
      const value = this.active[this.valueKey];
      return this.validatenull(value) ? true : value;
    },
    inactiveValue() {
      const value = this.inactive[this.valueKey];
      return this.validatenull(value) ? false : value;
    }
  },
  methods: {
    handleBeforeChange () {
      return new Promise((resolve) => {
        this.loading = true;
        const callback = (result) => {
          this.loading = false;
          return resolve(result)
        };
        if (this.beforeChange && typeof this.beforeChange === 'function') {
          return this.beforeChange(callback)
        } else {
          return callback(true)
        }
      })
    },
  }
});

export { script as default };
