import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
      if (isFirstLaunch === null) {
        Alert.alert('Chào mừng', 'Chào mừng đến ứng dụng của tôi!');
        await AsyncStorage.setItem('isFirstLaunch', 'false');
      }
    };
    checkFirstLaunch();
  }, []);

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!number.match(phoneRegex)) {
      setError('Số điện thoại không hợp lệ, phải chứa 10 chữ số.');
      return false;
    }
    setError('');
    return true;
  };

  const handlePhoneNumberChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(formattedText);
    validatePhoneNumber(formattedText);
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (validatePhoneNumber(phoneNumber)) {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.topHeading}>Đăng nhập</Text>
        <View style={styles.separator} />
        <Text style={styles.heading}>Nhập số điện thoại</Text>
        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản OneHousing Pro
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          keyboardType="numeric"
          onChangeText={handlePhoneNumberChange}
          value={phoneNumber}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
  },
  topHeading: {
    fontSize: 28,
    textAlign: 'left',
    marginBottom: 16,
  },
  separator: {
    width: '100%',
    height: 5,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'left',
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderBottomColor: 'gray',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default SignInScreen;
