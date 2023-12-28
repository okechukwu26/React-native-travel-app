import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AppBar,
  AssetImage,
  HeightSpacer,
  ImagePicker,
  NetworkImage,
  ReuseableBtn,
  WidthSpacer,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import * as Progress from "react-native-progress";

import ToastManager, { Toast } from "toastify-react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { CreateProfile } from "../../Request/Profile";

const EditProfile = ({ navigation }) => {
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [form, setForm] = useState({
    UserName: "",
    phone: "",
    imageUrl: "",
  });
  useEffect(() => {
    setForm((prev) => ({ ...prev, imageUrl: image }));
  }, [image, progress]);
  const sheetRef = useRef(null);
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };
  //close
  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const handleSubmit = useCallback(async () => {
    if (!form.UserName && !form.image && !form.phone) {
      return Toast.error("please fill one field", "top");
    }
    const updated = RemoveEmptyValues(form);
  
    setUpdateLoading(true);
    await CreateProfile("profile", updated, navigation);
    setUpdateLoading(false);
  });

  return (
    <SafeAreaView style={styles.container}>
      <ToastManager />
      <View style={{ height: 40 }}>
        <AppBar
          top={20}
          left={20}
          right={20}
          color={COLORS.white}
          drop={true}
          onPress={() => navigation.goBack()}
        />
      </View>
      <HeightSpacer height={100} />

      <View style={styles.imageContainer}>
        {image ? (
          <NetworkImage
            borderRadius={70}
            width={150}
            height={150}
            source={image}
          />
        ) : (
          <AssetImage
            width={200}
            height={200}
            mode={"cover"}
            data={require("../../assets/user.png/")}
          />
        )}
      </View>

      {loading && (
        <View style={styles.containerProgress}>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
        </View>
      )}
      {loading && (
        <Text style={{ textAlign: "center" }}>
          Progress: {Math.ceil(progress)}%
        </Text>
      )}

      <TouchableOpacity onPress={openSheet}>
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: 30,
            justifyContent: "center",
          }}
        >
          <View style={styles.chooseImage}>
            <Text style={{ paddingRight: 10 }}>
              {loading ? "Loading..." : "Choose image"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <HeightSpacer height={20} />
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.label}>UserName</Text>
          <View style={styles.inputWrapper(COLORS.white)}>
            <AntDesign name="user" size={20} color={COLORS.gray} />
            <WidthSpacer width={10} />
            <TextInput
              placeholder="Enter UserName"
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, UserName: text }))
              }
              value={form.UserName}
              autoCapitalize="none"
              autoCorrect={false}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </View>

      <View style={styles.wrapper}>
        <View>
          <Text style={styles.label}>Phone</Text>
          <View style={styles.inputWrapper(COLORS.white)}>
            <Feather name="phone" size={20} color={COLORS.gray} />
            <WidthSpacer width={10} />
            <TextInput
              keyboardType="phone-pad"
              placeholder="Enter Phone No."
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, phone: text }))
              }
              value={form.phone}
              autoCapitalize="none"
              autoCorrect={false}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <ReuseableBtn
          textColor={COLORS.white}
          borderColor={COLORS.green}
          backgroundColor={COLORS.green}
          borderWidth={1}
          width={SIZES.width - 100}
          btnText={updateLoading ? "Updating..." : "Update"}
          onPress={handleSubmit}
          loader={updateLoading || loading}
        />
      </View>

      <ImagePicker
        ref={sheetRef}
        closeSheet={closeSheet}
        openSheet={openSheet}
        progress={setProgress}
        Loading={setLoading}
        setImage={setImage}
      />
    </SafeAreaView>
  );
};

export default EditProfile;
function RemoveEmptyValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      // Filter out empty values (null, undefined, empty string, empty array, empty object)
      return (
        value !== null &&
        value !== undefined &&
        !(typeof value === "string" && value.trim() === "") &&
        !(Array.isArray(value) && value.length === 0) &&
        !(typeof value === "object" && Object.keys(value).length === 0)
      );
    })
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
  },
  imageContainer: {
    alignItems: "center",
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
  inputWrapper: (borderColor) => ({
    borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 40,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  }),
  wrapper: {
    marginBottom: 15,
    width: SIZES.width - 50,
    marginHorizontal: 25,
  },
  label: {
    marginBottom: 5,
    fontFamily: "regular",
    marginEnd: 5,
    textAlign: "right",
    fontSize: SIZES.small,
  },
  progressBarContainer: {
    width: "80%",
    height: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
  },
  progressBar: {
    height: "100%",
    backgroundColor: COLORS.blue, // Change the color as needed
  },
  containerProgress: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
