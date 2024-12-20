import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from "react-native"
import Icons from './Icons';

const WelcomeModal = ({ visible, onClose }) => {

    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                    <Icons type={'close'} />
                </TouchableOpacity>
                <View style={{width: 70, height: 70, marginBottom: 20}}>
                    <Icons type={'island'} />
                </View>
                <Text style={styles.modalText}>Welcome to your ultimate travel companion for the island! Discover personalized routes, unique achievements, and unforgettable sights. Let’s dive into your adventure!
                </Text>
            </View>
        </View>
    </Modal>
    )
};

const styles = StyleSheet.create({

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
})


export default WelcomeModal;