|NEW_FILE
<template>
  <div :class="b()">
    <!-- 手机号输入（带国际区号，需要特殊布局） -->
    <template v-if="isPhone">
      <div class="tvue-input__phone">
        <a-select
          v-model:value="phoneCode"
          class="tvue-input__phone-code"
          :size="size"
          :disabled="disabled"
          :placeholder="phoneCodePlaceholder"
          show-search
          style="width: 120px;">
          <a-select-option
            v-for="item in phoneCodeList"
            :key="item.code"
            :value="item.code">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 12px">{{ item.code }}</span>
          </a-select-option>
        </a-select>
        <a-input
          class="tvue-input__phone-input"
          :size="size"
          v-model:value="phoneNumber"
          @keyup.enter="isSearch ? appendClick(text) : ''"
          @click="handleClick"
          :maxlength="phoneMaxLength"
          :readonly="readonly"
          :placeholder="phonePlaceholder"
          @focus="handleFocus"
          @blur="handlePhoneBlur"
          :disabled="disabled"
          style="flex: 1;">
          <template #prefix v-if="prefixIcon">
            <component :is="prefixIcon"/>
          </template>
          <template #suffix v-if="suffixIcon">
            <component :is="suffixIcon"/>
          </template>
        </a-input>
      </div>
    </template>

    <!-- 验证码输入（分段输入框） -->
    <template v-else-if="isCode">
      <div class="tvue-input__code">
        <input
          v-for="(val, index) in codeValues"
          :key="index"
          type="text"
          maxlength="1"
          class="tvue-input__code-item"
          :class="{ 'is-disabled': disabled }"
          :value="val"
          :disabled="disabled"
          :readonly="readonly"
          @input="handleCodeInput($event, index)"
          @keydown="handleCodeKeydown($event, index)"
          @paste="handleCodePaste($event)"
          @focus="handleFocus"
          @blur="handleBlur"
          :ref="el => codeRefs[index] = el"/>
      </div>
    </template>

    <!-- 车牌号输入（省份选择 + 车牌号） -->
    <template v-else-if="isPlate">
      <div class="tvue-input__plate">
        <a-select
          v-model:value="plateProvince"
          class="tvue-input__plate-province"
          :size="size"
          :disabled="disabled"
          style="width: 70px;">
          <a-select-option
            v-for="item in plateProvinceList"
            :key="item"
            :value="item">
            {{ item }}
          </a-select-option>
        </a-select>
        <a-input
          class="tvue-input__plate-number"
          :size="size"
          v-model:value="plateNumber"
          @click="handleClick"
          :maxlength="7"
          :readonly="readonly"
          :placeholder="platePlaceholder"
          @focus="handleFocus"
          @blur="handlePlateBlur"
          @input="handlePlateInput"
          :disabled="disabled"
          style="flex: 1;">
        </a-input>
      </div>
    </template>

    <!-- IP 地址输入（4 段输入框） -->
    <template v-else-if="isIp">
      <div class="tvue-input__ip">
        <template v-for="(seg, index) in ipSegments" :key="index">
          <input
            type="text"
            class="tvue-input__ip-segment"
            :class="{ 'is-disabled': disabled }"
            maxlength="3"
            :value="seg"
            :disabled="disabled"
            :readonly="readonly"
            @input="handleIpInput($event, index)"
            @keydown="handleIpKeydown($event, index)"
            @focus="handleFocus"
            @blur="handleBlur"
            :ref="el => ipRefs[index] = el"/>
          <span v-if="index < 3" class="tvue-input__ip-dot">.</span>
        </template>
      </div>
    </template>

    <!-- MAC 地址输入（6 段输入框） -->
    <template v-else-if="isMac">
      <div class="tvue-input__mac">
        <template v-for="(seg, index) in macSegments" :key="index">
          <input
            type="text"
            class="tvue-input__mac-segment"
            :class="{ 'is-disabled': disabled }"
            maxlength="2"
            :value="seg"
            :disabled="disabled"
            :readonly="readonly"
            @input="handleMacInput($event, index)"
            @keydown="handleMacKeydown($event, index)"
            @focus="handleFocus"
            @blur="handleBlur"
            :ref="el => macRefs[index] = el"/>
          <span v-if="index < 5" class="tvue-input__mac-sep">{{ macSeparator }}</span>
        </template>
      </div>
    </template>

    <!-- 统一输入框（货币、银行卡、身份证、邮箱、社会信用代码、默认类型） -->
    <template v-else-if="isTextarea">
      <a-textarea
        :class="textareaClass"
        :size="size"
        v-model:value="inputValue"
        @click="handleClick"
        :maxlength="maxlength"
        :minlength="minlength"
        :rows="computedRows"
        :readonly="readonly"
        :placeholder="placeholder"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :allow-clear="allowClear"
        :auto-size="autoSize">

        <!-- 后缀内容 - 字数统计 -->
        <template #suffix v-if="showWordLimit && maxlength">
        <span class="tvue-textarea__word-limit">
          {{ inputValue ? inputValue.length : 0 }}/{{ maxlength }}
        </span>
        </template>
      </a-textarea>
    </template>
    <!-- 统一输入框（货币、银行卡、身份证、邮箱、社会信用代码、默认类型） -->
    <template v-else>
      <a-input
        :class="inputClass"
        :size="size"
        :allow-clear="clearableVal"
        v-model:value="inputValue"
        @keyup.enter="isSearch ? appendClick(text) : ''"
        @click="handleClick"
        :type="inputType"
        :maxlength="inputMaxlength"
        :minlength="minlength"
        :rows="rows"
        :readonly="readonly"
        :placeholder="inputPlaceholder"
        :show-word-limit="isDefault && showWordLimit"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :status="inputStatus">

        <!-- 前置标签 -->
        <template #addonBefore v-if="showPrepend">
          <span @click="prependClick && prependClick(text)">{{ prependText }}</span>
        </template>

        <!-- 后置标签 -->
        <template #addonAfter v-if="showAppend">
          <span @click="appendClick && appendClick(text)">{{ appendText }}</span>
        </template>

        <template #addonAfter v-else-if="isSearch">
          <a-button @click="appendClick(text)">
            <template #icon>
              <component :is="'SearchOutlined'"/>
            </template>
          </a-button>
        </template>

        <!-- 前缀图标 -->
        <template #prefix v-if="inputPrefixIcon">
          <component :is="getIconComponent(inputPrefixIcon)" v-if="isAntdIcon(inputPrefixIcon)"/>
          <i v-else-if="isIconfont(inputPrefixIcon)" :class="getIconfontClass(inputPrefixIcon)"></i>
        </template>

        <!-- 后缀图标 - 银行卡类型 -->
        <template #suffix v-if="isBankCard && showBankCardType && bankCardType">
          <span class="tvue-input__bank-card-type">{{ bankCardType }}</span>
        </template>

        <!-- 后缀图标 - 身份证信息 -->
        <template #suffix v-else-if="isIdCard && showIdCardInfo && idCardInfo">
          <a-tooltip :title="idCardInfoText" placement="top">
            <span class="tvue-input__id-card-info">
              {{ idCardValid ? '✓' : '✗' }}
            </span>
          </a-tooltip>
          <component :is="getIconComponent(inputSuffixIcon)" v-if="isAntdIcon(inputSuffixIcon)"/>
          <i v-else-if="isIconfont(inputSuffixIcon)" :class="getIconfontClass(inputSuffixIcon)"></i>
        </template>

        <!-- 后缀图标 - 邮箱验证 -->
        <template #suffix v-else-if="isEmail && emailValid !== null">
          <span class="tvue-input__email-valid">{{ emailValid ? '✓' : '✗' }}</span>
        </template>

        <!-- 后缀图标 - 社会信用代码验证 -->
        <template #suffix v-else-if="isUscc && usccValid !== null">
          <span class="tvue-input__uscc-valid">{{ usccValid ? '✓' : '✗' }}</span>
        </template>

        <!-- 自定义后缀图标(仅在没有特殊类型后缀时显示) -->
        <template #suffix v-else-if="inputSuffixIcon">
          <component :is="getIconComponent(inputSuffixIcon)" v-if="isAntdIcon(inputSuffixIcon)"/>
          <i v-else-if="isIconfont(inputSuffixIcon)" :class="getIconfontClass(inputSuffixIcon)"></i>
        </template>
      </a-input>
    </template>
  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";

// 国际电话区号列表
const defaultPhoneCodeList = [
  {code: '+86', name: '中国', label: '🇨🇳 +86'},
  {code: '+852', name: '香港', label: '🇭🇰 +852'},
  {code: '+853', name: '澳门', label: '🇲🇴 +853'},
  {code: '+886', name: '台湾', label: '🇹🇼 +886'},
  {code: '+1', name: '美国/加拿大', label: '🇺🇸 +1'},
  {code: '+44', name: '英国', label: '🇬🇧 +44'},
  {code: '+81', name: '日本', label: '🇯🇵 +81'},
  {code: '+82', name: '韩国', label: '🇰🇷 +82'},
  {code: '+65', name: '新加坡', label: '🇸🇬 +65'},
  {code: '+61', name: '澳大利亚', label: '🇦🇺 +61'},
  {code: '+49', name: '德国', label: '🇩🇪 +49'},
  {code: '+33', name: '法国', label: '🇫🇷 +33'},
  {code: '+39', name: '意大利', label: '🇮🇹 +39'},
  {code: '+7', name: '俄罗斯', label: '🇷🇺 +7'},
  {code: '+91', name: '印度', label: '🇮🇳 +91'},
  {code: '+55', name: '巴西', label: '🇧🇷 +55'},
  {code: '+34', name: '西班牙', label: '🇪🇸 +34'},
  {code: '+31', name: '荷兰', label: '🇳🇱 +31'},
  {code: '+41', name: '瑞士', label: '🇨🇭 +41'},
  {code: '+46', name: '瑞典', label: '🇸🇪 +46'},
  {code: '+60', name: '马来西亚', label: '🇲🇾 +60'},
  {code: '+66', name: '泰国', label: '🇹🇭 +66'},
  {code: '+84', name: '越南', label: '🇻🇳 +84'},
  {code: '+62', name: '印尼', label: '🇮🇩 +62'},
  {code: '+63', name: '菲律宾', label: '🇵🇭 +63'}
];

// 货币符号映射
const currencySymbols = {
  CNY: '¥',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  HKD: 'HK$',
  KRW: '₩',
  SGD: 'S$',
  AUD: 'A$',
  CAD: 'C$'
};

export default create({
  name: "ant-input",
  mixins: [props(), event()],
  emits: ['update:modelValue', 'click', 'focus', 'blur', 'change', 'id-card-valid', 'code-complete', 'uscc-valid', 'bank-card-change'],
  components: {},
  data() {
    return {
      // 手机号相关
      phoneCode: '+86',
      phoneNumber: '',
      // 货币相关
      currencyDisplay: '',
      currencyEditing: false,
      // 银行卡相关
      bankCardDisplay: '',
      bankCardType: '',
      // 身份证相关
      idCardDisplay: '',
      idCardValid: null,
      idCardInfo: null,
      // 邮箱相关
      emailDisplay: '',
      emailValid: null,
      showEmailSuggestions: false,
      // 验证码相关
      codeValues: [],
      codeRefs: [],
      // 车牌号相关
      plateProvince: '京',
      plateNumber: '',
      // IP 地址相关
      ipSegments: ['', '', '', ''],
      ipRefs: [],
      // MAC 地址相关
      macSegments: ['', '', '', '', '', ''],
      macRefs: [],
      // 社会信用代码相关
      usccDisplay: '',
      usccValid: null
    };
  },
  props: {
    showWordLimit: {
      type: Boolean,
      default: false
    },
    target: {
      type: String,
      default: '_blank'
    },
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    prependClick: {
      type: Function
    },
    prepend: {
      type: String
    },
    appendClick: {
      type: Function
    },
    formatters: {
      type: Function
    },
    parser: {
      type: Function
    },
    append: {
      type: String
    },
    minlength: [String, Number],
    maxlength: [String, Number],
    rows: Number,
    minRows: {
      type: Number,
      default: 5
    },
    maxRows: {
      type: Number,
      default: 10
    },
    autocomplete: {
      type: String
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    autoSize: {
      type: [Boolean, Object],
      default: false
    },
    // ========== 手机号相关配置 ==========
    defaultPhoneCode: {
      type: String,
      default: '+86'
    },
    phoneCodeOptions: {
      type: Array,
      default: () => []
    },
    phoneMaxLength: {
      type: Number,
      default: 11
    },
    phoneCodePlaceholder: {
      type: String,
      default: '区号'
    },
    phonePlaceholder: {
      type: String,
      default: '请输入手机号'
    },

    // ========== 货币相关配置 ==========
    currency: {
      type: String,
      default: 'CNY'
    },
    currencySymbolCustom: {
      type: String,
      default: ''
    },
    currencyUnit: {
      type: String,
      default: ''
    },
    currencyPrecision: {
      type: Number,
      default: 2
    },
    currencyPlaceholder: {
      type: String,
      default: '请输入金额'
    },
    currencyMin: {
      type: Number,
      default: undefined
    },
    currencyMax: {
      type: Number,
      default: undefined
    },

    // ========== 银行卡相关配置 ==========
    bankCardSeparator: {
      type: String,
      default: ' '
    },
    bankCardSegment: {
      type: Number,
      default: 4
    },
    bankCardMaxDigits: {
      type: Number,
      default: 19
    },
    bankCardPlaceholder: {
      type: String,
      default: '请输入银行卡号'
    },
    showBankCardType: {
      type: Boolean,
      default: true
    },

    // ========== 身份证相关配置 ==========
    idCardPlaceholder: {
      type: String,
      default: '请输入身份证号'
    },
    showIdCardInfo: {
      type: Boolean,
      default: true
    },
    idCardRealtimeValidate: {
      type: Boolean,
      default: true
    },

    // ========== 邮箱相关配置 ==========
    emailPlaceholder: {
      type: String,
      default: '请输入邮箱'
    },
    emailSuffixes: {
      type: Array,
      default: () => ['@qq.com', '@163.com', '@126.com', '@gmail.com', '@outlook.com', '@hotmail.com', '@sina.com', '@sohu.com', '@foxmail.com', '@icloud.com']
    },
    showEmailSuffix: {
      type: Boolean,
      default: true
    },

    // ========== 验证码相关配置 ==========
    codePlaceholder: {
      type: String,
      default: ''
    },
    codeLength: {
      type: Number,
      default: 6
    },
    codeSeparator: {
      type: String,
      default: ''
    },

    // ========== 车牌号相关配置 ==========
    platePlaceholder: {
      type: String,
      default: '请输入车牌号'
    },
    defaultPlateProvince: {
      type: String,
      default: '京'
    },
    plateProvinceList: {
      type: Array,
      default: () => ['京', '津', '沪', '渝', '冀', '豫', '云', '辽', '黑', '湘', '皖', '鲁', '新', '苏', '浙', '赣', '鄂', '桂', '甘', '晋', '蒙', '陕', '吉', '闽', '贵', '粤', '川', '青', '藏', '琼', '宁', '港', '澳', '台']
    },

    // ========== IP 地址相关配置 ==========
    ipPlaceholder: {
      type: String,
      default: '请输入 IP 地址'
    },
    ipVersion: {
      type: Number,
      default: 4
    },

    // ========== MAC 地址相关配置 ==========
    macPlaceholder: {
      type: String,
      default: '请输入 MAC 地址'
    },
    macSeparator: {
      type: String,
      default: ':'
    },

    // ========== 社会信用代码相关配置 ==========
    usccPlaceholder: {
      type: String,
      default: '请输入统一社会信用代码'
    },
    usccRealtimeValidate: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isSearch() {
      return this.type === 'ant-search';
    },
    isPhone() {
      return this.type === 'ant-phone';
    },
    isCurrency() {
      return this.type === 'ant-currency';
    },
    isBankCard() {
      return this.type === 'ant-bankCard' || this.type === 'ant-bank-card';
    },
    isIdCard() {
      return this.type === 'ant-idCard' || this.type === 'ant-id-card';
    },
    isEmail() {
      return this.type === 'ant-email';
    },
    isCode() {
      return this.type === 'ant-code';
    },
    isPlate() {
      return this.type === 'ant-plate';
    },
    isIp() {
      return this.type === 'ant-ip';
    },
    isMac() {
      return this.type === 'ant-mac';
    },
    isUscc() {
      return this.type === 'ant-uscc';
    },
    isTextarea() {
      return this.type === 'ant-textarea';
    },
    isDefault() {
      return !this.isPhone && !this.isCurrency && !this.isBankCard && !this.isIdCard &&
        !this.isEmail && !this.isCode && !this.isPlate && !this.isIp && !this.isMac && !this.isUscc && !this.isTextarea;
    },
    typeParam() {
      if (this.type === "ant-textarea") {
        return "textarea";
      } else if (this.type === "ant-password") {
        return "password";
      } else {
        return "text";
      }
    },
    inputClass() {
      if (this.isCurrency) return this.b('currency');
      if (this.isBankCard) return this.b('bank-card');
      if (this.isIdCard) return [this.b('id-card'), this.idCardValid === false ? this.b('id-card--invalid') : ''];
      return '';
    },
    inputValue: {
      get() {
        if (this.isCurrency) return this.currencyDisplay;
        if (this.isBankCard) return this.bankCardDisplay;
        if (this.isIdCard) return this.idCardDisplay;
        if (this.isEmail) return this.emailDisplay;
        if (this.isUscc) return this.usccDisplay;
        return this.text;
      },
      set(val) {
        if (this.isCurrency) this.currencyDisplay = val;
        else if (this.isBankCard) this.bankCardDisplay = val;
        else if (this.isIdCard) this.idCardDisplay = val;
        else if (this.isEmail) this.emailDisplay = val;
        else if (this.isUscc) this.usccDisplay = val;
        else this.text = val;
      }
    },
    textareaClass() {
      const classes = [];
      if (this.showWordLimit) {
        classes.push('tvue-textarea--word-limit');
      }
      return classes;
    },
    computedRows() {
      if (this.autoSize) {
        return undefined;
      }
      return this.rows;
    },
    inputType() {
      if (this.isEmail) return 'email';
      return this.isDefault ? this.typeParam : 'text';
    },
    inputMaxlength() {
      if (this.isBankCard) return this.bankCardMaxLength;
      if (this.isIdCard) return 18;
      if (this.isUscc) return 18;
      return this.maxlength;
    },
    inputPrefixIcon() {
      return this.prefixIcon;
    },
    inputSuffixIcon() {
      if (this.isIdCard) return this.idCardSuffixIcon;
      return this.suffixIcon;
    },
    inputPlaceholder() {
      if (this.isCurrency) return this.currencyPlaceholder;
      if (this.isBankCard) return this.bankCardPlaceholder;
      if (this.isIdCard) return this.idCardPlaceholder;
      if (this.isEmail) return this.emailPlaceholder;
      if (this.isUscc) return this.usccPlaceholder;
      return this.placeholder;
    },
    showPrepend() {
      if (this.isCurrency) return !!this.currencySymbol;
      return !!this.prepend;
    },
    prependText() {
      if (this.isCurrency) return this.currencySymbol;
      return this.prepend;
    },
    showAppend() {
      if (this.isCurrency) return !!this.currencyUnit;
      return !!this.append;
    },
    appendText() {
      if (this.isCurrency) return this.currencyUnit;
      return this.append;
    },
    showSuffix() {
      return (this.isBankCard && this.showBankCardType && this.bankCardType) ||
        (this.isIdCard && this.showIdCardInfo && this.idCardInfo) ||
        (this.isEmail && this.emailValid !== null) ||
        (this.isUscc && this.usccValid !== null);
    },
    phoneCodeList() {
      return this.phoneCodeOptions.length > 0 ? this.phoneCodeOptions : defaultPhoneCodeList;
    },
    currencySymbol() {
      if (this.currencySymbolCustom) {
        return this.currencySymbolCustom;
      }
      return currencySymbols[this.currency] || '¥';
    },
    bankCardMaxLength() {
      const digits = this.bankCardMaxDigits;
      const separatorCount = Math.floor((digits - 1) / this.bankCardSegment);
      return digits + separatorCount;
    },
    idCardSuffixIcon() {
      if (this.suffixIcon) return this.suffixIcon;
      if (this.idCardValid === true) return 'CheckCircleOutlined';
      if (this.idCardValid === false) return 'WarningOutlined';
      return '';
    },
    idCardInfoText() {
      if (!this.idCardInfo) return '';
      return `${this.idCardInfo.region} | ${this.idCardInfo.birthday} | ${this.idCardInfo.gender}`;
    },
    inputStatus() {
      // idCardValid
      if (this.isIdCard && this.idCardValid !== null) {
        return this.idCardValid ? 'success' : 'error';
      }
      if (this.isEmail && this.emailValid !== null) {
        return this.emailValid ? 'success' : 'error';
      }
      if (this.isUscc && this.usccValid !== null) {
        return this.usccValid ? 'success' : 'error';
      }
      return undefined;
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(val) {
        this.initSpecialValue(val);
      }
    },
    phoneCode(val) {
      this.updatePhoneValue();
    },
    phoneNumber(val) {
      this.phoneNumber = val.replace(/\D/g, '');
      this.updatePhoneValue();
    },
    defaultPhoneCode: {
      immediate: true,
      handler(val) {
        if (!this.modelValue) {
          this.phoneCode = val;
        }
      }
    }
  },
  methods: {
    isAntdIcon(icon) {
      if (!icon) return false;
      return typeof icon === 'string' && icon.endsWith('Outlined');
    },
    isIconfont(icon) {
      if (!icon) return false;
      return typeof icon === 'string' && (icon.startsWith('icon-') || icon.startsWith('iconfont'));
    },
    getIconComponent(icon) {
      if (!icon) return null;
      if (typeof icon === 'string') {
        return icon;
      }
      return icon;
    },
    getIconfontClass(icon) {
      if (!icon) return '';
      if (icon.startsWith('iconfont ')) {
        return icon;
      }
      return `iconfont ${icon}`;
    },
    onFocus(event) {
      if (this.isCurrency) {
        this.handleCurrencyFocus(event);
      } else {
        this.handleFocus(event);
      }
    },
    onBlur(event) {
      if (this.isCurrency) {
        this.handleCurrencyBlur(event);
      } else if (this.isIdCard) {
        this.handleIdCardBlur(event);
      } else if (this.isEmail) {
        this.handleEmailBlur(event);
      } else if (this.isUscc) {
        this.handleUsccBlur(event);
      } else {
        this.handleBlur(event);
      }
    },
    onInput(val) {
      // Ant Design Vue 的 input 事件可能传递事件对象或直接传递值
      const inputValue = val && val.target ? val.target.value : val;

      if (this.isCurrency) {
        this.handleCurrencyInput(inputValue);
      } else if (this.isBankCard) {
        this.handleBankCardInput(inputValue);
      } else if (this.isIdCard) {
        this.handleIdCardInput(inputValue);
      } else if (this.isEmail) {
        this.handleEmailInput(inputValue);
      } else if (this.isUscc) {
        this.handleUsccInput(inputValue);
      }
      // 对于普通输入框和 textarea，v-model 会自动处理，不需要额外操作
    },
    initSpecialValue(val) {
      if (this.isPhone) {
        this.initPhoneValue(val);
      } else if (this.isCurrency) {
        this.initCurrencyValue(val);
      } else if (this.isBankCard) {
        this.initBankCardValue(val);
      } else if (this.isIdCard) {
        this.initIdCardValue(val);
      } else if (this.isEmail) {
        this.initEmailValue(val);
      } else if (this.isCode) {
        this.initCodeValue(val);
      } else if (this.isPlate) {
        this.initPlateValue(val);
      } else if (this.isIp) {
        this.initIpValue(val);
      } else if (this.isMac) {
        this.initMacValue(val);
      } else if (this.isUscc) {
        this.initUsccValue(val);
      }
    },

    // ========== 手机号相关方法 ==========
    initPhoneValue(val) {
      if (!val) {
        this.phoneCode = this.defaultPhoneCode;
        this.phoneNumber = '';
        return;
      }
      const str = String(val);
      const match = str.match(/^(\+\d+)[-\s]?(\d+)$/);
      if (match) {
        this.phoneCode = match[1];
        this.phoneNumber = match[2];
      } else {
        this.phoneNumber = str.replace(/\D/g, '');
      }
    },
    updatePhoneValue() {
      const value = this.phoneNumber ? `${this.phoneCode}-${this.phoneNumber}` : '';
      this.text = value;
    },
    handlePhoneBlur(event) {
      this.handleBlur(event);
    },

    // ========== 货币相关方法 ==========
    initCurrencyValue(val) {
      if (val === undefined || val === null || val === '') {
        this.currencyDisplay = '';
        return;
      }
      const num = parseFloat(val);
      if (!isNaN(num)) {
        this.currencyDisplay = this.formatCurrency(num);
      }
    },
    formatCurrency(value) {
      if (value === undefined || value === null || value === '') return '';
      const num = parseFloat(value);
      if (isNaN(num)) return '';
      const fixed = num.toFixed(this.currencyPrecision);
      const parts = fixed.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    },
    parseCurrency(value) {
      if (!value) return '';
      return value.replace(/,/g, '');
    },
    handleCurrencyFocus(event) {
      this.currencyEditing = true;
      if (this.text) {
        this.currencyDisplay = this.text;
      }
      this.handleFocus(event);
    },
    handleCurrencyBlur(event) {
      this.currencyEditing = false;
      const rawValue = this.parseCurrency(this.currencyDisplay);
      let num = parseFloat(rawValue);

      if (!isNaN(num)) {
        if (this.currencyMin !== undefined && num < this.currencyMin) {
          num = this.currencyMin;
        }
        if (this.currencyMax !== undefined && num > this.currencyMax) {
          num = this.currencyMax;
        }
        this.text = num.toFixed(this.currencyPrecision);
        this.currencyDisplay = this.formatCurrency(num);
      } else {
        this.text = '';
        this.currencyDisplay = '';
      }

      this.handleBlur(event);
    },
    handleCurrencyInput(val) {
      this.currencyDisplay = val.replace(/[^\d.,]/g, '');
    },

    // ========== 银行卡相关方法 ==========
    initBankCardValue(val) {
      if (!val) {
        this.bankCardDisplay = '';
        this.bankCardType = '';
        return;
      }
      const digits = String(val).replace(/\D/g, '');
      this.bankCardDisplay = this.formatBankCard(digits);
      this.detectBankCardType(digits);
    },
    formatBankCard(value) {
      if (!value) return '';
      const digits = value.replace(/\D/g, '');
      const chunks = [];
      for (let i = 0; i < digits.length; i += this.bankCardSegment) {
        chunks.push(digits.slice(i, i + this.bankCardSegment));
      }
      return chunks.join(this.bankCardSeparator);
    },
    handleBankCardInput(val) {
      const digits = val.replace(/\D/g, '').slice(0, this.bankCardMaxDigits);
      this.bankCardDisplay = this.formatBankCard(digits);
      this.text = digits;
      this.detectBankCardType(digits);
      this.$emit('bank-card-change', {value: digits, display: this.bankCardDisplay, type: this.bankCardType});
    },
    detectBankCardType(cardNumber) {
      if (!cardNumber || cardNumber.length < 6) {
        this.bankCardType = '';
        return;
      }
      const bin = cardNumber.slice(0, 6);
      const bin4 = cardNumber.slice(0, 4);

      if (/^62/.test(bin)) {
        this.bankCardType = '银联卡';
      } else if (/^4/.test(bin)) {
        this.bankCardType = 'VISA';
      } else if (/^5[1-5]/.test(bin) || /^2[2-7]/.test(bin)) {
        this.bankCardType = 'MasterCard';
      } else if (/^3[47]/.test(bin)) {
        this.bankCardType = 'American Express';
      } else if (/^35/.test(bin)) {
        this.bankCardType = 'JCB';
      } else if (/^6011|65/.test(bin)) {
        this.bankCardType = 'Discover';
      } else {
        this.bankCardType = '';
      }
    },

    // ========== 身份证相关方法 ==========
    initIdCardValue(val) {
      if (!val) {
        this.idCardDisplay = '';
        this.idCardValid = null;
        this.idCardInfo = null;
        return;
      }
      this.idCardDisplay = String(val).toUpperCase();
      if (this.idCardRealtimeValidate) {
        this.validateIdCard(this.idCardDisplay);
      }
    },
    handleIdCardInput(val) {
      const filtered = val.replace(/[^\dXx]/g, '').toUpperCase().slice(0, 18);

      this.$nextTick(() => {
        this.idCardDisplay = filtered;
        this.text = filtered;

        if (this.idCardRealtimeValidate && filtered.length === 18) {
          this.validateIdCard(filtered);
        } else {
          this.idCardValid = null;
          this.idCardInfo = null;
        }

        this.$emit('id-card-change', {
          value: filtered,
          valid: this.idCardValid,
          info: this.idCardInfo
        });
      });
    },
    handleIdCardBlur(event) {
      if (this.idCardDisplay && this.idCardDisplay.length === 18) {
        this.validateIdCard(this.idCardDisplay);
      }
      this.$emit('id-card-valid', {valid: this.idCardValid, info: this.idCardInfo});
      this.handleBlur(event);
    },
    validateIdCard(idCard) {
      if (!idCard || idCard.length !== 18) {
        this.idCardValid = false;
        this.idCardInfo = null;
        return false;
      }

      const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

      let sum = 0;
      for (let i = 0; i < 17; i++) {
        const digit = parseInt(idCard.charAt(i), 10);
        if (isNaN(digit)) {
          this.idCardValid = false;
          this.idCardInfo = null;
          return false;
        }
        sum += digit * weights[i];
      }

      const checkCode = checkCodes[sum % 11];
      const valid = idCard.charAt(17).toUpperCase() === checkCode;

      this.idCardValid = valid;

      if (valid) {
        const regionCode = idCard.slice(0, 6);
        const birthYear = idCard.slice(6, 10);
        const birthMonth = idCard.slice(10, 12);
        const birthDay = idCard.slice(12, 14);
        const genderCode = parseInt(idCard.charAt(16), 10);

        this.idCardInfo = {
          region: this.getRegionName(regionCode),
          birthday: `${birthYear}-${birthMonth}-${birthDay}`,
          gender: genderCode % 2 === 0 ? '女' : '男',
          age: this.calculateAge(birthYear, birthMonth, birthDay)
        };
      } else {
        this.idCardInfo = null;
      }

      return valid;
    },
    getRegionName(code) {
      const regions = {
        '11': '北京', '12': '天津', '13': '河北', '14': '山西', '15': '内蒙古',
        '21': '辽宁', '22': '吉林', '23': '黑龙江',
        '31': '上海', '32': '江苏', '33': '浙江', '34': '安徽', '35': '福建', '36': '江西', '37': '山东',
        '41': '河南', '42': '湖北', '43': '湖南', '44': '广东', '45': '广西', '46': '海南',
        '50': '重庆', '51': '四川', '52': '贵州', '53': '云南', '54': '西藏',
        '61': '陕西', '62': '甘肃', '63': '青海', '64': '宁夏', '65': '新疆',
        '71': '台湾', '81': '香港', '82': '澳门'
      };
      const provinceCode = code.slice(0, 2);
      return regions[provinceCode] || '未知地区';
    },
    calculateAge(year, month, day) {
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },

    // ========== 邮箱相关方法 ==========
    initEmailValue(val) {
      this.emailDisplay = val || '';
      if (val) {
        this.emailValid = this.validateEmail(val);
      }
    },
    handleEmailInput(val) {
      this.emailDisplay = val;
      this.text = val;
      this.emailValid = val ? this.validateEmail(val) : null;
    },
    handleEmailBlur(event) {
      this.emailValid = this.emailDisplay ? this.validateEmail(this.emailDisplay) : null;
      this.handleBlur(event);
    },
    validateEmail(email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    },

    // ========== 验证码相关方法 ==========
    initCodeValue(val) {
      const str = String(val || '');
      this.codeValues = Array(this.codeLength).fill('').map((_, i) => str[i] || '');
    },
    handleCodeInput(event, index) {
      const val = event.target.value.replace(/\D/g, '');
      this.codeValues[index] = val.slice(-1);
      this.updateCodeValue();
      if (val && index < this.codeLength - 1) {
        this.$nextTick(() => {
          if (this.codeRefs[index + 1]) {
            this.codeRefs[index + 1].focus();
          }
        });
      }
    },
    handleCodeKeydown(event, index) {
      if (event.key === 'Backspace' && !this.codeValues[index] && index > 0) {
        this.$nextTick(() => {
          if (this.codeRefs[index - 1]) {
            this.codeRefs[index - 1].focus();
          }
        });
      }
    },
    handleCodePaste(event) {
      event.preventDefault();
      const paste = (event.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
      const chars = paste.slice(0, this.codeLength).split('');
      chars.forEach((char, i) => {
        this.codeValues[i] = char;
      });
      this.updateCodeValue();
      const focusIndex = Math.min(chars.length, this.codeLength - 1);
      this.$nextTick(() => {
        if (this.codeRefs[focusIndex]) {
          this.codeRefs[focusIndex].focus();
        }
      });
    },
    updateCodeValue() {
      const value = this.codeValues.join(this.codeSeparator);
      this.text = this.codeValues.join('');

      if (this.codeValues.every(v => v)) {
        this.$emit('code-complete', {value: this.text});
      }
    },

    // ========== 车牌号相关方法 ==========
    initPlateValue(val) {
      if (!val) {
        this.plateProvince = this.defaultPlateProvince;
        this.plateNumber = '';
        return;
      }
      const str = String(val);
      if (str.length > 0) {
        this.plateProvince = str[0];
        this.plateNumber = str.slice(1).toUpperCase();
      }
    },
    handlePlateInput(val) {
      this.plateNumber = val.toUpperCase().replace(/[^A-Z0-9]/g, '');
      this.updatePlateValue();
    },
    handlePlateBlur(event) {
      this.updatePlateValue();
      this.handleBlur(event);
    },
    updatePlateValue() {
      const value = this.plateProvince + this.plateNumber;
      this.text = value;
    },

    // ========== IP 地址相关方法 ==========
    initIpValue(val) {
      if (!val) {
        this.ipSegments = ['', '', '', ''];
        return;
      }
      const parts = String(val).split('.');
      this.ipSegments = parts.slice(0, 4).map(p => p || '');
      while (this.ipSegments.length < 4) {
        this.ipSegments.push('');
      }
    },
    handleIpInput(event, index) {
      let val = event.target.value.replace(/\D/g, '');
      if (val !== '' && parseInt(val, 10) > 255) {
        val = '255';
      }
      this.ipSegments[index] = val;
      this.updateIpValue();
      if (val.length === 3 || (val.length > 0 && parseInt(val, 10) >= 26)) {
        if (index < 3 && this.ipRefs[index + 1]) {
          this.$nextTick(() => this.ipRefs[index + 1].focus());
        }
      }
    },
    handleIpKeydown(event, index) {
      if (event.key === '.' && index < 3) {
        event.preventDefault();
        if (this.ipRefs[index + 1]) {
          this.ipRefs[index + 1].focus();
        }
      }
      if (event.key === 'Backspace' && !this.ipSegments[index] && index > 0) {
        if (this.ipRefs[index - 1]) {
          this.ipRefs[index - 1].focus();
        }
      }
    },
    updateIpValue() {
      const value = this.ipSegments.join('.');
      this.text = value;
    },

    // ========== MAC 地址相关方法 ==========
    initMacValue(val) {
      if (!val) {
        this.macSegments = ['', '', '', '', '', ''];
        return;
      }
      const str = String(val).replace(/[^A-Fa-f0-9]/g, '');
      this.macSegments = [];
      for (let i = 0; i < 6; i++) {
        this.macSegments.push(str.slice(i * 2, i * 2 + 2).toUpperCase());
      }
    },
    handleMacInput(event, index) {
      let val = event.target.value.replace(/[^A-Fa-f0-9]/g, '').toUpperCase();
      this.macSegments[index] = val.slice(0, 2);
      this.updateMacValue();
      if (val.length >= 2 && index < 5) {
        this.$nextTick(() => {
          if (this.macRefs[index + 1]) {
            this.macRefs[index + 1].focus();
          }
        });
      }
    },
    handleMacKeydown(event, index) {
      if ((event.key === ':' || event.key === '-') && index < 5) {
        event.preventDefault();
        if (this.macRefs[index + 1]) {
          this.macRefs[index + 1].focus();
        }
      }
      if (event.key === 'Backspace' && !this.macSegments[index] && index > 0) {
        if (this.macRefs[index - 1]) {
          this.macRefs[index - 1].focus();
        }
      }
    },
    updateMacValue() {
      const value = this.macSegments.join(this.macSeparator);
      this.text = this.macSegments.join('');
    },

    // ========== 社会信用代码相关方法 ==========
    initUsccValue(val) {
      this.usccDisplay = val || '';
      if (val && String(val).length === 18) {
        this.usccValid = this.validateUscc(val);
      }
    },
    handleUsccInput(val) {
      this.usccDisplay = val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 18);
      this.text = this.usccDisplay;
      if (this.usccRealtimeValidate && this.usccDisplay.length === 18) {
        this.usccValid = this.validateUscc(this.usccDisplay);
      } else {
        this.usccValid = null;
      }
    },
    handleUsccBlur(event) {
      if (this.usccDisplay && this.usccDisplay.length === 18) {
        this.usccValid = this.validateUscc(this.usccDisplay);
        this.$emit('uscc-valid', {valid: this.usccValid});
      }
      this.handleBlur(event);
    },
    validateUscc(code) {
      if (!code || code.length !== 18) return false;
      const chars = '0123456789ABCDEFGHJKLMNPQRTUWXY';
      const weights = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];
      let sum = 0;
      for (let i = 0; i < 17; i++) {
        const charIndex = chars.indexOf(code[i]);
        if (charIndex === -1) return false;
        sum += charIndex * weights[i];
      }
      const checkIndex = (31 - (sum % 31)) % 31;
      return chars[checkIndex] === code[17];
    }
  }
});
</script>
