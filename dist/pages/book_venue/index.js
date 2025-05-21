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
const vendors = require("../../vendors.js");
const generateTimeSlots = (date) => {
  const slots = [];
  for (let hour = 8; hour <= 18; hour++) {
    for (let minute of [0, 30]) {
      const time = `${vendors.dayjs(date).format("YYYY-MM-DD")}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      slots.push(time);
    }
  }
  return slots;
};
const CalendarTimeSpanPicker = (_ref) => {
  let {
    bookedSlots
  } = _ref;
  const today = vendors.dayjs();
  const [selectedDate, setSelectedDate] = taro.useState("");
  const [fromTime, setFromTime] = taro.useState("");
  const [toTime, setToTime] = taro.useState("");
  const [savedTimeSpan, setSavedTimeSpan] = taro.useState(null);
  const {
    id
  } = taro.Taro.useRouter().params;
  const readyBookings = (bookedSlots == null ? void 0 : bookedSlots.map((_ref2) => {
    let {
      fromTime: fromTime2,
      toTime: toTime2
    } = _ref2;
    return [fromTime2, toTime2];
  }).flat()) || [];
  const oldIDs = (bookedSlots == null ? void 0 : bookedSlots.flatMap((_ref3) => {
    let {
      id: id2
    } = _ref3;
    return [id2];
  })) || [];
  console.log(oldIDs);
  const days = Array.from({
    length: 7
  }, (_, i) => today.add(i, "day").format("YYYY-MM-DD"));
  const handleDateSelect = (date) => {
    console.log(date);
    setSelectedDate(date);
  };
  const handleSubmit = () => {
    if (fromTime && toTime) {
      console.log(fromTime, "-", toTime);
      setSavedTimeSpan({
        from: fromTime,
        to: toTime
      });
      const {
        record
      } = taro.Taro.getStorageSync("user");
      const result = common.createBooking({
        fromTime,
        toTime,
        venueID: id,
        bookingID: oldIDs,
        userID: record == null ? void 0 : record.id
      });
      Promise.resolve(result).then((res) => {
        if (res) {
          taro.Taro.showToast({
            title: "Booking success !",
            icon: "none"
          });
        }
      });
    }
  };
  const slots = selectedDate ? generateTimeSlots(selectedDate) : [];
  return /* @__PURE__ */ taro.jsxs(taro.View, {
    className: "p-4",
    children: [/* @__PURE__ */ taro.jsx(taro.Text, {
      className: "text-lg font-bold mb-2 block",
      children: "Pick a Date"
    }), /* @__PURE__ */ taro.jsx(taro.View, {
      className: "grid grid-cols-4 gap-2 mb-4",
      children: days.map((date) => /* @__PURE__ */ taro.jsx(taro.Button, {
        onClick: () => handleDateSelect(date),
        className: `rounded text-sm p-1 ${selectedDate === date ? "bg-blue-600 text-white" : "bg-gray-100"}`,
        children: vendors.dayjs(date).format("MM/DD")
      }, date))
    }), selectedDate && /* @__PURE__ */ taro.jsxs(taro.Fragment, {
      children: [/* @__PURE__ */ taro.jsx(taro.Text, {
        className: "text-lg font-bold mt-4 mb-2 block",
        children: "From"
      }), /* @__PURE__ */ taro.jsx(taro.View, {
        className: "grid grid-cols-3 gap-2 mb-4",
        children: slots.map((slot) => {
          const isBlocked = readyBookings.includes(slot);
          return /* @__PURE__ */ taro.jsx(taro.Button, {
            disabled: isBlocked,
            onClick: () => {
              setFromTime(slot);
              setToTime("");
            },
            className: `rounded text-xs p-1 ${isBlocked ? "bg-gray-300 text-red-500 line-through" : "bg-gray-100 hovercbg-blue-200"} ${fromTime === slot ? "bg-green-600 text-white" : ""}`,
            children: vendors.dayjs(slot).format("HH:mm")
          }, `from-${slot}`);
        })
      }), fromTime && /* @__PURE__ */ taro.jsxs(taro.Fragment, {
        children: [/* @__PURE__ */ taro.jsx(taro.Text, {
          className: "text-lg font-bold mb-2 block",
          children: "To"
        }), /* @__PURE__ */ taro.jsx(taro.View, {
          className: "grid grid-cols-3 gap-2 mb-4",
          children: slots.map((slot) => {
            const isBlocked = readyBookings.includes(slot);
            const isBeforeFrom = vendors.dayjs(slot).isBefore(vendors.dayjs(fromTime));
            const isSameAsFrom = slot === fromTime;
            const disabled = isBlocked || isBeforeFrom || isSameAsFrom;
            return /* @__PURE__ */ taro.jsx(taro.Button, {
              disabled,
              onClick: () => setToTime(slot),
              className: `rounded text-xs p-1 ${disabled ? "bg-gray-300 text-gray-400" : "bg-gray-100 hovercbg-blue-200"} ${toTime === slot ? "bg-green-600 text-white" : ""}`,
              children: vendors.dayjs(slot).format("HH:mm")
            }, `to-${slot}`);
          })
        })]
      })]
    }), fromTime && toTime && /* @__PURE__ */ taro.jsx(taro.View, {
      className: "mt-4",
      children: /* @__PURE__ */ taro.jsx(taro.Button, {
        className: "bg-green-600 text-white rounded p-2 w-full",
        onClick: handleSubmit,
        children: "Submit Time Span"
      })
    }), savedTimeSpan && /* @__PURE__ */ taro.jsxs(taro.Text, {
      className: "mt-6 block font-medium text-center text-green-700",
      children: ["✅ Saved: ", vendors.dayjs(savedTimeSpan.from).format("HH:mm"), " →", " ", vendors.dayjs(savedTimeSpan.to).format("HH:mm"), " on", " ", vendors.dayjs(savedTimeSpan.from).format("YYYY-MM-DD")]
    })]
  });
};
function Book_Venue() {
  const [venueData, setVenueData] = taro.useState(null);
  const {
    id
  } = taro.Taro.useRouter().params;
  const getVenue = () => __async(this, null, function* () {
    const venue = yield common.getSingleVenue(id);
    setVenueData(venue);
  });
  taro.useEffect(() => {
    getVenue();
  }, []);
  return /* @__PURE__ */ taro.jsx(common.Layout, {
    children: venueData && /* @__PURE__ */ taro.jsxs(taro.View, {
      className: "size-full flex flex-col items-center justify-center gap-5",
      children: [/* @__PURE__ */ taro.jsx(taro.Text, {
        className: "text-3xl font-semibold text-center",
        children: venueData.name
      }), /* @__PURE__ */ taro.jsx(taro.View, {
        className: "size-auto container mx-auto",
        children: /* @__PURE__ */ taro.jsx(taro.Image, {
          className: "rounded-lg object-contain",
          src: common.imageBaseUrl + `${venueData.id}/` + venueData.photo
        })
      }), /* @__PURE__ */ taro.jsxs(taro.View, {
        className: "size-full flex items-center justify-center flex-col",
        children: [/* @__PURE__ */ taro.jsx(taro.Text, {
          className: "font-medium",
          children: "Pick your date & time"
        }), venueData !== null && /* @__PURE__ */ taro.jsx(CalendarTimeSpanPicker, {
          bookedSlots: venueData.expand.booking
        })]
      })]
    })
  });
}
var config = {
  "navigationBarTitleText": "Sport Venue Booker"
};
Page(taro.createPageConfig(Book_Venue, "pages/book_venue/index", {
  root: {
    cn: []
  }
}, config || {}));
//# sourceMappingURL=index.js.map
