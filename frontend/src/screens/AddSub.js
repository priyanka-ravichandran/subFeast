import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { Divider } from '@rneui/themed';



const AddSub = ({route}) => {

  const {name,price, image,description } = route.params;
  return (
    <View style={styles.container}>
     
      {/* Content */}
      <ScrollView style={styles.scrollViewStyle}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/sc.jpg') }
            style={styles.imageStyle}
          />
        </View>

        <Text style={styles.titleText}>{name}</Text>
        <Text style={styles.descriptionText}>
          {description}
        </Text>
        <Divider style={styles.divider} />
        <Text style={styles.chooseText}>
         Choose your size
        </Text>
        <Text style={styles.optionText}>
         FootLong <br/>
         6 inches
        </Text>
       

        
        
        {/* Size selection, etc... */}
        {/* Implement your size selection and recommended beverages here */}
        
        {/* Footer button */}
        <Pressable style={styles.footerButton}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Background for the screen

  },
  svgCurve: {
    position: 'absolute',
    top: -50, // Adjust as needed
  },
  scrollViewStyle: {
    backgroundColor: 'white',
    borderTopRightRadius: 30, // Create curve effect
    borderTopLeftRadius: 30,
    overflow: 'hidden', // This line is crucial to make curve visible
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 50, // Adjust based on your SVG curve
  },
  imageStyle: {
    width: '100%', // Set image width
    height: 200, // Set image height
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:20
  },
  descriptionText: {
    fontSize: 16,
    margin: 10, 
    fontFamily: 'Roboto-LightItalic',

  },
  chooseText: {
    fontFamily:'Roboto-Bold',
    fontSize:18,
    margin:8
  },
  optionText: {
    fontFamily:'Roboto-Thin',
    fontSize:16,
    margin:5
  },
  divider: {
    width: '100%', // You can adjust the width as needed
    backgroundColor: '#cdcdcd', // Here you can set your desired color
    height: 8, 
  },
  footerButton: {
    backgroundColor: '#c72b62', // Use brand color
    padding: 20,
    width:"90%",

    justifyContent: 'center',
    marginLeft: "auto",
    marginRight:"auto",
    alignItems: 'center',
    paddingVertical: 20, // Adjust the padding as needed
    paddingHorizontal: 10, // Adjust the padding as needed
    borderRadius: 20, // Adjust for roundness
    // Shadows for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  buttonText: {
    color: 'white',

    fontSize: 18,
    fontWeight: 'bold',
  },
  // ... More styles for your size selection and beverage options
});

export default AddSub ;
