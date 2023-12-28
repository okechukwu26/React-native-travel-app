import { getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { addDoc, collection, firestore } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "toastify-react-native";

export const CreatePaymentMethod = async (collectionName, data) => {
  try {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      const uid = JSON.parse(user).localId;

      const exist = await getPaymentMethod();
      const empty = isEmptyObject(exist);
      if (empty) {
        await addDoc(collection(firestore, collectionName), {
          owner: uid,
          method: [data.name],
        });
      } else {
        if (exist.method.includes(data.name)) {
          Toast.error("This method already exist");
          return;
        } else {
          const docRef = doc(firestore, collectionName, exist.id);
          await updateDoc(docRef, {
            method: [...exist.method, data.name],
          });
        }
      }
      Toast.success("Payment method saved!");
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
    console.log(prof);
    return prof[0] ?? {};
  } catch (error) {
    Toast.error("Something went wrong");
  }
};

export const CustomizeCard = async (closeSheet, data, navigation) => {
  console.log(navigation);
  try {
    let user = await AsyncStorage.getItem("user");
    if (user) {
      const uid = JSON.parse(user).localId;
      const cardQuery = query(
        collection(firestore, "paymentMethod"),
        where("owner", "==", uid)
      );
      const querySnapshot = await getDocs(cardQuery);
      let prof = [];
      querySnapshot.forEach((doc) => {
        // Access the profile document data here
        prof.push({ ...doc.data(), id: doc.id });
        // You can use 'doc.data()' to access the profile document fields
      });
      const docRef = doc(firestore, "paymentMethod", prof[0].id);
      if (prof[0].card) {
        if (prof[0].card.some((item) => item.card === data.card)) {
          Toast.error("This card already has a name");
          navigation.navigate("Card");
          navigation.goBack();
          return closeSheet();
        }
        console.log(prof[0].card);
        await updateDoc(docRef, {
          card: [...prof[0].card, data],
        });

        // Toast.success("Card customized successfully");

        navigation.navigate("Card");
        navigation.goBack();
        closeSheet();
        return;
      }

      await updateDoc(docRef, {
        card: [data],
      });
      // Toast.success("Card customized successfully");
      navigation.navigate("Card");
      navigation.goBack();
      closeSheet();
    }
  } catch (error) {
    Toast.error("something went wrong");
  }
};

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};
