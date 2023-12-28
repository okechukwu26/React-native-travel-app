import { StyleSheet, Text, TextInput, Alert, View } from "react-native";
import React, { useCallback, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import reuseable from "../../components/Reuseable/reuseable.Style";
import {
  AssetImage,
  HeightSpacer,
  ReuseableBtn,
  ReuseableText,
} from "../../components";

import ToastManger, { Toast } from "toastify-react-native";
import { CustomizeCard, getPaymentMethod } from "../../Request/Paymnet";
import { useFocusEffect } from "@react-navigation/native";
const EditCard = React.forwardRef(({ closeSheet, card, navigation }, ref) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const cardImages = {
    Visa: require("../../assets/images/Visa.png"),
    Mastercard: require("../../assets/images/Mastercard.png"),
    PayPal: require("../../assets/images/PayPal.png"),
    // Add more card types as needed
  };
  const handleSubmit = async () => {
    if (!name) {
      return setError("This field is required", "top");
    }
    const info = {
      name,
      card,
    };
    setLoading(true);
    await CustomizeCard(closeSheet, info, navigation);
    setLoading(false);
  };

  return (
    <RBSheet
      ref={ref}
      height={190}
      duration={250}
      //closeOnDragDown
      dragFromTopOnly
      customStyles={{
        container: styles.container,
      }}
    >
      <View style={styles.wrapper}>
        <View
          style={[reuseable.rowWithSpace("space-between"), { marginTop: 10 }]}
        >
          <ReuseableText
            text={card}
            family={"xtrabold"}
            size={TEXT.large}
            color={COLORS.white}
          />
          <AssetImage
            mode={"cover"}
            data={cardImages[card]}
            width={50}
            height={50}
          />
        </View>
        <ReuseableText text={"Customize your name on your card"} />
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} onChangeText={setName} />
        </View>
        {error && !name && (
          <ReuseableText
            family={"medium"}
            color={COLORS.red}
            size={TEXT.medium}
            align={"center"}
            text={error}
          />
        )}
        <HeightSpacer height={10} />
        <View style={styles.wrapper}>
          <ReuseableBtn
            textColor={COLORS.white}
            btnText={"Customize"}
            backgroundColor={COLORS.red}
            borderWidth={1}
            borderColor={COLORS.lightRed}
            onPress={handleSubmit}
            loader={loading}
          />
        </View>
      </View>
    </RBSheet>
  );
});

export default EditCard;

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: COLORS.green,
  },
  wrapper: {
    marginHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    height: 30,
    width: SIZES.width - 50,
    paddingHorizontal: 10,
  },
  input: {
    height: "100%",
    width: "100%",
  },
});
