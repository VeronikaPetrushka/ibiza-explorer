import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icons from "./Icons";
import Map from "./Map";

const { height } = Dimensions.get('window');

const Route = () => {
    const navigation = useNavigation();
    const [visitDate, setVisitDate] = useState(null);
    const [places, setPlaces] = useState([]);
    const [isRouteAvailable, setIsRouteAvailable] = useState(true);
  
    useEffect(() => {
        const loadRouteData = async () => {
            try {
                const storedRoute = await AsyncStorage.getItem('route');
                if (storedRoute) {
                    const route = JSON.parse(storedRoute);
                    if (route.visitDate && route.recommendedPlaces.length > 0) {
                        setVisitDate(route.visitDate);
                        setPlaces(route.recommendedPlaces);
                        setIsRouteAvailable(true);
                    } else {
                        setIsRouteAvailable(false);
                    }
                } else {
                    setIsRouteAvailable(false);
                }
            } catch (error) {
                console.error("Error loading route data:", error);
                Alert.alert("Error", "Could not load route data.");
                setIsRouteAvailable(false);
            }
        };
    
        loadRouteData();
    }, []);

    const handleBackPress = () => {
        navigation.navigate('HomeScreen');
      };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backIcon} onPress={handleBackPress}>
                <Icons type={'back'} />
            </TouchableOpacity>
            <Text style={styles.title}>{isRouteAvailable ? 'Map' : ''}</Text>
            {isRouteAvailable ? (
                <>
                    {visitDate && <Text style={styles.date}>Suggested route for: {visitDate} days</Text>}
                    <View style={{width: '100%', height: height * 0.75}}>
                        <Map places={places} />
                    </View>
                </>
            ) : (
                <Text style={styles.text}>No recommended places yet, select visiting dates in settings first and come back to see your suggested route!</Text>
            )}
        </View>
    );
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
        marginBottom: height * 0.03,
        color: '#4f1c86',
        textAlign: 'center'
      },

      date: {
        fontSize: 16,
        fontWeight: '900',
        marginBottom: height * 0.02,
        color: '#f58403',
        textAlign: 'center'
      },

    text: {
        fontSize: 20,
        fontWeight: '700',
        color: '#762bc9',
        textAlign: 'center'
    }
})

export default Route;
