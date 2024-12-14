import React, { useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MusicProvider } from './src/constants/music';
import MusicPlayer from './src/components/MusicPlayer';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import AlbumScreen from './src/screens/AlbumScreen';
import CheckInScreen from './src/screens/CheckInScreen';
import AchievementsScreen from './src/screens/AchievementsScreen';
import RouteScreen from './src/screens/RouteScreen';
import PlacesScreen from './src/screens/PlacesScreen';
import WelcomeModal from './src/components/WelcomeModal';

enableScreens();

const Stack = createStackNavigator();


const App = () => {
    const [welcomeModalVisible, setWelcomeModalVisible] = useState(true);

    const handleWelcomeVisible = () => {
        setWelcomeModalVisible(!welcomeModalVisible);
    };
  
    return (
        <MusicProvider>
            <MusicPlayer />
            <NavigationContainer>
                    <WelcomeModal visible={welcomeModalVisible} onClose={handleWelcomeVisible}/>
                    <Stack.Navigator initialRouteName="HomeScreen">
                        <Stack.Screen 
                            name="HomeScreen" 
                            component={HomeScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="DetailsScreen" 
                            component={DetailsScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="AlbumScreen" 
                            component={AlbumScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="CheckInScreen" 
                            component={CheckInScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="AchievementsScreen" 
                            component={AchievementsScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="RouteScreen" 
                            component={RouteScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="PlacesScreen" 
                            component={PlacesScreen} 
                            options={{ headerShown: false }} 
                        />
                    </Stack.Navigator>
            </NavigationContainer>
        </MusicProvider>
    );
};

export default App;
