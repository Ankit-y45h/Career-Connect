import { View, Text, StyleSheet, Linking, ScrollView } from 'react-native';
import React from 'react';

const Info = ({ route }) => {
    const { result } = route.params;

    const handleOpenUrl = () => {
        if (result.jobPostingUrl) {
            Linking.openURL(result.jobPostingUrl);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.jobDetailsContainer}>
                <Text style={styles.heading}>Job Details</Text>
                </View> 
                <Text style={styles.label}>Title:</Text>
                <Text style={styles.value}>{result.title}</Text>
                <Text style={styles.label}>Company Name:</Text>
                <Text style={styles.value}>{result.companyName}</Text>
                <Text style={styles.label}>Location:</Text>
                <Text style={styles.value}>{result.formattedLocation}</Text>
                <Text style={styles.label}>Employment Status:</Text>
                <Text style={styles.value}>{result.formattedEmploymentStatus}</Text>
                <Text style={styles.label}>Experience Level:</Text>
                <Text style={styles.value}>{result.formattedExperienceLevel}</Text>
                <Text style={styles.label}>Industries:</Text>
                <Text style={styles.value}>{result.formattedIndustries}</Text>
                <Text style={styles.label}>Job Description:</Text>
                <Text style={styles.value}>{result.jobDescription}</Text>
                <Text style={styles.label}>Job Posting URL:</Text>
                {result.jobPostingUrl ? (
                    <Text style={[styles.value, styles.link]} onPress={handleOpenUrl}>
                        {result.jobPostingUrl}
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

export default Info;
