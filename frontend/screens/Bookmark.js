import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Bookmark = ({ route }) => {
    const { email } = route.params; // Assuming you pass email as a parameter
    const navigation = useNavigation();
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const loadBookmarks = async () => {
            try {
                const bookmarksData = await AsyncStorage.getItem(`@bookmarks_${email}`);
                if (bookmarksData !== null) {
                    const parsedBookmarks = JSON.parse(bookmarksData);
                    setBookmarks(parsedBookmarks);
                    console.log('Bookmarks loaded:', parsedBookmarks);
                } else {
                    console.log('No bookmarks found in AsyncStorage for', email);
                    setBookmarks([]);
                }
            } catch (error) {
                console.error('Error loading bookmarks:', error);
            }
        };

        loadBookmarks();
    }, [email]); // Reload bookmarks whenever email changes

    const handlePress = (bookmark) => {
        navigation.navigate('Info1', { result: bookmark });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bookmarks for {email}</Text>
            <ScrollView>
                {bookmarks.map((bookmark) => (
                    <TouchableOpacity
                        key={bookmark.id}
                        style={styles.bookmarkCard}
                        onPress={() => handlePress(bookmark)}
                    >
                        <View style={styles.cardHeader}>
                            <View style={styles.cardInfo}>
                                <Text style={styles.jobTitle}>{bookmark.job_title}</Text>
                                <Text style={styles.employerName}>{bookmark.employer_name}</Text>
                            </View>
                            <Ionicons
                                name='bookmark-outline'
                                size={24}
                                color='#000'
                            />
                        </View>
                        <Text style={styles.companyRank}>Company rank: {bookmark.rank}</Text>
                        <Text style={styles.jobDetails}>Senior • Remote • Fulltime</Text>
                        <View style={styles.cardFooter}>
                            <TouchableOpacity style={styles.applyButton}>
                                <Text style={styles.applyButtonText}>Apply Now</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 16,
    },
    bookmarkCard: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardInfo: {
        flexDirection: 'column',
    },
    jobTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    employerName: {
        fontSize: 12,
        fontWeight: '400',
    },
    companyRank: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: '600',
    },
    jobDetails: {
        fontSize: 12,
        fontWeight: '400',
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        justifyContent: 'space-between',
    },
    applyButton: {
        backgroundColor: '#3F6CDF',
        padding: 8,
        borderRadius: 16,
    },
    applyButtonText: {
        color: '#FFF',
        fontSize: 14,
    },
});

export default Bookmark;
