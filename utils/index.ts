import Pocketbase from 'pocketbase';
import Taro from '@tarojs/taro';

export const pb = new Pocketbase('https://pocket.moodymymood.space')
export const imageBaseUrl = 'https://pocket.moodymymood.space/api/files/pbc_1379753955/'



const baseUrl = 'https://pocket.moodymymood.space/api'

export const AuthUser = async({email, password}) => {
  try {
    const login = await Taro.request({
      url: baseUrl + '/collections/users/auth-with-password',
      method: 'POST',
      header:{
        'Content-Type': 'application/json'
      },
      data:{
        identity:email,
        password
      }
    })
    .then(({data, statusCode}:any) => {
      if(statusCode === 200)
        return data
      else{
        return false
      }
    })
    return login;

  } catch (error) {
    debugger;
  }


}

export const createUser = async({email, password, name}) => {
  const auth = await Taro.request({
    url:baseUrl+'/collections/users/records',
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    data: {
      email,
      password,
      name,
      passwordConfirm: password,
    }
  })
  .then(({data, statusCode}) => {
    if(statusCode === 200)
      return data
    else
      return false
  })
  return auth;
}


export const getVenues = async() => {
  return await Taro.request({
    url: baseUrl+'/collections/venues/records?sort=-created',
    method: 'GET',
    header:{
      'Content-Type':'application/json'
    }
  })
  .then(({data, statusCode}) => {
    if(statusCode === 200)
      return data.items
    else
      return false
  })
}


export const createBooking = async ({fromTime, toTime, venueID, bookingID, userID}:any) => {
  return await Taro.request({
    url: baseUrl+`/collections/bookings/records`,
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    data:{
      fromTime,
      toTime,
      userID,
      venue: venueID
    }
  })
  .then(async({data, statusCode}) => {
    if(statusCode === 200){
      return await adjustVenue(data?.id, venueID, bookingID)
    }
  })
}

export const adjustVenue = async(booking:any, id:any, oldBooking) => {
  // debugger;
  return await Taro.request({
    url: baseUrl+`/collections/venues/records/${id}`,
    method : 'PATCH',
    header: {
      'Content-Type': 'application/json'
    },
    data:{
      booking: [...oldBooking,booking]
    }
  })
  .then(({statusCode}) => {
    if(statusCode === 200)
      return true
    else
      return false
  })
}


export const getSingleVenue = async(id:any) => {
  return await Taro.request({
    url: baseUrl+`/collections/venues/records/${id}?expand=booking`,
    method: 'GET',
    header:{
      'Content-Type': 'application/json'
    }
  })
  .then(({data, statusCode}) => {
    console.log(data);
    if(statusCode === 200)
      return data
  })
}

export const getBookings = async(id:any) => {
  const encodedFilter = encodeURIComponent(`(userId='${id}')`)
  return await Taro.request({
    url: baseUrl+`/collections/bookings_on_venues/records?filter=${encodedFilter}`,
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    }
  })
  .then(({data,statusCode}) => {
    if(statusCode === 200)
      return data?.items
    else
      return false
  })
}


export const deleteBooking = async(id:any) => {
  return await Taro.request({
    url: baseUrl + `/collections/bookings/records/${id}`,
    method: 'DELETE',
    header: {
      'Content-Type': 'application/json'
    },
  })
  .then(({statusCode}) => {
    if(statusCode === 204)
      return true
    else
      return false
  })
}
