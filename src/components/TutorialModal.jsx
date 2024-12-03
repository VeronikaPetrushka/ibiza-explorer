import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Image } from "react-native";
import Icons from './Icons';

const TutorialModal = ({ visible, onClose }) => {
    const tutorialData = [
        { image: require('../assets/tutorial/1.png'), title: 'Select Your Stay Duration', text: "Start by choosing how many days you'll be spending on the island." },
        { image: require('../assets/tutorial/2.png'), title: 'Get Personalized Recommendations', text: "Based on your selected duration, the app will generate a tailored list of attractions to visit." },
        { image: require('../assets/tutorial/3.png'), title: 'Follow the Suggested Route', text: "The app creates a recommended route to optimize your experience." },
        { image: require('../assets/tutorial/4.png'), title: 'Check-in & Earn Achievements', text: "As you explore each attraction, check in via geolocation to unlock achievements and track your progress." },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (visible) {
            setCurrentIndex(0);
        }
    }, [visible]);

    const handleNext = () => {
        if (currentIndex < tutorialData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onClose();
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>How the App Works:</Text>

                    <Image source={tutorialData[currentIndex].image} style={styles.image} />
                    <Text style={styles.title}>{tutorialData[currentIndex].title}</Text>
                    <Text style={styles.text}>{tutorialData[currentIndex].text}</Text>

                    {
                        currentIndex < tutorialData.length - 1 ? (
                            <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                                <TouchableOpacity  
                                    style={[styles.previousButton, currentIndex === 0 && { opacity: 0.5 }]} 
                                    onPress={handlePrevious}
                                    disabled={currentIndex === 0}
                                    >
                                    <Icons type={'back'}/>
                                </TouchableOpacity>
        
                                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                                    <Icons type={'back'}/>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                <Text style={styles.buttonText}>{currentIndex < tutorialData.length - 1 ? 'Next' : 'Start your journey !'}</Text>
                            </TouchableOpacity>    
                        )
                    }

                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 23,
        color: '#4f1c86',
        marginBottom: 20,
        textAlign: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 18,
        color: '#f58403',
        marginBottom: 20,
        textAlign: 'center'
    },
    text: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 16,
        color: '#a86ee9',
        marginBottom: 28,
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    previousButton: {
        width: 50,
        height: 50,
        marginRight: 30,
        transform: [{ rotate: '180deg' }]
    },
    nextButton: {
        width: 50,
        height: 50,
    },
    closeButton: {
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f79108',
        alignSelf: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '800',
    }
});

export default TutorialModal;
