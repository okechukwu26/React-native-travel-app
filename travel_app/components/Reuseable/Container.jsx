import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import AppBar from "./AppBar";
import HeightSpacer from "./HeightSpacer";
import { COLORS } from "../../constants/theme";

const Container = ({ children, screen, title, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        top={10}
        left={20}
        right={20}
        title={title}
        color={COLORS.white}
        drop={true}
        icon={"edit"}
        onPress={() => navigation.navigate("Onboard")}
        onPress1={() => navigation.navigate(screen)}
      />
      <HeightSpacer height={50} />
      {children}
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
  },
});
