import { View, Text ,TouchableOpacity,StyleSheet} from 'react-native'
import React from 'react'

const SubmitButton = ({handlSubmit,btnTitle,loading}) => {
  return (
    <TouchableOpacity style={styles.submitbtn} onPress={handlSubmit}>
     <Text style={styles.btn}>{loading ? 'Please wait..' : btnTitle}</Text>
    </TouchableOpacity>
  )
}


const styles=StyleSheet.create({

    submitbtn:{
        backgroundColor: '#1e2225', // Example style
        padding: 10, // Example style
        borderRadius: 5, // Example style
        justifyContent: 'center',
    alignItems: 'center',
    height:50,
    marginHorizontal:25,
    borderRadius:80,
    marginTop:20
    },
    btn:{
        color:'#ffffff',
        fontSize:24,
        fontweight:400
    }
})

export default SubmitButton