// LocationSearchScreen.js
import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const LocationSearchScreen = ({ route, navigation }) => {
  // You can use the route parameter to determine if it's for "From" or "To" location
  const isFromLocation = route.params?.isFromLocation;

  // Implement your search logic here

  const handleSelectLocation = (selectedLocation) => {
    // You can use the selected location and update the state in the HomeScreen component
    // For example, if it's for "From" location, you can update setFromLocation(selectedLocation)
    // Update your state accordingly

    // Close the search screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{isFromLocation ? 'From' : 'To'} Location Search</Text>
      {/* Implement your search UI and logic here */}
      <TextInput
        style={styles.input}
        placeholder={`Enter ${isFromLocation ? 'From' : 'To'} Location`}
        placeholderTextColor="grey"
        // Implement onChangeText and value based on your search logic
      />
      <Pressable
        style={styles.selectLocationButton}
        onPress={() => handleSelectLocation('Selected Location')}>
        <Text style={styles.selectLocationButtonText}>Select Location</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    height: 60,
    marginBottom: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 40,
    borderColor: 'grey',
    fontSize: 18,
    fontWeight: '400',
  },
  selectLocationButton: {
    backgroundColor: '#EE272E',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  selectLocationButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LocationSearchScreen;
