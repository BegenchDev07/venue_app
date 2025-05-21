import { ReactNode } from 'react'
import { BottomMenu } from '../BottomMenu'
import { View } from '@tarojs/components'

export default function Layout ({children} : {children: ReactNode}) {
  return(
    <View className='min-h-screen relative'>
      <View className='pb-14'>
        {children}
      </View>
      <BottomMenu/>
    </View>
  )
}
