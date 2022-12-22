import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Home = ({ navigation }) => {

  
  useEffect(() => {
    
    navigation.setOptions({
      headerLeft: () => <FontAwesome5 name='search' size={24} color='lightgray'/>,
      headerRight: () => <FontAwesome5 name='home' size={50} color='lightgray' />,
    })
  
  }, [navigation]);
  
  
  return (
    <View className=' flex-1 justify-end items-end'>
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat')}
        style={
          {
            elevation: 5,
            shadowColor: '#f57c00',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 9,
            shadowRadius: 8
          }
        }
        className=' bg-[#f1d5b8] w-[60px] mb-5 mr-5 h-[60px] items-center justify-center rounded-full'>
      <View
        className='w-[45px] bg-[#f57c00] h-[45px] shadow-inner rounded-full justify-center items-center'>
        <Entypo name='chat' size={25} color='white' />
      </View>
      </TouchableOpacity>
    </View>
  )
}

export default Home;  