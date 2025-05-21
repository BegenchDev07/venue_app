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
const BookingCards = (_ref) => {
  let {
    id,
    fromTime,
    toTime,
    photo,
    venueName
  } = _ref;
  taro.useState(false);
  const removeBooking = (id2) => {
    const result = common.deleteBooking(id2);
    Promise.resolve(result).then((res) => {
      console.log(res);
      if (res) {
        taro.Taro.showToast({
          title: "Delete Success !"
        });
        taro.Taro.navigateTo({
          url: "/pages/index/index"
        });
      } else {
        taro.Taro.showToast({
          title: "Problem Deleting !"
        });
      }
    });
  };
  return /* @__PURE__ */ taro.jsxs(taro.View, {
    className: "bg-white border border-gray-200 rounded-lg shadow-lg border border-black p-3",
    children: [/* @__PURE__ */ taro.jsx(taro.View, {
      children: /* @__PURE__ */ taro.jsx(taro.Image, {
        className: "rounded-t-lg object-fill w-full",
        src: photo
      })
    }), /* @__PURE__ */ taro.jsxs(taro.View, {
      className: " flex flex-col",
      children: [/* @__PURE__ */ taro.jsx(taro.View, {
        children: /* @__PURE__ */ taro.jsx(taro.Text, {
          className: "mb-2 text-2xl font-bold tracking-tight text-gray-900",
          children: venueName
        })
      }), /* @__PURE__ */ taro.jsxs(taro.Text, {
        className: "mb-3 font-normal text-gray-700",
        children: ["From: ", fromTime, " - To: ", toTime]
      }), /* @__PURE__ */ taro.jsx(taro.View, {
        className: "flex gap-5",
        children: /* @__PURE__ */ taro.jsx(taro.View, {
          onClick: (_) => {
            removeBooking(id);
          },
          className: "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hovercbg-blue-800 focuscring-4 focuscoutline-none focuscring-blue-300",
          children: /* @__PURE__ */ taro.jsx(taro.Text, {
            children: "Delete"
          })
        })
      })]
    })]
  });
};
function Bookings() {
  const {
    record
  } = taro.Taro.getStorageSync("user");
  const [bookingData, setBookingData] = taro.useState([]);
  const viewBaseUrl = "https://pocket.moodymymood.space/api/files/pbc_1087969960/";
  const pullVenue = () => __async(this, null, function* () {
    const bookings = yield common.getBookings(record == null ? void 0 : record.id);
    console.log(bookings);
    setBookingData(bookings);
  });
  const renderData = () => {
    if (bookingData.length !== 0) {
      return bookingData.map((data) => /* @__PURE__ */ taro.jsx(BookingCards, {
        id: data.id,
        fromTime: data.fromTime,
        toTime: data.toTime,
        photo: viewBaseUrl + `${data.id}/` + data.venuePhoto,
        venueName: data.venueName
      }));
    } else {
      return /* @__PURE__ */ taro.jsx(taro.Text, {
        className: "text-3xl font-semibold",
        children: "Empty !"
      });
    }
  };
  taro.useEffect(() => {
    pullVenue();
  }, []);
  return /* @__PURE__ */ taro.jsx(common.Layout, {
    children: /* @__PURE__ */ taro.jsxs(taro.View, {
      className: "size-full flex flex-col items-center justify-center",
      children: [/* @__PURE__ */ taro.jsx(taro.Text, {
        className: "text-center w-full font-semibold text-2xl pb-10",
        children: "Bookings"
      }), /* @__PURE__ */ taro.jsx(taro.View, {
        className: "flex flex-col p-4",
        children: renderData()
      })]
    })
  });
}
var config = {};
Page(taro.createPageConfig(Bookings, "pages/bookings/index", {
  root: {
    cn: []
  }
}, config || {}));
//# sourceMappingURL=index.js.map
