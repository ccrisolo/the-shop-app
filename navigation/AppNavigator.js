import React from "react";
import { useSelector } from "react-redux";
//react-navigation-5 uses NavigationContainer
import { NavigationContainer } from "@react-navigation/native";
//create new components using createStackNavigator
import { createStackNavigator } from "@react-navigation/stack";
import { ProductsNavigator } from "./ShopNavigator";

//version 5 creatStackNavigator is a function that does not need an object like RN4
//MyStack is now a stack component that you wrap in NavigationContainer that was
//imported from @react-navigation/native
const MyStack = createStackNavigator();

//now that ShopNavigator is wrapped in NavigationContainer, we have access to redux using useSelector
const AppNavigator = (props) => {
  //useSelector is passed the state in redux store
  const isAuth = useSelector((state) => !!state.auth.token);

  //this is ReactNavigation v5 style of setting up navigation
  return (
    <NavigationContainer>
      <ProductsNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
