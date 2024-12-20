import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Dimensions, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MapView, { Marker } from "react-native-maps";
import Icons from './Icons';

const { height, width } = Dimensions.get('window');

const heightThreshold = 700;

const imageContainerHeight = height < heightThreshold ? height * 0.28 : height * 0.32;

const CheckIn = ({ place }) => {
    const mapRef = useRef(null);
    const navigation = useNavigation();
    const [photo, setPhoto] = useState(null);
    const [zoomedIn, setZoomedIn] = useState(false);
    const [markerSize, setMarkerSize] = useState(40);
    const [value, setValue] = useState(null);
    const [visited, setVisited] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [mapVisible, setMapVisible] = useState(false);

    const handleMapVisible = () => {
        if(mapVisible) {
            setMapVisible(false)
        } else {
            setMapVisible(true)
        }
    };

    const checkIfVisited = async () => {
        try {
            const storedVisitedTrips = await AsyncStorage.getItem('visitedTrips');
            const visitedTripsArray = storedVisitedTrips ? JSON.parse(storedVisitedTrips) : [];

            const visitedTrip = visitedTripsArray.find(trip => 
                trip.place && trip.place.name === place.name
            );

            setVisited(!!visitedTrip);
        } catch (error) {
            Alert.alert('Error', 'Could not check visit status: ' + error.message);
        }
    };

    useEffect(() => {
        if (!place || !place.name) {
            Alert.alert('Error', 'Place is not defined or missing necessary information.');
            return;
        }
        checkIfVisited();
    }, [place]);

    useFocusEffect(
        useCallback(() => {
            checkIfVisited();
        }, [place])
    );

    const handleZoomToggle = () => {
        const { lat, lng } = place.coordinates[0];

        if (!zoomedIn) {
            mapRef.current.animateToRegion({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.0017,
                longitudeDelta: 0.0017,
            }, 1000);
            setMarkerSize(80);
        } else {
            mapRef.current.animateToRegion({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
            }, 1000);
            setMarkerSize(40);
        }
        setZoomedIn(!zoomedIn);
    };

    const handleSelectPhoto = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, (response) => {
            if (response.didCancel) {
                Alert.alert('Photo selection cancelled');
            } else if (response.error) {
                Alert.alert('Error selecting photo', response.error);
            } else if (response.assets && response.assets.length > 0) {
                const newPhotos = response.assets.map(asset => asset.uri);
                setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
            }
        });
    };
    
    const handleSubmit = async () => {
        if (photos.length === 0 ) {
            Alert.alert('Error', `Please upload at least one photo to show that you visited ${place.name}.`);
            return;
        }
    
        const newVisitedTrip = {
            place,
            visitedDate: new Date().toISOString(),
            images: photos,
            isChecked: true,
        };


        try {
            const storedVisitedTrips = await AsyncStorage.getItem('visitedTrips');
            const visitedTripsArray = storedVisitedTrips ? JSON.parse(storedVisitedTrips) : [];

            const updatedVisitedTrips = [...visitedTripsArray, newVisitedTrip];

            await AsyncStorage.setItem('visitedTrips', JSON.stringify(updatedVisitedTrips));

            setVisited(true);
            Alert.alert('Achievement Unlocked', `${place.achievement}`);

            setPhoto(null);
            setValue(null);

            navigation.goBack();
        } catch (error) {
            console.error('Error during check-in:', error);
            Alert.alert('Error', 'Could not save your check-in: ' + error.message);
        }
    };

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack('')}>
                    <Icons type={'back'} />
                </TouchableOpacity>

                <Text style={styles.title}>{place.name}</Text>

                    <TouchableOpacity style={[styles.uploadButton, { borderColor: '#c97f10'}]} onPress={handleMapVisible}>
                        <Text style={styles.uploadButtonText}>See on the map</Text>
                    </TouchableOpacity>

                    {mapVisible && (
                        <View style={styles.mapContainer}>
                            <MapView
                            ref={mapRef}
                            style={styles.map}
                            initialRegion={{
                                latitude: place.coordinates[0].lat,
                                longitude: place.coordinates[0].lng,
                                latitudeDelta: 0.04,
                                longitudeDelta: 0.04,
                            }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: place.coordinates[0].lat,
                                        longitude: place.coordinates[0].lng,
                                    }}
                                >
                                    <View>
                                        <Image
                                            source={place.image}
                                            style={[styles.markerImage, { width: markerSize, height: markerSize }]}
                                        />
                                        {visited && (
                                            <View style={styles.visitedIcon}>
                                                <Icons type={'visited'} />
                                            </View>
                                        )}
                                    </View>
                                </Marker>
                            </MapView>
                                <TouchableOpacity style={styles.zoomButton} onPress={handleZoomToggle}>
                                <Text style={styles.zoomButtonText}>{zoomedIn ? "Zoom Out" : "Zoom In"}</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                <TouchableOpacity style={[styles.uploadButton, {backgroundColor: '#b584fc', borderColor: '#9148f7'}]} onPress={handleSelectPhoto}>
                    <Text style={styles.uploadButtonText}>Upload Photo</Text>
                </TouchableOpacity>

                {photos.length > 0 && (
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false} 
                        style={styles.imageCarousel}
                    >
                        {photos.map((uri, index) => (
                            <View key={index} style={styles.imageWrapper}>
                                <Image source={{ uri }} style={styles.image} />
                            </View>
                        ))}
                    </ScrollView>
                )}

                <TouchableOpacity style={styles.checkBtn} onPress={handleSubmit}>
                    <Text style={styles.checkBtnText}>Check in</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 16,
        paddingTop: height * 0.07,
        paddingBottom: height * 0.05,
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
    title: {
        fontSize: 26,
        fontWeight: '900',
        marginBottom: 30,
        color: '#fd9014',
        width: width * 0.69,
        textAlign: 'center'
    },
    mapContainer: {
        width: '100%',
        height: imageContainerHeight - height * 0.07,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    markerImage: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#762bc9',
    },
    zoomButton: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "#762bc9",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
        zIndex: 10,
    },
    zoomButtonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: '300',
    },
    uploadButton: {
        width: '100%',
        backgroundColor: '#fcac61',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 20,
        alignSelf: 'center',
        borderWidth: 2,
    },
    uploadButtonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '900',
    },
    imageContainer: {
        width: '100%',
        height: imageContainerHeight,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    imageCarousel: {
        width: '100%',
        height: '100%',
        marginBottom: 20,
    },
    imageWrapper: {
        width: width * 0.91,
        height: '100%',
        marginRight: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },    
    picker: {
        width: '100%',
        backgroundColor: 'transparent',
        borderColor: '#2C3E50',
        marginBottom: 15
    },
    checkBtn: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#a86ee9',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#8028fa'
    },
    checkBtnText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: '900',
    },
    visitedIcon: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: -5,
        right: -5,
        zIndex: 15
    }
});

export default CheckIn;
