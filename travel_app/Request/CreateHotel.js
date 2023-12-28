import { addDoc, collection, firestore } from "../firebase";
import { Toast } from "toastify-react-native";
import { getDocs } from "firebase/firestore";
export const createHotel = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(firestore, collectionName), data);
   
    Toast.success("hotel created");
    return docRef.id;
  } catch (error) {
    Toast.error("Error adding hotel");
  }
};

export const getAllHotel = async () => {
  try {
    const hotel = await getDocs(collection(firestore, "hotel"));
    let array = [];

    hotel.forEach((doc) => array.push({ id: doc.id, ...doc.data() }));

    return array;
  } catch (error) {
    Toast.error("Error getting hotels ");
  }
};
