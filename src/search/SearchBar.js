import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Icon } from 'react-native-elements';
import axios from 'axios';

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [additionalData, setAdditionalData] = useState([
    { id: '1', info: 'Additional Info 1' },
    { id: '2', info: 'Additional Info 2' },
    { id: '3', info: 'Additional Info 3' },
  ]);
  const [locationList, setLocationList] = useState([
    { id: '4', name: 'Cuttack' },
    { id: '5', name: 'Bhubaneswar' },
    { id: '6', name: 'Jayadev Vihar' },
  ]);
  const autoCompleteRef = useRef(null);

  const fetchLocationSuggestions = async (searchTerm) => {
    try {
      // Simulate fetching location suggestions from an API
      // In a real-world scenario, you would use your actual API for this
      const fakeLocationData = [
        { id: '1', description: 'Fake Location 1' },
        { id: '2', description: 'Fake Location 2' },
        { id: '3', description: 'Fake Location 3' },
      ];

      setSearchResults(fakeLocationData);
    } catch (error) {
      console.error('Error fetching location suggestions:', error.message);
    }
  };

  const handleSearch = (data, details = null) => {
    autoCompleteRef.current?.clear();

    const locationName = details?.name || data.description;

    // Set the selected location in the search bar
    autoCompleteRef.current?.setAddressText(locationName);

    const combinedData = searchResults.map((result) => ({
      ...result,
      additionalInfo: additionalData.find((item) => item.id === result.id)?.info || 'No additional info',
    }));

    setSearchResults(combinedData);
  };

  const clearRecentPlaces = () => {
    setLocationList([]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.resultItem} onTouchEnd={() => handleSearch(item)}>
      <Icon type="material-community" name="clock-time-four" size={20} color="#333" style={{ marginRight: 10 }} />
      <View>
        <Text>{item.description}</Text>
        <Text style={{ alignSelf: 'center', marginTop: 5 }}>Additional Info: {item.additionalInfo}</Text>
      </View>
      <Text style={{ marginLeft: 'auto', marginRight: 10 }}>5 km</Text>
    </View>
  );

  return (
    <View style={styles.container}>
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={handleSearch}
      onInputChange={(text) => fetchLocationSuggestions(text)}
      styles={{
        container: {
          flex: 0,
        },
        textInputContainer: {
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        textInput: {
          backgroundColor: 'mistyrose',
          height: 55,
          color: '#5d5d5d',
          fontSize: 16,
          borderRadius: 45,
          borderColor: 'red',
          borderWidth: 1,
          paddingHorizontal: 40,
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
      ref={autoCompleteRef}
    />

    {searchResults.map(renderItem)}

    <View style={styles.recentPlacesContainer}>
      <Text style={styles.recentPlacesTitle}>Recent Places</Text>
      {locationList.length > 0 && (
        <TouchableOpacity onPress={clearRecentPlaces}>
          <Text style={{color:'red'}}>Clear All</Text>
        </TouchableOpacity>
      )}
    </View>
    <View style={styles.horizontalLine} />
    {locationList.map((location) => (
      <View key={location.id} style={styles.resultItem} onTouchEnd={() => handleSearch({ description: location.name })}>
        <Icon type="material-community" name="clock-outline" size={20} color="#333" style={{ marginRight: 10 }} />
        <Text style={{ alignSelf: 'center' }}>{location.name}</Text>
        <Text style={{ marginLeft: 'auto', marginRight: 10 }}>2 km</Text>
      </View>
    ))}

    {/* Horizontal line after Recent Places */}
 

  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  recentPlacesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 10,
    marginTop:15
  },
  recentPlacesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  horizontalLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 15,
  },
});

export default SearchBar;
