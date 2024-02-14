import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from '../screens/MenuScreen';
import AddSub from '../screens/AddSub';




const Stack = createNativeStackNavigator();

const SubNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <Stack.Screen name="menuscreen" component={MenuScreen} />
            <Stack.Screen name="addsub" component={AddSub}/>
        </Stack.Navigator>
    );
}
export default SubNavigator;
