import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
 
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import reuseable from "../Reuseable/reuseable.Style";
import ReuseableText from "../Reuseable/ReuseableText";
import { Feather } from "@expo/vector-icons";
import { COLORS,  TEXT } from "../../constants/theme";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import HotelCard from "../Tiles/Hotel/HotelCard";
import HeightSpacer from "../Reuseable/HeightSpacer";

const BestHotels = () => {
  const navigation = useNavigation();
  const [hotel, setHotel] = useState([]);
  const [loading, setLoading] = useState(false);
  const getHotel = useCallback(async () => {
    const db = firestore;
    setLoading(true);
    const [Place] = await Promise.all([getDocs(collection(db, "hotel"))]);
    const place1 = [];
    Place.forEach((doc) => {
      place1.push({
        _id: doc.id,
        ...doc.data(),
      });
    });
    setHotel(place1);

    setLoading(false);
  }, []);
  useEffect(() => {
    getHotel();
  }, [getHotel]);

  return (
    <View>
      <View
        style={[
          reuseable.rowWithSpace("space-between"),
          { paddingBottom: 10, paddingHorizontal: 10 },
        ]}
      >
        <ReuseableText
          text={"Nearby Hotels"}
          family={"medium"}
          size={TEXT.medium}
          color={COLORS.black}
        />
        <TouchableOpacity onPress={() => navigation.navigate("HotelList")}>
          <Feather name="list" size={20} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.blue} />
      ) : (
        <View>
           <HeightSpacer height={15} />
           {hotel.length === 0 ? ( <ReuseableText
              text={"No place created yet"}
              family={"medium"}
              size={TEXT.medium}
              align={"center"}
              color={COLORS.dark}
            />) : (<FlatList
              data={hotel}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ columnGap: 2 }}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <HotelCard
                  item={item}
                  margin={7}
                  onPress={() => navigation.navigate("HotelDetails", { item })}
                  />
                  )}
                  />)}

        
              </View>
      )}
    </View>
  );
};

export default BestHotels;

const styles = StyleSheet.create({});
