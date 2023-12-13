import React, { useState } from "react";
import { Icon } from "react-native-elements";// import the relevant icon component
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  Modal,
} from "react-native";
const ItemComponent = ({ item, onPress, backgroundColor, textColor }) => {
  const [modalVisible, setModalVisible] = useState(false);// Sample data for rates and charges
  const baseFare = 10;
  const ratePerKm = 0.5;
  const ratePerMinute = 0.2;
  const waitingCharges = 5;
  const calculateTotalAmount = () => {  // Function to calculate the total amount
    const distanceCharge = item.distance * ratePerKm;
    const timeCharge = item.time * ratePerMinute;
    const totalAmount = baseFare + distanceCharge + timeCharge + waitingCharges;
    return totalAmount.toFixed(2); // Round to 2 decimal places
  };
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[
          styles.item,
          { backgroundColor, borderColor: "#EE272E", borderWidth: 1 },
        ]}
      >
        <Image
          source={item.image}
          style={[styles.image, { resizeMode: "cover" }]}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
          <Text style={[styles.details, { color: textColor }]}>
            {item.imgDetails}
          </Text>
          <Text style={[styles.details, { color: textColor }]}>
            {item.capacity}
          </Text>
        </View>

        <Text style={[styles.price, { color: textColor }]}>$XX.XX</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TouchableOpacity
              style={styles.closeButtonModal}
              onPress={() => setModalVisible(false)}
            >
              <Icon 
                type="material-community"
                name="window-close"
                // color={colors.grey1}
                fontSize={26} />
            </TouchableOpacity>

            <Image source={item.image} />
            <Text style={styles.modalText}>{item.weitage}</Text>
            <Text style={{ textAlign: "center", fontSize: 13,fontWeight:'600',color: "gray",padding:5 }}>
              {item.itemDetails}
            </Text>
            <View style={styles.dashedLine}></View>
            <View>
              <Text style={{textAlign:'center',fontSize:18}}>Amount</Text>
              
                <Text style={[styles.totalAmount]}>
              ${calculateTotalAmount()}
            </Text>
            <Text>Total Estimated fare price including taxes</Text>
          
            </View>
            <View style={[styles.farelist ]}>
          <View>
            <Text style={styles.detailLabel}>Base Fare:</Text>
            <Text style={styles.detailLabel}>Rate per Km:</Text>
            <Text style={styles.detailLabel}>Rate per Minute:</Text>
            <Text style={styles.detailLabel}>Waiting Charges:</Text>
          </View>

          <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
            <Text style={styles.detailValue}>${baseFare.toFixed(2)}</Text>
            <Text style={styles.detailValue}>${ratePerKm.toFixed(2)}</Text>
            <Text style={styles.detailValue}>${ratePerMinute.toFixed(2)}</Text>
            <Text style={styles.detailValue}>${waitingCharges.toFixed(2)}</Text>
           
          </View>
        </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 30,
                margin:30
              }}
            >
              <Image source={require("../../assets/groupimg.png")}/>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.closeButton}>Got It</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
    width: 332,
    height: 110,
  },
  image: {
    width: 100,
    height: 70,
    marginRight: 16,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    marginRight: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding:10,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    height:'80%'
  },
  modalText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#EE272E",
    textAlign: "center",
  },
  closeButton: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#EE272E",
    width: 130,
    height: 50,
    borderRadius: 40,
    padding: 9,
    marginLeft:10
  },
    closeButtonModal: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },

  dashedLine: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    borderStyle: "dashed",
    marginVertical: 10,
    width: "100%", // Adjust the width as needed
  },
  farelist: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin:30,
  },
  detailLabel: {
    color:'gray',
    fontSize: 16,
    marginRight:60,
    // marginBottom: 5, // Add spacing between label and value
  },
  detailValue: {
    color:'gray',
    fontSize: 16,
    marginLeft:40,
    // marginBottom: 5, 
  },
  totalAmount: {
    color: "#EE272E",
    fontWeight: "bold",
    textAlign:'center',
    margin:10,
    fontSize:23
  },
});
export default ItemComponent;
