import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ImageBackground, Pressable } from 'react-native';
import { Divider, CheckBox, Button, Icon } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';


const AddSub = ({ route, navigation }) => {
  const { sub_name, description, image, price } = route.params;
  const [selectedSizeIndex, setSizeIndex] = useState(0);
  const [selectedBreadIndex, setBreadIndex] = useState(0);
  const [selectedCheeseIndex, setCheeseIndex] = useState(0);
  const [didRender, setDidRender] = useState(false);
  const [selectedPrice, setPrice] = useState(parseFloat(price).toFixed(2));
  const toppings = [
    "Lettuce",
    "Spinach",
    "Tomatoes",
    "Crispy Onions",
    "Cucumbers",
    "Pickles",
    "Green Peppers",
    "Black Olives",
    "Red Onions",
    "Jalapenos",
    "Banana Peppers",
  ];
  const sauces = [
    'Jerk Aioli',
    'Mayonnaise',
    'Mustard',
    'Smokey Honey Mustard',
    'Chitpotle Southwest',
    'Sweet Onion Teriyaki',
    'Peppercorn Ranch',
  ]
  const breads = [{ name: 'Multigrain', price: '+CA$0.50' },
  { name: 'Classic Italian', price: '+CA$0.40' },
  { name: 'Flatbread', price: '+CA$0.60' },
  { name: 'Herbs and Cheese', price: '+CA$0.70' }];

  const cheeses = [{ name: 'Habanero Jack', price: '+CA$2.00' },
  { name: 'Processed Cheddar', price: '+CA$1.50' },
  { name: 'Shredded Monterey Cheddar', price: '+CA$2.50' },
  { name: 'Canadian Cheddar', price: '+CA$2.00' },];

  useEffect(() => {
    let finalPrice = parseFloat(selectedPrice) + parseFloat(breads[selectedBreadIndex].price.split('$')[1])+ parseFloat(cheeses[selectedCheeseIndex].price.split('$')[1])
    setPrice(finalPrice)
    setDidRender(true);
  }, [])
  useEffect(() => {
    // Function to fetch data from the backend using Axios
    if (didRender) {
      if (selectedSizeIndex == 1) {
        setPrice((prevState) => {
          let value = parseFloat(prevState) + 4.24
          return value.toFixed(2);
        })
      }
      else {
        setPrice((prevState) => {
          let value = parseFloat(prevState) - 4.24
          return value.toFixed(2);
        })
      }

    }


  }, [selectedSizeIndex]);




  const [checkedTopping, setCheckedTopping] = useState(
    Object.fromEntries(toppings.map(topping => [topping, false]))
  );

  const handleTopping = (topping) => {
    setCheckedTopping(prevState => ({ ...prevState, [topping]: !prevState[topping] }));
  };
  const [checkedSauce, setCheckedSauce] = useState(
    Object.fromEntries(sauces.map(sauce => [sauce, false]))
  );
  const handleSauce = (sauce) => {
    setCheckedSauce(prevState => ({ ...prevState, [sauce]: !prevState[sauce] }));
  };
  const handlePress = () => {
    const postData = {
      "subName": sub_name,
      "price": selectedPrice,
      "quantity": 1,
      "size": selectedCheeseIndex == 0 ? "6 Inches" : "FootLong",
      "bread": breads[selectedBreadIndex].name,
      "cheese": cheeses[selectedCheeseIndex].name,
      "toppings": checkedTopping,
      "sauces": checkedSauce,
    };
    axios.post('http://192.168.2.94:3001/cart/addtoCart', postData, {

    }).then((response) => {

      console.log(response);
      navigation.navigate("addtocart");
    }).catch((error) => {
      console.error('Failed to add cart:', error);

    });

  }
  const handleIcon = () => {
    navigation.navigate("menuscreen");
  }



  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Pressable onPress={handleIcon} style={styles.icon}>
          <Ionicons name="arrow-back-outline" size={25} />
        </Pressable>
        <Image
          source={{ uri: image }}
          style={styles.imageStyle}
        />

      </View>
      <Text style={styles.titleText}>{sub_name}</Text>
      <Text style={styles.descriptionText}>
        {description}
      </Text>

      <Divider style={styles.divider} />

      <ScrollView style={styles.scrollViewStyle}>


        <Text style={styles.chooseText}>

          Choose your size
        </Text>
        <View style={styles.optionContainer}>
          <CheckBox
            checked={selectedSizeIndex === 0}
            onPress={() => setSizeIndex(0)}
            iconType="material-community"
            checkedIcon="radiobox-marked"
            uncheckedIcon="radiobox-blank"
            checkedColor="#c72b62"
            containerStyle={styles.checkBoxContainer}
          />
          <View style={styles.labelAndPriceContainer}>
            <Text style={styles.optionText}>6 Inches </Text>
            <Text style={styles.priceText}></Text>
          </View>
        </View>
        <View style={styles.optionContainer}>
          <CheckBox
            checked={selectedSizeIndex === 1}
            onPress={() => setSizeIndex(1)}
            iconType="material-community"
            checkedIcon="radiobox-marked"
            uncheckedIcon="radiobox-blank"
            checkedColor="#c72b62"
            containerStyle={styles.checkBoxContainer}
          />
          <View style={styles.labelAndPriceContainer}>
            <Text style={styles.optionText}>FootLong</Text>
            <Text style={styles.priceText}>+CA$4.24</Text>
          </View>
        </View>

        <Divider style={styles.divider} />
        <Text style={styles.chooseText}>Bread</Text>

        {breads.map((item, index) => (
          <View key={item.name} style={styles.optionContainer}>
            <CheckBox
              checked={selectedBreadIndex === index}
              onPress={() => {
                let modifiedPrice = parseFloat(selectedPrice) - parseFloat(breads[selectedBreadIndex].price.split("$")[1])
                setPrice((modifiedPrice + parseFloat(breads[index].price.split("$")[1])).toFixed(2))
                setBreadIndex(index)
              }}
              iconType="material-community"
              checkedIcon="radiobox-marked"
              uncheckedIcon="radiobox-blank"
              checkedColor="#c72b62"
              containerStyle={styles.checkBoxContainer}
            />
            <View style={styles.labelAndPriceContainer}>
              <Text style={styles.optionText}>{item.name}</Text>
              <Text style={styles.priceText}>{item.price}</Text>
            </View>
          </View>
        ))}

        <Divider style={styles.divider} />
        <Text style={styles.chooseText}>
          Cheese
        </Text>
        {cheeses.map((item, index) => (
          <View key={item.name} style={styles.optionContainer}>
            <CheckBox
              checked={selectedCheeseIndex === index}
              onPress={() =>{
                let modifiedPrice = parseFloat(selectedPrice) - parseFloat(cheeses[selectedCheeseIndex].price.split("$")[1])
                setPrice((modifiedPrice + parseFloat(cheeses[index].price.split("$")[1])).toFixed(2))
                setCheeseIndex(index)}
              } 
              iconType="material-community"
              checkedIcon="radiobox-marked"
              uncheckedIcon="radiobox-blank"
              checkedColor="#c72b62"
              containerStyle={styles.checkBoxContainer}

            />

            <View style={styles.labelAndPriceContainer}>
              <Text style={styles.optionText}>{item.name}</Text>
              <Text style={styles.priceText}>{item.price}</Text>
            </View>
          </View>
        ))}
        <Divider style={styles.divider} />
        <Text style={styles.chooseText}>
          Veggies
        </Text>
        {toppings.map((topping) => (
          <CheckBox
            key={topping}
            title={topping}
            checked={checkedTopping[topping]}
            titleProps={{ style: styles.optionText }}
            checkedColor="#c72b62"
            onPress={() => handleTopping(topping)}
          />
        ))}


        <Divider style={styles.divider} />
        <Text style={styles.chooseText}>
          Sauces
        </Text>
        {sauces.map((sauce) => (
          <CheckBox
            key={sauce}
            title={sauce}
            checked={checkedSauce[sauce]}
            titleProps={{ style: styles.optionText }}
            checkedColor="#c72b62"
            onPress={() => handleSauce(sauce)}
          />
        ))}

      </ScrollView>
      <Button
        title={`Add to Cart CAD ${selectedPrice}`}
        onPress={handlePress}
        titleStyle={{ fontWeight: '700', fontFamily: "Roboto-Bold", }}
        buttonStyle={{
          backgroundColor: 'rgba(199, 43, 98, 1)',
          borderRadius: 40,
          width: "100%",
          height: 45,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          display: "flex",
          justifyContent: "center"
        }}
        icon={<Icon
          color="white"
          containerStyle={{}}
          disabledStyle={{}}
          iconProps={{}}
          iconStyle={{}}
          name="shopping-cart"
          onLongPress={() => console.log("onLongPress()")}
          onPress={() => console.log("onPress()")}
          size={30}
          type="material"
        />}
        containerStyle={{
          padding: 20,
          width: "100%",
          marginTop: 10,
          display: "flex",
          alignItems: "center"

        }}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',



  },
  icon: {

    marginRight: 360


  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingRight: 20

  },
  imageButton: {
    height: 30,
    width: "50%",
    background: "#c72b62"
  },
  priceText: {
    fontWeight: '300',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },
  labelAndPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',

  },
  checkBoxContainer: {
    padding: 0,
    margin: 0,
    marginRight: 10,
    backgroundColor: 'transparent',
    borderWidth: 0,

  },
  scrollViewStyle: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: 'hidden',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 50,

  },
  imageStyle: {
    width: '100%',
    height: 200,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20
  },
  descriptionText: {
    fontSize: 16,
    margin: 10,
    fontFamily: 'Roboto-LightItalic',

  },
  chooseText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    margin: 8
  },
  optionText: {
    fontWeight: '500',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    margin: 5,


  },
  divider: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    height: 8,
  },
  footerButton: {
    backgroundColor: '#c72b62',
    padding: 20,
    width: "90%",
    marginBottom: 50,
    marginTop: 10,

    justifyContent: 'center',
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',

    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddSub;
