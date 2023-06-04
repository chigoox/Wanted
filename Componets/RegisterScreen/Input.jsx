import { View, Text, TextInput } from 'react-native'
import React from 'react'
import tw from "twrnc";
import Ionicons from '@expo/vector-icons/Ionicons';


const Input = ({ iconName, value, placeholder, name, setRegisterInfo }) => {

    const onChange = (text) => {
        setRegisterInfo((old) => {
            return (
                {
                    ...old,
                    [name]: text
                }
            )
        })


    }
    return (
        <View style={tw`flex-row items-center`} className={'gap-2'}>
            <Ionicons name={iconName} size={32} color={'white'} />
            <TextInput style={tw`rounded-sm my-2 p-2 bg-white w-[80%] h-12 font-bold text-3xl`}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
                selectTextOnFocus={false}
                name={name}
            />
        </View>
    )
}

export default Input