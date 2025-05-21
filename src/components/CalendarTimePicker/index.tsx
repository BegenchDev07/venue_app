import { View, Text, Button } from '@tarojs/components'
import React,{ useState } from 'react'
import dayjs from 'dayjs'
import Taro from '@tarojs/taro'
import { createBooking } from '../../../utils'

// const bookedSlots = [
//   '2025-05-11T15:00',
//   '2025-05-11T16:30',
//   '2025-05-12T10:00',
// ]

interface SpanPicker {
  bookedSlots: Array<string>
}

const generateTimeSlots = (date: string) => {
  const slots: string[] = []
  for (let hour = 8; hour <= 18; hour++) {
    for (let minute of [0, 30]) {
      const time = `${dayjs(date).format('YYYY-MM-DD')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
      slots.push(time)
    }
  }
  return slots
}

const CalendarTimeSpanPicker: React.FC<SpanPicker> = ({bookedSlots}) => {
  const today = dayjs()
  const [selectedDate, setSelectedDate] = useState('')
  const [fromTime, setFromTime] = useState('')
  const [toTime, setToTime] = useState('')
  const [savedTimeSpan, setSavedTimeSpan] = useState<{ from: string; to: string } | null>(null)
  const {id} :any = Taro.useRouter().params
  const readyBookings:any = bookedSlots?.map(({fromTime, toTime}:any) => [fromTime, toTime]).flat() || []
  const oldIDs :any = bookedSlots?.flatMap(({id}:any) => [id]) || []
  // console.log(readyBookings, ' / ', bookedSlots);
  console.log(oldIDs);

  const days = Array.from({ length: 7 }, (_, i) =>
    today.add(i, 'day').format('YYYY-MM-DD')
  )

  const handleDateSelect = (date: string) => {
    console.log(date)

    setSelectedDate(date)
  }

  const handleSubmit = () => {
    if (fromTime && toTime) {
      console.log(fromTime,'-',toTime);
      setSavedTimeSpan({ from: fromTime, to: toTime })
      const {record} = Taro.getStorageSync('user')
      const result = createBooking({fromTime,toTime, venueID:id, bookingID:oldIDs, userID: record?.id})
      Promise.resolve(result).then((res) => {
        if(res){
          Taro.showToast({title: 'Booking success !', icon:'none'})
        }
      })

    }
  }

  const slots = selectedDate ? generateTimeSlots(selectedDate) : []

  return (
    <View className="p-4">
      <Text className="text-lg font-bold mb-2 block">Pick a Date</Text>
      <View className="grid grid-cols-4 gap-2 mb-4">
        {days.map(date => (
          <Button
            key={date}
            onClick={() => handleDateSelect(date)}
            className={`rounded text-sm p-1 ${
              selectedDate === date ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            {dayjs(date).format('MM/DD')}
          </Button>
        ))}
      </View>

      {selectedDate && (
        <>
          <Text className="text-lg font-bold mt-4 mb-2 block">From</Text>
          <View className="grid grid-cols-3 gap-2 mb-4">
            {slots.map(slot => {
              const isBlocked = readyBookings.includes(slot)
              return (
                <Button
                  key={`from-${slot}`}
                  disabled={isBlocked}
                  onClick={() => {
                    setFromTime(slot)
                    setToTime('')
                  }}
                  className={`rounded text-xs p-1 ${
                    isBlocked
                      ? 'bg-gray-300 text-red-500 line-through'
                      : 'bg-gray-100 hover:bg-blue-200'
                  } ${fromTime === slot ? 'bg-green-600 text-white' : ''}`}
                >
                  {dayjs(slot).format('HH:mm')}
                </Button>
              )
            })}
          </View>

          {fromTime && (
            <>
              <Text className="text-lg font-bold mb-2 block">To</Text>
              <View className="grid grid-cols-3 gap-2 mb-4">
                {slots.map(slot => {
                  const isBlocked = readyBookings.includes(slot)
                  const isBeforeFrom = dayjs(slot).isBefore(dayjs(fromTime))
                  const isSameAsFrom = slot === fromTime
                  const disabled = isBlocked || isBeforeFrom || isSameAsFrom

                  return (
                    <Button
                      key={`to-${slot}`}
                      disabled={disabled}
                      onClick={() => setToTime(slot)}
                      className={`rounded text-xs p-1 ${
                        disabled
                          ? 'bg-gray-300 text-gray-400'
                          : 'bg-gray-100 hover:bg-blue-200'
                      } ${toTime === slot ? 'bg-green-600 text-white' : ''}`}
                    >
                      {dayjs(slot).format('HH:mm')}
                    </Button>
                  )
                })}
              </View>
            </>
          )}
        </>
      )}

      {fromTime && toTime && (
        <View className="mt-4">
          <Button
            className="bg-green-600 text-white rounded p-2 w-full"
            onClick={handleSubmit}
          >
            Submit Time Span
          </Button>
        </View>
      )}

      {savedTimeSpan && (
        <Text className="mt-6 block font-medium text-center text-green-700">
          ✅ Saved: {dayjs(savedTimeSpan.from).format('HH:mm')} →{' '}
          {dayjs(savedTimeSpan.to).format('HH:mm')} on{' '}
          {dayjs(savedTimeSpan.from).format('YYYY-MM-DD')}
        </Text>
      )}
    </View>
  )
}

export default CalendarTimeSpanPicker
