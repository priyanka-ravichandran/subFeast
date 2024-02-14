import React from 'react';
import { ScrollView, View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { Header } from '@rneui/themed';

const { width } = Dimensions.get("window");
const boxSize = width / 2;

const MenuScreen = ({navigation}) => {
  const subs = [
    { name: 'Steak and Cheese', price: '$13.00', image: require('../../assets/sc.jpg'), description: "Hot, tender, shaved steak, served on the bread of your choice. It's just bursting with flavour! Toast your bread to add even more great taste." },
    { name: 'Kicking Chicken', price: '$10.00', image: require('../../assets/kc.jpg'),description: "Are you ready to kick up the heat? Take a bite out of our Kicking Chicken and let your taste buds revel in the heatwave. Packed with perfectly seasoned chicken breast and draped with a creamy Sriracha sauce, every mouthful is a bold statement. The crunch of fresh lettuce, the sweetness of ripe tomatoes, and the zing of banana peppers come together to elevate the experience. And just when you think it can't get any better, the fiery embrace of Habanero Jack cheese doubles down on the spice."},
    { name: 'Little Italy', price: '$15.00', image: require('../../assets/li.jpg'), description:"Transport your tastebuds to Bel Paese with the Little Italy. Featuring Rotisserie-style chicken, this delicioso sub is lettuce, spinach, tomatoes, cucumbers, green peppers, red onions, plus mozzarella and parmesan cheese before being drizzled with the zing of Garlic Aioli, our House Sandwich sauce and delicious Pesto, just to remind you of nonna's place."},
    { name: 'Teriyaki Chicken', price: '$12.00', image: require('../../assets/tc.jpg'), description:"We added some crunch to this sweet & savoury favourite! The Teriyaki Crunch sandwich comes with teriyaki-glazed chicken strips, lettuce, spinach, tomatoes, cucumbers, green peppers, red onions, double the processed cheddar cheese, the satisfying crunch of our NEW crispy onions and topped with our NEW Sweet Onion Teriyaki sauce." },
    { name: 'Chicken Rancher', price: '$14.00', image: require('../../assets/cr.jpg'), description:"A fan favourite gets some added zing. The Chicken Rancher features Canadian farm-raised chicken and pork, made with rotisserie-style chicken and Maplewood Smoked Bacon, topped with lettuce, spinach, tomatoes, cucumbers, green peppers, red onions, twice the shredded Monterrey Jack and cheddar, and the zesty kick of our Peppercorn Ranch dressing."},
    { name: 'Great Canadian Club', price: '$13.00', image: require('../../assets/gcc.jpg'), description:"Love the taste of Canada? Join the Club! Enjoy our Great Canadian Club, with Deli-Style turkey and ham, Maplewood Smoked bacon, made from Canadian farm-raised turkey and pork, topped with twice the Canadian cheddar cheese, lettuce, tomatoes, and our Smoky Honey Mustard sauce for some added zest, eh?" },

  ];
  const handlePress = (subName) =>{
    let subObj = subs.find(sub => sub.name === subName);
    console.log(subObj)
    navigation.navigate("addsub",subObj);
  
  }

  const renderRows = (data) => {
    return data.reduce((acc, item, index) => {
      const chunkIndex = Math.floor(index / 2);

      if (!acc[chunkIndex]) {
        acc[chunkIndex] = []; // start a new chunk
      }

      acc[chunkIndex].push(
        <Pressable
          key={item.name} // Assuming name is unique
          style={[styles.imageBox, index % 2 === 0 ? styles.leftBox : styles.rightBox]}
          onPress={()=>handlePress(item.name)}
        >
          <Image
            source={item.image}
            style={{ width: boxSize - 55, height: boxSize - 55 }}
          />
          <Text style={styles.boxText}>{item.name}</Text>
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
      {/* <Text style={styles.welcomeText}>
        SubFeast
      </Text> */}
      <Header
        leftComponent={
          <Image
            source={require('../../assets/shopping-cart.gif')}
            style={{ width: 30, height: 30 }}
          />
        }
        centerComponent={{ text: 'SUBFEAST', style: { color: 'white', fontFamily: 'Roboto-Bold', fontSize: 18 } }}
        rightComponent={{ source: require('../../assets/shopping-cart.gif') }}
        containerStyle={{
          backgroundColor: '#c72b62',
          justifyContent: 'space-around',
        }}
      />
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
