import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image, Dimensions } from 'react-native';
import { Divider, CheckBox, Button, Icon, Header } from '@rneui/themed';



export default AddToCart = () => {
  
    // Function to handle the checkout button press
    const [total, setTotal] = useState(0);
    const handleCheckout = () => {
        // Implement your checkout action
    };
    useEffect(() => {
        items.map((item) => {
            setTotal((prev) => prev + item.price)
        })
    }, [])
    const render = ({ item, index }) => {
        return (
            <View style={styles.slide}>
                <Image source={item.uri} style={styles.image} resizeMode="cover" />
            </View>
        );
    };
    // Render function for the flat list items
    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View style={styles.itemPriceContainer}>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
                <View style={styles.quantityContainer}>
                    <Pressable style={styles.quantityButton}><Text>-</Text></Pressable>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <Pressable style={styles.quantityButton}><Text>+</Text></Pressable>
                </View>
            </View>
        )
    };

    return (
        <View style={styles.container}>

            <Text style={styles.headerText}>SubFeast</Text>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <View style={styles.subtotalContainer}>
                <Text style={styles.subtotalText}>Subtotal</Text>
                <Text style={styles.subtotalAmount}>{total}</Text>
            </View>
            {/* Additional options and actions */}
            <Button
                title="Pay Amount"
                onPress={handleCheckout}
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
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 16,
        color: '#c72b62'
    },
    slide: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
      },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
    },
    itemTitle: {
        fontSize: 16,
        //fontWeight: 'bold',
    },
    itemPriceContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtotalContainer: {
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subtotalText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtotalAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemOriginalPrice: {
        fontSize: 14,
        textDecorationLine: 'line-through',
        color: '#999',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        padding: 8,
        backgroundColor: '#eaeaea',
        marginHorizontal: 8,
    },
    quantityText: {
        fontSize: 16,
    },

    checkoutButton: {
        backgroundColor: 'black',
        padding: 16,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Add more styles as needed
});

