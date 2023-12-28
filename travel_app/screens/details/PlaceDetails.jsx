import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import {
  DescriptionText,
  HeightSpacer,
  NetworkImage,
  ReuseableBtn,
  ReuseableText,
} from "../../components";
import AppBar from "../../components/Reuseable/AppBar";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import reuseable from "../../components/Reuseable/reuseable.Style";
import { Feather } from "@expo/vector-icons";
import PopularList from "../../components/Country/PopularList";

const PlaceDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;

  return (
    <ScrollView>
      <View>
        <NetworkImage
          source={item.imageUrl}
          width={"100%"}
          height={350}
          borderRadius={0}
        />
        <AppBar
          color={COLORS.white}
          color1={COLORS.white}
          icon={"search1"}
          title={item.title}
          onPress={() => navigation.goBack()}
          onPress1={() => {}}
          top={40}
          left={20}
          right={20}
          drop={true}
        />
      </View>
      <View style={styles.description}>
        <ReuseableText
          family={"medium"}
          text={item.location}
          size={TEXT.large}
          color={COLORS.black}
        />
        <DescriptionText text={item.description} />
        <View style={{ alignContent: "center" }}>
          <HeightSpacer height={15} />
          <View style={reuseable.rowWithSpace("space-between")}>
            <ReuseableText
              family={"medium"}
              text={"Popular Hotels"}
              size={TEXT.large}
              color={COLORS.black}
            />
            <TouchableOpacity onPress={() => {}}>
              <Feather name="list" size={20} />
            </TouchableOpacity>
          </View>
          <HeightSpacer height={15} />
          {item.popular !== undefined && <PopularList data={item.popular} />}
          <ReuseableBtn
            onPress={() => navigation.navigate("HotelSearch")}
            btnText={"Find Best Hotel"}
            width={SIZES.width - 40}
            backgroundColor={COLORS.green}
            borderColor={COLORS.green}
            borderWidth={0}
            textColor={COLORS.white}
          />
          <HeightSpacer height={40} />
        </View>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F8",
  },
  description: {
    marginHorizontal: 20,
    paddingTop: 20,
  },
});
