import { getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { addDoc, collection, firestore } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "toastify-react-native";
export const CreateProfile = async (collectionName, data, navigation) => {
  try {
    const profile = await getProfile();
    if (profile) {
      const docRef = doc(firestore, collectionName, profile.id);
      await updateDoc(docRef, {
        ...data,
      });

      Toast.success("Profile updated!");
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
      return;
    }
    const user = await AsyncStorage.getItem("user");

    if (!user) {
      Toast.error("please sign in");
      return;
    }

    const _id = JSON.parse(user).localId;
   
    await addDoc(collection(firestore, collectionName), {
      ...data,
      owner: _id,
    });

    Toast.success("profile updated!");

    setTimeout(() => {
      navigation.goBack();
    }, 3000);
  } catch (error) {
    Toast.error("Something went wrong");
  }
};

export const getProfile = async () => {
  let user = await AsyncStorage.getItem("user");
  //get profile by id
  const uid = JSON.parse(user).localId;

  // Create a query to fetch the profile document
  const profileQuery = query(
    collection(firestore, "profile"),
    where("owner", "==", uid)
  );

  // Execute the query to get the profile document
  try {
    const querySnapshot = await getDocs(profileQuery);
    let prof = [];
    querySnapshot.forEach((doc) => {
      // Access the profile document data here
      prof.push({ ...doc.data(), id: doc.id });
      // You can use 'doc.data()' to access the profile document fields
    });

    return prof[0];
  } catch (error) {
    Toast.error("Something went wrong");
  }
};
