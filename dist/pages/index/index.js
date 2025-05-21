"use strict";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const taro = require("../../taro.js");
const common = require("../../common.js");
require("../../vendors.js");
const VenueCard = (_ref) => {
  let {
    title,
    image,
    id
  } = _ref;
  const navigateTo = (path) => {
    taro.Taro.navigateTo({
      url: path
    });
  };
  return /* @__PURE__ */ taro.jsxs(taro.View, {
    className: "max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm",
    children: [/* @__PURE__ */ taro.jsx(taro.Navigator, {
      children: /* @__PURE__ */ taro.jsx(taro.Image, {
        className: "rounded-t-lg w-full h-48 object-cover",
        src: image
      })
    }), /* @__PURE__ */ taro.jsxs(taro.View, {
      className: "p-5",
      children: [/* @__PURE__ */ taro.jsx(taro.View, {
        onClick: (_) => navigateTo(`/pages/book_venue/index?id=${id}`),
        children: /* @__PURE__ */ taro.jsx(taro.Text, {
          className: "mb-2 text-2xl font-bold tracking-tight text-gray-900",
          children: title
        })
      }), /* @__PURE__ */ taro.jsx(taro.View, {
        onClick: (_) => navigateTo(`/pages/book_venue/index?id=${id}`),
        className: "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hovercbg-blue-800 focuscring-4 focuscoutline-none focuscring-blue-300",
        children: "View Venue"
      })]
    })]
  });
};
function Index() {
  const [isLoggedIn, setIsLoggedIn] = taro.useState(false);
  const [venueList, setVenueList] = taro.useState(null);
  const loginLogic = () => __async(this, null, function* () {
    try {
      const {
        userInfo
      } = yield taro.Taro.getUserProfile({
        desc: "Please provide credentials"
      });
      const state = yield common.AuthUser({
        email: userInfo.nickName + "@mail.com",
        password: "123456"
      });
      console.log(state);
      if (state !== false && state !== void 0) {
        taro.Taro.setStorageSync("user", state);
        setIsLoggedIn(true);
        return true;
      } else {
        const user = yield common.createUser({
          email: userInfo.nickName + "@mail.com",
          password: "123456",
          name: userInfo.nickName
        });
        if (user !== false && user !== void 0) {
          taro.Taro.setStorageSync("user", state);
          setIsLoggedIn(true);
          return true;
        } else {
          throw Error;
        }
      }
    } catch (err) {
      taro.Taro.showToast({
        title: "Error getting user data",
        icon: "none"
      });
      console.log(err);
      return false;
    }
  });
  const checkForUser = () => {
    const user = taro.Taro.getStorageSync("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      taro.Taro.showModal({
        title: "Login",
        content: "Please log in to use the app!",
        confirmText: "Confirm",
        cancelText: "Cancel",
        success: (res) => __async(this, null, function* () {
          if (res.confirm) {
            const result = yield loginLogic();
            if (result) {
              console.log("User successfully logged in!");
            }
          } else {
            taro.Taro.showToast({
              title: "Login canceled!",
              icon: "none"
            });
            console.log("User canceled login");
          }
        })
      });
    }
  };
  const pullVenues = () => __async(this, null, function* () {
    if (taro.Taro.getStorageSync("user")) {
      const venueList2 = yield common.getVenues();
      setVenueList(venueList2);
    }
  });
  taro.useEffect(() => {
    checkForUser();
  }, []);
  taro.useEffect(() => {
    pullVenues();
  }, [isLoggedIn]);
  return /* @__PURE__ */ taro.jsx(taro.Fragment, {
    children: !isLoggedIn ? /* @__PURE__ */ taro.jsx(taro.View, {
      className: "size-screen flex items-center justify-center",
      children: /* @__PURE__ */ taro.jsx(taro.Text, {
        className: "relative text-center top-1s2",
        children: "Logging in..."
      })
    }) : /* @__PURE__ */ taro.jsx(common.Layout, {
      children: /* @__PURE__ */ taro.jsx(taro.View, {
        className: "min-h-screen flex flex-col",
        children: /* @__PURE__ */ taro.jsxs(taro.View, {
          className: "flex flex-col p-4",
          children: [/* @__PURE__ */ taro.jsx(taro.Text, {
            className: "text-2xl font-bold mb-4",
            children: "Welcome to Venue Booker"
          }), /* @__PURE__ */ taro.jsx(taro.View, {
            children: venueList == null ? void 0 : venueList.map((venue) => /* @__PURE__ */ taro.jsx(VenueCard, {
              title: venue.name,
              image: common.imageBaseUrl + `${venue.id}/` + venue.photo,
              id: venue.id
            }, venue.id))
          })]
        })
      })
    })
  });
}
var config = {
  "navigationBarTitleText": "Sport Venue Booker"
};
Page(taro.createPageConfig(Index, "pages/index/index", {
  root: {
    cn: []
  }
}, config || {}));
//# sourceMappingURL=index.js.map
