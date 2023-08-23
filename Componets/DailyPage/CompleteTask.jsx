import { Text, View, Pressable } from 'react-native';
import tw from "twrnc";
import React, { useState } from 'react'
import { color } from '../../MyCodes/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';


const CompleteTask = ({ toggleTaskComplete, taskToUpdated, updateTask }) => {
    const TaskCompletem = () => {
        updateTask(taskToUpdated.index)



        toggleTaskComplete()
    }
    return (
        <View style={tw`absolute items-center justify-center z-10 h-full w-full`}>
            <View style={tw`bg-[#${color[0]}] p-4 h-32 w-64 rounded shadow-lg shadow-black`}>
                <Text style={tw`text-center font-bold text-xl text-[#${color[2]}]`}>Complete Task?</Text>
                <View style={tw`flex-row top-4`}>
                    <Pressable onPress={toggleTaskComplete} style={tw`border-2 h-12 w-24 m-auto items-center justify-center bg-[#${color[2]}] rounded-lg `}>
                        <Ionicons name={'close'} size={32} color={'red'} />
                    </Pressable>
                    <Pressable onPress={TaskCompletem} style={tw`border-2 h-12 w-24 m-auto items-center justify-center bg-[#${color[2]}] rounded-lg `}>
                        <Ionicons name={'checkmark-done-outline'} size={32} color={'green'} />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default CompleteTask