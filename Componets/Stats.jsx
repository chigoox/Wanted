import { View, Text } from 'react-native'
import React from 'react'
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import tw from 'twrnc';


const Stats = ({ toggleShowStats, showStats }) => {
    const StatsExpands = useAnimatedStyle(() => {
        return ({
            height: withTiming(showStats ? 240 : 128, {
                duration: 1000,
                easing: Easing.inOut(Easing.exp),

            }),
            width: withTiming(showStats ? 240 : 128, {
                duration: 1000,
                easing: Easing.inOut(Easing.exp),

            })
        })
    })
    const ShrinkText = useAnimatedStyle(() => {
        return ({

            fontSize: withTiming(showStats ? 24 : 14, {
                duration: 1000,
                easing: Easing.inOut(Easing.exp),

            }),
            transform: [
                {
                    translateY: withTiming(showStats ? -10 : 0, {
                        duration: 2000,
                        easing: Easing.inOut(Easing.exp),
                    })
                }
            ]
        })
    })
    const showText = useAnimatedStyle(() => {
        return ({
            transform: [{ scale: 1 }],
            opacity: withTiming(showStats ? 100 : 0, {
                duration: 1000,
                easing: Easing.inOut(Easing.exp),
            }),
            fontSize: withTiming(showStats ? 5 : 0, {
                duration: 2000,
                easing: Easing.inOut(Easing.exp),
            }),
            height: withTiming(showStats ? 10 : 0, {
                duration: 2000,
                easing: Easing.inOut(Easing.exp),
            }),

            transform: [
                {
                    translateY: withTiming(showStats ? -10 : 0, {
                        duration: 2000,
                        easing: Easing.inOut(Easing.exp),
                    })
                }
            ]
        })
    })
    const box = useAnimatedStyle(() => {
        return ({
            opacity: withTiming(showStats ? 100 : 0, {
                duration: 1000,
                easing: Easing.inOut(Easing.exp),
            }),
            height: withTiming(showStats ? 24 : 0, {
                duration: 500,
                easing: Easing.inOut(Easing.exp),
            }),

            transform: [
                {
                    translateY: withTiming(showStats ? 4 : 0, {
                        duration: 2000,
                        easing: Easing.inOut(Easing.exp),
                    })
                }
            ]
        })
    })

    return (
        <Pressable onPress={toggleShowStats} style={[tw`w-32 h-32  absolute shadow-lg shadow-black -top-12 -left-12 z-99999 rounded-full`]}>
            <Animated.View style={[tw`w-full h-full flex items-center justify-end overflow-hidden left-9 top-5 border-8 rounded-full bg-[#272838]`, StatsExpands]}>
                <View style={tw`h-[50%] w-1/2 relative left-6 rounded-full`}>
                    <View style={tw`absolute   h-10`}>
                        <Animated.Text style={[tw` font-bold text-[#F9F8F8] -mb-1`, showText]}>Name</Animated.Text>
                        <Animated.Text style={[tw` font-bold text-[#F9F8F8]`, ShrinkText]}>G100</Animated.Text>
                        <Animated.Text style={[tw` font-bold text-[#F9F8F8]`, ShrinkText]}>Lv 99</Animated.Text>
                        <Animated.Text style={[tw` font-bold text-[#F9F8F8] `, showText]}>Jobs 3</Animated.Text>
                    </View>
                    <Animated.View style={[tw`bg-black rounded-full  w- h-12 relative top-7`, box]}></Animated.View>



                </View>
            </Animated.View>
        </Pressable>
    )
}

export default Stats