import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons
import MenuScreen from '../screens/MenuScreen';
import AddToCart from '../screens/AddToCart';
import SubNavigator from './SubNavigator';


const Tab = createBottomTabNavigator();

export default BottomNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Menu') {
                        iconName = "fast-food-outline";
                    } else if (route.name === 'Cart') {
                        iconName = "cart-outline";
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerStyle: {
                    backgroundColor: '#c72b62', // Use the same color for consistency or a different one if you prefer
                  },
                headerTintColor:'white',
                tabBarActiveTintColor: '#c72b62',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Menu" component={SubNavigator} />
            <Tab.Screen name="Cart" component={AddToCart} />
        </Tab.Navigator>
    );
}

