<template>
  <div class="data-box">
    <el-row :span="24">
      <el-col :md="span"
              :xs="24"
              :sm="12"
              v-for="(item,index) in data"
              :key="index">
        <div class="item">
          <a :href="item.href"
             @click="item.click&&item.click(item)"
             :target="item.target">
            <div class="item-icon"
                 :style="{backgroundColor:item.color}">
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
            </div>
            <div class="item-info">
              <tvue-count-up :animation="item.animation || animation"
                             :decimals="item.decimals || decimals"
                             :style="{color:item.color}"
                             class="title"
                             :end="item.count"></tvue-count-up>
              <div class="info">{{item.title}}</div>
            </div>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "data-box",
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
