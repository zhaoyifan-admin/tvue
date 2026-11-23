<template>
  <el-upload
    :key="reload"
    :class="[
      b({ list: listType == 'picture-img', disabled: disabled }),
      'tvue-upload--' + listType,
    ]"
    @click="handleClick"
    :action="action"
    :on-remove="handleRemove"
    :accept="acceptList"
    :before-remove="beforeRemove"
    :multiple="multiple"
    :on-preview="handlePreview"
    :limit="limit"
    :http-request="httpUpload"
    :drag="dragFile"
    :readonly="readonly"
    :directory="directory"
    :show-file-list="isPictureImg ? false : showFileList"
    :list-type="listTypeText"
    :on-change="handleFileChange"
    :on-exceed="handleExceed"
    :disabled="disabled"
    :file-list="fileList"
  >
    <template v-if="listType == 'picture-card'">
      <el-icon>
        <el-icon-plus />
      </el-icon>
    </template>
    <div :class="b('avatar')" v-else-if="listType == 'picture-img'">
      <el-progress
        type="circle"
        @mouseover="handleMouseover"
        v-if="showProgress(firstFile)"
        :percentage="firstFile.percentage"
      ></el-progress>
      <div
        v-else
        :element-loading-text="loadText"
        v-loading.lock="firstFile.loading"
      >
        <template v-if="firstFile.url">
          <slot v-if="$slots.default" :file="firstFile"></slot>
          <template v-else>
            <component
              v-if="firstFile.type"
              :src="firstFile.url"
              controls="controls"
              :is="firstFile.type"
              @mouseover="handleMouseover"
              :class="b('avatar')"
            ></component>
            <el-icon
              v-else
              @mouseover="handleMouseover"
              :src="firstFile.url"
              :class="b('avatar')"
            >
              <el-icon-document />
            </el-icon>
          </template>
        </template>
        <el-icon v-else :class="b('avatar')">
          <el-icon-plus />
        </el-icon>
      </div>
      <div
        class="el-upload-list__item-actions"
        :class="b('menu')"
        v-if="menu"
        @mouseover="handleMouseover"
        @mouseout="handleMouseout"
        @click.stop="
          () => {
            return false;
          }
        "
      >
        <el-icon @click.stop="handlePreview(firstFile)">
          <el-icon-zoom-in />
        </el-icon>
        <el-icon v-if="!disabled" @click.stop="handleRemove(firstFile)">
          <el-icon-delete />
        </el-icon>
      </div>
    </div>
    <template v-else-if="dragFile">
      <el-icon>
        <el-icon-upload />
      </el-icon>
      <div class="el-upload__text">
        <em>{{ fileText || t("upload.upload") }}</em>
      </div>
    </template>
    <template v-else>
      <slot name="button" :disabled="disabled" v-if="$slots.button"></slot>
      <el-button
        v-else
        icon="el-icon-upload"
        :size="size"
        :disabled="disabled"
        type="primary"
      >{{ fileText || t("upload.upload") }}</el-button
      >
    </template>
    <template #tip>
      <div class="el-upload__tip" v-html="tip"></div>
    </template>
    <template #file="{ file }">
      <span :element-loading-text="loadText" v-loading.lock="file.loading">
        <template v-if="listType === 'picture-card'">
          <el-progress
            type="circle"
            :percentage="file.percentage"
            v-if="showProgress(file)"
          ></el-progress>
          <template v-else>
            <slot :file="file" v-if="$slots.default"> </slot>
            <template v-else>
              <component
                class="el-upload-list__item-thumbnail"
                v-if="file.type"
                :src="file.url"
                :is="file.type"
              ></component>
              <el-icon v-else :class="b('avatar')">
                <el-icon-document />
              </el-icon>
            </template>
          </template>
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview">
              <el-icon>
                <el-icon-zoom-in
                  @click.stop="handlePreview(file)"
                ></el-icon-zoom-in>
              </el-icon>
            </span>
            <span class="el-upload-list__item-delete" v-if="!disabled">
              <el-icon>
                <el-icon-delete
                  @click.stop="handleRemove(file)"
                ></el-icon-delete>
              </el-icon>
            </span>
          </span>
        </template>
        <div
          v-else-if="listType === 'picture'"
          style="display: flex"
          @click.stop="handlePreview(file)"
        >
          <slot :file="file" v-if="$slots.default"> </slot>
          <template v-else>
            <component
              v-if="file.type"
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              controls="controls"
              :is="file.type"
            ></component>
            <div class="el-upload-list__item-info">
              <a class="el-upload-list__item-name">
                <el-icon>
                  <el-icon-document></el-icon-document>
                </el-icon>
                <span class="el-upload-list__item-file-name">
                  {{ file.name }}</span
                >
              </a>
            </div>
          </template>
          <el-icon class="el-icon--close" v-if="!disabled">
            <el-icon-close @click.stop="handleRemove(file)"></el-icon-close>
          </el-icon>
          <el-progress
            :class="b('progress')"
            :percentage="file.percentage"
            :stroke-width="3"
            v-if="showProgress(file)"
          ></el-progress>
        </div>
        <span v-else @click.stop="handlePreview(file)">
          <div class="el-upload-list__item-info">
            <a class="el-upload-list__item-name">
              <slot :file="file" v-if="$slots.default"> </slot>
              <template v-else>
                <el-icon>
                  <el-icon-document></el-icon-document>
                </el-icon>
                <span class="el-upload-list__item-file-name">
                  {{ file.name }}</span
                >
              </template>
            </a>
            <el-icon class="el-icon--close" v-if="!disabled">
              <el-icon-close @click.stop="handleRemove(file)"></el-icon-close>
            </el-icon>
            <el-progress
              :class="b('progress')"
              :percentage="file.percentage"
              :stroke-width="3"
              v-if="showProgress(file)"
            ></el-progress>
          </div>
        </span>
      </span>
    </template>
  </el-upload>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
import props from "common/common/props";
import event from "common/common/event";
import { getAsVal, isMediaType } from "utils/util";
import { detailImg } from "plugin/watermark/";
import { getToken } from "plugin/qiniu/";
import { getClient } from "plugin/ali/";
import packages from "core/packages";
function getFileUrl(home, uri = "") {
  return uri.match(/(^http:\/\/|^https:\/\/|^\/\/|data:image\/)/)
    ? uri
    : home + uri;
}
const FILE_STATUS_READY = "ready";
const FILE_STATUS_DONE = "done";
function isFileReady(file) {
  return file.status === FILE_STATUS_READY;
}
export default create({
  name: "upload",
  mixins: [props(), event(), locale],
  data() {
    return {
      uploadCacheList: [],
      uploadList: [],
      res: "",
      menu: false,
      reload: Math.random(),
      uploadTasks: [],
      uploadTaskId: 0,
      uploadUnmounted: false,
    };
  },
  props: {
    qiniu: Object,
    ali: Object,
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    paramsList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    showFileList: {
      type: Boolean,
      default: true,
    },
    fileText: String,
    fileType: {
      type: String,
    },
    oss: {
      type: String,
    },
    limit: {
      type: Number,
    },
    headers: {
      type: Object,
      default: () => {
        return {};
      },
    },
    accept: {
      type: [String, Array],
      default: "",
    },
    canvasOption: {
      type: Object,
      default: () => {
        return {};
      },
    },
    cropperOption: {
      type: Object,
      default: () => {
        return {};
      },
    },
    fileSize: {
      type: Number,
    },
    dragFile: {
      type: Boolean,
      default: false,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    directory: {
      type: Boolean,
      default: false,
    },
    loadText: {
      type: String,
      default: "Loading...",
    },
    action: {
      type: String,
      default: "",
    },
    uploadSized: Function,
    uploadBefore: Function,
    uploadAfter: Function,
    uploadDelete: Function,
    uploadPreview: Function,
    uploadError: Function,
    uploadExceed: Function,
    httpRequest: Function,
  },
  computed: {
    listTypeText() {
      if (this.listType == "picture-img" || this.listType == "") {
        return "text";
      }
      return this.listType;
    },
    isObject() {
      let obj = this.text[0];
      return (
        typeof obj === "object" || this.dataType == "object" || this.isJson
      );
    },
    acceptList() {
      if (Array.isArray(this.accept)) {
        return this.accept.join(",");
      }
      return this.accept;
    },
    homeUrl() {
      return this.propsHttp.home || "";
    },
    fileName() {
      return this.propsHttp.fileName || "file";
    },
    isCosOss() {
      return this.oss === "cos";
    },
    isAliOss() {
      return this.oss === "ali";
    },
    isQiniuOss() {
      return this.oss === "qiniu";
    },
    isPictureImg() {
      return this.listType === "picture-img";
    },
    firstFile() {
      return this.fileList[0] || {};
    },
    fileList() {
      let list = [];
      const parseFile = (ele) => {
        let name, url, type;
        if (this.isObject) {
          name = ele[this.labelKey];
          url = ele[this.valueKey];
          type = ele[this.typeKey] || this.isMediaType(url);
        } else {
          name = ele.substring(ele.lastIndexOf("/") + 1);
          url = ele;
          type = this.isMediaType(url);
        }
        url = getFileUrl(this.homeUrl, url);
        return { name, url, type };
      };
      this.text.forEach((ele, index) => {
        if (ele) {
          const { name, url, type } = parseFile(ele);
          list.push({
            uid: index + "",
            status: FILE_STATUS_DONE,
            type: type,
            name: name,
            url: url,
          });
        }
      });
      return list.concat(this.uploadList);
    },
  },
  mounted() {
    if (this.drag) {
      this.setSort();
    }
  },
  beforeUnmount() {
    this.uploadUnmounted = true;
    this.uploadTasks.slice().forEach((task) => this.finishUploadTask(task, true));
  },
  methods: {
    matchesUploadFile(entry, file) {
      if (!entry || !file) return false;
      const source = entry.raw || entry;
      const target = file.raw || file;
      return source === target || (entry.uid !== undefined && file.uid !== undefined && entry.uid === file.uid);
    },
    isUploadTaskActive(task) {
      return !this.uploadUnmounted && task.active;
    },
    clearUploadTimer(task) {
      if (task.timer !== null && task.timer !== undefined) clearInterval(task.timer);
      task.timer = null;
    },
    abortUploadTask(task) {
      if (task.abortCalled || typeof task.abort !== "function") return;
      task.abortCalled = true;
      try {
        task.abort();
      } catch (_error) {
        // A failed transport abort must not reactivate a canceled upload.
      }
    },
    setUploadRequest(task, request, fallbackAbort) {
      task.abort = request && typeof request.abort === "function" ? () => request.abort()
        : request && typeof request.cancel === "function" ? () => request.cancel() : fallbackAbort;
      if (task.cancelled || this.uploadUnmounted) this.abortUploadTask(task);
    },
    finishUploadTask(task, cancel = false) {
      if (!task.active) return false;
      task.active = false;
      task.cancelled = cancel;
      this.clearUploadTimer(task);
      task.fileState.loading = false;
      this.uploadTasks = this.uploadTasks.filter((item) => item.id !== task.id);
      if (cancel) this.abortUploadTask(task);
      return true;
    },
    cancelUpload(file) {
      this.uploadTasks.slice().forEach((task) => {
        if (this.matchesUploadFile(task.fileState, file)) this.finishUploadTask(task, true);
      });
      this.uploadCacheList = this.uploadCacheList.filter((entry) => !this.matchesUploadFile(entry, file));
      this.uploadList = this.uploadList.filter((entry) => !this.matchesUploadFile(entry, file));
    },
    handleMouseover() {
      this.menu = true;
    },
    handleMouseout() {
      this.menu = false;
    },
    showProgress(file) {
      return isFileReady(file) && !this.oss;
    },
    isMediaType(url) {
      return isMediaType(url, this.fileType);
    },
    setSort() {
      if (!window.Sortable) {
        packages.logs("Sortable");
        return;
      }
      const el = this.$el.querySelectorAll(".tvue-upload > ul")[0];
      window.Sortable.create(el, {
        animation: 100,
        onEnd: (evt) => {
          const targetRow = this.text.splice(evt.oldIndex, 1)[0];
          this.text.splice(evt.newIndex, 0, targetRow);

          this.reload = Math.random();
          this.$nextTick(() => this.setSort());
        },
      });
    },
    handleError(error) {
      if (error) this.uploadError && this.uploadError(error, this.column);
    },
    handleSuccess(file) {
      if (this.isObject) {
        const obj = {
          [this.labelKey]: file[this.nameKey],
          [this.valueKey]: file[this.urlKey],
          [this.typeKey]: file[this.fileTypeKey],
        };
        this.paramsList.forEach((ele) => (obj[ele.label] = file[ele.value]));
        this.text.push(obj);
      } else {
        this.text.push(file[this.urlKey]);
      }
    },
    handleRemove(file) {
      if (isFileReady(file) || this.uploadTasks.some((task) => this.matchesUploadFile(task.fileState, file))) {
        this.cancelUpload(file);
      } else {
        Promise.resolve(this.beforeRemove(file)).then((allowed) => {
          if (allowed === false || this.uploadUnmounted) return;
          this.text.forEach((ele, index) => {
            let url = this.isObject ? ele[this.valueKey] : ele;
            if (getFileUrl(this.homeUrl, url) === file.url) {
              this.text.splice(index, 1);
            }
          });
          this.menu = false;
        }).catch(() => undefined);
      }
    },
    handleFileChange(file, fileList) {
      fileList.pop();
      this.uploadCacheList.push(file);
    },
    httpUpload(config) {
      if (this.uploadUnmounted) return;
      let { file } = config;
      const sourceFile = file;
      let fileIndex = this.uploadCacheList.findIndex((ele) => this.matchesUploadFile(ele, sourceFile));
      let fileState = this.uploadCacheList[fileIndex] || { raw: sourceFile, uid: sourceFile.uid, status: FILE_STATUS_READY };
      const task = { id: ++this.uploadTaskId, active: true, fileState, timer: null, started: false, resultReceived: false };
      this.uploadTasks.push(task);
      let response = {};
      const deleteUploadCacheFile = () => {
        this.uploadCacheList = this.uploadCacheList.filter((entry) => !this.matchesUploadFile(entry, sourceFile));
        this.uploadList = this.uploadList.filter((entry) => !this.matchesUploadFile(entry, sourceFile));
      };

      const show = (data) => {
        if (!this.isUploadTaskActive(task) || !this.finishUploadTask(task)) return;
        deleteUploadCacheFile();
        this.res = data || response;
        this.handleSuccess(this.res);
      };
      const hide = (msg) => {
        if (!this.isUploadTaskActive(task) || !this.finishUploadTask(task)) return;
        deleteUploadCacheFile();
        this.handleError(msg);
      };
      if (typeof this.httpRequest === "function") {
        deleteUploadCacheFile();
        const success = (result) => {
          if (!this.isUploadTaskActive(task) || !this.finishUploadTask(task)) return;
          if (typeof config.onSuccess === "function") config.onSuccess(result);
        };
        const failure = (error) => {
          if (!this.isUploadTaskActive(task) || !this.finishUploadTask(task)) return;
          if (typeof config.onError === "function") config.onError(error);
          else this.handleError(error);
        };
        try {
          const request = this.httpRequest({
            ...config, onSuccess: success, onError: failure,
            onProgress: (event) => {
              if (this.isUploadTaskActive(task) && typeof config.onProgress === "function") config.onProgress(event);
            },
          }, this.column);
          this.setUploadRequest(task, request);
          if (request && typeof request.then === "function") Promise.resolve(request).then(success, failure);
          else return request;
        } catch (error) {
          failure(error);
        }
        return;
      }
      const fileSize = file.size / 1024;
      if (!this.validatenull(fileSize) && fileSize > this.fileSize) {
        hide();
        this.handleSized(file, this.text);
        return;
      }
      const headers = {
        ...this.headers,
        "Content-Type": "multipart/form-data",
      };
      //oss配置属性
      let oss,
        oss_config = {};
      let client = {};
      let param = new FormData();
      const done = () => {
        if (!this.isUploadTaskActive(task) || task.prepared) return;
        task.prepared = true;
        this.oss ? (fileState.loading = true) : (fileState.percentage = 0);
        let url = this.action;
        //附加属性
        for (let o in this.data) {
          param.append(o, this.data[o]);
        }
        let uploadFile;
        const handleUploadResult = (res) => {
          if (!this.isUploadTaskActive(task) || task.resultReceived) return;
          task.resultReceived = true;
          this.clearUploadTimer(task);
          if (this.isQiniuOss) {
            let key = res.data.key;
            res.data.url = oss_config.url + key;
            res.data.name = key;
          }
          response = getAsVal(this.isAliOss ? res : res.data, this.resKey);
          this.res = response;
          if (typeof this.uploadAfter === "function") {
            this.uploadAfter(this.res, show, hide, this.column);
          } else {
            show();
          }
        };

        const handleUploadError = (error) => {
          hide(error);
        };

        const uploadToDefault = () => {
          const controller = typeof AbortController === "function" ? new AbortController() : null;
          const cancelSource = this.$axios.CancelToken && this.$axios.CancelToken.source();
          const abort = () => {
            if (cancelSource) cancelSource.cancel("Upload canceled");
            if (controller) controller.abort();
          };
          const request = this.$axios({
            url,
            method: "post",
            data: param,
            headers,
            ...(controller ? { signal: controller.signal } : {}),
            ...(cancelSource ? { cancelToken: cancelSource.token } : {}),
            onUploadProgress: (progressEvent) => {
              if (!this.isUploadTaskActive(task) || task.resultReceived) return;
              let complete =
                (progressEvent.loaded / progressEvent.total) * 100 || 0;
              if (complete >= 80) {
                if (task.timer !== null) return;
                task.timer = setInterval(() => {
                  if (!this.isUploadTaskActive(task)) {
                    this.clearUploadTimer(task);
                    return;
                  }
                  complete += (100 - complete) * 0.2;
                  if (fileState)
                    fileState.percentage = parseFloat(complete.toFixed(2));
                  if (complete > 99) {
                    this.clearUploadTimer(task);
                  }
                }, 1000);
              } else {
                if (fileState)
                  fileState.percentage = parseFloat(complete.toFixed(2));
              }
            },
          });
          this.setUploadRequest(task, request, abort);
          Promise.resolve(request).then(handleUploadResult).catch(handleUploadError);
        };

        const uploadToCos = () => {
          if (!window.COS) {
            packages.logs("COS");
            hide();
            return;
          }
          oss_config = this.cos || this.$TVUE.cos;
          oss = new window.COS({
            SecretId: oss_config.SecretId,
            SecretKey: oss_config.SecretKey,
          });

          const request = oss.uploadFile(
            {
              Bucket: oss_config.Bucket,
              Region: oss_config.Region,
              Key: uploadFile.name,
              Body: uploadFile,
              onTaskReady: (taskId) => {
                this.setUploadRequest(task, null, () => {
                  if (typeof oss.cancelTask === "function") oss.cancelTask(taskId);
                });
              },
            },
            (err, data) => {
              if (!this.isUploadTaskActive(task)) return;
              if (err) {
                handleUploadError(err);
              } else {
                handleUploadResult({
                  data: {
                    name: data.ETag,
                    url: window.location.protocol + "//" + data.Location,
                  },
                });
              }
            }
          );
          if (request) this.setUploadRequest(task, request, task.abort);
        };

        const uploadToQiniu = () => {
          if (!window.CryptoJS) {
            packages.logs("CryptoJS");
            hide();
            return;
          }
          oss_config = this.qiniu || this.$TVUE.qiniu;
          const token = getToken(oss_config.AK, oss_config.SK, {
            scope: oss_config.scope,
            deadline: new Date().getTime() + oss_config.deadline * 3600,
          });
          param.append("token", token);
          url = oss_config.bucket;
          uploadToDefault();
        };
        const uploadToAliOss = () => {
          if (!window.OSS) {
            packages.logs("AliOSS");
            hide();
            return;
          }
          oss_config = this.ali || this.$TVUE.ali;
          client = getClient(oss_config);

          const request = client.put(uploadFile.name, uploadFile, {
            headers: this.headers,
          });
          this.setUploadRequest(task, request, typeof client.cancel === "function" ? () => client.cancel() : undefined);
          Promise.resolve(request).then(handleUploadResult).catch(handleUploadError);
        };
        const callback = (newFile) => {
          if (!this.isUploadTaskActive(task) || task.started) return;
          task.started = true;
          fileIndex = this.uploadCacheList.findIndex((ele) => this.matchesUploadFile(ele, sourceFile));
          if (fileIndex !== -1) {
            let list = this.uploadCacheList.splice(fileIndex, 1);
            this.uploadList = this.uploadList.concat(list);
          }
          uploadFile = newFile || file;
          param.append(this.fileName, uploadFile);
          try {
            if (this.isCosOss) uploadToCos();
            else if (this.isQiniuOss) uploadToQiniu();
            else if (this.isAliOss) uploadToAliOss();
            else uploadToDefault();
          } catch (error) {
            hide(error);
          }
        };
        if (typeof this.uploadBefore === "function") {
          try {
            this.uploadBefore(file, callback, hide, this.column);
          } catch (error) {
            hide(error);
          }
        } else {
          callback();
        }
      };
      if (isMediaType(file.name) != "img") {
        done();
      } else {
        //处理水印图片
        const canvasDone = () => {
          if (!this.isUploadTaskActive(task)) return;
          if (!this.validatenull(this.canvasOption)) {
            detailImg(file, this.canvasOption).then((res) => {
              if (!this.isUploadTaskActive(task)) return;
              file = res;
              done();
            }).catch(hide);
          } else {
            done();
          }
        };
        //处理图片剪裁
        const canvasCrop = () => {
          fileToBase64(file, (res) => {
            if (!this.isUploadTaskActive(task)) return;
            let option = { ...this.cropperOption,
              img: res,
              type: "file",
              callback: (res) => {
                if (!this.isUploadTaskActive(task)) return;
                file = res;
                canvasDone();
              },
              cancel: () => {
                this.cancelUpload(sourceFile);
              },
            };
            this.$ImageCropper(option);
          });
        };
        if (!this.validatenull(this.cropperOption)) {
          canvasCrop();
        } else {
          canvasDone();
        }
      }
    },
    handleSized(files, fileList) {
      this.uploadSized &&
      this.uploadSized(this.fileSize, files, fileList, this.column);
      this.handleError("size");
    },
    handleExceed(files, fileList) {
      this.uploadExceed &&
      this.uploadExceed(this.limit, files, fileList, this.column);
      this.handleError("exceed");
    },
    handlePreview(file) {
      if (isFileReady(file)) return;
      const callback = () => {
        const index = this.fileList.findIndex((ele) => ele.url === file.url);
        this.$ImagePreview(this.fileList, index);
      };
      if (typeof this.uploadPreview === "function") {
        this.uploadPreview(file, this.column, callback);
      } else {
        callback();
      }
    },
    beforeRemove(file) {
      if (typeof this.uploadDelete === "function") {
        return this.uploadDelete(file, this.column);
      } else {
        return Promise.resolve();
      }
    },
  },
});
</script>
