import { Text, View, Pressable } from 'react-native';
import tw from "twrnc";
import React, { useState } from 'react'
import { color } from '../MyCodes/Colors';
import { getRand } from '../MyCodes/ed5';

const TaskItem = ({ task, difficulty, repeate, toggleShowUpdateTask, setTaskToUpdated }) => {
    const multiplier = (difficulty == 'Easy') ? 1 : (difficulty == 'Regular') ? 5 : (difficulty == 'Hard') ? 10 : 1
    const [goldReward, setGoldReward] = useState(getRand(multiplier >= 5 ? multiplier : multiplier + 1))
    const [expReward, setExpReward] = useState(getRand(10) * multiplier + (3 * multiplier))
    const onPress = () => {
        setTaskToUpdated({ task: task, difficulty: difficulty, repeate: repeate })
        toggleShowUpdateTask()
    }
    return (
        <Pressable onPress={onPress} className={''} style={tw`bg-[#${repeate ? color[2] : color[1]}] m-2  h-20 p-4 rounded items-center justify-between flex-row`}>
            <Text style={tw`font-bold text-lg`}>{task}</Text>
            <View>
                <Text style={tw`font-bold text-2xl`}>{expReward} <Text style={tw`text-sm`}>XP</Text></Text>
                <Text style={tw`font-bold text-2xl text-center`}>{goldReward} <Text style={tw`text-sm`}>GD</Text></Text>
            </View>
            <Text style={tw`text-3xl rounded-full`}>{difficulty?.charAt(0)}</Text>

        </Pressable>
    )


}

export default TaskItem

