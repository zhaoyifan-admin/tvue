<template>
  <div :class="b()">
    <el-input
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
      :size="size"
      @clear="handleClear"
      :clearable="clearableVal"
      :rows="rows"
      :autosize="{ minRows: minRows, maxRows: maxRows }"
      :disabled="disabled"
      ref="main"
      :model-value="address"
      @focus="handleShow"
      @click.="handleClick"
      :placeholder="placeholder"
    >
    </el-input>
    <div v-if="box">
      <el-dialog
        class="tvue-dialog"
        :width="dialogWidth"
        :before-close="beforeClose"
        :append-to-body="$TVUE.appendToBody"
        lock-scroll
        :title="placeholder"
        @close="handleClose"
        v-model="box"
      >
        <div :class="b('content')" v-if="box">
          <el-input
            :class="b('content-input')"
            :id="mapInputId"
            :size="size"
            @clear="clear"
            :readonly="disabled"
            v-model="formattedAddress"
            clearable
            :placeholder="t('map.searchPlaceholder')"
          ></el-input>
          <div :class="b('content-box')">
            <div
              :id="mapContainerId"
              :class="b('content-container')"
              tabindex="0"
            ></div>
            <div :id="mapResultId" :class="b('content-result')"></div>
          </div>
        </div>
        <span class="tvue-dialog__footer">
          <el-button
            type="primary"
            :size="size"
            icon="el-icon-check"
            v-if="!(disabled || readonly)"
            @click="handleSubmit"
          >{{ t("common.submitBtn") }}</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import packages from "core/packages";
import create from "core/create";
import props from "common/common/props";
import event from "common/common/event";
import locale from "core/locale";
import { uuid } from "utils/util";
export default create({
  name: "input-map",
  mixins: [props(), event(), locale],
  props: {
    beforeClose: Function,
    mapChange: Function,
    prefixIcon: {
      type: String,
    },
    suffixIcon: {
      type: String,
    },
    dialogWidth: {
      type: String,
      default: "80%",
    },
    rows: Number,
    minRows: {
      type: Number,
      default: 1,
    },
    maxRows: {
      type: Number,
    },
  },
  data() {
    const mapId = uuid();
    return {
      formattedAddress: "",
      address: "",
      poi: {},
      marker: null,
      map: null,
      box: false,
      mapInputId: `map-input-${mapId}`,
      mapContainerId: `map-container-${mapId}`,
      mapResultId: `map-result-${mapId}`,
      mapRequestId: 0,
      mapSession: 0,
      mapUnmounted: false,
      poiPicker: null,
      poiPickedHandler: null,
      mapClickHandler: null,
      mapCloseTimer: null,
    };
  },
  watch: {
    poi(val) {
      this.formattedAddress = val.formattedAddress;
    },
    modelValue(val) {
      if (this.validatenull(val)) {
        this.clearMarker();
        this.poi = {};
        this.address = "";
      }
    },
    text(val) {
      this.mapRequestId++;
      if (!this.validatenull(val)) {
        this.poi = {
          longitude: val[0],
          latitude: val[1],
          formattedAddress: val[2],
        };
        this.address = val[2];
      }
    },
    box: {
      handler() {
        if (this.box) {
          this.$nextTick(() => {
            if (this.mapUnmounted || !this.box) return;
            this.init(() => {
              if (this.hasCoordinates) {
                this.addMarker(this.longitude, this.latitude);
                this.getAddress(this.longitude, this.latitude);
              }
            });
          });
        } else this.destroyMap();
      },
      immediate: true,
    },
  },
  beforeUnmount() {
    this.mapUnmounted = true;
    if (this.mapCloseTimer !== null) clearTimeout(this.mapCloseTimer);
    this.destroyMap();
  },
  computed: {
    longitude() {
      return this.text?.[0];
    },
    latitude() {
      return this.text?.[1];
    },
    hasCoordinates() {
      return [this.longitude, this.latitude].every(value =>
        value !== undefined && value !== null && value !== '' && Number.isFinite(Number(value)));
    },
    title() {
      return this.disabled || this.readonly ? this.t('common.view') : this.t('common.select');
    },
  },
  methods: {
    handleTextValue(val) {
      this.mapRequestId++;
      if (!this.validatenull(val)) {
        this.poi = {
          longitude: val[0],
          latitude: val[1],
          formattedAddress: val[2],
        };
        this.address = val[2];
      }
    },
    handleModelValue(val) {
      if (this.validatenull(val)) this.clear();
    },
    clear() {
      this.poi = {};
      this.clearMarker();
    },
    handleSubmit() {
      this.setVal();
      this.box = false;
    },
    handleClear() {
      this.text = [];
      this.clear();
      this.handleChange(this.text);
      if (this.mapCloseTimer !== null) clearTimeout(this.mapCloseTimer);
      this.mapCloseTimer = setTimeout(() => {
        this.mapCloseTimer = null;
        if (!this.mapUnmounted) this.box = false;
      }, 0);
    },
    setVal() {
      this.text = [
        this.poi.longitude,
        this.poi.latitude,
        this.poi.formattedAddress,
      ];
      this.handleChange(this.text);
    },
    handleShow() {
      if (this.mapUnmounted) return;
      if (this.mapCloseTimer !== null) clearTimeout(this.mapCloseTimer);
      this.mapCloseTimer = null;
      this.$refs.main.blur();
      this.box = true;
    },
    //新增坐标
    addMarker(R, P) {
      this.clearMarker();
      this.marker = new window.AMap.Marker({
        position: [R, P],
      });
      this.marker.setMap(this.map);
    },
    //清空坐标
    clearMarker() {
      this.mapRequestId++;
      if (this.marker) {
        this.marker.setMap(null);
        this.marker = null;
      }
    },
    //获取坐标
    getAddress(R, P) {
      const requestId = ++this.mapRequestId;
      const marker = this.marker;
      const map = this.map;
      const session = this.mapSession;
      const current = () => !this.mapUnmounted && this.box && requestId === this.mapRequestId &&
        session === this.mapSession && marker && marker === this.marker && map === this.map;
      let geocoder = new window.AMap.Geocoder({});
      geocoder.getAddress([R, P], (status, result) => {
        if (!current()) return;
        if (status === "complete" && result?.info === "OK" && result.regeocode) {
          this.mapChange && this.mapChange(result);
          if (!current()) return;
          const regeocode = result.regeocode;
          this.poi = Object.assign({}, regeocode, {
            longitude: R,
            latitude: P,
          });
          // 自定义点标记内容
          var markerContent = document.createElement("div");
          // 点标记中的图标
          var markerImg = document.createElement("img");
          markerImg.style.width = "25px";
          markerImg.src =
            "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png";
          markerContent.appendChild(markerImg);

          // 点标记中的文本
          var markerSpan = document.createElement("span");
          markerSpan.className = "tvue-input-map__marker";
          markerSpan.textContent = this.poi.formattedAddress;
          markerContent.appendChild(markerSpan);
          marker.setContent(markerContent); //更新点标记内容
        }
      });
    },
    handleClose() {
      this.destroyMap();
    },
    destroyMap() {
      this.mapSession++;
      this.clearMarker();
      if (this.poiPicker) {
        this.poiPicker.off?.('poiPicked', this.poiPickedHandler);
        this.poiPicker.clearSearchResults?.();
        this.poiPicker.destroy?.();
      }
      if (this.map) {
        this.map.off?.('click', this.mapClickHandler);
        this.map.destroy?.();
      }
      this.map = null;
      this.poiPicker = null;
      this.poiPickedHandler = null;
      this.mapClickHandler = null;
    },
    addClick() {
      const map = this.map;
      this.mapClickHandler = (e) => {
        if (this.mapUnmounted || !this.box || this.map !== map) return;
        if (this.disabled || this.readonly) return;
        const lnglat = e.lnglat;
        const P = lnglat.lat;
        const R = lnglat.lng;
        this.addMarker(R, P);
        this.getAddress(R, P);
      };
      map.on("click", this.mapClickHandler);
    },
    init(callback) {
      if (this.mapUnmounted || !this.box) return;
      this.destroyMap();
      if (!window.AMap) {
        packages.logs("Map");
        return;
      }
      this.map = new window.AMap.Map(
        this.mapContainerId,
        Object.assign(
          {
            zoom: 13,
            center: (() => {
              if (this.hasCoordinates)
                return [this.longitude, this.latitude];
            })(),
          },
          this.params
        )
      );
      this.initPoip();
      this.addClick();
      callback();
    },
    initPoip() {
      if (!window.AMapUI) {
        packages.logs("MapUi");
        return;
      }
      const map = this.map;
      const session = this.mapSession;
      window.AMapUI.loadUI(["misc/PoiPicker"], (PoiPicker) => {
        if (this.mapUnmounted || !this.box || this.map !== map || this.mapSession !== session) return;
        var poiPicker = new PoiPicker({
          input: this.mapInputId,
          placeSearchOptions: {
            map: this.map,
            pageSize: 10,
          },
          searchResultsContainer: this.mapResultId,
        });
        //初始化poiPicker
        this.poiPickerReady(poiPicker);
      });
    },
    poiPickerReady(poiPicker) {
      this.poiPicker = poiPicker;
      //选取了某个POI
      this.poiPickedHandler = (poiResult) => {
        if (this.mapUnmounted || !this.box || this.poiPicker !== poiPicker) return;
        this.clearMarker();
        var source = poiResult.source,
          poi = poiResult.item;
        this.poi = Object.assign({}, poi, {
          formattedAddress: poi.name,
          longitude: poi.location.lng,
          latitude: poi.location.lat,
        });
        if (source !== "search") {
          poiPicker.searchByKeyword(poi.name);
        }
      };
      poiPicker.on("poiPicked", this.poiPickedHandler);
    },
  },
});
</script>
