import { addDoc, collection, firestore } from "../firebase";
import { Toast } from "toastify-react-native"
export const createHotel = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(firestore, collectionName), data);
    console.log(docRef.id);
    Toast.success("hotel created");
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
