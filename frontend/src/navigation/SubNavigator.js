import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, ScrollView, StyleSheet, Image, ImageBackground, Pressable } from 'react-native';
import MenuScreen from '../screens/MenuScreen';
import AddSub from '../screens/AddSub';
import AddToCart from '../screens/AddToCart';


const Stack = createNativeStackNavigator();

const SubNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <Stack.Screen name="menuscreen" 
            component={MenuScreen}  
            options={() => ({
                    headerShown: false,
                })}/>
            <Stack.Screen name="addsub" component={AddSub} />
            <Stack.Screen name="addtocart" component={AddToCart} />

           

        </Stack.Navigator>
    );
}
export default SubNavigator;

