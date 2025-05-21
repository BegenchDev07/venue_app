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
const taro = require("./taro.js");
const vendors = require("./vendors.js");
const BottomMenu = () => {
  const navigateTo = (path) => {
    const pages = taro.Taro.getCurrentPages();
    if (path.slice(1) !== (pages == null ? void 0 : pages.at(-1).route)) {
      taro.Taro.navigateTo({
        url: path
      });
    }
  };
  return /* @__PURE__ */ taro.jsx(taro.View, {
    className: "fixed bottom-0 left-0 right-0 bg-slate-300 shadow flex justify-around items-center h-16 z-50 border-t",
    children: /* @__PURE__ */ taro.jsxs(taro.View, {
      className: "fixed bottom-3 left-0 w-full border-t border-gray-200 flex items-center justify-around py-2 z-50",
      children: [/* @__PURE__ */ taro.jsx(taro.Navigator, {
        className: "flex items-center px-4 py-2 bg-blue-600 rounded-lg",
        onClick: (_) => navigateTo("/pages/index/index"),
        children: /* @__PURE__ */ taro.jsx(taro.Text, {
          className: "text-sm text-white",
          children: "Home"
        })
      }), /* @__PURE__ */ taro.jsx(taro.Navigator, {
        className: "flex items-center px-4 py-2 bg-blue-600 rounded-lg",
        onClick: (_) => navigateTo("/pages/bookings/index"),
        children: /* @__PURE__ */ taro.jsx(taro.Text, {
          className: "text-sm text-white",
          children: "Bookings"
        })
      }), /* @__PURE__ */ taro.jsx(taro.Navigator, {
        className: "flex items-center px-4 py-2 bg-blue-600 rounded-lg",
        onClick: (_) => navigateTo("/pages/user/index"),
        children: /* @__PURE__ */ taro.jsx(taro.Text, {
          className: "text-sm text-white",
          children: "Profile"
        })
      })]
    })
  });
};
function Layout(_ref) {
  let {
    children
  } = _ref;
  return /* @__PURE__ */ taro.jsxs(taro.View, {
    className: "min-h-screen relative",
    children: [/* @__PURE__ */ taro.jsx(taro.View, {
      className: "pb-14",
      children
    }), /* @__PURE__ */ taro.jsx(BottomMenu, {})]
  });
}
new vendors.Client("https://pocket.moodymymood.space");
const imageBaseUrl = "https://pocket.moodymymood.space/api/files/pbc_1379753955/";
const baseUrl = "https://pocket.moodymymood.space/api";
const AuthUser = (_ref) => __async(exports, null, function* () {
  let {
    email,
    password
  } = _ref;
  try {
    const login = yield taro.Taro.request({
      url: baseUrl + "/collections/users/auth-with-password",
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      data: {
        identity: email,
        password
      }
    }).then((_ref2) => {
      let {
        data,
        statusCode
      } = _ref2;
      if (statusCode === 200)
        return data;
      else {
        return false;
      }
    });
    return login;
  } catch (error) {
    debugger;
  }
});
const createUser = (_ref3) => __async(exports, null, function* () {
  let {
    email,
    password,
    name
  } = _ref3;
  const auth = yield taro.Taro.request({
    url: baseUrl + "/collections/users/records",
    method: "POST",
    header: {
      "Content-Type": "application/json"
    },
    data: {
      email,
      password,
      name,
      passwordConfirm: password
    }
  }).then((_ref4) => {
    let {
      data,
      statusCode
    } = _ref4;
    if (statusCode === 200)
      return data;
    else
      return false;
  });
  return auth;
});
const getVenues = () => __async(exports, null, function* () {
  return yield taro.Taro.request({
    url: baseUrl + "/collections/venues/records?sort=-created",
    method: "GET",
    header: {
      "Content-Type": "application/json"
    }
  }).then((_ref5) => {
    let {
      data,
      statusCode
    } = _ref5;
    if (statusCode === 200)
      return data.items;
    else
      return false;
  });
});
const createBooking = (_ref6) => __async(exports, null, function* () {
  let {
    fromTime,
    toTime,
    venueID,
    bookingID,
    userID
  } = _ref6;
  return yield taro.Taro.request({
    url: baseUrl + `/collections/bookings/records`,
    method: "POST",
    header: {
      "Content-Type": "application/json"
    },
    data: {
      fromTime,
      toTime,
      userID,
      venue: venueID
    }
  }).then((_ref7) => __async(exports, null, function* () {
    let {
      data,
      statusCode
    } = _ref7;
    if (statusCode === 200) {
      return yield adjustVenue(data == null ? void 0 : data.id, venueID, bookingID);
    }
  }));
});
const adjustVenue = (booking, id, oldBooking) => __async(exports, null, function* () {
  return yield taro.Taro.request({
    url: baseUrl + `/collections/venues/records/${id}`,
    method: "PATCH",
    header: {
      "Content-Type": "application/json"
    },
    data: {
      booking: [...oldBooking, booking]
    }
  }).then((_ref8) => {
    let {
      statusCode
    } = _ref8;
    if (statusCode === 200)
      return true;
    else
      return false;
  });
});
const getSingleVenue = (id) => __async(exports, null, function* () {
  return yield taro.Taro.request({
    url: baseUrl + `/collections/venues/records/${id}?expand=booking`,
    method: "GET",
    header: {
      "Content-Type": "application/json"
    }
  }).then((_ref9) => {
    let {
      data,
      statusCode
    } = _ref9;
    console.log(data);
    if (statusCode === 200)
      return data;
  });
});
const getBookings = (id) => __async(exports, null, function* () {
  const encodedFilter = encodeURIComponent(`(userId='${id}')`);
  return yield taro.Taro.request({
    url: baseUrl + `/collections/bookings_on_venues/records?filter=${encodedFilter}`,
    method: "GET",
    header: {
      "Content-Type": "application/json"
    }
  }).then((_ref10) => {
    let {
      data,
      statusCode
    } = _ref10;
    if (statusCode === 200)
      return data == null ? void 0 : data.items;
    else
      return false;
  });
});
const deleteBooking = (id) => __async(exports, null, function* () {
  return yield taro.Taro.request({
    url: baseUrl + `/collections/bookings/records/${id}`,
    method: "DELETE",
    header: {
      "Content-Type": "application/json"
    }
  }).then((_ref11) => {
    let {
      statusCode
    } = _ref11;
    if (statusCode === 204)
      return true;
    else
      return false;
  });
});
exports.AuthUser = AuthUser;
exports.Layout = Layout;
exports.createBooking = createBooking;
exports.createUser = createUser;
exports.deleteBooking = deleteBooking;
exports.getBookings = getBookings;
exports.getSingleVenue = getSingleVenue;
exports.getVenues = getVenues;
exports.imageBaseUrl = imageBaseUrl;
//# sourceMappingURL=common.js.map
