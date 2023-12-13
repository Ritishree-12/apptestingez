// Validation.js
import React from "react";
import {
    Text,
  } from "react-native";

const Validation = ({ value, regex, errorMessage }) => {
  const isValid = regex.test(value);

  return isValid ? null : <Text style={{ color: "red" }}>{errorMessage}</Text>;
};

export default Validation;
