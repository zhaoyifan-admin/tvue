<template>
  <a-drawer v-if="box"
            :class="['tvue-dialog',b('filter')].join(' ')"
            :get-container="false"
            :title="t('crud.filterTitle')"
            :width="crud.isMobile?'100%':'60%'"
            :open="box"
            @close="box = false">
    <a-row :span="24">
      <a-col :md="24"
             :class="b('filter-menu')">
        <a-space>
          <a-button type="primary"
                    :size="crud.size"
                    @click="handleAdd">{{t('crud.filter.addBtn')}}</a-button>
          <a-button type="primary"
                    :size="crud.size"
                    @click="handleClear">{{t('crud.filter.resetBtn')}}</a-button>
          <a-button type="primary"
                    :size="crud.size"
                    @click="handleValueClear">{{t('crud.filter.clearBtn')}}</a-button>
        </a-space>
      </a-col>
      <a-col :md="12"
             :xs="24"
             :sm="12"
             v-for="(column,index) in list"
             :key="index"
             :class="b('filter-item')">
        <tvue-ant-select v-model="column.text"
                     :dic="columnOption"
                     :clearable="false"
                     @change="handleChange(index)"
                     :size="crud.size"
                     :class="b('filter-label')"></tvue-ant-select>
        <tvue-ant-select :class="b('filter-symbol')"
                     v-model="column.symbol"
                     :dic="symbolDic"
                     :clearable="false"
                     :size="crud.size"></tvue-ant-select>
        <tvue-ant-input :size="crud.size"
                    :class="b('filter-value')"
                    v-model="column.value">
        </tvue-ant-input>
        <a-button type="primary"
                  danger
                  :class="b('filter-icon')"
                  :size="crud.size"
                  @click="handleDelete(index)">
          <template #icon>
            <MinusOutlined />
          </template>
        </a-button>
      </a-col>
    </a-row>
    <span class="tvue-dialog__footer">
      <a-button type="primary"
                :size="crud.size"
                @click="handleSubmit">{{t('crud.filter.submitBtn')}}</a-button>
      <a-button @click="box = false"
                :size="crud.size">{{t('crud.filter.cancelBtn')}}</a-button>
    </span>
  </a-drawer>
</template>

<script>
import locale from "core/locale";
import create from "core/create";
import { MinusOutlined } from '@ant-design/icons-vue';
export default create({
  name: "crud",
  mixins: [locale],
  inject: ["crud"],
  components: {
    MinusOutlined
  },
  data () {
    return {
      box: false,
      columnObj: {},
      symbolDic: [
        {
          label: "=",
          value: "="
        },
        {
          label: "≠",
          value: "≠"
        },
        {
          label: "like",
          value: "like"
        },
        {
          label: ">",
          value: ">"
        },
        {
          label: "≥",
          value: "≥"
        },
        {
          label: "<",
          value: "<"
        },
        {
          label: "≤",
          value: "≤"
        },
        {
          label: "∈",
          value: "∈"
        }
      ],
      list: [],
      columnOption: {}
    }
  },
  methods: {
    handleShow () {
      this.getColumnOption()
      this.box = true
    },
    getColumnOption () {
      let result = []
      let column = this.deepClone(this.crud.propOption)
      column.forEach(ele => {
        if (ele.showColumn !== false) result.push(Object.assign(ele, {
          value: ele.prop
        }))
      });
      this.columnOption = result
      this.columnObj = this.columnOption[0];
    },
    handleDelete (index) {
      this.list.splice(index, 1);
    },
    handleClear () {
      this.list = [];
    },
    handleValueClear () {
      this.list.forEach((ele, index) => ele.value = '');
    },
    handleSubmit () {
      let result = [];
      this.list.forEach(ele => {
        result.push([ele.text, ele.symbol, ele.value]);
      });
      this.crud.$emit("filter", result);
      this.box = false;
    },
    handleChange (index) {
      this.list[index].value = ''
    },
    handleAdd () {
      const prop = this.columnObj.prop;
      this.list.push({
        text: prop,
        value: '',
        symbol: this.symbolDic[0].value
      });
    }
  }
});
</script>
