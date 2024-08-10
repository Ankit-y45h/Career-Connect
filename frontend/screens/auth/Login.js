import { View, Text,StyleSheet, Alert } from 'react-native'
import {React,useState, useEffect } from 'react'
import InputBox from '../../components/inputBox';
import SubmitButton from '../../components/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const Login = ({navigation}) => {
  
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');  
    const [name, setName] = useState('');
 

    useEffect(() => {
      getLocalStorageData();
    }, []);
  
  
    const handleSubmit = async () => {
      try {
        if (!email || !password) {
          return Alert.alert("Please fill all the fields");
        }
    
        const { data } = await axios.post('http://192.168.0.111:5000/api/user/login', { email, password });
        await AsyncStorage.setItem('@auth', JSON.stringify({ email, name: data.name, token: data.token }));
    
        Alert.alert("Login successful");
        navigation.navigate('Home');
      } catch (error) {
        if (error.response && error.response.data && (error.response.data.error === "Email incorrect" || error.response.data.error === "Incorrect password")) {
          return Alert.alert("Incorrect Email or password");
        }
      }
    };

    const getLocalStorageData = async () => {
      try {
        const data = await AsyncStorage.getItem('@auth');
        if (data) {
          const { name, email } = JSON.parse(data);
          setName(name);
          setEmail(email);
        }
      } catch (error) {
        console.error('Error reading data from AsyncStorage:', error);
      }
    };

    useEffect(() => {
      getLocalStorageData();
    }, []);
    return (
      <View  style={styles.container}>
        <Text style={styles.pageTitle}>Login</Text>
        <View style={{marginHorizontal:20}}>
         <InputBox inputTitle={"Email"} keyboardType={"email-adress"} value={email}  setValue={setEmail}/>
         <InputBox inputTitle={"Password"} secureTextEntry={true}  value={password} setValue={setPassword}/>
         {/* <Text>{JSON.stringify({name,email,password},null,4)}</Text> */}
       
        </View>
        <SubmitButton btnTitle="Login"  handlSubmit={handleSubmit}/>
        <Text style={styles.LinkText}>Not a member? <Text style={styles.Link} onPress={()=>navigation.navigate('Register')}>Register</Text></Text>
      </View>
  )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        backgroundColor:"#9AC8CD"
       
    },
    pageTitle:{
        fontSize:40,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:20,
    },
    inputBox:{
        height:40,
        marginBottom:20,
        backgroundColor:'#ffffff',
        marginTop:10,
        borderRadius:10,
        paddingLeft:10,
    },
    LinkText:{
     textAlign:'center',
     marginTop:20
    } ,
    Link:{
      color:'red'
    }

})

export default Login