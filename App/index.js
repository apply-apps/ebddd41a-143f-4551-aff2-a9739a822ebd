// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function App() {
    const [time, setTime] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const handleBooking = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant. Please provide answers for given requests.'
                    },
                    {
                        role: 'user',
                        content: `Thank you for reserving a slot at our laser depilation salon. You chose the time: ${time} with the following notes: ${note}`
                    }
                ],
                model: 'gpt-4o'
            });

            const { data } = response;
            setResponseMessage(data.response || 'Thank you for your reservation!');
        } catch (error) {
            setResponseMessage('There was an error processing your request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Laser Depilation Salon Booking</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Select Time:</Text>
                <Picker
                    selectedValue={time}
                    style={styles.picker}
                    onValueChange={(itemValue) => setTime(itemValue)}
                    mode="dropdown"
                >
                    <Picker.Item label="9:00 AM" value="9:00 AM" />
                    <Picker.Item label="10:00 AM" value="10:00 AM" />
                    <Picker.Item label="11:00 AM" value="11:00 AM" />
                    <Picker.Item label="12:00 PM" value="12:00 PM" />
                    <Picker.Item label="1:00 PM" value="1:00 PM" />
                    <Picker.Item label="2:00 PM" value="2:00 PM" />
                    <Picker.Item label="3:00 PM" value="3:00 PM" />
                    <Picker.Item label="4:00 PM" value="4:00 PM" />
                </Picker>
                <Text style={styles.label}>Note:</Text>
                <TextInput
                    style={styles.input}
                    value={note}
                    onChangeText={setNote}
                    placeholder="Add your notes here"
                    placeholderTextColor="#CCC"
                />
                <Button title="Book Now" onPress={handleBooking} disabled={loading} color="#FFFFFF" />

                {loading && <ActivityIndicator size="large" color="#00ff00" />}
                {responseMessage && <Text style={styles.response}>{responseMessage}</Text>}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#121212', // Dark background
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#FFFFFF', // Light text color
    },
    form: {
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#FFFFFF', // Light text color
    },
    picker: {
        height: 50,
        marginBottom: 20,
        color: '#FFFFFF', // Light text color
        backgroundColor: '#1E1E1E', // Darker picker background
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: '#FFFFFF', // Light text color
        backgroundColor: '#1E1E1E', // Dark input background
    },
    response: {
        marginTop: 20,
        fontSize: 16,
        color: 'green',
        textAlign: 'center',
    },
});