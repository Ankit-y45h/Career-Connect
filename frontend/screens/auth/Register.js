import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import InputBox from '../../components/inputBox';
import SubmitButton from '../../components/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    getLocalStorageData();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!email || !password || !name) {
        return Alert.alert('Please fill all the fields');
      }
      console.log('Register data=', { email, password, name });

      const { data } = await axios.post('http://192.168.0.111:5000/api/user/signup', { email, password, name });
      console.log(data);
      await AsyncStorage.setItem('@auth', JSON.stringify({ email, name, token: data.token }));
      Alert.alert('Registered successfully');
      navigation.navigate('Home');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error === 'Email already exists') {
        Alert.alert('Email already exists');
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

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Register</Text>
      <View style={{ marginHorizontal: 20 }}>
      <InputBox inputTitle={'Name'} secureTextEntry={false} value={name} setValue={setName} />
        <InputBox inputTitle={'Email'} keyboardType={'email-address'} value={email} setValue={setEmail} />
        <InputBox inputTitle={'Password'} secureTextEntry={true} value={password} setValue={setPassword} />
      </View>
      <SubmitButton btnTitle="Register" handlSubmit={handleSubmit} />
      <Text style={styles.LinkText}>
        Already Registered?{' '}
        <Text style={styles.Link} onPress={() => navigation.navigate('Login')}>
          LOGIN
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#9AC8CD',
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    marginTop: 10,
    borderRadius: 10,
    paddingLeft: 10,
  },
  LinkText: {
    textAlign: 'center',
    marginTop: 20,
  },
  Link: {
    color: 'red',
  },
});

export default Register;
