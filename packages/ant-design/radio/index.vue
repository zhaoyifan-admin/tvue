<template>
  <div :class="b()">
    <a-radio-group v-model:value="text"
                   :size="size"
                   @click="handleClick"
                   :disabled="disabled"
                   :name="name"
                   :button-style="buttonStyle"
                   :option-type="optionType">
      <slot>
        <component :is="componentName"
                   v-for="(item,index) in dic"
                   :key="index"
                   :value="item[valueKey]"
                   :disabled="item[disabledKey] || disabled">
          {{item[labelKey]}}
        </component>
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
  data () {
    return {
      name: 'radio',
    };
  },
  props: {
    modelValue: {},
    buttonStyle: {
      type: String,
      default: 'outline'
    },
    optionType: {
      type: String,
      default: 'default'
    }
  },
  watch: {},
  created () { },
  mounted () { },
  computed: {
    componentName () {
      const type = 'a'
      const result = `${type}-${this.name}${this.button ? '-button' : ''}`
      return result
    }
  },
  methods: {}
});
</script>
