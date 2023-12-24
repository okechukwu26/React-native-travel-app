import { addDoc, collection, firestore } from "../firebase";

const createCountry = async (collectionName, data) => {
  console.log(collectionName, data);
    try {
      const docRef = await addDoc(collection(firestore, collectionName), data);
      console.log(docRef.id);
      return docRef.id; // Return the ID of the created document if needed
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error; // Throw the error for handling in calling code if needed
    }
};
export default createCountry;
