import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert,Image } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const [numberInput, setNumberInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const showMyDialog = () => {
    Alert.alert(
      "Error",
      "Mobile Number incorrect\nPlease enter mobile number correctly",
      [{ text: "OK", onPress: () => {} }],
      { cancelable: false }
    );
  };

  const sendOtp = async () => {
    const url = `https://control.msg91.com/api/v5/otp?template_id=646b0553d6fc0550857a9702&mobile=91${phoneNumber}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authkey: "395607ATzxdWwee644b4b4bP1", // replace with your Msg91 key
        },
      });

      if (response.ok) {
        console.log(await response.json());
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with OTP</Text>
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={(value) => {
            if (value.length === 10) {
              setNumberInput(true);
              setPhoneNumber(value);
            } else {
              setNumberInput(false);
            }
          }}
          placeholder="Enter your phone number"
          keyboardType="numeric"
          style={styles.input}
        />
        <Button
          onPress={() => {
            if (numberInput) {
              sendOtp();
              navigation.navigate("Otp");
            } else {
              showMyDialog();
            }
          }}
          style={styles.loginButton}
        >
          <Text style={styles.buttonText}>Get OTP</Text>
        </Button>
      </View>  
      <View style={styles.orContainer}>
          <View style={styles.horizontalLine} />
          <Text style={styles.or}>or</Text>
          <View style={styles.horizontalLine} />
        </View>
      <View>
      <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require("../../assets/google-icon.png")}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate("Registration")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: {
    color: "#EE272E",
    fontWeight: "600",
    fontSize: 24,
    marginBottom: 20,
    paddingHorizontal: 14,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 60,
    marginVertical: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderColor: "grey",
    color: "grey",
  },
  inputError: {
    borderColor: "red", // Change border color for error state
  },
  errorMessage: {
    color: "red",
    marginBottom: 8,
  },
  loginButton: {
    height: 55,
    marginVertical: 8,
    borderRadius: 30,
    backgroundColor: "#EE272E",
    alignItems: "center",
    justifyContent: "center",
    color:'#fff'
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  googleButton: {
    height: 60,
    width: 140,
    margin: 10,
    borderWidth: 1,
    borderRadius: 40,
    color: "black",
    fontWeight: "800",
    alignSelf: "center",
    borderColor: "grey",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  googleImage: {
    width: 30,
    height: 30,
    marginRight: -10,
  },
  googleText: {
    color: "black",
    fontWeight: "600",
    alignSelf: "center",
    fontSize: 18,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  or: {
    fontSize: 18,
    color: "grey",
    paddingHorizontal: 10,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: "grey",
  },
  signupText: {
    fontSize: 15,
    margin: 18,
    fontWeight: "bold",
    color: "grey",
    alignSelf: "center",
    textAlign: "center",
  },
  signupLink: {
    color: "#EE272E",
  },
};

export default Login;
