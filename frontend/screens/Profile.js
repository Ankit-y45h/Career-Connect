import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from '../components/Navigation';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [showBio, setShowBio] = useState(false);
    const [showEducation, setShowEducation] = useState(false);
    const [showExperience, setShowExperience] = useState(false);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = await AsyncStorage.getItem('@auth_token'); // Retrieve auth token from AsyncStorage
                const response = await fetch('https://your-api-url/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const profile = await response.json();
                setProfileData(profile);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setLoading(false);
            }
        };

        const getLocalStorageData = async () => {
            try {
                let data = await AsyncStorage.getItem('@auth');
                console.log("Local storage Data =", data);
                if (data) {
                    const { name, email } = JSON.parse(data);
                    setName(name);
                    setEmail(email);
                    console.log("name", name);
                }
            } catch (error) {
                console.error("Error retrieving data from AsyncStorage:", error);
            }
        };

        fetchProfileData();
        getLocalStorageData();
    }, []);

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Image source={require('./profile.jpg')} style={styles.profileImage} />
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>
                <TouchableOpacity style={styles.section} onPress={() => setShowBio(!showBio)}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>• Bio</Text>
                        <AntDesign name={showBio ? "up" : "down"} size={24} color="#000000" />
                    </View>
                    {showBio && (
                        <View style={styles.box}>
                            <Text style={styles.bio}>{profileData?.bio}</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.section} onPress={() => setShowEducation(!showEducation)}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>• Education</Text>
                        <AntDesign name={showEducation ? "up" : "down"} size={24} color="#000000" />
                    </View>
                    {showEducation && (
                        <View style={styles.box}>
                            {profileData?.education.map((edu, index) => (
                                <View key={index}>
                                    <Text style={styles.institution}>{edu.institution}</Text>
                                    <Text style={styles.degree}>{edu.degree}</Text>
                                    <Text style={styles.duration}>{edu.duration}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.section} onPress={() => setShowExperience(!showExperience)}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>• Experience</Text>
                        <AntDesign name={showExperience ? "up" : "down"} size={24} color="#000000" />
                    </View>
                    {showExperience && (
                        <View style={styles.box}>
                            {profileData?.experience.map((exp, index) => (
                                <View key={index}>
                                    <Text style={styles.company}>{exp.company}</Text>
                                    <Text style={styles.position}>{exp.position}</Text>
                                    <Text style={styles.duration}>{exp.duration}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
                <Navigation />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75, // Make it round
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: '#007BFF',
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    box: {
        backgroundColor: '#F2F8FD',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#007BFF',
    },
    bio: {
        fontSize: 16,
        color: '#333333',
    },
    institution: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    degree: {
        color: '#333333',
        marginBottom: 5,
    },
    company: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    position: {
        color: '#333333',
        marginBottom: 5,
    },
    duration: {
        color: '#999999',
    },
    bottom: {
        position: 'absolute',
        bottom: 30 ,
        left: 0,
        right: 0,
    },
});

export default Profile;