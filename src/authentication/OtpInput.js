import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const OtpInput = ({ value, onChangeText, index, autoFocus, onFocus, onBlur }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleFocus = () => {
    if (onFocus) {
      onFocus(index);
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur(index);
    }
  };

  const handleTextChange = (text) => {
    onChangeText(text);

    if (text.length > 0 && index < 4) {
      // Move to the next input field
      setTimeout(() => {
        if (onFocus) {
          onFocus(index + 1);
        }
      }, 0);
    }
  };

  const inputStyles = {
    ...styles.input,
    borderColor: value !== '' ? 'red' : 'black',
    backgroundColor: value !== '' ? 'mistyrose' : 'white',
  };

  return (
    <TextInput
      ref={inputRef}
      style={inputStyles}
      value={value}
      onChangeText={handleTextChange}
      maxLength={1}
      keyboardType="numeric"
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,
  },
});

export default OtpInput;