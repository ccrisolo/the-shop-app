import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import ProductsOverviewScreen, {
  screenOptions as productsOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, {
  screenOptions as productDetailScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import CartScreen, {
  screenOptions as cartScreenOptions,
} from "../screens/shop/CartScreen";
import OrdersScreen, {
  screenOptions as ordersScreenOptions,
} from "../screens/shop/OrdersScreen";
import UserProductsScreen, {
  screenOptions as userProductsScreenOptions,
} from "../screens/user/UserProductsScreen";
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from "../screens/user/EditProductScreen";
import AuthScreen, {
  screenOptions as authScreenOptions,
} from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";
import Order from "../models/order";

//react nav 5 syntax
// defaultNavOptions can stay the same with react nav v5
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
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions} //screenOptions are located/configured within the component they belong
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

// React Nav V4 syntax
// const ProductsNavigator = createStackNavigator(
//   {
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

//React Nav V5 syntax
const OrderStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrderStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrderStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrderStackNavigator.Navigator>
  );
};

// React Nav V4 syntax
// const OrdersNavigator = createStackNavigator(
//   {
//     Orders: OrdersScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-list" : "ios-list"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

//React Nav V5 syntax
const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

//again React Nav V4 syntax below
// const AdminNavigator = createStackNavigator(
//   {
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-create" : "ios-create"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

//CREATING DRAWERS in React Nav V5
//React Nav V5 drawer navigator syntax
const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                  //then navtigate to the auth screen upon logout
                  // props.navigation.navigate('Auth');
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

//React Nav V4 syntax for drawer navigation
// const ShopNavigator = createDrawerNavigator(
//   {
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator,
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primary,
//     },
//     contentComponent: (props) => {
//       const dispatch = useDispatch();
//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
//           <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
//             <DrawerItems {...props} />
//             <Button
//               title="Logout"
//               color={Colors.primary}
//               onPress={() => {
//                 dispatch(authActions.logout());
//                 //then navtigate to the auth screen upon logout
//                 // props.navigation.navigate('Auth');
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     },
//   }
// );

//react nav v5 syntax, the const below is our new component
const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

//react nav v4 syntax below
// const AuthNavigator = createStackNavigator(
//   {
//     Auth: AuthScreen,
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator,
// });

// export default createAppContainer(MainNavigator);
