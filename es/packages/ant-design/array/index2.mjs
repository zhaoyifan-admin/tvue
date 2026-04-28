/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props2.mjs';
import event from '../../core/common/event2.mjs';
import { isMediaType } from '../../../src/utils/util.mjs';

var script = create({
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
        this.text = [];
      }
      this.text.splice(index + 1, 0, '');
    },
    remove (index) {
      if (!Array.isArray(this.text)) {
        this.text = [];
        return
      }
      this.text.splice(index, 1);
    },
    openImg (index) {
      const list = this.text.map(ele => {
        return { thumbUrl: ele, url: ele, type: this.fileType }
      });
      this.$ImagePreview(list, index);
    },
  }
});

export { script as default };
