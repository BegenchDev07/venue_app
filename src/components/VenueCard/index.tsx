import { View, Text, Image, Navigator } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'

interface CardData {
  title: string
  image: string
  id: string
}

const VenueCard: React.FC<CardData> = ({ title, image, id }) => {
  const navigateTo = (path:any) => {
    Taro.navigateTo({
      url:path
    })
  }

  return (
    <View className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
    <Navigator
    // href="#"
    >
      <Image className="rounded-t-lg w-full h-48 object-cover" src={image} />
    </Navigator>
    <View className="p-5">
      <View onClick={_=>navigateTo(`/pages/book_venue/index?id=${id}`)}>
        <Text className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</Text>
      </View>
      <View onClick={_=>navigateTo(`/pages/book_venue/index?id=${id}`)}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
        View Venue
      </View>
    </View>
  </View>  )
}

export default VenueCard
