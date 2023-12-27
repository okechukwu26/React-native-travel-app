import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useMemo, useState } from "react";
import {
  AppBar,
  AssetImage,
  HeightSpacer,
  ReuseableBtn,
  ReuseableText,
  WidthSpacer,
} from "../../components";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import reuseable from "../../components/Reuseable/reuseable.Style";
import ToggleSwitch from "toggle-switch-react-native";

import ToastManager, { Toast } from "toastify-react-native";
import { CreatePaymentMethod } from "../../Request/Paymnet";

const Payments = ({ navigation }) => {
  const [switchStates, setSwitchStates] = useState([
    { name: "Visa", toggle: false },
    { name: "Mastercard", toggle: false },
    { name: "PayPal", toggle: false },
  ]);

  const toggleSwitch = (index) => {
    const updatedSwitchStates = switchStates.map((item, idx) => ({
      ...item,
      toggle: idx === index,
    }));
    setSwitchStates(updatedSwitchStates);
  };
  const memoizedSwitchStates = useMemo(() => switchStates, [switchStates]);
  const card = [
    {
      name: "Visa Card",
      card: require("../../assets/images/Visa.png"),
    },
    {
      name: "Master Card",
      card: require("../../assets/images/Mastercard.png"),
    },
    {
      name: "PayPal",
      card: require("../../assets/images/PayPal.png"),
    },
  ];
  const SavePaymentMethod = () => {
    const select = switchStates.every((item) => item.toggle === false);
    if (select) {
      return Toast.error("select one payment method");
    }
    const selected = switchStates.find((item) => item.toggle === true);
    console.log(selected);
    CreatePaymentMethod("paymentMethod", selected);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ToastManager width={300} />
      <View style={{ height: 40 }}>
        <AppBar
          top={40}
          left={20}
          right={20}
          color={COLORS.white}
          title={"Payment Methods"}
          onPress={() => navigation.goBack()}
        />
      </View>
      <HeightSpacer height={40} />
      <View style={{ marginTop: 40, marginHorizontal: 10 }}>
        <ReuseableText
          color={COLORS.dark}
          align={"center"}
          family={"medium"}
          size={TEXT.large}
          text={"Select your payment method"}
        />
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={card}
          keyExtractor={(item) => item.card}
          renderItem={({ item, index }) => (
            <View
              style={[
                reuseable.rowWithSpace("space-around"),
                { marginTop: 20 },
              ]}
            >
              <AssetImage
                width={50}
                mode={"cover"}
                height={40}
                data={item.card}
              />
              <WidthSpacer width={20} />
              <View style={{ flex: 1 }}>
                <ReuseableText
                  size={TEXT.large}
                  text={item.name}
                  color={COLORS.dark}
                  family={"medium"}
                />
              </View>
              <ToggleSwitch
                isOn={memoizedSwitchStates[index].toggle}
                onColor={COLORS.green}
                offColor={COLORS.blue}
                size="medium"
                onToggle={() => toggleSwitch(index)}
              />
            </View>
          )}
        />
      </View>
      <View style={{ position: "absolute", bottom: 10 }}>
        <View style={{ marginHorizontal: 20 }}>
          <ReuseableBtn
            textColor={COLORS.white}
            btnText={"Save Payment Method"}
            width={SIZES.width - 50}
            backgroundColor={COLORS.green}
            borderColor={COLORS.green}
            borderWidth={1}
            onPress={SavePaymentMethod}
          />
        </View>
        <HeightSpacer height={10} />
        <View style={{ marginHorizontal: 20 }}>
          <ReuseableBtn
            textColor={COLORS.white}
            btnText={"Create Card"}
            width={SIZES.width - 50}
            backgroundColor={COLORS.blue}
            borderColor={COLORS.blue}
            borderWidth={1}
            onPress={() => navigation.navigate("Card")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Payments;

const styles = StyleSheet.create({});
