import React, { useState } from 'react'
import { SafeAreaView, Text, View, Pressable, ScrollView, TextInput } from 'react-native';
import tw from "twrnc";
import { styled } from 'nativewind';
import { color } from '../MyCodes/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import ToastManager, { Toast } from 'toastify-react-native'
import RegisterPage from './RegisterPage'
import ToastMessage from '../MyCodes/Toaster'
import { getCurrentDate } from '../MyCodes/ed5';
const DailyTasks = () => {
    const tempTask = [1, 1, 1]
    const taskComplete = 0
    const exp = 100
    return (
        <View style={tw`bg-[#${color[4]}] h-full w-full`}>
            <SafeAreaView>
                <View style={tw`flex-row items-center justify-center  border-white p-2`}>
                    <Text style={tw`text-4xl text-white`}>Daily</Text>
                    <Text style={tw`text-2xl text-[#${color[2]}]`}>{getCurrentDate()}</Text>
                </View>

                <ScrollView style={tw`bg-[#${color[0]}] h-74  rounded-b-2xl`}>
                    {tempTask.map(item => {
                        return (
                            <View className={'gap-2'} style={tw`h-20 m-2 bg-[#${color[2]}] rounded`}>

                            </View>
                        )
                    })}
                </ScrollView>
                <View style={tw`m-4`}>
                    <Text style={tw`text-white text-2xl font-bold text-center`}>Today's Progress</Text>
                    <View>
                        <View style={tw`flex-row justify-between p-4`}>
                            <Text style={tw`text-white text-lg`}>Task Complete</Text>
                            <Text style={tw`text-white text-lg`}>{taskComplete}/3</Text>
                        </View>
                        <View style={tw`bg-[#${color[1]}] h-6 overflow-hidden`}>
                            <View style={tw`h-full w-[${taskComplete * 30 + 1}] bg-[#${color[0]}]`}></View>
                        </View>
                    </View>
                    <View>
                        <Text style={tw`text-white text-2xl font-bold text-center mt-4`}>user</Text>
                        <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-white text-2xl font-bold`}>Lv</Text>
                            <Text style={tw`text-white text-2xl font-bold`}>1</Text>
                        </View>
                        <View style={tw`bg-[#${color[3]}] h-6 overflow-hidden`}>
                            <View style={tw`h-full w-[${exp / 100}] bg-[#${color[0]}]`}></View>
                        </View>
                        <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-white text-lg font-bold`}>JD</Text>
                            <Text style={tw`text-white text-lg font-bold`}>0</Text>
                        </View>

                    </View>

                </View>
            </SafeAreaView>
        </View>
    )
}

export default DailyTasks