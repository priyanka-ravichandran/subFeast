import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import {useState} from 'react';

import AuthNavigator from './src/navigation/AuthNavigator';
import AppLoading from 'expo-app-loading';

const fetchFonts = () => {
  return Font.loadAsync({
    'Roboto-Bold': require('./assets/Roboto-Bold.ttf'),
  });
};
export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }
  return (

      <NavigationContainer>
        <AuthNavigator/>
      </NavigationContainer>
 
  );
}