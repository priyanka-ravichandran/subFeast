import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Image, Dimensions, SafeAreaView } from 'react-native';
import { Button, ButtonGroup, withTheme, Text } from '@rneui/themed';
import Carousel from 'react-native-reanimated-carousel';



export default function LandingScreen({navigation}) {
  const [entries] = useState([
    { uri: require("../../assets/sub1.jpeg") },
    { uri: require("../../assets/sub1.jpeg") },
    { uri: require("../../assets/sub1.jpeg") },
    // Add more items as needed
  ]);
 const handlePress = ()=> {
   navigation.navigate("signup");
 }

  
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.uri} style={styles.image} resizeMode="cover" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text h1 style={styles.h1Style}>SubFeast</Text>
        <Carousel
          width={Dimensions.get('window').width -40}
          height={700}
          data={entries}
          autoPlay={true}
          autoPlayInterval={3000}
          renderItem={renderItem}
         // pagingEnabled={true}
          loop={true} // Enable looping
        />
        <Button
          title="Lets get Started"
          onPress={handlePress}
          titleStyle={{ fontWeight: '700', fontFamily: "Roboto-Bold", }}
          buttonStyle={{
            backgroundColor: 'rgba(199, 43, 98, 1)',
            borderColor: 'transparent',
            borderWidth: 0,
            alignItems: 'center',

          }}
          containerStyle={{
            width: 200,
            height: 45,
            alignSelf: 'center',
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding:20

  },
  h1Style: {
    fontFamily: "Roboto-Bold",
    textAlign: 'center',
    fontWeight: '300',
    color: "#c72b62",
    alignItems: "center",
    textAlign: 'center', // Center the text horizontally
    marginTop: 20,

  },
  innerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  slide: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  image: {
    width: "100%", // Adjust as needed
    height: "200%", // Adjust as needed
    resizeMode:"contain",
    marginTop: 300,
  },
});
