import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Progress from "react-native-progress";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import {
  CountryList,
  DescriptionInput,
  HeightSpacer,
  ImagePicker,
  NetworkImage,
  ReuseableBtn,
} from "../../components";

import ToastManager from "toastify-react-native";
import { AntDesign } from "@expo/vector-icons";
import createCountry from "../../Request/CreateCountry";

const Country = ({ navigation }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [form, setForm] = useState({
    imageUrl: "",
    country: "",
    region: "",
    popular: [],
    description: "",
  });
  const [formError, setFormError] = useState({
    imageUrl: "",
    country: "",
    description: "",
  });
  const [UploadError, setUploadError] = useState("");
  const [country, setCountry] = useState([]);

  const [image, setImage] = useState("");
  const sheetRef = useRef(null);
  const getCountry = useCallback(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const name = data.map((item) => ({
          country: item.name.common,
          flag: item.flag,
          region: item.region,
        }));

        setCountry(name); // Array of country objects
      })
      .catch((error) => {
        Toast.error("Error fetching country");
      });
  });
  useEffect(() => {
    getCountry();
    setForm((prev) => ({ ...prev, imageUrl: image }));
  }, [image, UploadError]);

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
  const handleSubmit = useCallback(async () => {
    if (!form.imageUrl) {
      return setFormError((prev) => ({
        ...prev,
        imageUrl: "This field is required",
      }));
    }
    if (!form.country) {
      return setFormError((prev) => ({
        ...prev,
        country: "This field is required",
      }));
    }
    if (!form.description) {
      return setFormError((prev) => ({
        ...prev,
        description: "This field is required",
      }));
    }

    await createCountry("country", form);
    setForm({ country: "", imageUrl: "", region: "", description: "" });
    setFormError({ country: "", imageUrl: "", description: "" });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: 10 }}
        >
          <AntDesign name="left" size={20} />
        </TouchableOpacity>
        <ToastManager />
        <HeightSpacer height={10} />
        <View style={styles.imageContainer}>
          {form.imageUrl && (
            <NetworkImage
              source={form.imageUrl}
              width={"100%"}
              height={"100%"}
              borderRadius={12}
            />
          )}
        </View>
        <TouchableOpacity onPress={openSheet}>
          <View
            style={{
              alignItems: "center",
              paddingHorizontal: 30,
              justifyContent: "center",
            }}
          >
            <View style={styles.chooseImage}>
              <Text style={{ paddingRight: 10 }}>Choose image</Text>
            </View>
          </View>
        </TouchableOpacity>
        {formError.imageUrl && !form.imageUrl && (
          <Text
            style={{
              textAlign: "center",
              fontFamily: "medium",
              color: COLORS.red,
              marginTop: 5,
            }}
          >
            {formError.imageUrl}
          </Text>
        )}
        {uploadLoading && uploadProgress !== 100 && (
          <View style={styles.progressBarContainer}>
            <Progress.Bar progress={Math.ceil(uploadProgress)} width={200} />
            <Text>{Math.ceil(uploadProgress)}%</Text>
          </View>
        )}
        {UploadError && (
          <Text style={{ alignText: "center", color: COLORS.red }}>
            {UploadError}
          </Text>
        )}
        <View style={{ marginTop: 40 }}>
          <CountryList country={country} select={setForm} />
        </View>
        <HeightSpacer height={20} />
        {formError.country && !form.country && (
          <Text
            style={{
              textAlign: "center",
              fontFamily: "medium",
              color: COLORS.red,
              marginTop: 5,
            }}
          >
            {formError.country}
          </Text>
        )}
        <HeightSpacer height={40} />
        <DescriptionInput
          height={100}
          backgroundColor={COLORS.white}
          width={SIZES.width - 50}
          placeholder={"Enter Description"}
          borderRadius={12}
          padding={5}
          color={COLORS.dark}
          family={"medium"}
          onChange={(text) =>
            setForm((prev) => ({ ...prev, description: text }))
          }
        />
        {formError.description && !form.description && (
          <Text
            style={{
              textAlign: "center",
              fontFamily: "medium",
              color: COLORS.red,
              marginTop: 5,
            }}
          >
            {formError.description}
          </Text>
        )}
        <HeightSpacer height={30} />
        <View style={{ marginHorizontal: 25 }}>
          <ReuseableBtn
            btnText={"Submit"}
            textColor={COLORS.dark}
            width={SIZES.width - 50}
            backgroundColor={COLORS.green}
            onPress={handleSubmit}
          />
        </View>
        <ImagePicker
          ref={sheetRef}
          closeSheet={closeSheet}
          openSheet={openSheet}
          progress={setUploadProgress}
          Loading={setUploadLoading}
          setImage={setImage}
          setUploadError={setUploadError}
        />
        <HeightSpacer height={40} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Country;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar : 0,
  },
  imageContainer: {
    height: 200,
    marginHorizontal:10,
    backgroundColor: COLORS.lightWhite,
    padding: 10,
    
  },
  selectContainer: {},
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
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
});
