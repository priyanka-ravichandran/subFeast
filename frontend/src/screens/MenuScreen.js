import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { ScrollView, View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");
const boxSize = width / 2;

const MenuScreen = ({ navigation }) => {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    // Function to fetch data from the backend using Axios
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.2.94:3001/menu/getMenuItems'); // Adjust the URL as needed
        const formattedData = response.data.map(item => ({
          ...item,
          // Convert Decimal128 price to a string; adjust as needed if your data structure is different
          price: item.price.$numberDecimal ? item.price.$numberDecimal.toString() : item.price,
        }));
        setSubs(formattedData); // Set state with the response data
      } catch (error) {
        console.error('Failed to fetch the menu items:', error);
      }
    };

    fetchData();
  }, []);

  const handlePress = (item) => {
    navigation.navigate("addsub", item);
  }

  const renderRows = (data) => {
    return data.reduce((acc, item, index) => {
      const chunkIndex = Math.floor(index / 2);

      if (!acc[chunkIndex]) {
        acc[chunkIndex] = []; // start a new chunk
      }

      acc[chunkIndex].push(
        <Pressable
          key={item.sub_name} // Assuming name is unique
          style={[styles.imageBox, index % 2 === 0 ? styles.leftBox : styles.rightBox]}
          onPress={() => handlePress(item)}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: boxSize - 55, height: boxSize - 55 }}
          />
          <Text style={styles.boxText}>{item.sub_name}</Text>
          <Text style={styles.priceText}>{item.price}</Text>
        </Pressable>
      );

      return acc;
    }, []).map((rowItems, rowIndex) => (
      <View key={rowIndex} style={styles.boxRow}>
        {rowItems}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}></View>


      {renderRows(subs)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    width: "100%",
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: 'Roboto-Bold',
    color: "#c72b62",
    textAlign: "left",
    paddingHorizontal: 10,
    marginBottom: 20

  },
  welcomeContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  boxRow: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-around",
    width: "100%",
  },
  priceText: {
    color: "#c72b62", // Choose a color that fits your theme
    fontSize: 14,
    fontFamily: 'Roboto-Bold', // Adjust based on your available fonts
    textAlign: "center",
    marginTop: 5, // Adjust spacing as needed
  },
  box: {
    width: boxSize - 15,
    height: boxSize - 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    marginHorizontal: 5,
  },
  imageBox: {
    padding: 10,
  },
  leftBox: {
    marginRight: 10,
    backgroundColor: "#fff",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 8,
    borderRadius: 10,
  },
  rightBox: {
    marginLeft: 10,
    backgroundColor: "#fff",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 8,
    borderRadius: 10,
  },
  boxText: {
    color: "#c72b62",
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    textAlign: "center",
  },
});

export default MenuScreen;
