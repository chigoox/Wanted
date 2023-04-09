import { SafeAreaView, Text, View, Image, Pressable, } from 'react-native';
import React, { useState } from 'react'
import tw from "twrnc";
import Stats from '../Componets/Stats';




export default function WelcomePage({ navigation }) {
  const [showStats, setShowStats] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const toggleShowStats = () => {
    setShowStats(!showStats)

  }
  const toggleLogin = () => { setShowLogin(!showLogin) }





  const navigate = (to) => { navigation.navigate(to) }

  //"353531","ec4e20","ff9505","016fb9","000000"]


  return (
    <View style={tw`bg-[#272838] h-full`}>
      <SafeAreaView>
        <Stats toggleShowStats={toggleShowStats} showStats={showStats} />
        <View style={tw`border top-8 h-96 bg-[#F3DE8A] rounded`}>

        </View>



      </SafeAreaView>
    </View >

  )
}



