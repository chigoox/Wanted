import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, Text, View, Pressable, ScrollView, TextInput } from 'react-native';
import tw from "twrnc";
import { styled } from 'nativewind';
import { color } from '../MyCodes/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DeleteTask, addUserInfoToDatabase, fetchDocument, getCurrentDate, getDay, getRand, shuffle } from '../MyCodes/ed5';
import { LoggedInUserContext } from '../App';
import TaskItemDaily from '../Componets/DailyPage/TaskItemDaily';
import CompleteTask from '../Componets/DailyPage/CompleteTask';
const DailyTasks = () => {
    const [userInfo, setUserInfo] = useState()
    const [taskToUpdated, setTaskToUpdated] = useState()
    const [showAddTask, setShowAddTask] = useState()
    const toggleShowTask = () => { setShowAddTask(!showAddTask) }
    const [showCompleteTask, setShowCompleteTask] = useState(false)
    const toggleTaskComplete = () => { setShowCompleteTask(!showCompleteTask) }
    const exp = userInfo ? userInfo.stats.exp : 0
    const nextExp = userInfo ? userInfo.stats.nextExp : 0
    const [LoggedInUser, setLoggedInUser] = useContext(LoggedInUserContext)
    const currentDay = getDay()
    const currentTask = userInfo?.Task ? userInfo?.Task.currentTask : []
    const [refreshPAGE, setRefreshPAGE] = useState(false)
    function refresh(pagereload) {
        if (pagereload) {
            fetchDocument('Users', LoggedInUser.uid, setUserInfo)
        }
        setTimeout(() => {
            addUserInfoToDatabase({
                LastDayOnline: 999

            }, LoggedInUser.uid)
            setRefreshPAGE(!refreshPAGE)
        }, 1000);

    }
    useEffect(() => {
        fetchDocument('Users', LoggedInUser.uid, setUserInfo)
        let triggerRefresh = true
        for (let index = 0; index < userInfo?.Task.currentTask.length; index++) {
            const tasks = userInfo?.Task.currentTask[index];
            if (tasks.task != undefined) triggerRefresh = false
            if (triggerRefresh) checkTodaysTask()

        }
    }, [showAddTask, showCompleteTask])

    const getTodaysTask = () => {
        const allTasks = userInfo?.Task ? Object.values(userInfo.Task.allTasks) : []
        shuffle(allTasks)
        const todayTask = [{ ...allTasks[0], expReward: allTasks[0]?.expReward + getRand(5), goldReward: allTasks[0]?.goldReward + getRand(5) },
        { ...allTasks[1], expReward: allTasks[1]?.expReward + getRand(5), goldReward: allTasks[1]?.goldReward + getRand(5) },
        { ...allTasks[2], expReward: allTasks[2]?.expReward + getRand(5), goldReward: allTasks[2]?.goldReward + getRand(5) }
        ]
        return (todayTask)
    }

    const checkTodaysTask = () => {
        const todayTask = getTodaysTask()
        if ((todayTask[0].task != undefined) && (todayTask[1].task != undefined) && (todayTask[2].task != undefined)) {
            addUserInfoToDatabase({
                LastDayOnline: currentDay,
                Task: { currentTask: todayTask },
                stats: { doneToday: 0 }

            }, LoggedInUser.uid)
        } else {
            fetchDocument('Users', LoggedInUser.uid, setUserInfo)
            setTimeout(() => {
                checkTodaysTask()
            }, 1000);



        }
    }

    setTimeout(() => {
        if (userInfo?.LastDayOnline != currentDay) {
            checkTodaysTask()

        }
    }, 1000)
    const checkLevelUP = () => {
        console.log(userInfo)
        if (userInfo?.stats.exp >= userInfo?.stats.nextExp) {
            addUserInfoToDatabase({
                stats: {
                    exp: userInfo.stats.exp - userInfo.stats.exp,
                    level: userInfo.stats.level + 1,
                    nextExp: userInfo.stats.nextExp + 10 ** 2 + userInfo.stats.exp
                },


            }, LoggedInUser.uid)
        }

    }

    const updateTask = (index) => {
        const allTasks = userInfo?.Task.currentTask
        const todayTask = allTasks.filter((item, _index) => {
            return _index !== index
        })

        if (!userInfo?.Task.currentTask[index]?.repeate) DeleteTask(LoggedInUser, `${userInfo?.Task.currentTask[index]?.task}`)
        addUserInfoToDatabase({
            LastDayOnline: currentDay,
            Task: { currentTask: todayTask },


        }, LoggedInUser.uid)
        checkLevelUP()
        toggleShowTask()


        addUserInfoToDatabase({
            stats: {
                exp: userInfo.stats.exp + taskToUpdated.xp,
                gold: userInfo.stats.gold + taskToUpdated.gold,
                jobsDone: userInfo.stats.jobsDone + 1,
                doneToday: userInfo.stats.doneToday >= 3 ? 3 : userInfo.stats.doneToday + 1
            }

        }, LoggedInUser.uid)
    }

    const TaskHandle = ({ taskToUpdated, toggleShowTask, toggleTaskComplete }) => {
        return (
            <View style={tw`absolute flex justify-center z-10 h-full w-full ]}]`}>
                <View style={tw`h-[30%] relative p-4 w-full bg-black text-white border-2 border-[#${color[2]}] shadow shadow-black`}>
                    <Pressable onPress={toggleShowTask} style={tw`absolute top-0 right-0 bg-[#${color[1]}] h-8 w-8 rounded-bl-2xl`}></Pressable>
                    <Text style={tw`font-bold text-white text-lg text-center`}>{taskToUpdated.task}</Text>
                    <View style={tw`flex-row justify-around mt-4`}>
                        <Pressable style={tw`h-10 w-32 bg-[#${color[1]}]`}>
                            <Text style={tw`m-auto font-bold`}>List Task</Text>
                        </Pressable>
                        <Pressable onPress={toggleTaskComplete} style={tw`h-10 w-32 bg-[#${color[3]}]`}>
                            <Text style={tw`m-auto font-bold `}>Complete Task</Text>
                        </Pressable>
                    </View>
                    <View style={tw`px-5 py-4 flex-row justify-between`}>
                        <Text style={tw`text-[#${color[2]}] font-bold`}>Reward:</Text>
                        <Text style={tw`text-[#${color[2]}] text-base`}>Gold: {taskToUpdated.gold}</Text>
                        <Text style={tw`text-[#${color[2]}] text-base`}>XP: {taskToUpdated.xp}</Text>
                    </View>
                    <View style={tw`px-5 flex-row justify-between bg-[#${color[0]}]`}>
                        <Text style={tw`text-[#${color[2]}] font-bold`}>List Fee:</Text>
                        <Text style={tw`text-[#${color[2]}] text-base]`}>Gold: 3</Text>
                    </View>
                </View>

            </View >
        )
    }


    return (
        <View style={tw`bg-[#${color[4]}] h-full w-full`}>
            <SafeAreaView style={tw`relative`}>

                {showAddTask && <TaskHandle toggleShowTask={toggleShowTask} taskToUpdated={taskToUpdated} toggleTaskComplete={toggleTaskComplete} />}
                {showCompleteTask && <CompleteTask toggleTaskComplete={toggleTaskComplete} updateTask={updateTask} taskToUpdated={taskToUpdated} />}
                <View style={tw`flex-row items-center justify-center  border-white p-2`}>
                    <Text style={tw`text-4xl text-white`}>Daily</Text>
                    <Text style={tw`text-2xl text-[#${color[2]}]`}>{getCurrentDate()}</Text>
                    <Pressable onPress={() => { refresh(true) }} style={tw`mx-4 h-8 w-8 rounded-full bg-white`}>
                        <Ionicons name={'refresh'} size={32} color={'orange'} />
                    </Pressable>
                </View>

                <ScrollView style={tw`bg-[#${color[0]}] h-74  rounded-b-2xl`}>
                    {currentTask?.map((task, index) => {
                        return (

                            <TaskItemDaily
                                key={index}
                                task={task.task}
                                difficulty={task.difficulty}
                                repeate={task.repeate}
                                expReward={task.expReward}
                                goldReward={task.goldReward}
                                setTaskToUpdated={setTaskToUpdated}
                                toggleShowTask={toggleShowTask}
                                index={index}
                            />

                        )
                    })}
                </ScrollView>
                <View style={tw`m-4`}>
                    <Text style={tw`text-white text-2xl font-bold text-center`}>Today's Progress</Text>
                    <View>
                        <View style={tw`flex-row justify-between p-4`}>
                            <Text style={tw`text-white text-lg`}>Task Complete</Text>
                            <Text style={tw`text-white text-lg`}>{userInfo ? userInfo.stats.doneToday : 0}/3</Text>
                        </View>
                        <View style={tw`bg-[#${color[3]}] h-6 overflow-hidden`}>
                            <View style={tw`h-full w-[${userInfo ? userInfo.stats.doneToday * 30 + 1 : 1}] bg-[#${color[1]}]`}></View>
                        </View>
                    </View>
                    <View>
                        <Text style={tw`text-white text-2xl font-bold text-center mt-4`}>user</Text>
                        <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-white text-2xl font-bold`}>Lv</Text>
                            <Text style={tw`text-white text-2xl font-bold`}>{userInfo ? userInfo.stats.level : 0}</Text>
                        </View>
                        <View style={tw`bg-[#${color[3]}] h-8 overflow-hidden`}>
                            <View className={'border-y'} style={tw`h-full relative w-[${Math.round((exp / nextExp) * 100)}] flex-row items-center  border-[#${color[2]}] bg-[#${color[1]}]`}>
                                <Text className={''} style={tw`font-bold bottom-1 p-2 text-black text-right w-full text-xl`}>
                                    XP - {Math.round(((exp / nextExp) * 100))}%
                                </Text>
                            </View>
                        </View>
                        <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-white text-lg font-bold`}>JD</Text>
                            <Text style={tw`text-white text-lg font-bold`}>{userInfo ? userInfo.stats.jobsDone : 0}</Text>
                        </View>

                    </View>

                </View>
            </SafeAreaView >
        </View >
    )
}

export default DailyTasks
