import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { Divider, CheckBox, Button, Icon, Header } from '@rneui/themed';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';




export default AddToCart = () => {
    const [items, setItems] = useState([]);
    const [img, setImg] = useState([]);
    // Function to handle the checkout button press
    const [total, setTotal] = useState(0);
    const handleCheckout = () => {
        // Implement your checkout action
    };

    useEffect(() => {
        let totalPrice = parseFloat(0);
        axios.get('http://192.168.2.94:3001/cart/getCartDetails', {
            // headers: {
            //     Authorization: `Bearer ${userDetails.authToken}`,
            // },
        }).then((response) => {
            response.data.map((item) => {
                totalPrice = totalPrice+(item.quantity*parseFloat(item.price));
                let toppings, sauces = "";
                const toppingssWithTrue = Object.keys(item.toppings).filter(key => item.toppings[key] === true);
                const saucesWithTrue = Object.keys(item.sauces).filter(key => item.sauces[key] === true);
                toppings = toppingssWithTrue.join(',');
                sauces = saucesWithTrue.join(',');
                setItems((prevState) => [...prevState, { ...item, toppings: toppings, sauces: sauces }])
            })
            setTotal(totalPrice);
        });
        axios.get('http://192.168.2.94:3001/menu/getMenuItems').then((response) => {
            setImg(response.data);
        })
    }, [])

    const handleDelete = (_id) => {
        axios.delete(`http://192.168.2.94:3001/cart/deleteCartItem?itemId=${_id}`).then((response) => {
            const newItems = items.filter(item => item._id !== _id);
            setItems(newItems);
            console.log(response);
        })

    }
    const updateItemInState = (_id, newQuantity) => {
        setItems(currentItems => currentItems.map(item => {
            if (item._id === _id) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };
    const handleMinus = ({ _id, quantity, price }) => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            let req = {
                "_id": _id,
                "quantity": newQuantity
            }
            axios.put('http://192.168.2.94:3001/cart/updateCart', req).then((response) => {
                setTotal((currState) => (parseFloat(currState) - parseFloat(price)).toFixed(2));
                updateItemInState(_id, newQuantity);
            })

        }
    }
    const handlePlus = ({_id, quantity, price}) => {
            const newQuantity = quantity + 1;
            let req = {
                "_id": _id,
                "quantity": newQuantity
            }
            axios.put('http://192.168.2.94:3001/cart/updateCart', req).then((response) => {
                setTotal((currState) => (parseFloat(currState) + parseFloat(price)).toFixed(2));
                updateItemInState(_id, newQuantity);
            })

    }

    // Render function for the flat list items
    const renderItem = ({ item }) => {
        const imageUrl = (item) => {
            const sub = img.filter(sub => sub.sub_name === item.subName);
            return ({ uri: sub[0].image })
        }
        return (
            <View style={styles.itemContainer} key={item.subName}>
                <Image
                    source={imageUrl(item)}
                    style={styles.imageStyle}
                />
                <View style={styles.itemDetailsContainer}>
                    <Text style={styles.itemTitle}>{item.subName}</Text>
                    <Text style={styles.itemToppings}>{item.size} {item.bread}</Text>
                    <Text style={styles.itemToppings}>{item.cheese}</Text>
                    <Text style={styles.itemToppings}>{item.toppings}</Text>
                    <Text style={styles.itemToppings}>{item.sauces}</Text>
                </View>

                <Text style={styles.itemPrice}>{item.price}</Text>
                <View style={styles.quantityContainer}>
                    <Pressable onPress={() => handleMinus(item)} style={styles.quantityButton}><Text>-</Text></Pressable>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <Pressable onPress={() => handlePlus(item)} style={styles.quantityButton}><Text>+</Text></Pressable>
                </View>
                <Pressable onPress={() => handleDelete(item._id)} style={styles.deleteButton}>
                    <AntDesign name="delete" size={24} color="#c72b62" />
                </Pressable>
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
    imageStyle: {
        width: 50,
        height: 50,
        marginRight: 10
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 16,
        color: '#c72b62'
    },
    itemDetailsContainer: {
        flex: 3, // Adjust the flex value as needed
        // other styles if needed
    },
    itemPriceAndQuantityContainer: {
        flex: 2, // Adjust the flex value as needed
        alignItems: 'flex-end',
        // other styles if needed
    },
    deleteButton: {
        padding: 8, // or any other styling you need
    },
    slide: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemDetailsContainer: {
        flex: 1, // Take up all available space
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
    },
    toppingsContainer: {
        marginTop: 4, // Spacing between sub name and toppings
    },
    itemToppings: {
        fontSize: 12, // Smaller font size for toppings
        color: '#666', // Grey color for toppings
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
        padding: 20,
        justifyContent: 'space-between'
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
        marginHorizontal: 4,
        borderRadius: 4
    },
    quantityText: {
        fontSize: 12,
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

