<template>
  <div class="tvue-data-rotate">
    <el-row :span="24">
      <el-col :md="span"
              :xs="24"
              :sm="12"
              v-for="(item,index) in data"
              :key="index">
        <div class="item"
             :style="{backgroundColor:item.color}">
          <div class="item-box">
            <tvue-count-up class="item-count"
                           :decimals="item.decimals || decimals"
                           :animation="item.animation || animation"
                           :end="item.count"></tvue-count-up>
            <span class="item-title">{{item.title}}</span>
            <el-icon :color="item.color"
                     class="item-icon">
              <component :is="item.icon"></component>
            </el-icon>
          </div>
          <a :href="item.href"
             @click="item.click&&item.click(item)">
            <p class="item-more">更多
              <el-icon>
                <el-icon-arrow-right />
              </el-icon>
            </p>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import create from "core/create";
export default create({
  name: "data-rotate",
  data () {
    return {};
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    animation () {
      return this.option.animation
    },
    decimals () {
      return this.option.decimals || 0
    },
    span () {
      return this.option.span || 8;
    },
    data () {
      return this.option.data || [];
    }
  },
  created () { },
  mounted () { },
  watch: {},
  methods: {}
});
</script>
