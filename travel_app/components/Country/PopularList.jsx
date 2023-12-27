import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import ReuseableTitle from "../Reuseable/ReuseableTitle";
import { useNavigation } from "@react-navigation/native";
import ReuseableText from "../Reuseable/ReuseableText";
import { TEXT, COLORS } from "../../constants/theme";

const PopularList = ({ data }) => {
  const navigation = useNavigation();
  const renderItem = useCallback(({ item }) => (
    <View style={{ marginBottom: 10 }}>
      <ReuseableTitle
        item={item}
        onPress={() => navigation.navigate("PlaceDetails", item._id)}
      />
    </View>
  ));
  return data.length === 0 ? (
    <ReuseableText
      text={"No popular place yet"}
      size={TEXT.large}
      family={"medium"}
      color={COLORS.dark}
      align={"center"}
    />
  ) : (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  );
};

export default PopularList;

const styles = StyleSheet.create({});
