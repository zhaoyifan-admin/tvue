<template>
  <div :class="b()">
    <a-checkbox v-if="all"
                :class="b('all')"
                :disabled="disabled"
                :indeterminate="isIndeterminate"
                :checked="checkAll"
                @change="handleCheckAll">{{t('check.checkAll')}}</a-checkbox>
    <a-checkbox-group v-model:value="textArray"
                      @change="handleCheckChange"
                      :disabled="disabled"
                      @click="handleClick">
      <slot>
        <a-checkbox v-for="(item,index) in dic"
                    :value="item[valueKey]"
                    :disabled="item[disabledKey] || disabled"
                    :key="index">{{item[labelKey]}}
        </a-checkbox>
      </slot>
    </a-checkbox-group>
  </div>
</template>

<script>
import locale from "core/locale";
import create from "core/create";
import props from "common/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "ant-checkbox",
  props: {
    all: {
      type: Boolean,
      default: false
    }
  },
  mixins: [props(), event(), locale],
  data () {
    return {
      checkAll: false,
      isIndeterminate: false,
      name: 'checkbox',
    };
  },
  computed: {
    // 确保 text 始终是数组用于 checkbox-group
    textArray: {
      get () {
        if (Array.isArray(this.text)) {
          return this.text;
        }
        // 如果是字符串，转换为数组
        if (typeof this.text === 'string') {
          return this.text ? String(this.text).split(this.separator) : [];
        }
        return [];
      },
      set (val) {
        // 直接设置 text，让 handleChange 处理类型转换
        this.text = val;
      }
    }
  },
  watch: {
    dic () {
      this.handleCheckChange();
    },
    textArray: {
      handler (val) {
        this.handleCheckChange(val);
      },
      immediate: true
    },
  },
  created () { },
  mounted () { },
  methods: {
    handleCheckAll (e) {
      if (!this.all) return
      const checked = e.target.checked;
      const availableOptions = this.dic.filter(item => !item[this.disabledKey]);
      const values = checked ? availableOptions.map(ele => ele[this.valueKey]) : [];

      // 直接赋值数组给 text
      this.text = values;

      this.isIndeterminate = false;
      this.checkAll = checked;
    },
    handleCheckChange (value) {
      // value 是 checkbox-group change 事件传递的当前选中值数组
      const currentValue = Array.isArray(value) ? value : this.textArray;

      if (!this.all) return

      const availableCount = this.dic.filter(item => !item[this.disabledKey]).length;
      let checkedCount = currentValue.length;
      this.checkAll = checkedCount === availableCount && availableCount > 0;
      this.isIndeterminate = checkedCount > 0 && checkedCount < availableCount;
    }
  }
});
</script>


