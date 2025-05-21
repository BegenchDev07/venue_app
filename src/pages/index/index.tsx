import { View, Text } from '@tarojs/components';
import Layout from '../../components/Layout';
import VenueCard from '../../components/VenueCard';
import { useState, useEffect } from 'react';
import {AuthUser, createUser, getVenues, imageBaseUrl} from '../../../utils'
import Taro from '@tarojs/taro';

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [venueList, setVenueList] = useState<any>(null);


  const loginLogic = async () => {
    try {
      const { userInfo } = await Taro.getUserProfile({
        desc: 'Please provide credentials',
      });
      const state :any = await AuthUser({email: userInfo.nickName + '@mail.com', password:'123456'})
      console.log(state);
      if(state !== false && state !== undefined){
        Taro.setStorageSync('user',state);
        setIsLoggedIn(true);
        return true;
      } else {
        const user : any = await createUser({email: userInfo.nickName + '@mail.com', password:'123456', name: userInfo.nickName})
        if(user !== false && user !== undefined){
          Taro.setStorageSync('user',state);
          setIsLoggedIn(true);
          return true;
        } else{
          throw Error;

        }
      }
    } catch (err) {
      Taro.showToast({ title: 'Error getting user data', icon: 'none' });
      console.log(err);
      return false;
    }
  };

  const checkForUser = () => {
    const user = Taro.getStorageSync('user');
    if (user) {
      setIsLoggedIn(true);
    } else {
      // If not logged in, show the login modal
      Taro.showModal({
        title: 'Login',
        content: 'Please log in to use the app!',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        success: async (res) => {
          if (res.confirm) {
            const result = await loginLogic();
            if (result) {
              console.log('User successfully logged in!');
            }
          } else {
            Taro.showToast({ title: 'Login canceled!', icon: 'none' });
            console.log('User canceled login');
          }
        },
      });
    }
  };

  const pullVenues = async() => {
    if(Taro.getStorageSync('user')){
      const venueList = await getVenues();
      setVenueList(venueList)
    }
  }

  useEffect(() => {
    checkForUser();
  }, []);
  useEffect(()=>{
    pullVenues();
  },[isLoggedIn])

  return (
    <>
        {
          !isLoggedIn
          ? (
            <View className='size-screen flex items-center justify-center'>
              <Text className='relative text-center top-1/2'>Logging in...</Text>
            </View>
          )
          : (
              <Layout>
                <View className="min-h-screen flex flex-col">
                  <View className="flex flex-col p-4">
                    <Text className="text-2xl font-bold mb-4">Welcome to Venue Booker</Text>
                    <View>
                    {venueList?.map((venue) => (
                      <VenueCard
                        key={venue.id}
                        title={venue.name}
                        image={imageBaseUrl + `${venue.id}/`  + venue.photo}
                        id={venue.id}
                      />
                    ))}
                    </View>
                  </View>
                </View>
              </Layout>
            )
        }
    </>
  );
}
