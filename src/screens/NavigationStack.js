import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import Chat from './Chat';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import { useContext, useEffect, useState } from 'react';
import { AuthenticationUserContext } from '../context';

const Stack = createStackNavigator();

const ChatStack = () => {
   return (
      <Stack.Navigator screenOptions={{
         headerTitleAlign: 'center',
         cardStyle: {backgroundColor: 'white'},
         headerStyle: {
            borderBottomColor: 'lightgray',
            borderBottomWidth: 2,
            shadowColor: 'orange',
            elevation: 10,
         },
         headerTitleStyle: { color: 'orange', fontSize: 35 }
      }}>
         <Stack.Screen name='Home' component={Home} />
         <Stack.Screen name='Chat' component={Chat} />
      </Stack.Navigator>
   )
}

const AuthStack = () => {

   return (
      <Stack.Navigator screenOptions={{headerShown: false}} defaultScreenOptions='Login'>
         <Stack.Screen name='Login' component={Login} />
         <Stack.Screen name='Signup' component={Signup} />
      </Stack.Navigator>
   )
}


const NavigationStack = () => {
  const { user, setUser } = useContext(AuthenticationUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, 
         async authenticatedUser => {
            authenticatedUser ? setUser(authenticatedUser) : setUser(null);
            setLoading(false)
         }
      )
      return () => {
         unsubscribe();
      }
   }, [user]);
  
   if (loading) {
      return (
         <View className=' rgba(0, 0, 0, 0) flex-1 justify-center items-center'>
            <ActivityIndicator size={'large'} />
         </View>
      );
   }
  return (
   <NavigationContainer>
      {
         user ? <ChatStack /> : <AuthStack />
      }
   </NavigationContainer>
  )
}

export default NavigationStack;