import { View, Text, TouchableOpacity } from 'react-native';
import React, {
  useState, useCallback, useLayoutEffect, useEffect
} from 'react';
import {
  collection, addDoc, orderBy, query, onSnapshot
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import { Feather } from '@expo/vector-icons';
import avatar from '../../assets/avatar.jpg';


const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => handleSignOut()}>
          <Feather name='log-out' size={34} color='gray' />
        </TouchableOpacity>
      )
    })
  }, [navigation]);

  useLayoutEffect(() => {
    // console.log('Snapshot');
    const collectionRef = collection(database, 'chats');
    const querySnapshot = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(querySnapshot, (ref) => {
      console.log('Snapshot');
      setMessages(
        ref.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt,
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unsubscribe;
  }, [])


  const handleSend = useCallback(messages => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, 'chats'), { _id, createdAt, text, user })

  }, []);
  return ( 
    <GiftedChat
      messages={messages}
      onSend={(messages) => handleSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        avatar: avatar,
      }}
    />
  )
}

export default Chat