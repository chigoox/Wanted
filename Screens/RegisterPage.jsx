import { SafeAreaView, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import tw from "twrnc";
import { color } from '../MyCodes/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Input from '../Componets/RegisterScreen/Input';


const RegisterPage = ({ toggleShowRegister }) => {
    const [registerInfo, setRegisterInfo] = useState()



    const RegisterOptions = () => {
        const login = (email, password) => { }



        return (
            <View style={tw``}>
                <Text style={tw`font-bold text-2xl text-center text-white`}>Register</Text>
                <Input setRegisterInfo={setRegisterInfo} iconName={'finger-print'} placeholder={'User'} name={'user'} />
                <Input setRegisterInfo={setRegisterInfo} iconName={'key'} placeholder={'password'} name={'pass1'} />
                <Input setRegisterInfo={setRegisterInfo} iconName={'key'} placeholder={'Password '} name={'pass2'} />
                <Input setRegisterInfo={setRegisterInfo} iconName={'mail'} placeholder={'Email'} name={'email'} />
                <Pressable style={tw`bg-white h-14 w-3/4 rounded-full m-auto mt-4 bg-[#${color[2]}]`}>
                    <Text style={tw`font-bold  text-3xl m-auto`}>Sign Up</Text>
                </Pressable>
            </View>
        )
    }




    return (
        <View style={tw`bg-[#${color[0]}] absolute top-25 z-100 h-full w-full`}>
            <View style={tw`p-2 mt-12`}>
                <RegisterOptions />
                <Pressable onPress={toggleShowRegister} style={tw`flex-row m-auto mt-72`}>
                    <Ionicons name={'caret-back-outline'} size={32} color={'white'} />
                    <Text style={tw`font-bold text-2xl text-white`}>Back</Text>
                </Pressable>

            </View>
        </View>
    )
}

export default RegisterPage
