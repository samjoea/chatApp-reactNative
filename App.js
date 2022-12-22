import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthUserProvider } from './src/context';
import NavigationStack from './src/screens/NavigationStack';

const App = () => {
  return (
    <SafeAreaView className=' h-full px-1'>
      {/* <StatusBar /> */}
      <AuthUserProvider>
        <NavigationStack />
      </AuthUserProvider>
    </SafeAreaView>
  );
}

export default App;