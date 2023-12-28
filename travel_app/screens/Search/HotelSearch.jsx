// import {
//   SafeAreaView,
//   View,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import React, { useState, useEffect, useCallback } from "react";
// import reuseable from "../../components/Reuseable/reuseable.Style";
// import styles from "./search.style";
// import { COLORS } from "../../constants/theme";
// import { Feather } from "@expo/vector-icons";
// import { AppBar, HeightSpacer } from "../../components";
// import ReuseableTitle from "../../components/Reuseable/ReuseableTitle";
// import HotelCard from "../../components/Tiles/Hotel/HotelCard";
// import { useFocusEffect } from "@react-navigation/native";
// import { getAllHotel } from "../../Request/CreateHotel";
// import { Toast } from "toastify-react-native";
// const HotelSearch = ({ navigation }) => {
//   const [searchKey, setSearchKey] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [Hotels, setHotels] = useState([]);
//   const [filteredHotel, setFilteredHotel] = useState([]);

//   useFocusEffect(
//     useCallback(() => {
//       const fetchData = async () => {
//         const hotel = await getAllHotel();
//         if (hotel) {
//           setFilteredHotel(hotel);
//           setHotels(hotel);
//         }
//       };

//       fetchData();
//     }, [])
//   );
//   useEffect(() => {
//     if (searchKey !== "") {
//       const filtered = Hotels.filter((hotel) =>
//         hotel.title.toLowerCase().includes(searchKey.toLowerCase())
//       );
//       setFilteredHotel(filtered);
//     } else {
//       setFilteredHotel(Hotels);
//     }
//   }, [searchKey, Hotels]);

//   const handleSearch = (text) => {
//     setSearchKey(text);
//   };
//   return (
//     <SafeAreaView>
// <View style={{ height: 70 }}>
//   <AppBar
//     color={COLORS.white}
//     color1={COLORS.white}
//     icon={"filter"}
//     title={"Look for hotels"}
//     onPress={() => navigation.goBack()}
//     top={40}
//     left={20}
//     right={20}
//     drop={true}
//   />
// </View>
// <View style={styles.searchContainer}>
//   <View style={styles.searchWrapper}>
//     <TextInput
//       style={styles.input}
//       placeholder="where do you want to stay"
//       value={searchKey}
//       onChangeText={handleSearch}
//     />
//   </View>
//   <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
//     <Feather name="search" size={24} color={COLORS.white} />
//   </TouchableOpacity>
// </View>
//       {Hotels.length === 0 ? (
//         <View>
//           <HeightSpacer height={"20%"} />
//           <Image
//             source={require("../../assets/images/search.png")}
//             style={styles.searchImage}
//           />
//         </View>
//       ) : (
//         <FlatList
//         data={filteredHotel}
//         numColumns={2}
//         showsVerticalScrollIndicator={false}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <HotelCard
//             item={item}
//             margin={8}
//             onPress={() => navigation.navigate("HotelDetails", item._id)}
//           />
//         )}
//         ListEmptyComponent={() => (
//           <View style={styles.noResultsContainer}>
//             <HeightSpacer height={"20%"} />
//             <Image
//               source={require("../../assets/images/search.png")}
//               style={styles.searchImage}
//             />
//           </View>
//         )}
//       />
//       )}

//     </SafeAreaView>
//   );
// };

// export default HotelSearch;

import {
  FlatList,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { Feather } from "@expo/vector-icons";
import { AppBar, HeightSpacer } from "../../components";
import HotelCard from "../../components/Tiles/Hotel/HotelCard";
import { useFocusEffect } from "@react-navigation/native";
import { getAllHotel } from "../../Request/CreateHotel";
import styled from "./search.style";

const HotelSearch = ({ navigation }) => {
  const [searchKey, setSearchKey] = useState("");
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const hotelData = await getAllHotel();
        if (hotelData) {
          setFilteredHotels(hotelData);
          setHotels(hotelData);
        }
      };

      fetchData();
    }, [])
  );

  useEffect(() => {
    if (searchKey !== "") {
      const filtered = hotels.filter((hotel) =>
        hotel.title.toLowerCase().includes(searchKey.toLowerCase())
      );
      setFilteredHotels(filtered);
    } else {
      setFilteredHotels(hotels);
    }
  }, [searchKey, hotels]);

  const handleSearch = (text) => {
    setSearchKey(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 70 }}>
        <AppBar
          color={COLORS.white}
          color1={COLORS.white}
          icon={"filter"}
          title={"Look for hotels"}
          onPress={() => navigation.goBack()}
          top={40}
          left={20}
          right={20}
          drop={true}
        />
      </View>

      <View style={styled.searchContainer}>
        <View style={styled.searchWrapper}>
          <TextInput
            style={styled.input}
            placeholder="where do you want to stay"
            value={searchKey}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity style={styled.searchBtn} onPress={() => {}}>
          <Feather name="search" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredHotels}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HotelCard
            item={item}
            margin={8}
            onPress={() => navigation.navigate("HotelDetails", { item })}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.noResultsContainer}>
            <HeightSpacer height={"20%"} />
            <Image
              source={require("../../assets/images/search.png")}
              style={styles.searchImage}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white, // Set your desired background color
  },
  appBarContainer: {
    height: 70,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  searchWrapper: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    marginRight: 10,
  },
  input: {
    height: 40,
    fontSize: 16,
  },
  searchBtn: {
    padding: 10,
  },
  noResultsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  searchImage: {
    width: "100%",
    height: SIZES.height / 2.2,
    resizeMode: "contain",
    borderRadius: SIZES.small,
    paddingHorizontal: 20,
  },
});

export default HotelSearch;
