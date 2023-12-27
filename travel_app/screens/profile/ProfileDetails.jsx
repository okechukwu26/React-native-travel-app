import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AppBar,
  AssetImage,
  HeightSpacer,
  ImagePicker,
  NetworkImage,
  ReuseableText,
} from "../../components";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import reuseable from "../../components/Reuseable/reuseable.Style";

import { getProfile } from "../../Request/Profile";

import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const ProfileDetails = ({ navigation }) => {
  const [image, setImage] = useState("");
  const [uploadProgess, setUploadProgress] = useState(0);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [profile, setProfile] = useState([]);

  const sheetRef = useRef();
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
  const getProfileMemoized = useCallback(async () => {
    try {
      const profileData = await getProfile();
      if(profileData){
        setProfile(profileData);

      }
      // Use the profile data retrieved from Firestore
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  }, []);
  //get profile using useEffect
  useFocusEffect(
    useCallback(() => {
      getProfileMemoized(); // Call the memoized function within useFocusEffect
    }, [getProfileMemoized])
  );

  console.log(profile);

  return (
    <View style={styles.container}>
      <View style={{ height: 40 }}>
        <AppBar
          icon={"edit"}
          color1={COLORS.white}
          top={20}
          left={20}
          right={20}
          title={"My  Profile"}
          color={COLORS.white}
          drop={true}
          onPress={() => navigation.navigate("Home")}
          onPress1={() => navigation.navigate("editProfile")}
        />
      </View>
      <HeightSpacer height={100} />

      <View style={styles.imageContainer}>
        {profile.imageUrl ? (
          <NetworkImage
            width={200}
            height={200}
            borderRadius={100}
            source={profile.imageUrl}
          />
        ) : (
          <AssetImage
            width={200}
            height={200}
            data={require("../../assets/user.png/")}
          />
        )}
      </View>

      <HeightSpacer height={20} />
      <View
        style={{
          backgroundColor: COLORS.lightBlue,
          height: "40%",
          borderRadius: 100,
          borderColor: COLORS.blue,
          borderWidth: 3,
          width: SIZES.width - 20,
          marginHorizontal: 10,
        }}
      >
        <HeightSpacer height={50} />
        <View
          style={[
            reuseable.rowWithSpace("space-around"),
            { paddingHorizontal: 20 },
          ]}
        >
          <ReuseableText
            family={"medium"}
            text={"UserName  "}
            size={TEXT.medium}
            color={COLORS.white}
          />
          <View style={styles.inputContainer}>
            <TextInput
              value={profile.UserName ? profile.UserName : ""}
              style={styles.input}
              editable={false}
            />
          </View>
        </View>
        <HeightSpacer height={20} />
        <View
          style={[
            reuseable.rowWithSpace("space-around"),
            { paddingHorizontal: 20 },
          ]}
        >
          <ReuseableText
            family={"medium"}
            text={"Phone        "}
            size={TEXT.medium}
            color={COLORS.white}
          />
          <View style={styles.inputContainer}>
            <TextInput
              value={profile.phone ? profile.phone : ""}
              style={styles.input}
              editable={false}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  imageContainer: {
    alignItems: "center",
  },
  inputContainer: {
    height: 30,
    backgroundColor: COLORS.blue,

    borderRadius: 12,
    color: COLORS.dark,
    borderColor: COLORS.lightWhite,
    flex: 1,
  },
  chooseImage: {
    alignText: "center",
    justifyContent: "center",
    marginTop: 10,
    height: 30,
    width: SIZES.width - 50,
    marginHorizontal: 30,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    color: COLORS.white,
    textAlign: "center",
    fontFamily: "medium",
    fontSize: TEXT.medium,
  },
});
