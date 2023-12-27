import { StyleSheet, Platform, StatusBar } from "react-native";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { AdminContainer } from "../../components";

import createCountry from "../../Request/CreateCountry";

const Country = ({ navigation }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [loading, setLoading] = useState(false);
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
  }, [image, UploadError, uploadLoading]);

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

    setLoading(true);
    await createCountry("country", form);
    setLoading(false);
    setForm({ country: "", imageUrl: "", region: "", description: "" });
    setFormError({ country: "", imageUrl: "", description: "" });
  });

  return (
    <AdminContainer
      title={"create country"}
      navigation={navigation}
      screen={"editCountry"}
      form={form}
      setForm={setForm}
      setFormError={setFormError}
      formError={formError}
      openSheet={openSheet}
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      handleSubmit={handleSubmit}
      uploadLoading={uploadLoading}
      setUploadLoading={setUploadLoading}
      setUploadProgress={setUploadProgress}
      uploadProgress={uploadProgress}
      setImage={setImage}
      country={country}
      loading={loading}
    />
  );
};

export default Country;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  imageContainer: {
    height: 200,
    marginHorizontal: 10,
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
