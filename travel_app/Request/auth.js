import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Toast } from "toastify-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const RegisterUser = async (loading, value, navigation) => {
  try {
    loading(true);
    const res = await createUserWithEmailAndPassword(
      auth,
      value.email,
      value.password
    );

    loading(false);
    Toast.success("registration successful");
    setTimeout(() => {
      navigation.goBack();
    }, 3000);
  } catch (error) {
    loading(false);
    if (error.code === "auth/email-already-in-use") {
      Toast.error("Email is already in use");
    } else {
      Toast.error("Firebase authentication error");
    }
  }
};
export const Login = async (loading, value, navigation) => {
  try {
    loading(true);
    const res = await signInWithEmailAndPassword(
      auth,
      value.email,
      value.password
    );

    await AsyncStorage.setItem("user", JSON.stringify(res._tokenResponse));
    loading(false);
    Toast.success("login successful");
    setTimeout(() => {
      navigation.navigate("Home");
    }, 3000);
  } catch (error) {
    loading(false);

    if (error.code === "auth/invalid-credential") {
      Toast.error("invalid credentials");
    } else {
      Toast.error("something went wrong");
    }
  }
};
