import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AdminContainer,
  Container,
  CountryList,
  DescriptionInput,
  HeightSpacer,
  ImagePicker,
  NetworkImage,
  ReuseableBtn,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import * as Progress from "react-native-progress";
import ToastManager from "toastify-react-native";
import { getCountry } from "../../Request/CreateCountry";
import reuseable from "../../components/Reuseable/reuseable.Style";
import { createHotel } from "../../Request/CreateHotel";

const CreateHotel = ({ navigation }) => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    imageUrl: "",

    location: "",

    description: "",
    country_id: "",
  });
  const [formError, setFormError] = useState({
    imageUrl: "",

    location: "",

    description: "",
    country_id: "",
  });
  const [country, setCountry] = useState([]);
  const [image, setImage] = useState("");
  const sheetRef = useRef(null);
  const fetchCountry = useCallback(async () => {
    try {
      await getCountry("country", setCountry);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchCountry();
    setForm((prev) => ({ ...prev, imageUrl: image }));
  }, [fetchCountry, image, uploadLoading]);

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
    if (!form.country_id) {
      return setFormError((prev) => ({
        ...prev,
        country_id: "This field is required",
      }));
    }
    if (!form.description) {
      return setFormError((prev) => ({
        ...prev,
        description: "This field is required",
      }));
    }
    if (!form.location) {
      return setFormError((prev) => ({
        ...prev,
        location: "This field is required",
      }));
    }
    if (!form.title) {
      return setFormError((prev) => ({
        ...prev,
        title: "This field is required",
      }));
    }

    setLoading(true);
    await createHotel("hotel", form);
    setLoading(false);
    await createCountry("hotel", form);
    setForm({ country: "", imageUrl: "", region: "", description: "" });
    setFormError({ country: "", imageUrl: "", description: "" });
  });
  return (
    <AdminContainer
      title={"create hotel"}
      Title
      location
      navigation={navigation}
      screen={"editHotel"}
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
    // <Container
    //   navigation={navigation}
    //   title={"create hotels"}
    //   screen={"editHotel"}
    // >
    //   <ScrollView>
    //     <ToastManager />
    //     <HeightSpacer height={10} />
    //     <View style={styles.imageContainer}>
    //       {form.imageUrl && (
    //         <NetworkImage
    //           source={form.imageUrl}
    //           width={"100%"}
    //           height={"100%"}
    //           borderRadius={12}
    //         />
    //       )}
    //     </View>
    //     <TouchableOpacity onPress={openSheet}>
    //       <View
    //         style={{
    //           alignItems: "center",
    //           paddingHorizontal: 30,
    //           justifyContent: "center",
    //         }}
    //       >
    //         <View style={styles.chooseImage}>
    //           <Text style={{ paddingRight: 10 }}>
    //             {uploadLoading ? "Loading..." : "Choose image"}
    //           </Text>
    //         </View>
    //       </View>
    //     </TouchableOpacity>
    //     {formError.imageUrl && !form.imageUrl && (
    //       <Text
    //         style={{
    //           textAlign: "center",
    //           fontFamily: "medium",
    //           color: COLORS.red,
    //           marginTop: 5,
    //         }}
    //       >
    //         {formError.imageUrl}
    //       </Text>
    //     )}
    //     {uploadLoading && (
    //       <View style={styles.progressBarContainer}>
    //         <Progress.Bar progress={Math.ceil(uploadProgress)} width={200} />
    //         <Text>{Math.ceil(uploadProgress)}%</Text>
    //       </View>
    //     )}
    //     <HeightSpacer height={20} />
    //     <View
    //       style={[
    //         reuseable.rowWithSpace("center"),
    //         {
    //           backgroundColor: COLORS.white,
    //           marginHorizontal: 25,
    //           borderRadius: 12,
    //         },
    //       ]}
    //     >
    //       <TextInput
    //         placeholder="Enter title"
    //         style={styles.input}
    //         onChangeText={(title) => setForm((prev) => ({ ...prev, title }))}
    //       />
    //     </View>
    //     {formError.title && !form.title && (
    //       <Text
    //         style={{
    //           textAlign: "center",
    //           fontFamily: "medium",
    //           color: COLORS.red,
    //           marginTop: 5,
    //         }}
    //       >
    //         {formError.title}
    //       </Text>
    //     )}
    //     <HeightSpacer height={20} />
    //     <View
    //       style={[
    //         reuseable.rowWithSpace("center"),
    //         {
    //           backgroundColor: COLORS.white,
    //           marginHorizontal: 25,
    //           borderRadius: 12,
    //         },
    //       ]}
    //     >
    //       <TextInput
    //         placeholder="Enter Location"
    //         style={styles.input}
    //         onChangeText={(location) =>
    //           setForm((prev) => ({ ...prev, location }))
    //         }
    //       />
    //     </View>
    //     {formError.location && !form.location && (
    //       <Text
    //         style={{
    //           textAlign: "center",
    //           fontFamily: "medium",
    //           color: COLORS.red,
    //           marginTop: 5,
    //         }}
    //       >
    //         {formError.location}
    //       </Text>
    //     )}
    //     <HeightSpacer height={20} />
    //     <DescriptionInput
    //       height={40}
    //       backgroundColor={COLORS.white}
    //       width={SIZES.width - 50}
    //       placeholder={"Enter Description"}
    //       borderRadius={12}
    //       padding={5}
    //       color={COLORS.dark}
    //       family={"medium"}
    //       onChange={(text) =>
    //         setForm((prev) => ({ ...prev, description: text }))
    //       }
    //     />
    //     {formError.description && !form.description && (
    //       <Text
    //         style={{
    //           textAlign: "center",
    //           fontFamily: "medium",
    //           color: COLORS.red,
    //           marginTop: 5,
    //         }}
    //       >
    //         {formError.description}
    //       </Text>
    //     )}
    //     <View style={{ marginTop: 40 }}>
    //       <CountryList country={country} select={setForm} />
    //     </View>
    //     {formError.country_id && !form.country && (
    //       <Text
    //         style={{
    //           textAlign: "center",
    //           fontFamily: "medium",
    //           color: COLORS.red,
    //           marginTop: 5,
    //         }}
    //       >
    //         {formError.country_id}
    //       </Text>
    //     )}
    //     <HeightSpacer height={30} />
    //     <View style={{ marginHorizontal: 25 }}>
    //       <ReuseableBtn
    //         btnText={"Submit"}
    //         textColor={COLORS.white}
    //         width={SIZES.width - 50}
    //         backgroundColor={COLORS.green}
    //         onPress={handleSubmit}
    //         loader={uploadLoading}
    //       />
    //     </View>
    //     <ImagePicker
    //       ref={sheetRef}
    //       closeSheet={closeSheet}
    //       openSheet={openSheet}
    //       progress={setUploadProgress}
    //       Loading={setUploadLoading}
    //       setImage={setImage}
    //     />
    //     <HeightSpacer height={40} />
    //   </ScrollView>
    // </Container>
  );
};

export default CreateHotel;

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
    width: SIZES.width - 50,
    backgroundColor: COLORS.white,
    paddingLeft: 10,
    borderRadius: 12,
    height: 30,
  },
});
