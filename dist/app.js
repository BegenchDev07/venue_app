"use strict";
const taro = require("./taro.js");
const app = "";
function App$1(_ref) {
  let {
    children
  } = _ref;
  taro.taroExports.useLaunch(() => {
    console.log("App launched.");
  });
  return children;
}
var config = {
  "pages": ["pages/index/index", "pages/user/index", "pages/bookings/index", "pages/book_venue/index"],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "WeChat",
    "navigationBarTextStyle": "black"
  }
};
taro.taroWindowProvider.__taroAppConfig = config;
App(taro.createReactApp(App$1, taro.React, taro.index, config));
taro.taroExports.initPxTransform({
  designWidth: 750,
  deviceRatio: {
    "375": 2,
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});
//# sourceMappingURL=app.js.map
