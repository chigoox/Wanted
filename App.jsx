import React, { createContext, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import TaskPage from './Screens/TaskPage'
import tw from 'twrnc';
import WelcomeScreen from './Screens/WelcomeScreen';
import DailyTasks from './Screens/DailyTasks';
import { ToastProvider } from 'react-native-toast-notifications'
import { getDay } from './MyCodes/ed5';

export const LoggedInUserContext = createContext({}, () => { });

const Tab = createBottomTabNavigator();
function HomeScreen() {


  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Daily" tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Task" component={TaskPage} />
      <Tab.Screen name='Daily' component={DailyTasks} />

    </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator();
export default function App() {
  const [LoggedInUser, setLoggedInUser] = useState('test')
  return (
    <ToastProvider>
      <LoggedInUserContext.Provider value={[LoggedInUser, setLoggedInUser]}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="WelcomeScreen">
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />


          </Stack.Navigator>
        </NavigationContainer>
      </LoggedInUserContext.Provider>
    </ToastProvider>
  );
}



function Icons(props) {
  return (
    <View style={tw``}>
      <Ionicons name={props.name} size={32} color={'white'} />
    </View>
  )

}


function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={tw`absolute bottom-0  h-20 w-full p-1 flex bg-[#7E7F9A] flex-row justify-around rounded-t-[40rem]`} >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const bg = isFocused ? "bg-[#272838]" : "bg-[#7E7F9A]"

        return (

          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={label}
            style={tw`${bg} rounded-full flex justify-center items-center h-14 w-14 hover:bottom-10`}
          >
            <Icons key={label} name={label == 'Shop' ? "pricetag" : label == 'About' ? "information-circle" : label == 'Daily' ? 'planet-outline' : "clipboard-outline"} />

          </TouchableOpacity>
        );
      })}
    </View>
  );
}










