import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import VerifyScreen from '../screens/VerifyScreen';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen name="landing" component={LandingScreen} />
        <Stack.Screen name="login" component={LoginScreen}/>
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="verification" component={VerifyScreen} />
    </Stack.Navigator>
)
export default AuthNavigator;
