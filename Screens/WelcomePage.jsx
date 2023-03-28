import { SafeAreaView, Text, View, Image, Pressable, } from 'react-native';
import React, { useState } from 'react'
import Animated, { ZoomInEasyDown, FadeInUp } from 'react-native-reanimated';




export default function WelcomePage({ navigation }) {
  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const toggleSignUp = () => { setShowSignUp(!showSignUp) }
  const toggleLogin = () => { setShowLogin(!showLogin) }


  const navigate = (to) => { navigation.navigate(to) }


  return (
    <Animated.View entering={ZoomInEasyDown} exiting={FadeInUp} className='relative h-full bg-black '>
      <SafeAreaView className={'z-10'}>


      </SafeAreaView>

    </Animated.View>

  )
}

