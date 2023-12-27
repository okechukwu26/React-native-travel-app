import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  AppBar,
  AssetImage,
  HeightSpacer,
  ReuseableText,
} from "../../components";
import { COLORS, TEXT } from "../../constants/theme";
import reuseable from "../../components/Reuseable/reuseable.Style";

const Payments = ({ navigation }) => {
  return (
    <SafeAreaView>
      <AppBar
        top={40}
        left={20}
        right={20}
        color={COLORS.white}
        title={"Payment Methods"}
        onPress={() => navigation.goBack()}
      />
      <HeightSpacer height={40} />
      <View style={{ marginTop: 40 }}>
        <ReuseableText
          color={COLORS.dark}
          align={"center"}
          family={"regular"}
          size={TEXT.large}
          text={"Select your payment method"}
        />
        <View
          style={[reuseable.rowWithSpace("space-around"), { marginTop: 20 }]}
        >
          <AssetImage
            width={50}
            mode={"cover"}
            height={40}
            data={require("../../assets/images/Visa.png")}
          />
          <ReuseableText
            size={TEXT.large}
            text={"Visa Card"}
            color={COLORS.dark}
            family={"regular"}
          />
          <Text>hello</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Payments;

const styles = StyleSheet.create({});
