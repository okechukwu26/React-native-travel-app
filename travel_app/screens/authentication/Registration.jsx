import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import styles from "./signin.style";
import { Formik } from "formik";
import * as yup from "yup";
import { COLORS, SIZES } from "../../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WidthSpacer from "../../components/Reuseable/WidthSpace";
import ReuseableBtn from "../../components/Button/ReuseableBtn";
import { RegisterUser } from "../../Request/auth";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "password must be at least 8 characters")
    .required("This field is required"),
  email: yup
    .string()
    .email("This email is not valid")
    .required("This field is required"),

});

const Registration = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [secureText, setSecureText] = useState(false);
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (value) => {
          await RegisterUser(setLoader, value, navigation);
        }}
      >
        {({
          handleChange,
          touched,
          handleSubmit,
          errors,
          values,
          isValid,
          setFieldTouched,
        }) => (
          <View>
           
            <View style={styles.wrapper}>
              <View>
                <Text style={styles.label}>Email</Text>
                <View
                  style={styles.inputWrapper(
                    touched.email ? COLORS.lightBlue : COLORS.lightGrey
                  )}
                >
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color={COLORS.gray}
                  />
                  <WidthSpacer width={10} />
                  <TextInput
                    placeholder="Enter email"
                    onFocus={() => setFieldTouched("email")}
                    onBlur={() => setFieldTouched("email", "")}
                    onChangeText={handleChange("email")}
                    value={values.email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ flex: 1 }}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorMessage}>{errors.email}</Text>
                )}
              </View>
            </View>
            <View style={styles.wrapper}>
              <View>
                <Text style={styles.label}>Password</Text>
                <View
                  style={styles.inputWrapper(
                    touched.password ? COLORS.lightBlue : COLORS.lightGrey
                  )}
                >
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color={COLORS.gray}
                  />
                  <WidthSpacer width={10} />
                  <TextInput
                    secureTextEntry={secureText}
                    placeholder="Enter Password"
                    onFocus={() => setFieldTouched("password")}
                    onBlur={() => setFieldTouched("password", "")}
                    onChangeText={handleChange("password")}
                    value={values.password}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ flex: 1 }}
                  />
                  <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                    <MaterialCommunityIcons
                      name={secureText ? "eye-outline" : "eye-off-outline"}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorMessage}>{errors.password}</Text>
                )}
              </View>
            </View>
            <ReuseableBtn
              textColor={COLORS.white}
              borderColor={COLORS.green}
              backgroundColor={COLORS.green}
              borderWidth={1}
              width={SIZES.width - 50}
              btnText={"REGISTER"}
              onPress={handleSubmit}
              loader={loader}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Registration;
