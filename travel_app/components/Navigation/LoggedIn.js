import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoggedIn = () => {
  const [isLogggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const getAuth = useCallback(async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setLoggedIn(true);
      
      setEmail(JSON.parse(user).email);
    }
  }, [isLogggedIn, email]);
  useEffect(() => {
    getAuth();
  }, [getAuth]);
  return { email, isLogggedIn };
};
