import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";

import ReuseableTitle from "../../components/Reuseable/ReuseableTitle";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import reuseable from "../../components/Reuseable/reuseable.Style";
import { HeightSpacer, ReuseableBtn, WidthSpacer } from "../../components";
import { useFocusEffect } from "@react-navigation/native";
import ToastManager, { Toast } from "toastify-react-native";
import { GetHotelBooking } from "../../Request/BookHotel";

const TopBookings = () => {
  const [Booking, setBooking] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const booking = await GetHotelBooking();
        if (booking.length > 0) {
          setBooking(booking);
        }
      };
      fetchData();
    }, [])
  );

  return (
    <View style={{ margin: 20, marginBottom: 100 }}>
      <ToastManager width={300} />
      <FlatList
        data={Booking}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: COLORS.lightWhite,
              marginBottom: 10,
              borderRadius: 16,
            }}
          >
            <ReuseableTitle item={item} />
            <View
              style={[reuseable.rowWithSpace("space-between"), { padding: 10 }]}
            >
              <ReuseableBtn
                borderColor={COLORS.lightBlue}
                borderWidth={1}
                backgroundColor={COLORS.white}
                textColor={COLORS.blue}
                btnText={"Details"}
                width={"50%"}
              />
              <WidthSpacer width={5} />
              <ReuseableBtn
                borderColor={COLORS.lightRed}
                borderWidth={1}
                backgroundColor={COLORS.red}
                textColor={COLORS.white}
                btnText={"Cancel"}
                width={"50%"}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TopBookings;

const styles = StyleSheet.create({});
