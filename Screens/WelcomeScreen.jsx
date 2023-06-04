import React, { useState } from 'react'
import { SafeAreaView, Text, View, Pressable, ScrollView, TextInput } from 'react-native';
import tw from "twrnc";
import { styled } from 'nativewind';
import { color } from '../MyCodes/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from 'firebase/auth';
import ToastManager, { Toast } from 'toastify-react-native'
import RegisterPage from './RegisterPage'


const WelcomeScreen = () => {

    const [showRegister, setShowRegister] = useState(false)
    const toggleShowRegister = () => { setShowRegister(!showRegister) }
    const StyledView = styled(View)
    const StyledScrollView = styled(ScrollView)



    const LoginOptions = () => {
        const [loginInfo, setLoginInfo] = useState()
        const login = (email, password) => {

            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(user)
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log()
                    Toast.info(errorMessage.match(/[^/]*$/))

                });

        }
        return (
            <View>
                <View style={tw`flex-row items-center`} className={'gap-2'}>
                    <Ionicons name={'person'} size={32} color={'white'} />
                    <TextInput key={'test'} style={tw`rounded-sm my-2 p-2 bg-white w-[80%] h-12 font-bold text-3xl`}
                        onChangeText={(text) => {
                            setLoginInfo(
                                (old) => {
                                    return ({
                                        ...old, user: text
                                    })
                                }
                            )
                        }}
                        value={loginInfo?.user}
                        placeholder={'Email'}
                        selectTextOnFocus={false}
                    />
                </View>
                <View style={tw`flex-row items-center`} className={'gap-2'}>
                    <Ionicons name={'key'} size={32} color={'white'} />
                    <TextInput key={'test'} style={tw`rounded-sm my-2 p-2 bg-white w-[80%] h-12 font-bold text-3xl`}
                        onChangeText={(text) => {
                            setLoginInfo(
                                (old) => {
                                    return ({
                                        ...old, pass: text
                                    })
                                }
                            )
                        }}
                        value={loginInfo?.pass}
                        placeholder={'Password'}
                        selectTextOnFocus={false}
                    />
                </View>

                <Pressable onPress={() => { login(loginInfo?.user, loginInfo?.pass) }} style={({ pressed }) => [
                    { backgroundColor: pressed ? 'white' : `#${color[3]}`, }, tw`h-14 w-full bg-[#${color[2]}] rounded-full`]}>
                    <Text style={tw`font-bold text-3xl text-center m-auto`}>Login</Text>
                </Pressable>
            </View>
        )
    }
    const onChange = (text) => {
        setLoginInfo(text)
    }








    return (
        <View style={tw`bg-[#${color[4]}] h-full w-full`}>
            <SafeAreaView>
                {showRegister && <RegisterPage toggleShowRegister={toggleShowRegister} />}
                <Text style={tw`text-5xl font-bold z-1 text-center text-[#${color[0]}]`}>Taski</Text>
                <ToastManager width={375} height={60} style={tw`bg-black top-20`} />

                <StyledView className={'border-x-2'} style={tw`h-full  w-2  z-0  border-[#${color[2]}] m-auto`}></StyledView>
                <StyledView className={''} style={tw`absolute  h-full w-full bg-[#${color[2]}]`}>
                </StyledView>
                <StyledView className={''} style={tw`absolute top-65  h-full w-full  `}>
                    <View className={'shadow-sm'} style={tw`bg-[#${color[3]}] rounded p-4 h-full w-full m-auto shadow-black`}>
                        <LoginOptions />

                        <Pressable style={tw``}>
                            <Text style={tw`font-bold text-white text-lg text-center m-auto`}>Forgot password?</Text>
                        </Pressable>
                        <View style={tw`flex-row m-auto`}>
                            <Text style={tw`text-white text-lg`}>Don't have an account yet?</Text>
                            <Pressable onPress={toggleShowRegister} style={tw``}>
                                <Text style={tw`font-bold text-[#${color[2]}] text-lg text-center m-auto`}> Sign up.</Text>
                            </Pressable>
                        </View>


                    </View>
                </StyledView>



            </SafeAreaView>
        </View >

    )
}



export default WelcomeScreen

