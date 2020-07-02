import React from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";

const AuthScreen = (props) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address" // <=== keyboardType works for both iOS and Android
              required
              email
              autoCapitalize="none"
              errorMessage="Please enter a valid email address."
              onInputChange={() => {}}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry //not supported by our custom Input, but its forwarded from the built in TextInput that is used to build Input
              required
              minLength={5}
              autoCapitalize="none"
              errorMessage="Please enter a password."
              onInputChange={() => {}}
              initialValue=""
            />
            <View style={styles.buttonContainer} >
              <Button title="Login" color={Colors.primary} onPress={() => {}} />
            </View>
            <View style={styles.buttonContainer} >
              <Button
                title="Switch to Sign Up"
                color={Colors.accent}
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
