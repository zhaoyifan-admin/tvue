<template>
  <div :class="b()">
    <a-radio-group v-model:value="text"
                   :size="size"
                   :disabled="disabled"
                   :name="name"
                   :button-style="buttonStyle"
                   :option-type="optionType"
                   :default-value="defaultValue"
                   @change="handleChangeGroup"
                   @click="handleClick">
      <slot>
        <template v-if="options && options.length > 0">
          <component :is="radioComponent"
                     v-for="(item, index) in options"
                     :key="index"
                     :value="getOptionValue(item)"
                     :disabled="getOptionDisabled(item)">
            {{ getOptionLabel(item) }}
          </component>
        </template>
        <template v-else>
          <component :is="radioComponent"
                     v-for="(item, index) in dic"
                     :key="index"
                     :value="item[valueKey]"
                     :disabled="item[disabledKey] || disabled">
            {{ item[labelKey] }}
          </component>
        </template>
      </slot>
    </a-radio-group>
  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";

export default create({
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
</script>
