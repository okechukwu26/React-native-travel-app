import { Image, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TopBookings, TopInfo, TopTrips } from "../../screens";
import { COLORS, SIZES } from "../../constants/theme";
import styles from "./TopTab.style";
import AppBar from "../Reuseable/AppBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeightSpacer from "../Reuseable/HeightSpacer";
import ReuseableText from "../Reuseable/ReuseableText";
import { getProfile } from "../../Request/Profile.js";
import NetworkImage from "../Reuseable/NetworkImage";

const Tab = createMaterialTopTabNavigator();
const AuthTopTab = ({ navigation, email, setLoggedIn, setEmail }) => {
  const [profile, setProfile] = useState({});
  const handleLogout = useCallback(async () => {
    await AsyncStorage.removeItem("user");
    setLoggedIn(false);
    setEmail("");
    navigation.navigate("Home");
  }, [setLoggedIn, navigation, email]);
  const myProfile = useCallback(async () => {
    const profile = await getProfile();
    if (profile) {
      setProfile(profile);
    }
  }, []);

  useEffect(() => {
    myProfile();
  }, [myProfile]);

  console.log(profile);

  return (
    <View>
      <View style={{ backgroundColor: COLORS.lightWhite }}>
        <View>
          <Image
            source={require("../../assets/images/profile.jpg")}
            style={styles.backgroundImage}
          />
          <AppBar
            top={40}
            left={20}
            right={20}
            color={COLORS.white}
            icon={"logout"}
            color1={COLORS.white}
            onPress1={handleLogout}
            onPress={() => navigation.navigate("Home")}
          />
          <View style={styles.profile}>
            <NetworkImage
              source={profile.imageUrl}
              width={150}
              height={150}
              borderRadius={75}
            />
            <HeightSpacer height={5} />

            <View style={{ alignItems: "center" }}>
              <ReuseableText
                text={profile.UserName}
                family="medium"
                size={SIZES.medium}
                color={COLORS.white}
              />
            </View>
            <HeightSpacer height={5} />
            <View style={styles.name}>
              <View style={{ alignItems: "center" }}>
                <ReuseableText
                  text={email}
                  family="medium"
                  size={SIZES.medium}
                  color={COLORS.white}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ height: 500 }}>
        <Tab.Navigator>
          <Tab.Screen name="Bookings" component={TopBookings} />
          <Tab.Screen name="Trips" component={TopTrips} />
          <Tab.Screen name="Info" component={TopInfo} />
        </Tab.Navigator>
      </View>
    </View>
  );
};
//https://d326fntlu7tble.cloudfront.net/uploads/c87b6dfb-ee4b-47fa-9c02-6ccca2893a6f-vinci_06.jpg

export default AuthTopTab;
