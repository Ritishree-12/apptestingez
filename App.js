import React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./src/screens/Splash";
import Welcome from "./src/authentication/Welcome";
// import MapScreen from "./src/screens/MapScreen";
import HomeScreen from "./src/screens/HomeScreen";
import Registration from "./src/authentication/Registration";
import Login from "./src/authentication/Login";
import ChooseVehicle from "./src/screens/ChooseVehicle";
import OtpScreen from "./src/authentication/OtpScreen";
import HomeScreen2 from "./src/screens/HomeScreen2";
import Onboarding from "./src/screens/onboardingScreens/Onboarding";
import Onboard from "./src/screens/onboardingScreens/Onboard";
import RequestScreen from "./src/screens/requestscreen/RequestScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="Onboard"
          component={Onboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="Map" component={MapScreen} options={{ title: "Back" }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Back" }} /> */}
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ title: "Back" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Back" }}
        />
        <Stack.Screen
          name="ChooseVehicle"
          component={ChooseVehicle}
          // options={{ title: "Back" }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Otp"
          component={OtpScreen}
          options={{ title: "Back" }}
        />
      <Stack.Screen
          name="HomeScreen2"
          component={HomeScreen2}
          options={{ headerShown: false }}
        />
      <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="RequestScreen"
          component={RequestScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


// import React from "react";
// import 'react-native-gesture-handler';
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import Splash from "./src/screens/Splash";
// import Welcome from "./src/authentication/Welcome";
// import HomeScreen from "./src/screens/HomeScreen";
// import Registration from "./src/authentication/Registration";
// import Login from "./src/authentication/Login";
// import ChooseVehicle from "./src/screens/ChooseVehicle";
// import OtpScreen from "./src/authentication/OtpScreen";
// import HomeScreen2 from "./src/screens/HomeScreen2";
// import Onboarding from "./src/screens/onboardingScreens/Onboarding";
// import Onboard from "./src/screens/onboardingScreens/Onboard";

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Splash"
//         screenOptions={{ headerShown: false }}
//       >
//         <Stack.Screen name="Splash" component={Splash} />
//         <Stack.Screen name="Onboarding" component={Onboarding} />
//         <Stack.Screen name="Onboard" component={Onboard} />
//         <Stack.Screen name="Welcome" component={Welcome} />
//         <Stack.Screen name="Registration" component={Registration} />
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="ChooseVehicle" component={ChooseVehicle} />
//         <Stack.Screen name="Otp" component={OtpScreen} />
//         <Stack.Screen name="HomeScreen2" component={HomeScreen2} />
//         <Stack.Screen name="HomeScreen" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

