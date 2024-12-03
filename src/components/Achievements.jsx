import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import places from '../constants/places';
import Icons from './Icons';

const { width, height } = Dimensions.get('window');

const Achievements = () => {
  const navigation = useNavigation();
  const [visitedTrips, setVisitedTrips] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const storedVisitedTrips = await AsyncStorage.getItem('visitedTrips');
        const visitedTripsArray = storedVisitedTrips ? JSON.parse(storedVisitedTrips) : [];
        setVisitedTrips(visitedTripsArray);
      } catch (error) {
        Alert.alert('Error', 'Could not load visited trips or purchased places: ' + error.message);
      }
    };

    fetchPlaces();
  }, []);

  const handleDetailsPress = (place) => {
    navigation.navigate('DetailsScreen', { place });
  };

  const handleBackPress = () => {
    navigation.navigate('HomeScreen');
  };

  const isVisited = (placeName) => {
    return visitedTrips.some((trip) => trip.place.name === placeName);
  };

  const visitedPlaces = places.filter((place) => isVisited(place.name));

  const handleAchievementPress = (place) => {
    setSelectedPlace(place);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false)
  };

  const renderPlace = ({ item }) => {
    return (
      <View style={styles.placeContainer}>
        <Image
          source={item.image}
          style={[
            styles.placeImage,
            styles.visitedBorder,
          ]}
        />
        <Text style={styles.placeName}>{item.name}</Text>

        <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => handleDetailsPress(item)}
          >
            <Text style={styles.detailsButtonText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.detailsButton, {backgroundColor: '#f58403'}]}
            onPress={() => handleAchievementPress(item)}
          >
            <Text style={styles.detailsButtonText}>Achievement</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={handleBackPress}>
        <Icons type={'back'} />
      </TouchableOpacity>
      <Text style={styles.title}>Achievements</Text>
      {
        visitedPlaces.length === 0 && (
          <Text  style={styles.text}>You have no collected places yet. Check in first in any place and come back for your achievements.</Text>
        )
      }
      <FlatList
        data={visitedPlaces}
        keyExtractor={(item) => item.name}
        renderItem={renderPlace}
        contentContainerStyle={styles.list}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalOpen}
        onRequestClose={handleModalClose}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <TouchableOpacity style={styles.closeBtn} onPress={handleModalClose}>
                    <Icons type={'close'} />
                </TouchableOpacity>
                {selectedPlace && (
                  <Text style={styles.modalText}>{selectedPlace.achievement}</Text>
                )}
            </View>
        </View>
    </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: height * 0.07,
    backgroundColor: '#e3effa',
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
  text: {
    fontSize: 20,
    fontWeight: '700',
    color: '#762bc9',
    textAlign: 'center'
},
  title: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 30,
    color: '#4f1c86',
    textAlign: 'center'
  },
  list: {
    alignItems: 'center',
    width: '100%',
  },
  placeContainer: {
    width: width * 0.85,
    marginBottom: 30,
    alignItems: 'center',
  },
  placeImage: {
    width: '100%',
    height: height * 0.3,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  visitedBorder: {
    borderColor: '#f58403',
  },
  placeName: {
    marginTop: 10,
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    color: '#4f1c86',
  },
  detailsButton: {
    marginTop: 10,
    backgroundColor: '#9044e3',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '48%',
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '900',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
},

modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 50,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 20,
        height: 20,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
},

modalText: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 16,
    color: '#3C3C3B',
    marginBottom: 28,
    textAlign: 'center',
    lineHeight: 21
},

closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    width: 40,
    height: 40
}

});

export default Achievements;
