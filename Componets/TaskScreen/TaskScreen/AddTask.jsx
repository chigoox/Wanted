import { Pressable, TextInput, View, Text } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import tw from "twrnc";
import { styled } from 'nativewind';
import { color } from '../../../MyCodes/Colors';
import { addUserInfoToDatabase, getRand, handleInput5 } from '../../../MyCodes/ed5';
import { LoggedInUserContext } from '../../../App';



const AddTask = ({ toggleShowStats, setTasks }) => {
    const StyledView = styled(View)
    const [Task, setTask] = useState()
    const [difficulty, setDifficulty] = useState()
    const [LoggedInUser, setLoggedInUser] = useContext(LoggedInUserContext)
    const multiplier = (difficulty == 'Easy') ? 1 : (difficulty == 'Regular') ? 5 : (difficulty == 'Hard') ? 10 : 1
    const [goldReward, setGoldReward] = useState(getRand(multiplier >= 5 ? multiplier : multiplier + 1))
    const [expReward, setExpReward] = useState(getRand(10) * multiplier + (3 * multiplier))


    const selectDifficulty = (name) => {
        setDifficulty({ [name]: true })
    }

    const AddTask = (loop) => {
        addUserInfoToDatabase({
            Task: {
                allTasks: {
                    [Task]: { task: Task, difficulty: Object.keys(difficulty)[0], repeate: loop ? loop : false, goldReward: goldReward, expReward: expReward }
                }
            },

        }, LoggedInUser.uid)
        /* setTasks(oldTask => {
            return ({ ...oldTask, [Task]: { task: Task, difficulty: Object.keys(difficulty)[0], repeate: loop ? loop : false } })
        }) */

        setTimeout(() => {
            toggleShowStats()
        }, 250);
    }

    useEffect(() => { }, [])


    return (
        <View style={tw`w-full h-full absolute z-10 p-4`}>
            <View className={'shadow'} style={tw`h-100 relative w-90 bg-black mt-20 border-2 shadow-black border-[#${color[2]}]`}>
                <Pressable onPress={toggleShowStats} style={({ pressed }) => [{ backgroundColor: pressed ? `#${color[1]}` : `#${color[2]}`, }, tw`absolute right-0 top-0 z-10 w-14 rounded-bl-2xl h-14`]}>
                    <Text style={tw`font-bold text-4xl m-auto`}>X</Text>

                </Pressable>




                <View style={tw` w-full h-10`}>
                    <Text style={tw`font-bold text-2xl text-[#${color[2]}] text-center`}>Add Task</Text>
                    <View style={tw`p-4 h-50 w-full mt-8`}>
                        <TextInput key={'test'} style={tw`p-2 bg-white w-full h-12 font-bold text-3xl`}
                            onChangeText={(text) => { setTask(text) }}
                            defaultValue={Task}
                        />
                        {Task && <StyledView className={''} style={tw`items-center justify-between  h-40 w-full mt-5`}>
                            <Pressable onPress={() => { selectDifficulty('Easy') }} id={'Easy'} style={tw`${difficulty?.Easy ? `bg-[#${color[2]}]` : `bg-[#${color[0]}]`} h-12 w-3/4 rounded `}>
                                <Text style={tw`text-white font-bold m-auto`}>Easy</Text>
                            </Pressable>
                            <Pressable onPress={() => { selectDifficulty('Regular') }} id={'Regular'} style={tw`${difficulty?.Regular ? `bg-[#${color[2]}]` : `bg-[#${color[0]}]`} h-12 w-3/4 rounded `}>
                                <Text style={tw`text-white font-bold m-auto`}>Regular</Text>
                            </Pressable>
                            <Pressable onPress={() => { selectDifficulty('Hard') }} id={'Hard'} style={tw`${difficulty?.Hard ? `bg-[#${color[2]}]` : `bg-[#${color[0]}]`} h-12 w-3/4 rounded `}>
                                <Text style={tw`text-white font-bold m-auto`}>Hard</Text>
                            </Pressable>
                        </StyledView>}

                        {difficulty && <StyledView className={''} style={tw`flex-row justify-around w-full my-5`}>
                            <Pressable onPress={() => { AddTask(true) }} style={({ pressed }) => [
                                { backgroundColor: pressed ? 'white' : `#${color[3]}`, }, tw`h-12 rounded w-32`]}>
                                <Text style={tw`text-white font-bold m-auto`}>Add Recurring</Text>
                            </Pressable>
                            <Pressable onPress={() => { AddTask() }} style={({ pressed }) => [
                                { backgroundColor: pressed ? 'white' : `#${color[3]}`, }, tw`h-12 rounded w-32`]}>
                                <Text style={tw`text-white font-bold m-auto`}>Add One-time</Text>
                            </Pressable>
                        </StyledView>}

                    </View>
                </View>
            </View>

        </View>
    )
}

export default AddTask