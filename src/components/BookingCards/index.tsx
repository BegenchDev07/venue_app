import React, { useEffect, useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { deleteBooking } from '../../../utils';
import Taro from '@tarojs/taro';

interface BookingCardsData {
  id:string;
  fromTime: string;
  toTime:string;
  photo:string;
  venueName:string;

}

export const BookingCards:React.FC<BookingCardsData> = ({id, fromTime, toTime, photo, venueName}:any) => {

  const [flag,setFlag] = useState<boolean>(false)


  const removeBooking = (id:any) => {
    const result = deleteBooking(id);
    Promise.resolve(result)
    .then((res:any) => {
      console.log(res);
      if (res){
        Taro.showToast({title:'Delete Success !'})
        Taro.navigateTo({
          url: '/pages/index/index'
        })
      } else {
        Taro.showToast({title:'Problem Deleting !'})
      }
    })
  }


  return (
    <View className="bg-white border border-gray-200 rounded-lg shadow-lg border border-black p-3">
      <View>
        <Image className="rounded-t-lg object-fill w-full" src={photo} />
      </View>
      <View className=" flex flex-col">
        <View>
          <Text className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {venueName}
          </Text>
        </View>
        <Text className="mb-3 font-normal text-gray-700">
          From: {fromTime} - To: {toTime}
        </Text>
        <View className='flex gap-5'>
          <View
            onClick={_=>{removeBooking(id)}}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <Text>Delete</Text>
          </View>
          {/* <View
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <Text>Edit</Text>
          </View> */}
        </View>
      </View>
    </View>
  );
};

