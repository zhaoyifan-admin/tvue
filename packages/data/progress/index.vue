<template>
  <div class="data-progress">
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
            <div class="item-header">
              <tvue-count-up class="item-count"
                             :animation="item.animation || animation"
                             :decimals="item.decimals || decimals"
                             :end="item.count"></tvue-count-up>
              <div class="item-title"
                   v-text="item.title"></div>
            </div>
            <el-progress :stroke-width="15"
                         :percentage="item.count"
                         :color="item.color"
                         :show-text="false"></el-progress>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "data-progress",
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
