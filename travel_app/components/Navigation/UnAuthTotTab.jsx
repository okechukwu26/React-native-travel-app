import { View, ScrollView } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS } from "../../constants/theme";
import AssetImage from "../Reuseable/AssetImage";
import HeightSpacer from "../Reuseable/HeightSpacer";
import { Registration, Signin } from "../../screens";
import ToastManager from "toastify-react-native";
import { LoggedIn } from "./LoggedIn";
const Tab = createMaterialTopTabNavigator();

const UnAuthTopTab = () => {
  const { isLogggedIn } = LoggedIn();
  
  return (
    <View style={{ backgroundColor: COLORS.lightWhite }}>
      <ToastManager width={256} />
      <ScrollView style={{ backgroundColor: COLORS.lightWhite }}>
        <HeightSpacer height={60} />
        <AssetImage
          mode={"contain"}
          width={"100%"}
          height={200}
          data={require("../../assets/images/bg2.png")}
        />
        <View style={{ height: 700 }}>
          <Tab.Navigator>
            <Tab.Screen name="Signin" component={Signin} />
            <Tab.Screen name="Register" component={Registration} />
          </Tab.Navigator>
        </View>
      </ScrollView>
    </View>
  );
};

export default UnAuthTopTab;
