import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Details = ({ place }) => {
    const navigation = useNavigation();
    const [isVisited, setIsVisited] = useState(false);

    useEffect(() => {
        const checkVisitedStatus = async () => {
            try {
                const storedVisitedTrips = await AsyncStorage.getItem('visitedTrips');
                const visitedTripsArray = storedVisitedTrips ? JSON.parse(storedVisitedTrips) : [];
                const visited = visitedTripsArray.some((trip) => trip.place && trip.place.name === place.name);
                setIsVisited(visited);
            } catch (error) {
                Alert.alert('Error', `Could not retrieve visited trips: ${error.message}`);
            }
        };

        checkVisitedStatus();
    }, [place.name]);

    const handleAlbumPress = async () => {
        try {
            const storedVisitedTrips = await AsyncStorage.getItem('visitedTrips');
            const visitedTripsArray = storedVisitedTrips ? JSON.parse(storedVisitedTrips) : [];
    
            const matchingTrip = visitedTripsArray.find(
                (trip) => trip.place && trip.place.name === place.name
            );
    
            if (matchingTrip) {
                navigation.navigate('AlbumScreen', {
                    name: place.name,
                    photos: matchingTrip.images || [],
                });
            } else {
                Alert.alert('No Album', `No album exists for ${place.name}. Check in and add photos first.`);
            }
        } catch (error) {
            Alert.alert('Error', `Could not retrieve album: ${error.message}`);
        }
    };
    

    const handleBackPress = () => {
        navigation.navigate('HomeScreen');
    };
    
    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backIcon} onPress={handleBackPress}>
                    <Icons type={'back'}/>
                </TouchableOpacity>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={{width: 40, height: 40, marginBottom: 20}} onPress={handleAlbumPress}>
                        <Icons type={'album'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: 40, height: 40}} onPress={() => navigation.navigate('CheckInScreen', {place: place})}>
                        <Icons type={'checkin-btn'} />
                    </TouchableOpacity>
                </View>
                <Image source={place.image} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{place.name}</Text>
                    <ScrollView style={{width: '100%', height: height * 0.6}}>
                        <Text style={styles.location}>Location: {place.location}</Text>
                        <Text style={styles.description}>{place.description}</Text>
                        <Text style={styles.fact}>Tourist tip: {place.touristTip}</Text>
                        <View style={{height: 100}}/>
                    </ScrollView>
                </View>
            </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingTop: 0,
        paddingBottom: 10,
    },
    backIcon: {
        width: 60,
        height: 60,
        padding: 10,
        position: 'absolute',
        top: height * 0.04,
        left: 10,
        zIndex: 10,
        transform: [{ rotate: '180deg' }]
    },
    image: {
        width: '100%',
        height: height * 0.35,
        marginBottom: height * 0.02,
        borderBottomLeftRadius: '100%',
        borderBottomRightRadius: '100%',
        resizeMode: 'cover'
    },
    visitedBorder: {
        borderWidth: 3,
        borderColor: '#FFC000',
    },
    btnContainer: {
        position: 'absolute',
        top: height * 0.055,
        right: 15,
        zIndex: 10
    },
    textContainer: {
        paddingHorizontal: 16,
        width: '100%'
    },
    name: {
        fontSize: 20,
        fontWeight: '900',
        marginBottom: 15,
        color: '#fd9014',
        textAlign: 'center'
    },
    location: {
        fontSize: 17,
        marginBottom: 10,
        color: '#420283',
        textAlign: 'justify'
    },
    description: {
        fontSize: 17,
        marginBottom: 10,
        color: '#8430e0',
        textAlign: 'justify',
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 12
    },
    fact: {
        fontSize: 15,
        color: '#a86ee9',
        textAlign: 'justify',
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 12
    },
    visitedIcon: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: -5,
        right: -5,
        zIndex: 15,
    },
});

export default Details;
