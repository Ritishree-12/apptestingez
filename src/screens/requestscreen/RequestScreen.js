import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker, Polyline } from "react-native-maps";


const RequestScreen = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');

  const handleCancelBooking = () => {
    console.log('Booking cancelled.');
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
        if (navigator.geolocation) {
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
          console.log("Geolocation is not supported by this device.");
        }
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

  // Function to get user's current location
 
  return (
    <View style={styles.container}>
        <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
        loadingEnabled={true}
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
      <View style={styles.navbar}>
        <View style={styles.circle}>
          <TouchableOpacity>
            <Ionicons name="menu-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.requestBar}>
        <View style={[styles.inputContainer, styles.locationInputContainer, { backgroundColor: 'white' }]}>
          <FontAwesome name="circle" size={20} color="red" style={styles.locationIcon} />
          <Text style={[styles.inputLabel, { fontSize: 18 }]}>Pickup Location</Text>
          <Text
            style={[styles.input, { color: 'black', fontSize: 16 }]}
            placeholder="Enter Pickup Location"
            value={pickupLocation}
            onChangeText={(text) => setPickupLocation(text)}
          />
          <FontAwesome name="map-marker" size={20} color="#EE272E" style={styles.targetIcon} />
        </View>
        <View style={[styles.inputContainer, styles.locationInputContainer, { backgroundColor: 'white' }]}>
          <FontAwesome name="circle" size={20} color="green" style={styles.locationIcon} />
          <Text style={[styles.inputLabel, { fontSize: 18 }]}>Destination Location</Text>
          <Text
            style={[styles.input, { color: 'black', fontSize: 16 }]}
            placeholder="Enter Destination"
            value={destination}
            onChangeText={(text) => setDestination(text)}
          />
          <FontAwesome name="map-marker" size={20} color="#4CAF50" style={styles.targetIcon} />
        </View>
      </View>

      {/* Confirmation Text and Cancel Booking Button */}
      <View style={styles.confirmationContainer}>
        <View style={styles.confirmationBox}>
          <Text style={[styles.confirmationText, { fontSize: 18 }]}>Waiting for driver's confirmation...</Text>
          <TouchableOpacity style={styles.cancelBookingButton} onPress={handleCancelBooking}>
            <Text style={[styles.buttonText, { fontSize: 18 }]}>Cancel Booking</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
  },
  map:{
    flex:1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:50,
  },
  circularIcon: {
    color: 'black',
    padding: 16,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestBar: {
    flex: 1,
    marginTop: 16,
    justifyContent: 'flex-start',
  },
  inputContainer: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white', 
  },
  locationInputContainer: {
    paddingLeft: 8,
    marginBottom: 0,
  },
  inputLabel: {
    marginLeft: 8,
    color: 'black',
  },
  input: {
    height: 50, 
    flex: 1,
  },
  locationIcon: {
    marginRight: 8,
  },
  confirmationContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    
  },
  confirmationBox: {
    backgroundColor: 'white',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingVertical: 90,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  
  confirmationText: {
    color: 'black',
  },
  cancelBookingButton: {
    marginTop: 16, 
    paddingVertical: 12, 
    paddingHorizontal: 24, 
    borderRadius: 8,
    backgroundColor: '#EE272E',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default RequestScreen;