import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Country, CreateHotel, CreatePlace } from "../../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
const Tab = createBottomTabNavigator();
const tabBarStyle = {
  padding: 20,
  borderRadius: 10,
  height: 60,
  position: "absolute",
  bottom: 7,
  right: 10,
  left: 10,
};

const Admin = () => {
  return (
    <Tab.Navigator
      initialRouteName="Country"
      activeColor="#EB6A58"
      tabBarHideKeyBoard={true}
      headerShown={false}
      inactiveColor="#3e2465"
      barStyle={{ paddingBottom: 48 }}
    >
      <Tab.Screen
        name="Country"
        component={Country}
        options={{
          tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Fontisto
              name={focused ? "world" : "world-o"}
              color={focused ? COLORS.lightGreen : COLORS.gray}
              size={20}
              style={{ marginBottom: 15 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="createHotel"
        component={CreateHotel}
        options={{
          tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Fontisto
              name={focused ? "hotel" : "hotel-alt"}
              color={focused ? COLORS.lightGreen : COLORS.gray}
              size={20}
              style={{ marginBottom: 15 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="createPlaces"
        component={CreatePlace}
        options={{
          tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name={focused ? "place" : "place"}
              color={focused ? COLORS.lightGreen : COLORS.gray}
              size={20}
              style={{ marginBottom: 15 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Admin;

const styles = StyleSheet.create({});
