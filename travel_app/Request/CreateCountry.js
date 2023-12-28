import { getDocs } from "firebase/firestore";
import { addDoc, collection, firestore } from "../firebase";
import { Toast } from "toastify-react-native";

const createCountry = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(firestore, collectionName), data);

    Toast.success("country created");
    return docRef.id; // Return the ID of the created document if needed
  } catch (error) {
    Toast.error("Something went wrong");
    // Throw the error for handling in calling code if needed
  }
};

export const getCountry = async (collectionName, setCountry) => {
  try {
    const db = firestore;
    const array = [];
    const [Hotel] = await Promise.all([
      getDocs(collection(db, collectionName)),
    ]);
    Hotel.forEach((doc) => array.push({ _id: doc.id, ...doc.data() }));
    setCountry(array);
  } catch (error) {
    Toast.error("Somethin went wrong");
  }
};
export default createCountry;
