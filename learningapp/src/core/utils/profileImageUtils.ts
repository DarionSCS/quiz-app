import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import { API } from "@core/networking/supabaseClient";
import { getCurrentSession } from "@core/auth/api";

import * as ImagePicker from "expo-image-picker";

export const handleImagePicker = async (
  uploadFunction: (uri: string) => Promise<void>
) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permission Denied",
      "Permission to access the media library is required!"
    );
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled && result.assets?.[0]) {
    const selectedImage = result.assets[0];
    await uploadFunction(selectedImage.uri);
  }
};

export const uploadImage = async (
  uri: string,
  setProfileImg: (img: string) => void
) => {
  try {
    const session = await getCurrentSession();
    if (!session) {
      Alert.alert("Error", "Unable to retrieve session. Please log in again.");
      return;
    }

    const fileName = `${session.user.user_id}-${Date.now()}.jpg`;

    // Read the file as a base64 string using expo-file-system
    const fileBase64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convert base64 string to binary data
    const binaryData = Uint8Array.from(atob(fileBase64), (c) =>
      c.charCodeAt(0)
    );

    const { data, error } = await API.storage
      .from("EduApp")
      .upload(`profile-images/${fileName}`, binaryData, {
        contentType: "image/jpeg",
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image.");
      return;
    }

    const { data: publicData } = await API.storage
      .from("EduApp")
      .createSignedUrl(`profile-images/${fileName}`, 999999999999999);

    if (!publicData) {
      Alert.alert("Error", "Failed to retrieve public URL.");
      return;
    }

    const publicUrl = publicData.signedUrl;
    setProfileImg(publicUrl);

    Alert.alert("Success", "Image uploaded successfully!");
  } catch (error) {
    console.error("Error uploading image:", error);
    Alert.alert("Error", "An unexpected error occurred while uploading.");
  }
};
