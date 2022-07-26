import 'react-native-gesture-handler';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import NewGraou from './screens/NewGraou';
import GraouScreen from './screens/GraouScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import SearchScreen from "./screens/SearchScreen";
import NotificationsScreen from "./screens/NotificationsScreen"
import {AuthContext, AuthProvider} from "./context/AuthProvider";
import {useContext, useEffect, useState} from "react";
import LoginScreen from "./screens/Auth/LoginScreen"
import RegisterScreen from "./screens/Auth/RegisterScreen";

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true, headerBackTitleVisible: false}}>
            <Stack.Screen name="Tab" component={TabNavigator} options={{headerShown: false}}/>
            <Stack.Screen name="New Graou" component={NewGraou} options={{title: ''}}/>
            <Stack.Screen name="Graou Screen" component={GraouScreen} options={{title: ''}}/>
            <Stack.Screen name="Profile Screen" component={ProfileScreen} options={{title: ''}}/>
        </Stack.Navigator>
    )
}

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false, headerBackTitleVisible: false}}>
            <Stack.Screen name="Login Screen" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register Screen" component={RegisterScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false
        }}>
            <Tab.Screen name="Home1"
                        component={HomeScreen}
                        options={{
                            tabBarIcon: ({color, size}) => (
                                <Ionicons name="home" size={size} color={color}/>
                            )
                        }}
            />
            <Tab.Screen name="Search"
                        component={SearchScreen}
                        options={{
                            tabBarIcon: ({color, size}) => (
                                <Ionicons name="search" size={size} color={color}/>
                            )
                        }}
            />
            <Tab.Screen name="Notifications"
                        component={NotificationsScreen}
                        options={{
                            tabBarIcon: ({color, size}) => (
                                <Ionicons name="notifications" size={size} color={color}/>
                            )
                        }}/>
        </Tab.Navigator>
    )
}

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const {user, setUser} = useContext(AuthContext);

    useEffect(() => {
        // check if user is logged in or not.
        // Check SecureStore for the user object/token
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
    }, []);

    if (isLoading) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="gray"/>
            </View>
        );
    }

    return (
        <>
            {user ? (
                <NavigationContainer>
                    <Drawer.Navigator initialRouteName="Home" screenOptions={{
                        headerShown: true
                    }}>
                        <Drawer.Screen name="Home" component={HomeStackNavigator}/>
                        <Drawer.Screen name="Settings" component={SettingsScreen}/>
                    </Drawer.Navigator>
                </NavigationContainer>
            ) : (
                <NavigationContainer>
                    <AuthStackNavigator/>
                </NavigationContainer>

            )}
        </>
    );
}