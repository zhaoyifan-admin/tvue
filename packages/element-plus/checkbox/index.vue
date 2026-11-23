<template>
  <div :class="b()">
    <el-checkbox v-if="all"
                 :class="b('all')"
                 :disabled="disabled"
                 :indeterminate="isIndeterminate"
                 v-model="checkAll"
                 @change="handleCheckAll">{{t('check.checkAll')}}</el-checkbox>
    <el-checkbox-group v-model="text"
                       @change="handleCheckChange"
                       :disabled="disabled"
                       :size="size"
                       :fill="fill"
                       :text-color="textColor"
                       :min="min"
                       :max="max"
                       @click="handleClick">
      <component :is="componentName"
                 v-for="(item,index) in dic"
                 :border="border"
                 :size="size"
                 :value="item[valueKey]"
                 :readonly="readonly"
                 :disabled="item[disabledKey]"
                 :key="index">{{item[labelKey]}}
      </component>
    </el-checkbox-group>
  </div>
</template>

<script>
import locale from "core/locale";
import create from "core/create";
import props from "common/common/props";
import event from "../../core/common/event";
import { cloneModel, isModelEqual } from "core/model";
export default create({
  name: "checkbox",
  props: {
    fill: String,
    textColor: String,
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
  watch: {
    dic: {
      handler () { this.handleCheckChange(); },
      deep: true
    },
    text: {
      handler () {
        this.handleCheckChange();
      },
      deep: true
    },
    valueKey () { this.handleCheckChange(); },
    disabledKey () { this.handleCheckChange(); },
    all () { this.handleCheckChange(); },
  },
  created () { },
  mounted () { },
  methods: {
    handleCheckAll (val) {
      if (!this.all) return
      const availableOptions = this.dic.filter(item => !item[this.disabledKey]);
      const selected = Array.isArray(this.text) ? cloneModel(this.text) : [];
      const values = availableOptions.map(item => item[this.valueKey]);
      if (val) {
        values.forEach(value => {
          if (!selected.some(item => isModelEqual(item, value))) selected.push(cloneModel(value));
        });
        this.text = selected;
      } else {
        this.text = selected.filter(value => !values.some(item => isModelEqual(item, value)));
      }
      this.handleCheckChange();
    },
    handleCheckChange () {
      if (!this.all) return
      const selected = Array.isArray(this.text) ? this.text : [];
      const available = this.dic.filter(item => !item[this.disabledKey]);
      const availableCount = available.length;
      const checkedCount = available.filter(item => selected.some(value => isModelEqual(value, item[this.valueKey]))).length;
      this.checkAll = availableCount > 0 && checkedCount === availableCount;
      this.isIndeterminate = checkedCount > 0 && checkedCount < availableCount;
    }
  }
});
</script>

