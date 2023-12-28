import {
  StyleSheet,
  ActivityIndicator,
  View,
  VirtualizedList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import HeightSpacer from "../Reuseable/HeightSpacer";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import Country from "../Tiles/Country/Country";
import ReuseableText from "../Reuseable/ReuseableText";

import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";

import ToastManager, { Toast } from "toastify-react-native";

const Places = () => {
  const [isLoading, setLoading] = useState(false);
  const [place, setPlace] = useState([]);

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

    setLoading(false);
  }, []);
  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  return (
    <View>
      <ToastManager />
      <HeightSpacer height={15} />
      {isLoading ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={COLORS.blue} />
        </View>
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
                  {/* Replace this with your Country component */}
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

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
