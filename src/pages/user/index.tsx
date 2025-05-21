import { View, Text } from "@tarojs/components"
import Layout from '../../components/Layout'
import Taro from "@tarojs/taro"


export default function User () {
  const {record} = Taro.getStorageSync('user')
  console.log(record);

  return(
    <Layout>
      <View className="w-full flex items-center justify-center pb-10">
        <Text className="text-xl font-semibold">User page</Text>
      </View>
      <View className="w-full flex flex-col items-center justify-start gap-5">
        <View className="px-5 flex gap-3">
          <Text className="font-semibold">
            Username:
          </Text>
          <Text>
            {record.name}
          </Text>
        </View>
        <View className="px-5 flex gap-3">
          <Text className="font-semibold">
            Email:
          </Text>
          <Text>
            {record.email}
          </Text>
        </View>
        <View className="px-5 flex gap-3">
          <Text className="font-semibold">
            ID:
          </Text>
          <Text>
            {record.id}
          </Text>
        </View>
        <View className="px-5 flex gap-3">
          <Text className="font-semibold">
            Avatar:
          </Text>
          <Text>
            {record.avatar}
          </Text>
        </View>
      </View>
    </Layout>
  )
}
