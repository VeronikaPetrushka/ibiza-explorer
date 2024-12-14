import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import UserProfile from "./UserProfile.jsx";
import SettingsModal from "./SettingsModal.jsx";
import TutorialModal from "./TutorialModal.jsx";
import Icons from "./Icons.jsx";

const { height } = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();
    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const [settingsModalVisible, setSettingsModalVisible] = useState(false);
    const [tutorialModalVisible, setTutorialModalVisible] = useState(false);
    const [uploadedImage, setUploadedImage] = useState({ uri: Image.resolveAssetSource(require('../assets/avatar/user.png')).uri });

    const loadAvatar = async () => {
        try {
          const storedImageUri = await AsyncStorage.getItem('uploadedImage');
            
          if (storedImageUri) {
            setUploadedImage(({ uri: storedImageUri }));
        } else {
            setUploadedImage({ uri: Image.resolveAssetSource(require('../assets/avatar/user.png')).uri });
        }
        } catch (error) {
          console.error('Error loading avatar:', error);
        }
      };
    
    useEffect(() => {
        loadAvatar();
    }, []);

    const handleProfileVisible = async () => {
        setProfileModalVisible(!profileModalVisible)
        await loadAvatar();
    }

    const handleSettingsVisible = async () => {
        setSettingsModalVisible(!settingsModalVisible);
        setUploadedImage({ uri: Image.resolveAssetSource(require('../assets/avatar/user.png')).uri });
        await loadAvatar();
    }

    const handleTutorialVisible = () => {
        setTutorialModalVisible(!tutorialModalVisible);
    };

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{ flex: 1 }}>
            <View style={styles.container}>

                <Image source={require('../assets/decor/home.png')} style={styles.image} />

                <View style={styles.upperPanel}>
                    <View style={styles.settingsContainer}>
                        <TouchableOpacity style={[styles.settingsBtn, {borderWidth: 0, borderRadius: 0}]} onPress={handleTutorialVisible}>
                            <Icons type={'tutorial'} />
                        </TouchableOpacity>
                        <Text style={styles.settingsText}>Tutorial</Text>
                    </View>

                    <View style={styles.settingsContainer}>
                        <TouchableOpacity style={styles.settingsBtn} onPress={handleProfileVisible}>
                            <Image 
                                source={uploadedImage} 
                                style={styles.avatarImage}
                            />
                        </TouchableOpacity>
                        <Text style={styles.settingsText}>Profile</Text>
                    </View>

                    <View style={styles.settingsContainer}>
                        <TouchableOpacity style={[styles.settingsBtn, {borderWidth: 0, borderRadius: 0}]} onPress={handleSettingsVisible}>
                            <Icons type={'settings'} />
                        </TouchableOpacity>
                        <Text style={styles.settingsText}>Settings</Text>
                    </View>

                </View>

                <View style={styles.bottomPanel}>

                    <View style={styles.settingsContainer}>
                        <TouchableOpacity style={[styles.settingsBtn, {borderWidth: 0, borderRadius: 0}]} onPress={() => navigation.navigate('AchievementsScreen')}>
                            <Icons type={'achievements'} />
                        </TouchableOpacity>
                        <Text style={styles.settingsText}>Achievements</Text>
                    </View>

                    <View style={styles.settingsContainer}>
                        <TouchableOpacity style={[styles.settingsBtn, {borderWidth: 0, borderRadius: 0}]} onPress={() => navigation.navigate('RouteScreen')}>
                            <Icons type={'route'} />
                        </TouchableOpacity>
                        <Text style={styles.settingsText}>Route</Text>
                    </View>

                    <View style={styles.settingsContainer}>
                        <TouchableOpacity style={[styles.settingsBtn, {borderWidth: 0, borderRadius: 0}]} onPress={() => navigation.navigate('PlacesScreen')}>
                            <Icons type={'places'} />
                        </TouchableOpacity>
                        <Text style={styles.settingsText}>Attractions</Text>
                    </View>

                </View>

                <UserProfile visible={profileModalVisible} onClose={handleProfileVisible} />
                <SettingsModal visible={settingsModalVisible} onClose={handleSettingsVisible} />
                <TutorialModal visible={tutorialModalVisible} onClose={handleTutorialVisible}/>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: height * 0.07,
    },

    image: {
        width: '100%',
        height: height * 0.55,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: height * 0.05
    },

    upperPanel: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginBottom: height * 0.05
    },

    settingsContainer: {
        alignItems: 'center',
        justifyContent:'center'
    },

    settingsBtn: {
        borderRadius: 100,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginBottom: 5,
    },

    avatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    settingsText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#fff'
    },

    quizIcon: {
        width: 60,
        height: 60,
        position: 'absolute',
        top: 5,
        left: 10,
        zIndex: 15
    },

    bottomPanel: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },

    btnText: {
        fontSize: 17,
        color: '#fff',
        fontWeight: '800'
    },});

export default Home;