import { Pressable, TextInput, View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import tw from "twrnc";
import { styled } from 'nativewind';
import { color } from '../../../MyCodes/Colors';



const UpdateTask = ({ toggleShowUpdateTask, setTasks, taskToUpdated }) => {
    const StyledView = styled(View)
    const [Task, setTask] = useState(taskToUpdated.task)
    const [difficulty, setDifficulty] = useState({ [taskToUpdated.difficulty]: true })

    const selectDifficulty = (name) => {
        setDifficulty({ [name]: true })
    }
    console.log(Task)

    const AddTask = (loop) => {
        setTasks(oldTask => {
            return ({ ...oldTask, [taskToUpdated.task]: { task: Task, difficulty: Object.keys(difficulty)[0], repeate: loop ? loop : false } })
        })
        toggleShowUpdateTask()
    }

    useEffect(() => { }, [])

    const deleteTask = () => {
        setTasks(oldTask => {
            console.log(oldTask)
            const deleteTaskX = Object.keys(oldTask)
                .filter(key => !key.includes(`${Task}`))
                .reduce((obj, key) => {
                    obj[key] = oldTask[key];
                    return obj;
                }, {});

            console.log(deleteTaskX)
            return (
                deleteTaskX
            )
        })
        toggleShowUpdateTask()
    }


    return (
        <View style={tw`w-full h-full absolute z-10 p-4`}>
            <View className={'shadow'} style={tw`h-100 relative w-90 bg-black m-auto border-2 shadow-black border-[#${color[2]}]`}>
                <Pressable onPress={toggleShowUpdateTask} style={({ pressed }) => [{ backgroundColor: pressed ? `#${color[1]}` : `#${color[2]}`, }, tw`absolute right-0 top-0 z-10 w-14 rounded-bl-2xl h-14`]}>
                    <Text style={tw`font-bold text-4xl m-auto`}>X</Text>
                </Pressable>




                <View style={tw` w-full h-10`}>
                    <Text style={tw`font-bold text-2xl text-[#${color[2]}] text-center`}>Update Task</Text>
                    <View style={tw`p-4 h-50 w-full mt-8`}>
                        <View style={tw`flex-row`}>
                            <TextInput key={'test'} style={tw`p-2 bg-white w-3/4 h-12 font-bold text-3xl`}
                                onChangeText={(text) => { setTask(text) }}
                                defaultValue={Task}
                                editable={false}
                                selectTextOnFocus={false}
                            />
                            <Pressable onPress={deleteTask} style={tw`bg-[#${color[1]}] h-12 w-12 ml-4 rounded`}>
                                <Text></Text>
                            </Pressable>
                        </View>
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
                                <Text style={tw`text-white font-bold m-auto`}>Make Recurring</Text>
                            </Pressable>
                            <Pressable onPress={() => { AddTask() }} style={({ pressed }) => [
                                { backgroundColor: pressed ? 'white' : `#${color[3]}`, }, tw`h-12 rounded w-32`]}>
                                <Text style={tw`text-white font-bold m-auto`}>Make One-time</Text>
                            </Pressable>
                        </StyledView>}

                    </View>
                </View>
            </View>

        </View>
    )
}

export default UpdateTask