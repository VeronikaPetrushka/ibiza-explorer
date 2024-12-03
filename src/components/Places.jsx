import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground, ScrollView } from "react-native"
import { useNavigation } from '@react-navigation/native';
import places from "../constants/places.js";
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Places = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate('HomeScreen');
      };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backIcon} onPress={handleBackPress}>
                <Icons type={'back'} />
            </TouchableOpacity>
            <Text style={styles.title}>Attractions</Text>

            <View style={styles.placesContainer}>
                <ScrollView style={{width: '100%', height: '94%'}}>
                    {places.map((place, index) => (
                        <View key={index} style={styles.place}>
                            <Image source={place.image} style={styles.placeImage} />
                            <View style={{width: '47%', alignItems: 'center'}}>
                                <Text style={styles.placeName}>{place.name}</Text>
                                <TouchableOpacity style={styles.detailsBtn} onPress={() => navigation.navigate('DetailsScreen', { place: place })}>
                                    <Text style={styles.detailsBtnText}>Read more</Text>
                                </TouchableOpacity>
                                </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
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
        color: '#4f1c86',
        textAlign: 'center'
      },    

    placesContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: height * 0.03
    },

    place: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: height * 0.03,
        flexDirection: 'row'
    },

    placeImage: {
        width: '50%',
        height: height * 0.25,
        resizeMode: 'cover',
        borderRadius: 14,
        marginBottom: height * 0.015
    },

    placeName: {
        fontSize: 19,
        fontWeight: '900',
        color: '#4f1c86',
        marginBottom: height * 0.05,
        textAlign: 'center'
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
})

export default Places;