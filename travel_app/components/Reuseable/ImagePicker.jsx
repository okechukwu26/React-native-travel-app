import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";

import * as ImagePickers from "expo-image-picker";
import {
  storage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "../../firebase";
import { Toast } from "toastify-react-native";

const ImagePicker = React.forwardRef(
  (
    { closeSheet, openSheet, progress, Loading, setImage, setUploadError },
    refs
  ) => {
    const handleImage = async () => {
      try {
        const permissionResult =
          await ImagePickers.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }

        const pickerResult = await ImagePickers.launchImageLibraryAsync({
          mediaTypes: ImagePickers.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!pickerResult.canceled && pickerResult.assets.length > 0) {
          const image = pickerResult.assets[0];

          const metadata = {
            contentType: "image/jpeg",
          };
          Loading(true);
          let uploadTask;
          if (Platform.OS === "android") {
            const storageRef = ref(storage, "images/" + Date.now());
            const imageBlob = await getBlobFroUri(image.uri);
            uploadTask = uploadBytesResumable(storageRef, imageBlob, metadata);
          } else if (Platform.OS === "ios") {
            const response = await fetch(image.uri);

            const storageRef = ref(storage, "images/" + image.fileName);
            const blob = await response.blob();

            uploadTask = uploadBytesResumable(storageRef, blob);
          } else {
            throw new Error("Unsupported platform");
          }

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const upload =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              
              progress(upload);

            },
            (error) => {
             
              switch (error.code) {
                case "storage/unauthorized":
                  break;
                case "storage/canceled":
                  break;

                // ...

                case "storage/unknown":
                  break;
              }
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               
                setImage(downloadURL);
                Toast.success("image uploaded");
                Loading(false);
              });
            }
          );
        }
        closeSheet();
      } catch (error) {
       
        Toast.error("error try again");
        Loading(false);
      }
    };

    return (
      <RBSheet
        ref={refs}
        height={190}
        duration={250}
        closeOnDragDown
        dragFromTopOnly
        customStyles={{
          container: styles.container,
        }}
      >
        <TouchableOpacity onPress={handleImage} style={styles.imageContainer}>
          <Text style={styles.text}>Choose from Gallery</Text>
        </TouchableOpacity>
      </RBSheet>
    );
  }
);

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    // height: 200,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
});

const getBlobFroUri = async (uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  return blob;
};
