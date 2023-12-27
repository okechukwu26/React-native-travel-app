import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import reuseable from "../../components/Reuseable/reuseable.Style";
import { HeightSpacer, ReuseableText } from "../../components";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { AntDesign } from "@expo/vector-icons";
import style from "./home.style";
import Places from "../../components/Home/Places";
import Recommendation from "../../components/Home/Recommendation";
import BestHotels from "../../components/Home/BestHotels";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProfile } from "../../Request/Profile";
import { useFocusEffect } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const [hotel, setHotel] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  const getAll = useCallback(async () => {
    const db = firestore;
    setLoading(true);
    const [Hotel] = await Promise.all([getDocs(collection(db, "hotel"))]);
    const user = await AsyncStorage.getItem("user");
    if (user) {
      const profile = await getProfile();
      if (profile) {
        setUsername(profile.UserName);
      }
    }

    const hotel1 = [];
    Hotel.forEach((doc) => {
      hotel1.push({
        _id: doc.id,
        ...doc.data(),
      });
    });
    setHotel(hotel1);
    setLoading(false);
  }, []);
  useFocusEffect(
    useCallback(() => {
      getAll();
    }, [getAll])
  );
  return (
    <SafeAreaView style={reuseable.container}>
      <ScrollView>
        <View>
          <View
            style={[
              reuseable.rowWithSpace("space-between"),
              { paddingHorizontal: 10 },
            ]}
          >
            <ReuseableText
              text={username ? `welcome ${username} ` : "Hey User!"}
              family={"medium"}
              size={TEXT.medium}
              color={COLORS.black}
            />
            <TouchableOpacity
              style={style.box}
              onPress={() => navigation.navigate("Search")}
            >
              <AntDesign name="search1" size={22} />
            </TouchableOpacity>
          </View>
          <HeightSpacer height={SIZES.medium} />
          <View style={{ paddingHorizontal: 10 }}>
            <ReuseableText
              text={"Places"}
              family={"medium"}
              size={TEXT.medium}
              color={COLORS.black}
            />
          </View>
          <Places />
          <HeightSpacer height={3} />
          <Recommendation />
          <HeightSpacer height={15} />
          <BestHotels hotel={hotel} />
        </View>
        <HeightSpacer height={70} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
