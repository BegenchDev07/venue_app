import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { BookingCards } from "../../components/BookingCards"
import Layout from "../../components/Layout";
import { getBookings } from "../../../utils";



export default function Bookings () {
  const {record} = Taro.getStorageSync('user')
  const [bookingData, setBookingData] = useState<any>([]);
  const viewBaseUrl = 'https://pocket.moodymymood.space/api/files/pbc_1087969960/'
  const pullVenue = async() => {
    const bookings = await getBookings(record?.id);
    console.log(bookings);
    setBookingData(bookings)
  }

  const renderData = () => {
    if(bookingData.length !== 0){
      return (
        bookingData.map((data) => (
          <BookingCards id={data.id} fromTime={data.fromTime} toTime={data.toTime} photo={viewBaseUrl+`${data.id}/`+data.venuePhoto} venueName={data.venueName} />
        ))
      )
    }
    else {
      return(
        <Text className="text-3xl font-semibold">
          Empty !
        </Text>
      )
    }

  }

  useEffect(()=>{
    pullVenue()
  },[])
  return (
    <Layout>
      <View className="size-full flex flex-col items-center justify-center">
        <Text className="text-center w-full font-semibold text-2xl pb-10">
          Bookings
        </Text>
        <View className="flex flex-col p-4">
        {
          renderData()
        }
        </View>
      </View>
    </Layout>
  )
}
