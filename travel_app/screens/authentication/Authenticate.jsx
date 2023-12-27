import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import React from "react";
import { AssetImage, HeightSpacer, ReuseableBtn } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";

const Authenticate = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AssetImage
        width={"100%"}
        height={500}
        mode={"contain"}
        data={require("../../assets/images/bg2.png")}
      />
      <HeightSpacer height={20} />
      <View style={{ marginHorizontal: 20 }}>
        <ReuseableBtn
          textColor={COLORS.white}
          btnText={"Register"}
          width={SIZES.width - 50}
          backgroundColor={COLORS.green}
          borderWidth={1}
          borderRadius={12}
          borderColor={COLORS.green}
          onPress={() => navigation.navigate("User")}
        />
      </View>
    </View>
  );
};

export default Authenticate;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: COLORS.lightWhite,
    height: "100%",
  },
});
