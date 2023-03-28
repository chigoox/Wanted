import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import WelcomePage from './Screens/WelcomePage'





const Tab = createBottomTabNavigator();
function HomeScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home" tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={WelcomePage} />

    </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeScreen">
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}



function Icons(props) {
  return (
    <View className={'mx-auto h-20'}>
      <Ionicons name={props.name} size={32} color={'white'} />
    </View>
  )

}


function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View className={'absolute bottom-0 bg-slate-100 h-20 w-full p-1 flex flex-row justify-around rounded-t-[40rem]'} >
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

        const bg = isFocused ? "bg-pink-300" : "bg-pink-200"

        return (

          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={label}
            className={`${bg} rounded-full flex h-14 w-14 hover:bottom-10 p-2`}
          >
            <Icons key={label} name={label == 'Shop' ? "pricetag" : label == 'About' ? "information-circle" : label == 'Appointment' ? 'today' : "cart"} />

          </TouchableOpacity>
        );
      })}
    </View>
  );
}










