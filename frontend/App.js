import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useState } from 'react';
import MenuScreen from './src/screens/MenuScreen';

import AuthNavigator from './src/navigation/AuthNavigator';
import AppLoading from 'expo-app-loading';
import SubNavigator from './src/navigation/SubNavigator';
import BottomNavigator from './src/navigation/BottomNavigator';

const fetchFonts = () => {
  return Font.loadAsync({
    'Roboto-Bold': require('./assets/Roboto-Bold.ttf'),
    'Roboto-LightItalic': require('./assets/Roboto-LightItalic.ttf'),
    'Roboto-Medium': require('./assets/Roboto-Medium.ttf'),

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

    ///<MenuScreen/>
    <NavigationContainer>
      <BottomNavigator />
    </NavigationContainer>

  );
}