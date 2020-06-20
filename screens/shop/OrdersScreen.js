import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

const OrdersScreen = (props) => {
  //both orders in useSelector refer to the one in App.js and order.js reducer repectively
  const orders = useSelector((state) => state.orders.orders);

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>}
    />
  );
};

OrdersScreen.navigationOptions = {
    headerTitle: 'Your Orders'
};

const styles = StyleSheet.create({});

export default OrdersScreen;
