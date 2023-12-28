import {
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  AppBar,
  AssetImage,
  HeightSpacer,
  ReuseableBtn,
  ReuseableText,
} from "../../components";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { useFocusEffect } from "@react-navigation/native";
import { getPaymentMethod } from "../../Request/Paymnet";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import reuseable from "../../components/Reuseable/reuseable.Style";
import EditCard from "./EditCard";

const Card = ({ navigation }) => {
  const sheetRef = useRef(null);
  const [method, setMethod] = useState([]);
  const [card, setCard] = useState("");
  const [Card, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const getPayment = async () => {
        setLoading(true);
        const [method] = await Promise.all([getPaymentMethod()]);
        if (method.method) {
          setMethod(method.method);
        }
        if (method.card) {
          setCards(method.card);
        }
        setLoading(false);
      };
      getPayment();
    }, [])
  );
  const generateCardNumber = useCallback(
    (index) => generateRandomCardNumber(index),
    []
  );
  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };

  const generatedCardNumber = useMemo(() => generateCardNumber, []);
  const getCardColor = (cardType) => {
    switch (cardType) {
      case "Visa":
        return COLORS.lightGreen;
      case "Mastercard":
        return COLORS.red;
      default:
        return COLORS.gray;
    }
  };
  const cardImages = {
    Visa: require("../../assets/images/Visa.png"),
    Mastercard: require("../../assets/images/Mastercard.png"),
    PayPal: require("../../assets/images/PayPal.png"),
  };
  const handleName = useCallback(async (item) => {
    setCard(item);
    openSheet();
  }, []);
  const myCard = (card) => Card.find((item) => item.card === card);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 40 }}>
        <AppBar
          onPress={() => navigation.goBack()}
          color={COLORS.white}
          title={"Customize your Card"}
          left={20}
          right={20}
        />
      </View>
      <HeightSpacer height={40} />
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.green} />
      ) : method.length === 0 ? (
        <ReuseableText
          align={"center"}
          text={"Create a payment method"}
          size={TEXT.xLarge}
          color={COLORS.dark}
          family={"bold"}
        />
      ) : (
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item}
          data={method}
          renderItem={({ item, index }) => (
            <View style={styles.cardWrapper}>
              <View
                style={[
                  styles.cardContainer,
                  { backgroundColor: getCardColor(item) },
                ]}
              >
                <View style={reuseable.rowWithSpace("space-between")}>
                  <ReuseableText
                    family={"bold"}
                    size={TEXT.xLarge}
                    text={item}
                    color={COLORS.white}
                  />
                  <MaterialCommunityIcons
                    name="integrated-circuit-chip"
                    size={35}
                    color={COLORS.white}
                  />
                </View>
                <ReuseableText
                  color={COLORS.white}
                  size={TEXT.xLarge}
                  align={"center"}
                  text={generatedCardNumber(index)}
                  family={"xtrabold"}
                />
                <HeightSpacer height={10} />
                <View style={reuseable.rowWithSpace("space-around")}>
                  <View>
                    <ReuseableText
                      color={COLORS.white}
                      size={TEXT.medium}
                      family={"bold"}
                      text={"Card holder"}
                    />
                    <View style={{ height: 30 }}>
                      {myCard(item) === undefined ? (
                        <ReuseableBtn
                          textColor={COLORS.white}
                          btnText={"edit name"}
                          width={100}
                          backgroundColor={getCardColor(item)}
                          borderColor={COLORS.lightWhite}
                          borderWidth={1}
                          onPress={() => handleName(item)}
                        />
                      ) : (
                        <ReuseableText
                          size={TEXT.xLarge}
                          family={"bold"}
                          color={COLORS.white}
                          text={myCard(item).name}
                        />
                      )}
                    </View>
                  </View>
                  <View>
                    <ReuseableText
                      color={COLORS.white}
                      size={TEXT.medium}
                      family={"bold"}
                      text={"Expires"}
                    />
                    <ReuseableText
                      color={COLORS.white}
                      size={TEXT.medium}
                      family={"bold"}
                      text={"7/27"}
                    />
                  </View>
                </View>
                <View style={reuseable.rowWithSpace("flex-end")}>
                  <AssetImage width={60} height={40} data={cardImages[item]} />
                </View>
              </View>
              <EditCard
                ref={sheetRef}
                closeSheet={closeSheet}
                card={card}
                navigation={navigation}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
  },
  cardContainer: {
    height: 200,
    width: Dimensions.get("window").width - 20,
    borderColor: COLORS.green,

    marginVertical: 10,
    borderRadius: 15,
    padding: 20,
  },
  cardWrapper: {
    marginHorizontal: 10,
  },
});

function generateRandomCardNumber(index) {
  let cardNumber = "";

  // Generate the first 15 digits (excluding the last digit for the Luhn algorithm)
  for (let i = index; i < 15 + index; i++) {
    const digit = Math.floor(Math.random() * 10);
    cardNumber += digit.toString();
  }

  // Use the Luhn algorithm to generate the last digit (checksum)
  const sum = cardNumber
    .split("")
    .map(Number)
    .reduceRight((acc, digit, idx) => {
      if (idx % 2 !== 0) {
        let double = digit * 2;
        if (double > 9) {
          double -= 9;
        }
        return acc + double;
      }
      return acc + digit;
    }, 0);

  const lastDigit = (10 - (sum % 10)) % 10; // Calculate the last digit
  cardNumber += lastDigit.toString(); // Append the last digit to the card number

  // Format the card number into groups of four digits separated by spaces
  const formattedCardNumber = cardNumber.match(/.{1,4}/g).join(" ");

  return formattedCardNumber;
}
