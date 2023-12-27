import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import UnAuthTopTab from "./UnAuthTotTab";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthTopTab from "./AuthTopTab";
import { LoggedIn } from "./LoggedIn";
import { User } from "../../screens";
import { useFocusEffect } from '@react-navigation/native';
const TopTab = ({ navigation }) => {
  const [isLogggedIn, setLoggedIn] = useState(false);
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("");


  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const user = await AsyncStorage.getItem('user');
          if (user) {
            setLoggedIn(true);
            setEmail(JSON.parse(user).email);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchData();
    }, [])
  );

  return (
    <View>
      {isLogggedIn ? (
        <AuthTopTab
          navigation={navigation}
          email={email}
          setLoggedIn={setLoggedIn}
          setEmail={setEmail}
        />
      ) : (
        <UnAuthTopTab />
      )}
    </View>
  );
};

export default TopTab;

const styles = StyleSheet.create({});
