import { addDoc, collection, firestore } from "../firebase";
import { Toast } from "toastify-react-native";

export const createPlace = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(firestore, collectionName), data);
    console.log(docRef.id);
    Toast.success("place created");
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
