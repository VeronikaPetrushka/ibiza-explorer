import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground, ScrollView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from "react-native-linear-gradient";
import WelcomeModal from "./WelcomeModal.jsx";
import UserProfile from "./UserProfile.jsx";
import SettingsModal from "./SettingsModal.jsx";
import TutorialModal from "./TutorialModal.jsx";
import places from "../constants/places.js";
import Icons from "./Icons.jsx";

const { height , width} = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();
    const [welcomeModalVisible, setWelcomeModalVisible] = useState(true);
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
    
    const handleWelcomeVisible = () => {
        setWelcomeModalVisible(!welcomeModalVisible);
    };

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
        // <ImageBackground source={require('../assets/newDiz/back.png')} style={{ flex: 1 }}>
        <View style={styles.container}>

            <View style={styles.upperPanel}>
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

            <TouchableOpacity style={styles.tutorialBtn} onPress={handleTutorialVisible}>
                <LinearGradient
                            colors={['#cdacf2', '#e6d5f8']}
                            
                            start={{ x: -0.15, y: 0.5 }}
                            end={{ x: 1.1, y: 0.5 }}
                            style={[styles.gradient]}
                        >
                    <Text style={styles.tutorialText}>Tutorial</Text>
                </LinearGradient>
            </TouchableOpacity>

            <View style={styles.bottomPanel}>
                <TouchableOpacity style={styles.adviceBtn} onPress={() => navigation.navigate('AchievementsScreen')}>
                    <LinearGradient
                            colors={['#9044e3', '#b582ec']}
                            start={{ x: -0.15, y: 0.5 }}
                            end={{ x: 1.1, y: 0.5 }}
                            style={[styles.gradient]}
                        >
                        <Text style={styles.btnText}>Achievements</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.scoreBtn} onPress={() => navigation.navigate('RouteScreen')}>
                    <LinearGradient
                            colors={['#b582ec', '#9044e3']}
                            start={{ x: -0.15, y: 0.5 }}
                            end={{ x: 1.1, y: 0.5 }}
                            style={[styles.gradient]}
                        >
                        <Text style={styles.btnText}>Route</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <View style={styles.placesContainer}>
                <ScrollView style={{width: '100%', height: '69%'}}>
                    {places.map((place, index) => (
                        <View key={index} style={styles.place}>
                            <Image source={place.image} style={styles.placeImage} />
                            <Text style={styles.placeName}>{place.name}</Text>
                            <TouchableOpacity style={styles.detailsBtn} onPress={() => navigation.navigate('DetailsScreen', { place: place })}>
                                <Text style={styles.detailsBtnText}>Details</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>


            <UserProfile visible={profileModalVisible} onClose={handleProfileVisible} />
            <SettingsModal visible={settingsModalVisible} onClose={handleSettingsVisible} />
            <WelcomeModal visible={welcomeModalVisible} onClose={handleWelcomeVisible}/>
            <TutorialModal visible={tutorialModalVisible} onClose={handleTutorialVisible}/>

        </View>
        // </ImageBackground>
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
        backgroundColor: '#e3effa'
    },

    upperPanel: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flexDirection: 'row',
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
        color: '#8430e0'
    },

    quizIcon: {
        width: 60,
        height: 60,
        position: 'absolute',
        top: 5,
        left: 10,
        zIndex: 15
    },

    tutorialBtn: {
        width: '100%',
        height: height * 0.075,
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 14,
        overflow: 'hidden',
        marginBottom: height * 0.02,
        marginTop: height * 0.03,
    },

    tutorialText: {
        fontSize: 19,
        fontWeight: '900',
        color: '#6926b3'
    },

    gradient: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        flexDirection: 'row',
    },

    bottomPanel: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    adviceBtn: {
        width: '48%',
        height: height * 0.065,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 14,
        overflow: 'hidden',
    },

    scoreBtn: {
        width: '48%',
        height: height * 0.065,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
    },

    btnText: {
        fontSize: 17,
        color: '#fff',
        fontWeight: '800'
    },

    placesContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: height * 0.03
    },

    place: {
        width: '100%',
        alignItems: 'center',
        marginBottom: height * 0.03
    },

    placeImage: {
        width: '100%',
        height: height * 0.25,
        resizeMode: 'cover',
        borderRadius: 14,
        marginBottom: height * 0.015
    },

    placeName: {
        fontSize: 19,
        fontWeight: '900',
        color: '#4f1c86',
        marginBottom: height * 0.01
    },

    detailsBtn: {
        width: '100%',
        padding: 7,
        backgroundColor: '#9044e3',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    detailsBtnText: {
        fontSize: 17,
        color: '#fff',
        fontWeight: '800'
    }
});

export default Home;