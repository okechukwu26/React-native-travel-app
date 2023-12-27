import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Container from "./Container";
import ToastManager from "toastify-react-native";
import HeightSpacer from "./HeightSpacer";
import NetworkImage from "./NetworkImage";
import { COLORS, SIZES } from "../../constants/theme";
import CountryList from "./CountryList";
import * as Progress from "react-native-progress";
import DescriptionInput from "./DescriptionInput";
import ImagePicker from "./ImagePicker";
import ReuseableBtn from "../Button/ReuseableBtn";
import reuseable from "./reuseable.Style";

const AdminContainer = ({
  country,
  Title,
  location,
  uploadLoading,
  title,
  screen,
  navigation,
  form,
  setForm,
  openSheet,
  formError,
  sheetRef,
  setUploadLoading,
  setImage,
  setUploadProgress,
  handleSubmit,
  uploadProgress,
  closeSheet,
  loading,
}) => {
  return (
    <Container navigation={navigation} title={title} screen={screen}>
      <ScrollView>
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
        {uploadLoading && (
          <View style={styles.progressBarContainer}>
            <Progress.Bar progress={Math.ceil(uploadProgress)} width={200} />
            <Text>{Math.ceil(uploadProgress)}%</Text>
          </View>
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
                {uploadLoading ? "Loading..." : "Choose image"}
              </Text>
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
        <View style={{ marginTop: 40 }}>
          <CountryList country={country} select={setForm} />
        </View>
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
        <HeightSpacer height={20} />
        {Title && (
          <View
            style={[
              reuseable.rowWithSpace("center"),
              {
                backgroundColor: COLORS.white,
                marginHorizontal: 25,
                borderRadius: 12,
              },
            ]}
          >
            <TextInput
              placeholder="Enter title"
              style={styles.input}
              onChangeText={(title) => setForm((prev) => ({ ...prev, title }))}
            />
          </View>
        )}
        {formError.title && !form.title && (
          <Text
            style={{
              textAlign: "center",
              fontFamily: "medium",
              color: COLORS.red,
              marginTop: 5,
            }}
          >
            {formError.title}
          </Text>
        )}
        <HeightSpacer height={20} />
        {location && (
          <View
            style={[
              reuseable.rowWithSpace("center"),
              {
                backgroundColor: COLORS.white,
                marginHorizontal: 25,
                borderRadius: 12,
              },
            ]}
          >
            <TextInput
              placeholder="Enter Location"
              style={styles.input}
              onChangeText={(location) =>
                setForm((prev) => ({ ...prev, location }))
              }
            />
          </View>
        )}
        {formError.location && !form.location && (
          <Text
            style={{
              textAlign: "center",
              fontFamily: "medium",
              color: COLORS.red,
              marginTop: 5,
            }}
          >
            {formError.location}
          </Text>
        )}
        <HeightSpacer height={20} />
        <DescriptionInput
          height={40}
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
            btnText={loading ? "please wait..." : "Submit"}
            textColor={COLORS.white}
            width={SIZES.width - 50}
            backgroundColor={COLORS.green}
            onPress={handleSubmit}
            loader={loading}
          />
        </View>
        <ImagePicker
          ref={sheetRef}
          closeSheet={closeSheet}
          openSheet={openSheet}
          progress={setUploadProgress}
          Loading={setUploadLoading}
          setImage={setImage}
        />
        <HeightSpacer height={130} />
      </ScrollView>
     
    </Container>
  );
};

export default AdminContainer;

const styles = StyleSheet.create({
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
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  input: {
    width: SIZES.width - 50,
    backgroundColor: COLORS.white,
    paddingLeft: 10,
    borderRadius: 12,
    height: 30,
  },
});
