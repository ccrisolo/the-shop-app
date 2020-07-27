//need to complete component

import React from "react";
import SignatureCapture from "react-native-signature-capture";
import { Text, View, Button, StyleSheet } from "react-native";

const SignatureCapture = (props) => {
  return (
    <SignatureCapture
      {...props}
      saveImageFileInExtStorage='true'
      showBoarder='true'
      showNativeButtons='true'
      showTitleLabel='true'
      viewMode='landscape'
    />
  );
};

const styles = StyleSheet.create({});

export default SignatureCapture;
