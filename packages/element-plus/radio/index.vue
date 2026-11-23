<template>
  <div :class="b()">
    <div v-if="isSlider"
         :class="sliderClass"
         role="radiogroup">
      <span :class="b('slider-thumb')"
            :style="sliderThumbStyle"
            aria-hidden="true"></span>
      <button v-for="(item, index) in dic"
              :key="index"
              type="button"
              :class="sliderItemClass(item, index)"
              :disabled="disabled || readonly || isItemDisabled(item)"
              role="radio"
              :aria-checked="sliderActiveIndex === index"
              @click="handleSliderSelect(item, $event)">{{ item[labelKey] }}</button>
    </div>
    <el-radio-group v-else
                    v-model="text"
                    :size="size"
                    @click="handleClick"
                    :disabled="disabled">
      <component :is="componentName"
                 v-for="(item,index) in dic"
                 :value="item[valueKey]"
                 :border="border"
                 :readonly="readonly"
                 :disabled="item[disabledKey]"
                 :key="index">{{item[labelKey]}}</component>
    </el-radio-group>
  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props";
import event from "common/common/event";
export default create({
  name: "radio",
  mixins: [props(), event()],
  data () {
    return {
      name: 'radio',
    };
  },
  props: {
    modelValue: {},
    variant: {
      type: String,
      default: ''
    }
  },
  computed: {
    isSlider () {
      return this.variant === 'slider';
    },
    sliderClass () {
      const base = this.b('slider');
      return [
        base,
        this.size ? `${base}--${this.size}` : '',
        this.disabled ? `${base}--is-disabled` : ''
      ];
    },
    sliderActiveIndex () {
      return this.dic.findIndex((item) => {
        const value = item && item[this.valueKey];
        return value !== undefined && value !== null && String(value) === String(this.text);
      });
    },
    sliderThumbStyle () {
      const count = this.dic.length;
      const width = `calc((100% - 4px) / ${count || 1})`;
      if (count === 0 || this.sliderActiveIndex < 0) {
        return { width, transform: 'translateX(0)', opacity: 0 };
      }
      return {
        width,
        transform: `translateX(${this.sliderActiveIndex * 100}%)`,
        opacity: 1
      };
    }
  },
  methods: {
    sliderItemClass (item, index) {
      const base = this.b('slider-item');
      return [
        base,
        this.sliderActiveIndex === index ? `${base}--is-active` : '',
        this.isItemDisabled(item) ? `${base}--is-disabled` : ''
      ];
    },
    isItemDisabled (item) {
      return !!(item && item[this.disabledKey]);
    },
    handleSliderSelect (item, event) {
      if (this.disabled || this.readonly || this.isItemDisabled(item)) return;
      this.text = item[this.valueKey];
      this.handleClick(event);
    }
  }
});
</script>
