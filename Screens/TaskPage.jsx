import React, { useState } from 'react'
import { SafeAreaView, Text, View, Pressable, ScrollView } from 'react-native';
import tw from "twrnc";
import { styled } from 'nativewind';
import AddTask from '../Componets/TaskScreen/TaskScreen/AddTask';
import { color } from '../MyCodes/Colors';
import TaskItem from '../Componets/TaskItem';
import UpdateTask from '../Componets/TaskScreen/TaskScreen/UpdateTask';
import ToastManager, { Toast } from 'toastify-react-native'




export default function TaskPage({ navigation }) {
  const [showAddTask, setShowAddTasks] = useState(false)
  const toggleShowStats = () => { setShowAddTasks(!showAddTask) }
  const StyledView = styled(View)
  const StyledScrollView = styled(ScrollView)
  //"353531","ec4e20","ff9505","016fb9","000000"]
  const [tasks, setTasks] = useState({})
  const [taskToUpdated, setTaskToUpdated] = useState({})
  const [showUpdateTask, setShowUpdateTask] = useState(false)
  const toggleShowUpdateTask = () => { setShowUpdateTask(!showUpdateTask) }




  return (
    <View style={tw`bg-[#${color[4]}] h-full`}>
      <SafeAreaView>

        {showAddTask && <AddTask
          toggleShowStats={toggleShowStats}
          setTasks={setTasks}

        />}
        {showUpdateTask && <UpdateTask
          toggleShowUpdateTask={toggleShowUpdateTask}
          setTasks={setTasks}
          taskToUpdated={taskToUpdated}

        />}


        <StyledView style={tw`w-[390px] m-auto`}>



          <StyledView style={tw`flex-row justify-center p-4 gap-4`} className={`gap-4`}>
            <Pressable onPress={toggleShowStats} style={tw`h-16 w-[80%] bg-[#016fb9] rounded-full`}>
              <Text style={tw`font-bold text-[#${color[2]}] m-auto text-2xl`}>Add Task</Text>

            </Pressable>

          </StyledView>

          <StyledScrollView className={'pb-24'} style={tw`h-fit w-full rounded bg-[#${color[0]}] m-auto mb-16`}>
            {Object.values(tasks ? tasks : []).map(task => {
              return (
                <TaskItem
                  key={task.task}
                  task={task.task}
                  difficulty={task.difficulty}
                  repeate={task.repeate}
                  setTaskToUpdated={setTaskToUpdated}
                  toggleShowUpdateTask={toggleShowUpdateTask}
                />
              )
            })}

          </StyledScrollView>

        </StyledView>


        {/*  <View style={tw`w-full h-24 flex-row `}>
          {color.map(box => { return (<View key={box} style={tw`m-auto bg-[#${box}] flex-row border h-20 w-20`}></View>) })}

        </View> */}

      </SafeAreaView>
    </View >

  )
}



