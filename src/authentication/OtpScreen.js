import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert,StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const OtpScreen = () => {
  const navigation = useNavigation();
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');

  const login = async () => {
    try {
      const url = 'http://13.200.75.208:4001/v1/users/login';
      const data = {
        mobile_number: 'your_phone_number', // replace with the actual phone number
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.message === 'Login successfully.') {
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
    return false;
  };

  const notRegistered = () => {
    Alert.alert(
      'Error',
      'You are not registered with us. Please register first.',
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.pop();
            navigation.pop(); // assuming you have a previous screen
            navigation.replace('Registration'); // replace with your registration screen
          },
        },
      ],
    );
  };

  const verifyOTP = async () => {
    const number = '7008337574'; // replace with the actual phone number
    const url = `https://control.msg91.com/api/v5/otp/verify?otp=${otp1}${otp2}${otp3}${otp4}&mobile=91${number}`;

    try {
      const response = await fetch(url, {
        headers: {
          accept: 'application/json',
          authkey: '395607ATzxdWwee644b4b4bP1', // replace with your Msg91 key
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        if (
          responseData.hasOwnProperty('message') &&
          responseData.message === 'OTP verified success'
        ) {
          if (await login()) {
            navigation.replace('HomeScreen'); // replace with your home screen
          } else {
            notRegistered();
          }
        } else {
          Alert.alert('Error', 'Incorrect or incomplete OTP');
        }
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const inputStyles = (value) => ({
    ...styles.input,
    borderColor: value !== '' ? 'red' : 'black',
    backgroundColor: value !== '' ? 'mistyrose' : 'white',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Verify your phone number
      </Text>

      <TouchableOpacity onPress={() => navigation.pop()}>
        <Text style={{ color: '#EE272E', marginBottom: 20 }}>
          Change phone number?
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {[otp1, otp2, otp3, otp4].map((otp, index) => (
          <TextInput
            key={index}
            style={{
              ...{
                height: 50,
                width: 50,
                borderWidth: 1,
                borderColor: '#EE272E',
                borderRadius: 10,
                textAlign: 'center',
                fontSize: 20,
                margin:10
              },
              ...inputStyles(otp),
            }}
            keyboardType="numeric"
            maxLength={1}
            value={otp}
            onChangeText={(text) => {
              if (text.length === 1) {
                if (index === 0) setOtp1(text);
                else if (index === 1) setOtp2(text);
                else if (index === 2) setOtp3(text);
                else if (index === 3) setOtp4(text);
                if (index < 3) {
                  this[`otpInput${index + 1}`].focus();
                }
              }
            }}
            ref={(input) => {
              this[`otpInput${index}`] = input;
            }}
          />
        ))}
      </View>

      <Button
        mode="contained"
        style={styles.verify}
        onPress={verifyOTP}
      >
        Verify
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
     paddingTop: 10
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  message: {
    // marginTop: 20,
    fontSize:16,
    color: "gray",
  },
  message1: {
    marginTop: 20,
    color: "gray",
    fontWeight:'bold'
  },
  message2: {
    marginTop: 20,
    color: "#EE272E",
    fontWeight:'bold'
  },
  verify:{
    width:'90%',
    height: 50,
    marginVertical: 80,
    borderRadius: 30,
    backgroundColor: "#EE272E",
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal:20,
  },
  verifyText:{
    color: "white",
    fontSize: 18,
    fontWeight: "400",
  }
});


export default OtpScreen;
