import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

import Colors from "../constants/Colors";

const StartupScreen = (props) => {
    const dispatch = useDispatch();
    //check AsyncStorage for valid token using useEffect
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate('Auth');
                return;
            }
            const transformedData = JSON.parse(userData);
            const {token, userId, expiryDate} = transformedData;
            //check if token is still valid
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth');
                return;
            }
            //need to calculate expiration time to forward to authenticate action below
            const expirationTime = expirationDate.getTime() - new Date().getTime();

            props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(userId, token, expirationTime));
        };

        tryLogin();
    }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
