import { View, Text, StyleSheet, Linking, ScrollView } from 'react-native';
import React from 'react';

const Info2 = ({ route }) => {
    const { result } = route.params;

    const handleOpenUrl = () => {
        if (result.job_url) {
            Linking.openURL(result.job_url);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.jobDetailsContainer}>
                <Text style={styles.heading}>Job Details</Text>
            </View>
            <Text style={styles.label}>Title:</Text>
            <Text style={styles.value}>{result.job_title}</Text>
            <Text style={styles.label}>Company Name:</Text>
            <Text style={styles.value}>{result.company_name}</Text>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}> {result.job_location}</Text>
            <Text style={styles.label}>Salary:</Text>
            <Text style={styles.value}> {result.salary}</Text>
            <Text style={styles.label}>Reviews:</Text>
            <Text style={styles.value}> {result.company_reviews}</Text>
            <Text style={styles.label}>Company rating:</Text>
            <Text style={styles.value}>{result.company_rating}</Text>
            <Text style={styles.label}>APPLY:</Text>
            {result.job_url ? (
                <Text style={[styles.value, styles.link]} onPress={handleOpenUrl}>
                    {result.job_url}
                </Text>
            ) : (
                <Text style={styles.value}>Not available</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    jobDetailsContainer: {
        alignItems: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        marginBottom: 16,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default Info2;
