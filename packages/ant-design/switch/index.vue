<template>
  <div :class="b()">
    <a-switch v-model:checked="text"
              :before-change="handleBeforeChange"
              :checked-children="active[labelKey]"
              :checked-value="activeValue"
              :disabled="disabled"
              :loading="loading"
              :size="size"
              :un-checked-children="inactive[labelKey]"
              :un-checked-value="inactiveValue"
              @click="handleClick">
      <template v-if="activeIcon" #checkedChildren>
        <component :is="activeIcon" />
      </template>
      <template v-if="inactiveIcon" #unCheckedChildren>
        <component :is="inactiveIcon" />
      </template>
    </a-switch>
  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";

export default create({
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
        this.loading = true
        const callback = (result) => {
          this.loading = false
          return resolve(result)
        }
        if (this.beforeChange && typeof this.beforeChange === 'function') {
          return this.beforeChange(callback)
        } else {
          return callback(true)
        }
      })
    },
  }
});
</script>
