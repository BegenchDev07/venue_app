"use strict";
const taro = require("../../taro.js");
const common = require("../../common.js");
require("../../vendors.js");
function User() {
  const {
    record
  } = taro.Taro.getStorageSync("user");
  console.log(record);
  return /* @__PURE__ */ taro.jsxs(common.Layout, {
    children: [/* @__PURE__ */ taro.jsx(taro.View, {
      className: "w-full flex items-center justify-center pb-10",
      children: /* @__PURE__ */ taro.jsx(taro.Text, {
        className: "text-xl font-semibold",
        children: "User page"
      })
    }), /* @__PURE__ */ taro.jsxs(taro.View, {
      className: "w-full flex flex-col items-center justify-start gap-5",
      children: [/* @__PURE__ */ taro.jsxs(taro.View, {
        className: "px-5 flex gap-3",
        children: [/* @__PURE__ */ taro.jsx(taro.Text, {
          className: "font-semibold",
          children: "Username:"
        }), /* @__PURE__ */ taro.jsx(taro.Text, {
          children: record.name
        })]
      }), /* @__PURE__ */ taro.jsxs(taro.View, {
        className: "px-5 flex gap-3",
        children: [/* @__PURE__ */ taro.jsx(taro.Text, {
          className: "font-semibold",
          children: "Email:"
        }), /* @__PURE__ */ taro.jsx(taro.Text, {
          children: record.email
        })]
      }), /* @__PURE__ */ taro.jsxs(taro.View, {
        className: "px-5 flex gap-3",
        children: [/* @__PURE__ */ taro.jsx(taro.Text, {
          className: "font-semibold",
          children: "ID:"
        }), /* @__PURE__ */ taro.jsx(taro.Text, {
          children: record.id
        })]
      }), /* @__PURE__ */ taro.jsxs(taro.View, {
        className: "px-5 flex gap-3",
        children: [/* @__PURE__ */ taro.jsx(taro.Text, {
          className: "font-semibold",
          children: "Avatar:"
        }), /* @__PURE__ */ taro.jsx(taro.Text, {
          children: record.avatar
        })]
      })]
    })]
  });
}
var config = {};
Page(taro.createPageConfig(User, "pages/user/index", {
  root: {
    cn: []
  }
}, config || {}));
//# sourceMappingURL=index.js.map
