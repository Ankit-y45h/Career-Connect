import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';


const Navigation = () => {
  const navigation = useNavigation();

    
   return (
    <View style={styles.container}>
     <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
       <FontAwesome5 name="home" style={styles.iconStyle}/>
       <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Bookmark')}>
       <FontAwesome5 name="bookmark" style={styles.iconStyle}/> 
       <Text>Bookmark</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
       <FontAwesome5 name="user" style={styles.iconStyle}/> 
       <Text >Profile</Text>
      </TouchableOpacity>
    </View>   
  );
};
const styles =StyleSheet.create({
  container:{
    flexDirection: "row",
    margin:10,
    justifyContent: "space-between"
  },
  iconStyle:{
    marginBottom:3,
    alignSelf:"center",
    fontSize:25,

  },
})


export default Navigation;