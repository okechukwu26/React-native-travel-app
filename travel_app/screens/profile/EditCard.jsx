import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS, TEXT } from "../../constants/theme";
import reuseable from "../../components/Reuseable/reuseable.Style";
import { AssetImage, ReuseableBtn, ReuseableText } from "../../components";

const EditCard = React.forwardRef(({ closeSheet, card }, ref) => {
  const cardImages = {
    Visa: require("../../assets/images/Visa.png"),
    Mastercard: require("../../assets/images/Mastercard.png"),
    PayPal: require("../../assets/images/PayPal.png"),
    // Add more card types as needed
  };
  console.log(card);
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
});
