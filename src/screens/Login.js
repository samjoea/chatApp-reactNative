import { View, Text, TouchableOpacity, TextInput, Image, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import img from '../../assets/backImage.png';
import Constants from 'expo-constants';

const Login = ({ navigation }) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleLogin = async () => {
      if (email && password) {
         try { 
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful")
         } catch (error) {
            console.log(error);
         }
      }
   }
   return (
      <View className=' flex-1'>
      <Image source={img} className=' top-0 w-full h-[340px] resize-[cover]'/>
      <View className=' bg-white absolute h-[75%] px-[10%] w-full bottom-0 rounded-tl-[60px]'>
         <View className=' w-full items-center mt-[10%] space-y-8 h-full '>
            <Text className=' text-4xl text-amber-400 font-bold'>Login</Text>
            <TextInput
               placeholder='Enter Email'
               autoCapitalize='none'
               keyboardType='email-address'
               // autoFocus={true}
               value={email}
               onChangeText={(text) => setEmail(text)}
               className=' w-full h-[58px] rounded-[10px] pl-[20px] text-gray-500 font-bold bg-[#F6F7F8]'
            />

            <TextInput
               placeholder='Enter password'
               autoCapitalize='none'
               secureTextEntry={true}
               value={password}
               autoCorrect={false}
               onChangeText={(text) => setPassword(text)}
               className=' w-full h-[58px] pl-[20px] font-bold text-gray-500 rounded-[10px] bg-[#F6F7F8]'
            />
            {/* Button */}
            <TouchableOpacity className=' bg-[#f57c00] justify-center items-center rounded-[10px] w-full h-[58px]'>
               <Text className=' font-bold text-gray-50 text-lg'>Log In</Text>
            </TouchableOpacity>
            <View className=' flex-row'>
               <Text className=' text-gray-400 font-bold'>Don't have an account? </Text>
               <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text className=' text-amber-400 font-bold'>Sign Up</Text>
               </TouchableOpacity>
            </View>
         </View>
      </View>
    </View>
  )
}

export default Login