import { getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { addDoc, collection, firestore } from "../firebase";
import { Toast } from "toastify-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const Booking = async (navigation, data, ref) => {
  try {
  
    const info = {
      ...data,
      ref,
    };
    await addDoc(collection(firestore, "transaction"), info);

    navigation.navigate("Successful", { info });
  } catch (error) {
    Toast.error("Something went wrong");
  }
};

export const GetHotelBooking = async () => {
  try {
    let user = await AsyncStorage.getItem("user");

    if (user) {
      const uid = JSON.parse(user).localId;

      //get hotels where owner id uid
      const booking = query(
        collection(firestore, "transaction"),
        where("owner", "==", uid)
      );

      const querySnapshot = await getDocs(booking);
      let prof = [];
      querySnapshot.forEach((doc) => {
        prof.push({ ...doc.data(), id: doc.id });
      });

      return prof ?? [];
    }
  } catch (error) {
    
    Toast.error("Something went wrong");
  }
};
