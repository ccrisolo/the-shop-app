import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform } from "react-native";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import Colors from "../constants/Colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
};
//createStackNavigator navigates bewtween screens in first arg, second arg has all navigation Options
const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  }, {
    defaultNavigationOptions: defaultNavOptions
  }
);

//create a drawer navigator and merge stack navigators into it from above
const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrdersNavigator,
}, {
  contentOptions: {
    activeTintColor: Colors.primary
  }
});

//since ProductsNavigator and OrdersNavigator are combined in ShopNavigator, we export ShopNavigtor in
//createAppContainer below
export default createAppContainer(ShopNavigator);
