import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const SearchResult = ({ results }) => {

  const navigation = useNavigation();
  const handlePress = (result) => {
    navigation.navigate('Info', { result });
  };
  return (
    <View style={styles.container}> 
      {results.map((result, id) => {
        return (
          <TouchableOpacity key={id} onPress={() => handlePress(result)}>
            <Text>{result.companyName}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({  
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 8, // Adjust this margin as needed
    maxHeight: 300,
    overflow: 'scroll',
  },
});

export default SearchResult;