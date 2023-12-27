import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

const DescriptionInput = ({
  onChange,
  placeholder,
  borderRadius,
  width,
  height,
  color,
  backgroundColor,
  borderColor,
  padding,
  family,
}) => {
  return (
    <View style={{ marginHorizontal: 25, alignItems:"flex-start", justifyContent:"flex-start" }}>
      <TextInput
        multiline
        placeholder={placeholder}
        style={styles.input(
          borderRadius,
          width,
          height,
          color,
          backgroundColor,
          borderColor,
          padding,
          family
        )}
        onChangeText={onChange}
      />
    </View>
  );
};

export default DescriptionInput;

const styles = StyleSheet.create({
  input: (
    borderRadius,
    width,
    height,
    color,
    backgroundColor,
    borderColor,
    padding,
    family
  ) => ({
    width,
    height,
    borderColor,
    backgroundColor,
    borderRadius,
    color,
    padding,
    fontFamily: family,
  }),
});
