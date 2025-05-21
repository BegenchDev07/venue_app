import { View, Text, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'

export const BottomMenu = () => {
  const navigateTo = (path:any) => {
    const pages :any = Taro.getCurrentPages();

    if(path.slice(1) !== pages?.at(-1).route){
      Taro.navigateTo({
        url:path
      })
    }
  }

  return (
    <View className="fixed bottom-0 left-0 right-0 bg-slate-300 shadow flex justify-around items-center h-16 z-50 border-t">
      <View className="fixed bottom-3 left-0 w-full border-t border-gray-200 flex items-center justify-around py-2 z-50">
      <Navigator className="flex items-center px-4 py-2 bg-blue-600 rounded-lg" onClick={_=>navigateTo('/pages/index/index')}>
        <Text className="text-sm text-white">Home</Text>
      </Navigator>
      <Navigator className="flex items-center px-4 py-2 bg-blue-600 rounded-lg" onClick={_=>navigateTo('/pages/bookings/index')}>
        <Text className="text-sm text-white">Bookings</Text>
      </Navigator>
      <Navigator className="flex items-center px-4 py-2 bg-blue-600 rounded-lg" onClick={_=>navigateTo('/pages/user/index')}>
        <Text className="text-sm text-white">Profile</Text>
      </Navigator>
    </View>
    </View>
  )
}
