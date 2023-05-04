import React, { useState } from 'react'
import { SafeAreaView, Text, View, Pressable, ScrollView } from 'react-native';
import tw from "twrnc";
import { styled } from 'nativewind';
import AddTask from '../Componets/TaskScreen/TaskScreen/AddTask';
import { color } from '../MyCodes/Colors';




export default function WelcomePage({ navigation }) {
  const [showAddTask, setShowAddTasks] = useState(true)
  const toggleShowStats = () => { setShowAddTasks(!showAddTask) }
  const StyledView = styled(View)
  //"353531","ec4e20","ff9505","016fb9","000000"]
  const [tasks, setTasks] = useState([])

  console.log(tasks)





  return (
    <View style={tw`bg-[#${color[4]}] h-full`}>
      <SafeAreaView>

        {showAddTask && <AddTask
          toggleShowStats={toggleShowStats}
          setTasks={setTasks}

        />}


        <StyledView style={tw`w-[390px] m-auto`}>
          <View style={tw`h-52 w-[90%] bg-[#${color[0]}] p-2 m-auto rounded`}>
            <View style={tw`bg-[#${color[4]}] relative overflow-hidden rounded-3xl w-[90%] h-12 mx-auto`}>
              <View style={tw`bg-[#${color[2]}] h-full w-[50%] relative`}>
                <View style={tw`flex-row justify-center items-center  bg-black h-[80%] top-1 left-2 absolute w-72 m-auto rounded-3xl`}>
                  <Text style={tw`text-white font-bold`}>Name</Text>
                </View>
              </View>
            </View>
            <StyledView style={tw`flex-row gap-4 mx-4 my-2`} className={'gap-4'}>
              <View style={tw`rounded-full h-20 w-20 bg-[#${color[2]}]`}>

              </View>
              <StyledView className={''} style={tw`flex-row`} >
                <StyledView style={tw`w-20`} className={'gap-2'}>
                  <Text style={tw`font-bold text-[#${color[2]}]`}>Gold</Text>
                  <Text style={tw`font-bold text-[#${color[4]}]`}>LV</Text>
                  <Text style={tw`font-bold text-[#${color[2]}]`}>Daily Tasks</Text>
                </StyledView>
                <StyledView style={tw``} className={'gap-2'}>
                  <Text style={tw`font-bold text-[#${color[2]}]`}>1234</Text>
                  <Text style={tw`font-bold text-[#${color[4]}]`}>26</Text>
                  <Text style={tw`font-bold text-[#${color[2]}]`}>3/5</Text>
                </StyledView>
              </StyledView>
            </StyledView>


            <View style={tw`bg-[#${color[1]}] h-6 w-24 absolute bottom-0 rounded right-0`}>
              <Text style={tw`m-auto`}>Date</Text>
            </View>
          </View>


          <StyledView style={tw`flex-row justify-center p-4 gap-4`} className={`gap-4`}>
            <Pressable onPress={toggleShowStats} style={tw`h-16 w-[80%] bg-[#016fb9] rounded-full`}>
              <Text style={tw`font-bold text-[#${color[2]}] m-auto text-2xl`}>Add Task</Text>

            </Pressable>

          </StyledView>

          <ScrollView className={''} style={tw`h-89 overflow- w-full rounded bg-[#${color[0]}] m-auto`}>
            {tasks.map(task => {
              return (
                <View key={task.task} style={tw`bg-[#${color[2]}] m-2 h-20 p-4 rounded items-center justify-between flex-row`}>
                  <Text style={tw`font-bold text-lg`}>Task</Text>
                  <Text style={tw`font-bold text-2xl`}>255 <Text style={tw`text-sm`}>XP</Text></Text>
                  <Pressable style={tw`h-12 w-12 rounded-full bg-[#${color[0]}]`}>{ }</Pressable>

                </View>
              )
            })}

          </ScrollView>

        </StyledView>


        <View style={tw`w-full h-24 flex-row `}>
          {color.map(box => { return (<View key={box} style={tw`m-auto bg-[#${box}] flex-row border h-20 w-20`}></View>) })}

        </View>

      </SafeAreaView>
    </View >

  )
}



