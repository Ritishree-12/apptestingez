import React from "react";
import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";

const COLORS = {
  primary: "#EE272E",
  title: "white",
};
const SIZES = {
  h1: 32,
  h2: 24,
  h4: 18,
  width: 400,
};
const Onboarding = () => {
  const navigation = useNavigation();
  const slides = [
    {
      id: 1,
      title: "eZTruck",
      description:"Effortlessly book reliable mini trucks for all your logistics needs with our user-friendly app",
      image: require("../../../assets/tracking_logo.png"),
      width: "60%",
      height: "50%",
    },
    {
      id: 2,
      description:"Onboard your vehicle with ezTruck and improve your income by logistic transportation",
      image: require("../../../assets/onbordingImg2.png"),
      width: "100%", // Change the width as needed
      height: "60%", // Change the height as needed
    },
    {
      id: 3,
      description:"Effortlessly book reliable for all your logistics needs with our user-friendly app",
      image: require("../../../assets/onbordingImg3.png"),
      width: "100%", // Change the width as needed
      height: "60%", // Change the height as needed
    },
  ];
  const ovalButtonStyle = {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
  };
  const buttonLabel = (label) => {
    return (
      <View
        style={{
          padding: 12,
        }}
      >
        <Text
          style={{
            color: COLORS.title,
            fontWeight: "600",
            fontSize: SIZES.h4,
          }}
        >
          {label}
        </Text>
      </View>
    );
  };
  const handleOnboardingComplete = () => {
    navigation.navigate("Welcome");
  };
  return (
    <View style={styles.container}>
      <AppIntroSlider
        data={slides}
        renderItem={({ item }) => {
          return (
            <View style={styles.view1}>
              <Image
                source={item.image}
                style={{
                  width: item.width,
                  height: item.height,
                }}
                resizeMode="contain"
              />
              <Text style={styles.text1}>{item.title}</Text>
              <Text style={styles.text2}>
                <Text style={styles.text3}>Effortlessly book reliable</Text> for
                all your logistics needs with our user-friendly app
              </Text>
            </View>
          );
        }}
        activeDotStyle={{
          backgroundColor: "#FFDCDC",
          width: 30,
        }}
        showSkipButton
        renderSkipButton={() =>
          buttonLabel(<Text style={{ color: "white" }}>Skip</Text>)
        }
        renderNextButton={() =>
          buttonLabel(<Text style={{ color: "white" }}>Next</Text>)
        }
        renderDoneButton={() =>
          buttonLabel(<Text style={{ color: "white" }}>Done</Text>)
        }
        onDone={handleOnboardingComplete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent:'center',
  },
  view1: {  
    alignItems: "center",
    padding: 30,
    justifyContent:'center',
    paddingTop: 100
  },
  text1: {
    fontWeight: "bold",
    color: COLORS.title,
    fontSize: SIZES.h1,
  },
  text2: {
    textAlign: "center",
    color: COLORS.title,
    fontWeight: "600",
  },
  text3: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 17,
  },
});

export default Onboarding;
