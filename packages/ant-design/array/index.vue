<template>
  <div :class="b()">
    <a-button
      type="primary"
      :size="size"
      v-if="validatenull(text)"
      :disabled="disabled"
      @click="add()">
      <template #icon>
        <component :is="'PlusOutlined'" />
      </template>
    </a-button>
    <div :class="b('item')"
         v-for="(item,index) in text"
         :key="index">
      <div :class="b('input')">
        <a-tooltip placement="bottom"
                   :title="(!isImg && !isUrl) || validatenull(item) ? '' : tooltipContent(item)">
          <a-input v-model:value="text[index]"
                   :size="size"
                   :maxlength="maxlength"
                   :minlength="minlength"
                   :placeholder="placeholder"
                   :disabled="disabled">
            <template #suffix v-if="showWordLimit && maxlength">
              <span class="tvue-array__word-limit">
                {{ (text[index] || '').length }}/{{ maxlength }}
              </span>
            </template>
          </a-input>
        </a-tooltip>

        <!-- 图片或链接预览 -->
        <div v-if="isImg && !validatenull(item)" class="tvue-array__preview">
          <component
            style="width: 200px; cursor: pointer;"
            :src="item"
            @click="openImg(index)"
            controls="controls"
            :is="isMediaType(item)">
          </component>
        </div>
        <div v-else-if="isUrl && !validatenull(item)" class="tvue-array__link">
          <a :href="item"
             :target="target"
             class="tvue-array__link-text">{{item}}</a>
        </div>

        <template v-if="!(disabled || readonly || alone)">
          <a-button v-if="!isLimit"
                    type="primary"
                    :size="size"
                    :disabled="disabled"
                    @click="add(index)">
            <template #icon>
              <component :is="'PlusOutlined'" />
            </template>
          </a-button>
          <a-button danger
                    :size="size"
                    :disabled="disabled"
                    @click="remove(index)">
            <template #icon>
              <component :is="'MinusOutlined'" />
            </template>
          </a-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
import { isMediaType } from "utils/util";

export default create({
  name: 'ant-array',
  mixins: [props(), event()],
  data () {
    return {
      text: []
    }
  },
  computed: {
    isLimit () {
      if (this.validatenull(this.limit)) return false
      else if (this.textLen >= this.limit) return true
      return false
    },
    textLen () {
      return (this.text || []).length
    },
    isImg () {
      return this.type === 'ant-img'
    },
    isUrl () {
      return this.type === 'url' || this.type === 'ant-url'
    },
  },
  props: {
    fileType: String,
    alone: Boolean,
    type: String,
    limit: Number,
    maxlength: [String, Number],
    minlength: [String, Number],
    showWordLimit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isMediaType (item) {
      return isMediaType(item, this.fileType)
    },
    tooltipContent (item) {
      if (this.isImg) {
        const mediaType = this.isMediaType(item);
        if (mediaType === 'img') {
          return `<img src="${item}" style="width: 200px; cursor: pointer;" onclick="event.stopPropagation()" />`;
        } else if (mediaType === 'video') {
          return `<video src="${item}" style="width: 200px;" controls onclick="event.stopPropagation()"></video>`;
        } else if (mediaType === 'audio') {
          return `<audio src="${item}" controls onclick="event.stopPropagation()"></audio>`;
        }
      } else if (this.isUrl) {
        return item;
      }
      return '';
    },
    add (index) {
      if (!Array.isArray(this.text)) {
        this.text = []
      }
      this.text.splice(index + 1, 0, '');
    },
    remove (index) {
      if (!Array.isArray(this.text)) {
        this.text = []
        return
      }
      this.text.splice(index, 1)
    },
    openImg (index) {
      const list = this.text.map(ele => {
        return { thumbUrl: ele, url: ele, type: this.fileType }
      })
      this.$ImagePreview(list, index);
    },
  }
})
</script>
