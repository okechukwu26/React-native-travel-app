import {
  FlatList,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import HeightSpacer from "../Reuseable/HeightSpacer";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import Country from "../Tiles/Country/Country";
import ReuseableText from "../Reuseable/ReuseableText";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";

import ToastManager, { Toast } from "toastify-react-native";

const Places = () => {
  const [isLoading, setLoading] = useState(true);
  const [place, setPlace] = useState([]);
  const itemsCount = 3;

  const getPlaces = useCallback(async () => {
    const db = firestore;
    setLoading(true);
    const [Place] = await Promise.all([getDocs(collection(db, "country"))]);
    const place1 = [];
    Place.forEach((doc) => {
      place1.push({
        _id: doc.id,
        ...doc.data(),
      });
    });
    setPlace(place1);
    // const hotel1 = [];
    // Hotel.forEach((doc) => {
    //   hotel1.push({
    //     _id: doc.id,
    //     ...doc.data(),
    //   });
    // });
    // setHotel(hotel1);
    setLoading(false);
  }, []);
  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  const renderShimmerPlaceholder = () => {
    return (
      <View style={{ padding: 15 }}>
        <ShimmerPlaceholder
          visible={isLoading}
          LinearGradient={LinearGradient}
          style={{
            width: 75,
            height: 75,
            borderRadius: 15,
            marginRight: 10,
          }}
          duration={1000}
        />
        <HeightSpacer height={10} />
        <ShimmerPlaceholder
          visible={isLoading}
          LinearGradient={LinearGradient}
          style={{ width: 80, height: 20, borderRadius: 4, marginRight: 10 }}
          duration={1000}
        />
      </View>
    );
  };

  return (
    <View>
      <ToastManager />
      <HeightSpacer height={15} />
      {isLoading ? (
        <FlatList
          data={Array.from({ length: itemsCount }, (_, index) =>
            index.toString()
          )}
          horizontal
          keyExtractor={(item) => item}
          renderItem={() => renderShimmerPlaceholder()}
        />
      ) : (
        <View>
          <HeightSpacer height={15} />
          {place.length === 0 ? (
            <ReuseableText
              text={"No place created yet"}
              family={"medium"}
              size={TEXT.medium}
              align={"center"}
              color={COLORS.dark}
            />
          ) : (
            <VirtualizedList
              data={place}
              horizontal
              keyExtractor={(item) => item._id}
              showsHorizontalScrollIndicator={false}
              getItemCount={(data) => data.length}
              getItem={(data, index) => data[index]}
              renderItem={({ item, index }) => (
                <View style={{ marginRight: SIZES.medium }}>
                  <Country item={item} />
                </View>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default Places;

const styles = StyleSheet.create({});
