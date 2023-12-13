import React, { useMemo, useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  PermissionsAndroid,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker, Polyline } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import ItemComponent from "./ItemComponent";
// import MapView, { Marker } from "react-native-maps";

const ChooseVehicle = () => {
  const snapPoints = useMemo(() => [ "50%"], []);
  const getDirections = async (startLoc, destinationLoc) => {
    try {
      const KEY = "AIzaSyBeKmJ5q2HdnMcCLB0MwX59QenqknBEdlM"; //put your API key here.
      //otherwise, you'll have an 'unauthorized' error.
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
      );
      let respJson = await resp.json();
      let points = decode(respJson.routes[0].overview_polyline.points);
      console.log(points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      return coords;
    } catch (error) {
      return error;
    }
  };

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Dala Auto",
      imgDetails: "13.2ftx6.9ftx5.9ft",
      capacity: "capacity:900kg",
      weitage: "Small Pickup",
      itemDetails:
        "This vehicle has a large payload capacity of 3.5 tones approximately. capable of carrying construction goods,domestic goods and house/office shifting.",
      image: require("../../assets/choose2.png"),
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Tata Ace",
      imgDetails: "13.2ftx6.9ftx5.9ft",
      capacity: "capacity:900kg",
      weitage: "Medium Pickup",
      itemDetails:
        "This vehicle has a large payload capacity of 3.5 tones approximately. capable of carrying construction goods,domestic goods and house/office shifting.",
      image: require("../../assets/largeVeichle.png"),
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e278",
      title: "Pickup",
      imgDetails: "13.2ftx6.9ftx5.9ft",
      capacity: "capacity:900kg",
      weitage: "Large Pickup",
      itemDetails:
        "This vehicle has a large payload capacity of 3.5 tones approximately. capable of carrying construction goods,domestic goods and house/office shifting.",
      image: require("../../assets/choose3.png"),
    },
  ];
  const [selectedId, setSelectedId] = useState();

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#EE272E" : "transparent";
    const color = item.id === selectedId ? "white" : "#EE272E";

    return (
      <ItemComponent
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };


  const [region, setRegion] = useState({
    latitude: 37.7749, // default latitude (for example, San Francisco)
    longitude: -122.4194, // default longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState([]);

  // Function to get user's current location
  const getUserLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setRegion({
              ...region,
              latitude,
              longitude,
            });
          },
          (error) => console.log(error),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);
  const routeCoordinates = [
    { latitude: 37.7749, longitude: -122.4194 }, // Starting point
    // Add more coordinates as needed for your route
    // Example: { latitude: ..., longitude: ... },
    // ...
  ];

  return (
    <View style={styles.container}>
    <MapView
     style={styles.map}
     region={region}
     showsUserLocation={true}
     followsUserLocation={true}
   >
     {markers.map((marker, index) => (
       <Marker
         key={index}
         coordinate={{
           latitude: marker.latitude,
           longitude: marker.longitude,
         }}
         title={marker.title}
       />
     ))}
     <Polyline
          coordinates={routeCoordinates}
          strokeColor="#EE272E"
          strokeWidth={2}
        />
   </MapView>
   <BottomSheet 
  //  index={1} 
   snapPoints={snapPoints}>
     <View style={styles.bottomSheetContent}>
       <Text style={styles.text1}>Choose Vehicle</Text>
       <ScrollView>
         <FlatList
           data={DATA}
           renderItem={renderItem}
           keyExtractor={(item) => item.id}
           extraData={selectedId}
         />
       </ScrollView>
       <View style={styles.footer}>
         <View style={{ flexDirection: "row" }}>
           <Text>Cash</Text>
           <Text>PromoCode</Text>
         </View>
         <TouchableOpacity style={styles.BookNow}>
           <Text style={styles.BookNowText}>Book Now</Text>
         </TouchableOpacity>
       </View>
     </View>
   </BottomSheet>
 </View>
  );
};

export default ChooseVehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomSheetContent: {
    flex: 1,
    // paddingHorizontal: 16,
  },
  text1: {
    color: "#EE272E",
    fontWeight: "600",
    fontSize: 20,
    paddingHorizontal: 20,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
  },
  BookNow: {
    backgroundColor: "#EE272E",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    margin: 8,
    width: 340,
  },
  BookNowText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
