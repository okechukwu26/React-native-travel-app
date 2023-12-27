import { getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { addDoc, collection, firestore } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "toastify-react-native";

export const CreatePaymentMethod = async (collectionName, data) => {
  try {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      const uid = JSON.parse(user).localId;
      console.log(uid);
      const exist = await getPaymentMethod();
      if (exist) {
        if (exist.method.includes(data.name)) {
          Toast.error("This method already exist");
          return;
        }
        const docRef = doc(firestore, collectionName, exist.id);
        await updateDoc(docRef, {
          method: [...exist.method, data.name],
        });

        Toast.success("Payment method saved!");

        return;
      }

      await addDoc(collection(firestore, collectionName), {
        owner: uid,
        method: [data.name],
      });

      Toast.success("Payment method saved!");

      return;
    }
  } catch (error) {
    Toast.error("Something went wrong");
  }
};

export const getPaymentMethod = async () => {
  try {
    let user = await AsyncStorage.getItem("user");
    //get profile by id
    const uid = JSON.parse(user).localId;
    const paymentQuery = query(
      collection(firestore, "paymentMethod"),
      where("owner", "==", uid)
    );
    const querySnapshot = await getDocs(paymentQuery);
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
