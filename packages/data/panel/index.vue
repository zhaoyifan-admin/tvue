<template>
  <div class="tvue-data-panel">
    <el-row :span="24">
      <el-col v-for="(item,index) in data"
              :key="index"
              :md="span"
              :xs="24"
              :sm="12">
        <a :href="item.href"
           @click="item.click&&item.click(item)">
          <div class="item">
            <div class="item-icon">
              <el-icon :color="item.color">
                <component :is="item.icon"></component>
              </el-icon>
            </div>
            <div class="item-info">
              <div class="item-title">{{item.title}}</div>
              <tvue-count-up :animation="item.animation || animation"
                             :decimals="item.decimals || decimals"
                             class="item-count"
                             :end="item.count"></tvue-count-up>
            </div>

          </div>
        </a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "data-panel",
  data () {
    return {};
  },
  computed: {
    decimals () {
      return this.option.decimals || 0
    },
    animation () {
      return this.option.animation
    },
    span () {
      return this.option.span || 6;
    },
    data () {
      return this.option.data || [];
    }
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  created () { },
  methods: {}
});
</script>
