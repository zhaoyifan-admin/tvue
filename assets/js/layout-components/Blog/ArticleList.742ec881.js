(window.webpackJsonp=window.webpackJsonp||[]).push([[15,30],{310:function(t,e,r){"use strict";r.r(e);var n=r(0).default.extend({name:"MyTransition",props:{delay:{type:Number,default:0},duration:{type:Number,default:.25}},methods:{setStyle(t){t.style.transition=`transform ${this.duration}s ease-in-out ${this.delay}s, opacity ${this.duration}s ease-in-out ${this.delay}s`,t.style.transform="translateY(-20px)",t.style.opacity="0"},unsetStyle(t){t.style.transform="translateY(0)",t.style.opacity="1"}}}),s=(r(355),r(1)),i=Object(s.a)(n,(function(){var t=this._self._c;this._self._setupProxy;return t("transition",{attrs:{name:"drop",appear:""},on:{appear:this.setStyle,"after-appear":this.unsetStyle,enter:this.setStyle,"after-enter":this.unsetStyle,"before-leave":this.setStyle}},[this._t("default")],2)}),[],!1,null,null,null);e.default=i.exports},321:function(t,e,r){},323:function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));const n=t=>`${t.charAt(0).toUpperCase()}${t.slice(1)}`,s={"en-US":"/en/","zh-CN":"/zh/","zh-TW":"/zh-tw/","de-AT":"/de/","vi-VN":"/vi/","ru-RU":"/ru/","uk-UA":"/uk/","pt-BR":"/br/"},i=Object.keys(s);Object.fromEntries(i.map(t=>[s[t],t]))},331:function(t,e,r){"use strict";r.d(e,"b",(function(){return i})),r.d(e,"a",(function(){return a})),r.d(e,"c",(function(){return u}));var n=r(431),s=r.n(n);const i=t=>{const e=s()(t instanceof Date||"number"==typeof t?t:t.trim());if(e.isValid()){const t=e.year(),r=e.month()+1,n=e.date(),s=e.hour(),i=e.minute(),a=e.second(),u=e.millisecond();return 8!==s&&0!==s||0!==i||0!==a||0!==u?[t,r,n,s,i,a]:[t,r,n,void 0,void 0,void 0]}const[,r,n,i,a,u,o]=/(?:(\d+)[/-](\d+)[/-](\d+))?\s*(?:(\d+):(\d+)(?::(\d+))?)?/u.exec(t.trim())||[],c=t=>void 0===t?void 0:Number(t);return[(h=c(r),h&&h<100?h+2e3:h),c(n),c(i),c(a),c(u),(f=c(o),a&&u&&!o?0:f)];var f,h},a=(t,e)=>t.filter(t=>{const{frontmatter:{article:r,blogpage:n,home:s},title:i}=t;return void 0!==i&&!0!==n&&!0!==s&&!1!==r&&(!e||e(t))}),u=(t,e)=>t.slice(0).sort((t,r)=>{if(e){const n=t.frontmatter[e],s=r.frontmatter[e];if(n&&s&&n!==s)return Number(s)-Number(n);if(n&&!s)return-1;if(!n&&s)return 1}return((t,e)=>{if(!t)return 1;if(!e)return-1;const r=(t,e)=>0===t.length?0:void 0===e[0]?void 0===t[0]||0===t[0]?0:-1:void 0===t[0]?0===e[0]?0:1:e[0]-t[0]==0?(t.shift(),e.shift(),r(t,e)):e[0]-t[0];return r(i(t),i(e))})(t.frontmatter.time||t.frontmatter.date||t.createTimeStamp,r.frontmatter.time||r.frontmatter.date||r.createTimeStamp)})},355:function(t,e,r){"use strict";r(321)},420:function(t,e,r){"use strict";var n=r(1),s=Object(n.a)({},(function(){var t=this._self._c;return t("svg",{staticClass:"icon category-icon",attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[t("path",{attrs:{d:"M148.41 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H148.41c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.311-40.31zm-.854 446.486H429.73c22.263 0 40.311 18.048 40.311 40.31v282.176c0 22.263-18.048 40.312-40.31 40.312H147.555c-22.263 0-40.311-18.049-40.311-40.312V593.79c0-22.263 18.048-40.311 40.31-40.311zm446.371-446.486h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H593.927c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.31-40.31zm136.293 813.51H623.926c-40.925 0-74.22-33.388-74.22-74.425V623.992c0-41.038 33.387-74.424 74.425-74.424h222.085c41.038 0 74.424 33.226 74.424 74.067v114.233c0 10.244-8.304 18.548-18.547 18.548s-18.548-8.304-18.548-18.548V623.635c0-20.388-16.746-36.974-37.33-36.974H624.13c-20.585 0-37.331 16.747-37.331 37.33v222.086c0 20.585 16.654 37.331 37.126 37.331H730.22c10.243 0 18.547 8.304 18.547 18.547 0 10.244-8.304 18.547-18.547 18.547z",fill:"currentColor"}})])}),[],!1,null,null,null);e.a=s.exports},421:function(t,e,r){"use strict";var n=r(1),s=Object(n.a)({},(function(){var t=this._self._c;return t("svg",{staticClass:"icon tag-icon",attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[t("path",{attrs:{d:"M939.902 458.563 910.17 144.567c-1.507-16.272-14.465-29.13-30.737-30.737L565.438 84.098h-.402c-3.215 0-5.726 1.005-7.634 2.913l-470.39 470.39a10.004 10.004 0 0 0 0 14.164l365.423 365.424c1.909 1.908 4.42 2.913 7.132 2.913s5.223-1.005 7.132-2.913l470.39-470.39c2.01-2.11 3.014-5.023 2.813-8.036zm-240.067-72.121c-35.458 0-64.286-28.828-64.286-64.286s28.828-64.285 64.286-64.285 64.286 28.828 64.286 64.285-28.829 64.286-64.286 64.286z",fill:"currentColor"}})])}),[],!1,null,null,null);e.a=s.exports},431:function(t,e,r){t.exports=function(){"use strict";var t=6e4,e=36e5,r="millisecond",n="second",s="minute",i="hour",a="day",u="week",o="month",c="quarter",f="year",h="date",l="Invalid Date",d=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,$=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],r=t%100;return"["+t+(e[(r-20)%10]||e[r]||e[0])+"]"}},v=function(t,e,r){var n=String(t);return!n||n.length>=e?t:""+Array(e+1-n.length).join(r)+t},y={s:v,z:function(t){var e=-t.utcOffset(),r=Math.abs(e),n=Math.floor(r/60),s=r%60;return(e<=0?"+":"-")+v(n,2,"0")+":"+v(s,2,"0")},m:function t(e,r){if(e.date()<r.date())return-t(r,e);var n=12*(r.year()-e.year())+(r.month()-e.month()),s=e.clone().add(n,o),i=r-s<0,a=e.clone().add(n+(i?-1:1),o);return+(-(n+(r-s)/(i?s-a:a-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:o,y:f,w:u,d:a,D:h,h:i,m:s,s:n,ms:r,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},p="en",g={};g[p]=m;var M="$isDayjsObject",w=function(t){return t instanceof O||!(!t||!t[M])},S=function t(e,r,n){var s;if(!e)return p;if("string"==typeof e){var i=e.toLowerCase();g[i]&&(s=i),r&&(g[i]=r,s=i);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var u=e.name;g[u]=e,s=u}return!n&&s&&(p=s),s||!n&&p},D=function(t,e){if(w(t))return t.clone();var r="object"==typeof e?e:{};return r.date=t,r.args=arguments,new O(r)},b=y;b.l=S,b.i=w,b.w=function(t,e){return D(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var O=function(){function m(t){this.$L=S(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[M]=!0}var v=m.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,r=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var n=e.match(d);if(n){var s=n[2]-1||0,i=(n[7]||"0").substring(0,3);return r?new Date(Date.UTC(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,i)):new Date(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,i)}}return new Date(e)}(t),this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return b},v.isValid=function(){return!(this.$d.toString()===l)},v.isSame=function(t,e){var r=D(t);return this.startOf(e)<=r&&r<=this.endOf(e)},v.isAfter=function(t,e){return D(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<D(t)},v.$g=function(t,e,r){return b.u(t)?this[e]:this.set(r,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var r=this,c=!!b.u(e)||e,l=b.p(t),d=function(t,e){var n=b.w(r.$u?Date.UTC(r.$y,e,t):new Date(r.$y,e,t),r);return c?n:n.endOf(a)},$=function(t,e){return b.w(r.toDate()[t].apply(r.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),r)},m=this.$W,v=this.$M,y=this.$D,p="set"+(this.$u?"UTC":"");switch(l){case f:return c?d(1,0):d(31,11);case o:return c?d(1,v):d(0,v+1);case u:var g=this.$locale().weekStart||0,M=(m<g?m+7:m)-g;return d(c?y-M:y+(6-M),v);case a:case h:return $(p+"Hours",0);case i:return $(p+"Minutes",1);case s:return $(p+"Seconds",2);case n:return $(p+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var u,c=b.p(t),l="set"+(this.$u?"UTC":""),d=(u={},u[a]=l+"Date",u[h]=l+"Date",u[o]=l+"Month",u[f]=l+"FullYear",u[i]=l+"Hours",u[s]=l+"Minutes",u[n]=l+"Seconds",u[r]=l+"Milliseconds",u)[c],$=c===a?this.$D+(e-this.$W):e;if(c===o||c===f){var m=this.clone().set(h,1);m.$d[d]($),m.init(),this.$d=m.set(h,Math.min(this.$D,m.daysInMonth())).$d}else d&&this.$d[d]($);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[b.p(t)]()},v.add=function(r,c){var h,l=this;r=Number(r);var d=b.p(c),$=function(t){var e=D(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if(d===o)return this.set(o,this.$M+r);if(d===f)return this.set(f,this.$y+r);if(d===a)return $(1);if(d===u)return $(7);var m=(h={},h[s]=t,h[i]=e,h[n]=1e3,h)[d]||1,v=this.$d.getTime()+r*m;return b.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,r=this.$locale();if(!this.isValid())return r.invalidDate||l;var n=t||"YYYY-MM-DDTHH:mm:ssZ",s=b.z(this),i=this.$H,a=this.$m,u=this.$M,o=r.weekdays,c=r.months,f=r.meridiem,h=function(t,r,s,i){return t&&(t[r]||t(e,n))||s[r].slice(0,i)},d=function(t){return b.s(i%12||12,t,"0")},m=f||function(t,e,r){var n=t<12?"AM":"PM";return r?n.toLowerCase():n};return n.replace($,(function(t,n){return n||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return u+1;case"MM":return b.s(u+1,2,"0");case"MMM":return h(r.monthsShort,u,c,3);case"MMMM":return h(c,u);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(r.weekdaysMin,e.$W,o,2);case"ddd":return h(r.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(i);case"HH":return b.s(i,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return m(i,a,!0);case"A":return m(i,a,!1);case"m":return String(a);case"mm":return b.s(a,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return s}return null}(t)||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(r,h,l){var d,$=this,m=b.p(h),v=D(r),y=(v.utcOffset()-this.utcOffset())*t,p=this-v,g=function(){return b.m($,v)};switch(m){case f:d=g()/12;break;case o:d=g();break;case c:d=g()/3;break;case u:d=(p-y)/6048e5;break;case a:d=(p-y)/864e5;break;case i:d=p/e;break;case s:d=p/t;break;case n:d=p/1e3;break;default:d=p}return l?d:b.a(d)},v.daysInMonth=function(){return this.endOf(o).$D},v.$locale=function(){return g[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var r=this.clone(),n=S(t,e,!0);return n&&(r.$L=n),r},v.clone=function(){return b.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},m}(),_=O.prototype;return D.prototype=_,[["$ms",r],["$s",n],["$m",s],["$H",i],["$W",a],["$M",o],["$y",f],["$D",h]].forEach((function(t){_[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),D.extend=function(t,e){return t.$i||(t(e,O,D),t.$i=!0),D},D.locale=S,D.isDayjs=w,D.unix=function(t){return D(1e3*t)},D.en=g[p],D.Ls=g,D.p={},D}()}}]);