<template>
  <div class="tvue-data-tabs">
    <el-row :span="24">
      <el-col :md="span"
              :xs="24"
              :sm="12"
              v-for="(item,index) in data"
              :key="index">
        <div class="item"
             :style="{background:item.color}">
          <a :href="item.href"
             @click="item.click&&item.click(item)"
             :target="item.target">
            <div class="item-header">
              <p>{{item.title}}</p>
              <span>{{item.subtitle}}</span>
            </div>
            <div class="item-body">
              <tvue-count-up class="h2"
                             :decimals="item.decimals || decimals"
                             :animation="item.animation || animation"
                             :end="item.count"></tvue-count-up>
            </div>
            <div class="item-footer">
              <span>{{item.allcount}}</span>
              <p>{{item.text}}</p>
            </div>
            <p class="item-tip">{{item.key}}</p>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "data-tabs",
  data () {
    return {};
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
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  }
});
</script>
