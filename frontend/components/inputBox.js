    import { View, Text,StyleSheet, TextInput } from 'react-native'
    import React from 'react' 
    
    const InputBox = ({inputTitle,keyboardType,secureTextEntry,value,setValue}) => {
      return (
        <View >
        <Text>{inputTitle}</Text>
        <TextInput style={styles.inputBox}  
        autoCorrect={false}
        keyboardType={keyboardType}
       
        secureTextEntry={secureTextEntry}
        value={value}
           onChangeText={(text)=>setValue(text)}
        />
        
      </View>
      )
    }
    

    
const styles=StyleSheet.create({
 
    inputBox:{
        height:40,
        marginBottom:20,
        backgroundColor:'#ffffff',
        marginTop:10,
        borderRadius:10,
        paddingLeft:10,
    }

})


    export default InputBox