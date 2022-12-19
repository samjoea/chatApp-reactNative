import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'


const AuthenticationUserContext = createContext();

const AuthUserProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   return (
      <AuthenticationUserContext.Provider value={{user, setUser}}>
         { children }
      </AuthenticationUserContext.Provider>
   );
}


export { AuthUserProvider, AuthenticationUserContext };