import { View, Text, ScrollView } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ToastManager from "toastify-react-native";
import { COLORS } from "../../constants/theme";
import { AssetImage } from "../../components";
import HeightSpacer from "../../components/Reuseable/HeightSpacer";
import Signin from "../authentication/Signin";
import Registration from "../authentication/Registration";

const Tab = createMaterialTopTabNavigator();

const UnAuthTopTab = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ToastManager />
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <HeightSpacer height={60} />
        <AssetImage
          mode={"cover"}
          width={"100%"}
          height={300}
          data={require("../../assets/images/bg1.png")}
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
