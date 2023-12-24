import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePickers from "expo-image-picker";
import { storage } from "../../firebase";
import { Toast } from "toastify-react-native";

const ImagePicker = React.forwardRef(
  (
    { closeSheet, openSheet, progress, Loading, setImage, setUploadError },
    refs
  ) => {
    const handleImage = async () => {
      const permissionResult =
        await ImagePickers.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      const pickerResult = await ImagePickers.launchImageLibraryAsync({
        mediaTypes: ImagePickers.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!pickerResult.canceled && pickerResult.assets.length > 0) {
        const selectedImage = pickerResult.assets[0];
        const storageRef = ref(storage, "images/" + selectedImage.fileName);

        // Convert selected image to blob
        const response = await fetch(selectedImage.uri);
        const blob = await response.blob();

        // Upload the blob to Firebase Storage
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            Loading(true);
            // Progress updates (if needed)
            const upload =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            progress(upload);
            if (progress == 100) {
              Loading(false);
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            setUploadError("Error uploading image");
          },
          () => {
            // Handle successful uploads on completion
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                setImage(downloadURL);
                Toast.success("image uploaded");

                // You can use the 'downloadURL' for displaying the image or further operations
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
                Toast.success("error try again");
              });
          }
        );
        closeSheet(); // Accessing the selected image URI from assets
      } else {
        closeSheet();
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
