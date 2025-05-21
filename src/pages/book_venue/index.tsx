import { View, Text, Image } from "@tarojs/components"
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { getSingleVenue, imageBaseUrl } from "../../../utils";
import Layout from "../../components/Layout";
import CalendarTimePicker from "../../components/CalendarTimePicker";


export default function Book_Venue() {
  const [venueData, setVenueData] = useState<any>(null)
  // const [bookings, setBookings] = useState<any>([]);
  const {id} :any = Taro.useRouter().params

  const getVenue = async() => {
    const venue = await getSingleVenue(id)
    setVenueData(venue)
    // const readyBookings:any = venue.expand.booking?.map(({fromTime, toTime}) => [fromTime, toTime]).flat()
    // setBookings(readyBookings)
  }

  useEffect(()=>{
    getVenue();
  },[])
  return(
    <Layout>
    {
      venueData
      &&
      <View className="size-full flex flex-col items-center justify-center gap-5">
        <Text className="text-3xl font-semibold text-center">{venueData.name}</Text>
        <View className="size-auto container mx-auto">
          <Image className="rounded-lg object-contain" src={imageBaseUrl + `${venueData.id}/`  + venueData.photo}/>
        </View>
        <View className="size-full flex items-center justify-center flex-col">
          <Text className="font-medium">
            Pick your date & time
          </Text>
            {
              venueData !== null
              &&
              <CalendarTimePicker bookedSlots={venueData.expand.booking}/>
            }
        </View>
      </View>
    }
    </Layout>
  )
}
