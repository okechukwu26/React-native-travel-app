import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";


const ReuseableBtn = React.memo(
  ({
    onPress,
    textColor,
    btnText,
    width,
    backgroundColor,
    borderWidth,
    borderColor,
    loader,
  }) => {
    
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.btnStyle(
          width,
          backgroundColor,
          borderWidth,
          borderColor,
          loader
        )}
        disabled={loader}
      >
        <Text style={styles.btnText(textColor)}>{btnText}</Text>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    // Compare props to determine if re-rendering is necessary
    return (
      prevProps.onPress === nextProps.onPress &&
      prevProps.textColor === nextProps.textColor &&
      prevProps.btnText === nextProps.btnText &&
      prevProps.width === nextProps.width &&
      prevProps.backgroundColor === nextProps.backgroundColor &&
      prevProps.borderWidth === nextProps.borderWidth &&
      prevProps.borderColor === nextProps.borderColor &&
      prevProps.loader === nextProps.loader
    );
  }
);

const styles = StyleSheet.create({
  btnText: (color) => ({
    fontFamily: 'medium',
    fontSize: SIZES.medium,
    color,
  }),
  btnStyle: (width, backgroundColor, borderWidth, borderColor, loader) => ({
    width,
    backgroundColor: loader ? COLORS.lightGrey : backgroundColor,
    borderWidth,
    borderColor: loader ? COLORS.lightGrey : borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: SIZES.small,
  }),
});

export default ReuseableBtn;

