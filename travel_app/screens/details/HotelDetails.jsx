import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  AppBar,
  DescriptionText,
  HeightSpacer,
  HotelMap,
  NetworkImage,
  ReuseableBtn,
  ReuseableText,
  // ReviewList
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import styles from "./HotelDetails.style";
import reuseable from "../../components/Reuseable/reuseable.Style";
import { Rating } from "react-native-stock-star-rating";
import { Feather } from "@expo/vector-icons";

import { useRoute } from "@react-navigation/native";
const HotelDetails = ({ navigation }) => {
  const router = useRoute();
  const { item } = router.params;

  let coordinates = {
    id: item._id,
    title: item.title,
    latitude: item.latitude,
    longitude: item.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  return (
    <ScrollView>
      <View style={{ height: 80 }}>
        <AppBar
          color={COLORS.white}
          color1={COLORS.white}
          icon={"search1"}
          title={item.title}
          onPress={() => navigation.goBack()}
          onPress1={() => navigation.navigate("HotelSearch")}
          top={50}
          left={20}
          right={20}
          drop={true}
        />
      </View>
      <View>
        <View style={styles.container}>
          <NetworkImage
            source={item.imageUrl}
            width={"100%"}
            height={200}
            borderRadius={20}
          />
          <View style={styles.titleContainer}>
            <View style={styles.titleColumn}>
              <ReuseableText
                text={item.title}
                family={"medium"}
                size={SIZES.large}
                color={COLORS.black}
              />
              <HeightSpacer height={10} />
              <ReuseableText
                text={item.location}
                family={"medium"}
                size={SIZES.medium}
                color={COLORS.black}
              />
              <HeightSpacer height={15} />
              <View style={reuseable.rowWithSpace("space-between")}>
                <Rating
                  maxStars={5}
                  stars={item.rating}
                  bordered={false}
                  color={"#FD9942"}
                />
                <ReuseableText
                  text={`(${item.review})`}
                  family={"medium"}
                  size={SIZES.medium}
                  color={COLORS.gray}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.container, { paddingTop: 90 }]}>
          <ReuseableText
            text={"Description"}
            family={"medium"}
            size={SIZES.large}
            color={COLORS.black}
          />
          <HeightSpacer height={10} />
          <DescriptionText text={item.description} />
          <HeightSpacer height={10} />
          <ReuseableText
            text={"Location"}
            family={"medium"}
            size={SIZES.large}
            color={COLORS.black}
          />
          <HeightSpacer height={15} />
          <ReuseableText
            text={item.location}
            family={"regular"}
            size={SIZES.small + 2}
            color={COLORS.gray}
          />
          <HotelMap coordinates={coordinates} />
          <View style={reuseable.rowWithSpace("space-between")}>
            <ReuseableText
              text={"Reviews"}
              family={"medium"}
              size={SIZES.large}
              color={COLORS.gray}
            />
            <TouchableOpacity>
              <Feather name="list" size={20} />
            </TouchableOpacity>
          </View>
          <HeightSpacer height={10} />
          {/* <ReviewList /> */}
        </View>
        <View style={[reuseable.rowWithSpace("space-between"), styles.bottom]}>
          <View>
            <ReuseableText
              text={`\$ ${item.price}`}
              family={"medium"}
              size={SIZES.large}
              color={COLORS.black}
            />
            <HeightSpacer height={5} />
            <ReuseableText
              text={"Jan 01 - Dec 05"}
              family={"medium"}
              size={SIZES.medium}
              color={COLORS.gray}
            />
          </View>
          <ReuseableBtn
            onPress={() => navigation.navigate("SelectRoom")}
            btnText={"Select Room"}
            width={(SIZES.width - 50) / 2.2}
            backgroundColor={COLORS.green}
            borderColor={COLORS.green}
            borderWidth={0}
            textColor={COLORS.white}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HotelDetails;
