(window.webpackJsonp=window.webpackJsonp||[]).push([[138],{774:function(t,s,a){"use strict";a.r(s);var n={name:"component-doc",components:{"render-demo-0":{render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("div",[a("el-button",{staticStyle:{"margin-bottom":"20px"},on:{click:function(s){return t.openPreview(0)}}},[t._v("打开图片裁剪")]),t._v(" "),a("p",t._l(t.datas,(function(s,n){return a("img",{staticStyle:{"margin-right":"20px"},attrs:{width:"200px",src:s.thumbUrl},on:{click:function(s){return t.openPreview(n)}}})})),0),t._v(" "),a("div",[a("h3",[t._v(" 裁剪图片")]),t._v(" "),a("img",{attrs:{src:t.src}})])],1)])},staticRenderFns:[],data:()=>({src:"",datas:[{thumbUrl:"/images/logo.png",url:"/images/logo.png"},{thumbUrl:"https://img.alicdn.com/tfs/TB1uevcCrj1gK0jSZFuXXcrHpXa-1880-640.jpg",url:"https://img.alicdn.com/tfs/TB1uevcCrj1gK0jSZFuXXcrHpXa-1880-640.jpg"},{thumbUrl:"https://img.alicdn.com/tfs/TB1v28TC8v0gK0jSZKbXXbK2FXa-1880-640.jpg",url:"https://img.alicdn.com/tfs/TB1v28TC8v0gK0jSZKbXXbK2FXa-1880-640.jpg"}]}),methods:{openPreview(t=0){this.$ImageCropper({img:this.datas[t].thumbUrl,type:"base64",callback:t=>{console.log(t),this.src=t},cancel:()=>{this.$message.success("取消了")}})}}}}},e=a(1),r=Object(e.a)(n,(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"imagecrooper-图片裁剪"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#imagecrooper-图片裁剪"}},[t._v("#")]),t._v(" ImageCrooper 图片裁剪")]),t._v(" "),s("p",[t._v("可以裁剪图片地址或者Base64")]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("Tips")]),t._v(" "),s("p",[t._v("2.9.9+")])]),t._v(" "),s("demo-block",{attrs:{options:JSON.parse(decodeURI("%7B%7D"))}},[s("template",{slot:"demo"},[[s("render-demo-0")]],2),t._v(" "),s("template",{slot:"source"},[s("div",{staticClass:"language-html line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("el-button")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@click")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("openPreview(0)"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token special-attr"}},[s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("style")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),s("span",{pre:!0,attrs:{class:"token value css language-css"}},[s("span",{pre:!0,attrs:{class:"token property"}},[t._v("margin-bottom")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("20px"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("打开图片裁剪"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("el-button")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("img")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("width")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("200px"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token special-attr"}},[s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("style")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),s("span",{pre:!0,attrs:{class:"token value css language-css"}},[s("span",{pre:!0,attrs:{class:"token property"}},[t._v("margin-right")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("20px")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("v-for")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("(d, index) of datas"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":src")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("d.thumbUrl"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@click")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("openPreview(index)"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("h3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" 裁剪图片"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("h3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("img")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":src")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("src"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}},[s("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("data")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("src")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("datas")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("thumbUrl")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("/images/logo.png")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("url")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("/images/logo.png")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("thumbUrl")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("https://img.alicdn.com/tfs/TB1uevcCrj1gK0jSZFuXXcrHpXa-1880-640.jpg")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("url")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("https://img.alicdn.com/tfs/TB1uevcCrj1gK0jSZFuXXcrHpXa-1880-640.jpg")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("thumbUrl")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("https://img.alicdn.com/tfs/TB1v28TC8v0gK0jSZKbXXbK2FXa-1880-640.jpg")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("url")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("https://img.alicdn.com/tfs/TB1v28TC8v0gK0jSZKbXXbK2FXa-1880-640.jpg")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("methods")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("openPreview")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("index "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("$ImageCropper")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("img")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("datas"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("index"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("thumbUrl"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// autoCropWidth:100,")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// autoCropHeight:100,")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// fixed:true,")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// fixedNumber:[100,100],")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("type")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'base64'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("callback")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("res")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("res"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("src"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("res\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("cancel")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$message"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("success")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'取消了'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br"),s("span",{staticClass:"line-number"},[t._v("22")]),s("br"),s("span",{staticClass:"line-number"},[t._v("23")]),s("br"),s("span",{staticClass:"line-number"},[t._v("24")]),s("br"),s("span",{staticClass:"line-number"},[t._v("25")]),s("br"),s("span",{staticClass:"line-number"},[t._v("26")]),s("br"),s("span",{staticClass:"line-number"},[t._v("27")]),s("br"),s("span",{staticClass:"line-number"},[t._v("28")]),s("br"),s("span",{staticClass:"line-number"},[t._v("29")]),s("br"),s("span",{staticClass:"line-number"},[t._v("30")]),s("br"),s("span",{staticClass:"line-number"},[t._v("31")]),s("br"),s("span",{staticClass:"line-number"},[t._v("32")]),s("br"),s("span",{staticClass:"line-number"},[t._v("33")]),s("br"),s("span",{staticClass:"line-number"},[t._v("34")]),s("br"),s("span",{staticClass:"line-number"},[t._v("35")]),s("br"),s("span",{staticClass:"line-number"},[t._v("36")]),s("br"),s("span",{staticClass:"line-number"},[t._v("37")]),s("br"),s("span",{staticClass:"line-number"},[t._v("38")]),s("br"),s("span",{staticClass:"line-number"},[t._v("39")]),s("br"),s("span",{staticClass:"line-number"},[t._v("40")]),s("br"),s("span",{staticClass:"line-number"},[t._v("41")]),s("br"),s("span",{staticClass:"line-number"},[t._v("42")]),s("br")])])])],2),s("h2",{attrs:{id:"variables"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#variables"}},[t._v("#")]),t._v(" Variables")]),t._v(" "),s("table",{staticStyle:{"text-align":"center"}},[s("thead",[s("tr",[s("td",[t._v("名称")]),t._v(" "),s("td",[t._v("功能")]),t._v(" "),s("td",[t._v("默认值")]),t._v(" "),s("td",[t._v("可选值")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("img")]),t._v(" "),s("td",[t._v("裁剪图片的地址")]),t._v(" "),s("td",[t._v("空")]),t._v(" "),s("td",[t._v("url 地址 || base64 || blob")])]),t._v(" "),s("tr",[s("td",[t._v("type")]),t._v(" "),s("td",[t._v("裁剪图片返回格式")]),t._v(" "),s("td",[t._v("base64")]),t._v(" "),s("td",[t._v("base64 || file")])]),t._v(" "),s("tr",[s("td",[t._v("callback")]),t._v(" "),s("td",[t._v("裁剪图片成功回调")]),t._v(" "),s("td",[t._v("空")]),t._v(" "),s("td",[t._v("空")])]),t._v(" "),s("tr",[s("td",[t._v("cancel")]),t._v(" "),s("td",[t._v("裁剪图片取消回调")]),t._v(" "),s("td",[t._v("空")]),t._v(" "),s("td",[t._v("空")])]),t._v(" "),s("tr",[s("td",[t._v("outputSize")]),t._v(" "),s("td",[t._v("裁剪生成图片的质量")]),t._v(" "),s("td",[t._v("1")]),t._v(" "),s("td",[t._v("0.1 - 1")])]),t._v(" "),s("tr",[s("td",[t._v("outputType")]),t._v(" "),s("td",[t._v("裁剪生成图片的格式")]),t._v(" "),s("td",[t._v("jpg (jpg 需要传入jpeg)")]),t._v(" "),s("td",[t._v("jpeg || png || webp")])]),t._v(" "),s("tr",[s("td",[t._v("info")]),t._v(" "),s("td",[t._v("裁剪框的大小信息")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("true || false")])]),t._v(" "),s("tr",[s("td",[t._v("canScale")]),t._v(" "),s("td",[t._v("图片是否允许滚轮缩放")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("true || false")])]),t._v(" "),s("tr",[s("td",[t._v("autoCrop")]),t._v(" "),s("td",[t._v("是否默认生成截图框")]),t._v(" "),s("td",[t._v("false")]),t._v(" "),s("td",[t._v("true || false")])]),t._v(" "),s("tr",[s("td",[t._v("autoCropWidth")]),t._v(" "),s("td",[t._v("默认生成截图框宽度")]),t._v(" "),s("td",[t._v("容器的80%")]),t._v(" "),s("td",[t._v("0~max")])]),t._v(" "),s("tr",[s("td",[t._v("autoCropHeight")]),t._v(" "),s("td",[t._v("默认生成截图框高度")]),t._v(" "),s("td",[t._v("容器的80%")]),t._v(" "),s("td",[t._v("0~max")])]),t._v(" "),s("tr",[s("td",[t._v("fixed")]),t._v(" "),s("td",[t._v("是否开启截图框宽高固定比例")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("true | false")])]),t._v(" "),s("tr",[s("td",[t._v("fixedNumber")]),t._v(" "),s("td",[t._v("截图框的宽高比例")]),t._v(" "),s("td",[t._v("[1, 1]")]),t._v(" "),s("td",[t._v("[宽度, 高度]")])]),t._v(" "),s("tr",[s("td",[t._v("full")]),t._v(" "),s("td",[t._v("是否输出原图比例的截图")]),t._v(" "),s("td",[t._v("false")]),t._v(" "),s("td",[t._v("true | false")])]),t._v(" "),s("tr",[s("td",[t._v("fixedBox")]),t._v(" "),s("td",[t._v("固定截图框大小 不允许改变")]),t._v(" "),s("td",[t._v("false")]),t._v(" "),s("td",[t._v("true | false")])]),t._v(" "),s("tr",[s("td",[t._v("canMove")]),t._v(" "),s("td",[t._v("上传图片是否可以移动")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("true | false")])]),t._v(" "),s("tr",[s("td",[t._v("canMoveBox")]),t._v(" "),s("td",[t._v("截图框能否拖动")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("true | false")])]),t._v(" "),s("tr",[s("td",[t._v("original")]),t._v(" "),s("td",[t._v("上传图片按照原始比例渲染")]),t._v(" "),s("td",[t._v("false")]),t._v(" "),s("td",[t._v("true | false")])]),t._v(" "),s("tr",[s("td",[t._v("centerBox")]),t._v(" "),s("td",[t._v("截图框是否被限制在图片里面")]),t._v(" "),s("td",[t._v("false")]),t._v(" "),s("td",[t._v("true | false")])]),t._v(" "),s("tr",[s("td",[t._v("high")]),t._v(" "),s("td",[t._v("是否按照设备的dpr 输出等比例图片")]),t._v(" "),s("td",[t._v("true")]),t._v(" "),s("td",[t._v("true | false")])]),t._v(" "),s("tr",[s("td",[t._v("infoTrue")]),t._v(" "),s("td",[t._v("true 为展示真实输出图片宽高  false 展示看到的截图框宽高")]),t._v(" "),s("td",[t._v("false")]),t._v(" "),s("td",[t._v("true | false")])]),t._v(" "),s("tr",[s("td",[t._v("maxImgSize")]),t._v(" "),s("td",[t._v("限制图片最大宽度和高度")]),t._v(" "),s("td",[t._v("2000")]),t._v(" "),s("td",[t._v("0-max")])]),t._v(" "),s("tr",[s("td",[t._v("enlarge")]),t._v(" "),s("td",[t._v("图片根据截图框输出比例倍数")]),t._v(" "),s("td",[t._v("1")]),t._v(" "),s("td",[t._v("0-max(建议不要太大不然会卡死的呢)")])]),t._v(" "),s("tr",[s("td",[t._v("mode")]),t._v(" "),s("td",[t._v("图片默认渲染方式")]),t._v(" "),s("td",[t._v("contain")]),t._v(" "),s("td",[t._v("contain , cover, 100px, 100% auto")])])])])],1)}),[],!1,null,null,null);s.default=r.exports}}]);