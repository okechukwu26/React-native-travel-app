import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import reuseable from "../Reuseable/reuseable.Style";
import ReuseableText from "../Reuseable/ReuseableText";
import { Feather } from "@expo/vector-icons";
import { COLORS, SIZES, TEXT } from "../../constants/theme";

import { useNavigation } from "@react-navigation/native";
import HotelCard from "../Tiles/Hotel/HotelCard";

const BestHotels = ({ hotel }) => {
  const navigation = useNavigation();

  return (
    <View>
      <View
        style={[
          reuseable.rowWithSpace("space-between"),
          { paddingBottom: 10, paddingHorizontal: 10 },
        ]}
      >
        <ReuseableText
          text={"Nearby Hotels"}
          family={"medium"}
          size={TEXT.medium}
          color={COLORS.black}
        />
        <TouchableOpacity onPress={() => navigation.navigate("HotelList")}>
          <Feather name="list" size={20} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={hotel}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: 2 }}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <HotelCard
            item={item}
            margin={7}
            onPress={() => navigation.navigate("HotelDetails", { item })}
          />
        )}
      />
    </View>
  );
};

export default BestHotels;

const styles = StyleSheet.create({});
