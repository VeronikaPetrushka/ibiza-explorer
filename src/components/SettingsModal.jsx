import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, 
    KeyboardAvoidingView, Keyboard, Alert, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMusic } from '../constants/music.js';
import Icons from './Icons';

const { height, width } = Dimensions.get('window');

const SettingsModal = ({ visible, onClose }) => {
    const { isPlaying, togglePlay } = useMusic();
    const [showResetConfirmation, setShowResetConfirmation] = useState(false);

    const handleToggleLoudness = async () => {
        togglePlay();
    };

    const handleReset = async () => {
      try {
          await AsyncStorage.removeItem('visitedTrips');
          await AsyncStorage.removeItem('userProfile');
          await AsyncStorage.removeItem('uploadedImage');
          await AsyncStorage.removeItem('route');

          Alert.alert('Success', 'All data has been reset.');
      } catch (error) {
          Alert.alert('Error', 'Failed to reset data: ' + error.message);
      }
  };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={styles.modalContent}>
                    {showResetConfirmation ? (
                        <>
                            <Text style={styles.confirmationText}>
                                Are you sure you want to reset your progress? It will reset your account along with your achievements and planned routes!
                            </Text>
                            <TouchableOpacity style={[styles.resetBtn, {marginTop: 0}]} onPress={handleReset}>
                                <Text style={styles.resetBtnText}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelReset} onPress={() => setShowResetConfirmation(false)}>
                                <Text style={styles.cancelBtnText}>Close</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                <Icons type="close" />
                            </TouchableOpacity>

                            <ScrollView style={{width: '100%'}}>
                                <Text style={styles.modalTitle}>Settings</Text>

                                <View style={styles.regulatorContainer}>
                                    <View style={[{width: 55, height: 55}, !isPlaying && {opacity: 0.4}]}>
                                        <Icons type={'music'} />
                                    </View>
                                    <Text style={[styles.toggleText, isPlaying ? styles.toggleTextOn : styles.toggleTextOff]}>
                                        {isPlaying ? 'On' : 'Off'}
                                    </Text>
                                    <TouchableOpacity style={[styles.toggleContainer, isPlaying ? styles.toggleContainer : styles.toggleContainerOff]} onPress={handleToggleLoudness}>
                                        <View style={[styles.toggle, isPlaying ? styles.toggleOn : styles.toggleOff]}></View>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity style={styles.resetBtn} onPress={() => setShowResetConfirmation(true)}>
                                    <Text style={styles.resetBtnText}>Reset</Text>
                                </TouchableOpacity>
                            </ScrollView>

                        </>
                    )}
                </View>
                </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingTop: height * 0.1,
        padding: 25
    },
    modalContent: {
        width: '100%',
        padding: 15,
        paddingVertical: 40,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,

    },
    modalTitle: {
        fontWeight: '900',
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 20,
        color: '#4f1c86'
    },
    regulatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    regulatorText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#a86ee9'
    },
    toggleContainer: {
        padding: 7,
        width: 100,
        height: 50,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#a86ee9',
    },
    toggleContainerOff: {
        borderColor: '#ccc',
    },
    toggleText: {
        fontSize: 16,
    },
    toggleTextOn: {
        color: '#a86ee9',
    },
    toggleTextOff: {
        color: '#ccc',
    },
    toggle: {
        borderRadius: 30,
        width: '45%',
        height: '100%',
    },
    toggleOn: {
        backgroundColor: '#a86ee9',
        alignSelf: 'flex-end',
    },
    toggleOff: {
        backgroundColor: '#ccc',
        alignSelf: 'flex-start',
    },
    closeButton: {
        padding: 10,
        width: 40,
        height: 40,
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10
    },
    shareBtn: {
        width: '100%',
        backgroundColor: '#a86ee9',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 60,
    },
    cancelBtnText: {
        fontSize: 19,
        fontWeight: '500',
        color: '#fff',
    },
    resetBtn: {
        width: width * 0.7,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#f58403',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    resetBtnText: {
        color: '#f58403',
        fontSize: 19,
        fontWeight: '500',
    },
    confirmationText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 60,
        color: '#3C3C3B'
    },
    cancelReset: {
        width: width * 0.7,
        backgroundColor: '#f58403',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
        
});

export default SettingsModal;
