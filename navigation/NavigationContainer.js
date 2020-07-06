import React, { useEffect, useRef } from "react";
import ShopNavigator from "./ShopNavigator";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

//now that ShopNavigator is wrapped in NavigationContainer, we have access to redux using useSelector
const NavigationContainer = (props) => {
  //pass navRef as props in ShopNavigator to have access to it
  const navRef = useRef();
  //useSelector is passed the state in redux store
  const isAuth = useSelector((state) => !!state.auth.token);
  //useEffect to react to changes in state checking against the dependency (e.g.[isAuth])
  useEffect(() => {
    if (!isAuth) {
      //in order to access ShopNavigator we need to use useRef hook
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;
