import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import Button from "@design/Button/Button";
import { handleImagePicker, uploadImage } from "@core/utils/profileImageUtils";
import { logout, getCurrentSession } from "@core/auth/api";
import { getProfile, updateProfile } from "@core/profiles/api";

export default function Settings() {
  const [profile, setProfile] = useState({
    surname: "",
    lastname: "",
    nickname: "",
    birth: "",
    img: "",
    sound: true,
    vibration: true,
  });
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      const session = await getCurrentSession();

      if (!session) {
        Alert.alert(
          "Error",
          "Unable to retrieve session. Please log in again."
        );
        setLoading(false);
        return;
      }

      const profileData = await getProfile(session.user.user_id);
      console.log(profileData?.img);

      if (profileData) {
        setProfile({
          surname: profileData.surname || "",
          lastname: profileData.lastname || "",
          nickname: profileData.nickname || "",
          birth: profileData.birth || "",
          img: profileData.img || "",
          sound: profileData.sound ?? true,
          vibration: profileData.vibration ?? true,
        });
      } else {
        Alert.alert("Error", "Unable to load profile data.");
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    setIsSaving(true);
    try {
      const session = await getCurrentSession();
      if (!session) {
        Alert.alert(
          "Error",
          "Unable to retrieve session. Please log in again."
        );
        setIsSaving(false);
        return;
      }

      const updatedProfile = await updateProfile(session.user.user_id, profile);

      if (updatedProfile) {
        Alert.alert("Success", "Profile updated successfully!");
      } else {
        Alert.alert("Error", "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async () => {
    handleImagePicker(async (uri: string) => {
      try {
        await uploadImage(uri, async (publicUrl: string) => {
          // Update the `img` field in the profile data
          const session = await getCurrentSession();
          if (!session) {
            Alert.alert(
              "Error",
              "Unable to retrieve session. Please log in again."
            );
            return;
          }

          const updatedProfile = await updateProfile(session.user.user_id, {
            ...profile,
            img: publicUrl,
          });

          if (updatedProfile) {
            setProfile((prevProfile) => ({ ...prevProfile, img: publicUrl }));
            Alert.alert("Success", "Image uploaded and profile updated!");
          } else {
            Alert.alert("Error", "Failed to update profile image.");
          }
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        Alert.alert("Error", "Failed to upload image.");
      }
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading profile...</Text>
      ) : (
        <>
          <Text style={styles.header}>Edit Profile</Text>

          <TouchableOpacity onPress={handleImageUpload}>
            {profile.img ? (
              <Image
                source={{ uri: profile.img }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>Upload Image</Text>
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Surname"
            value={profile.surname}
            onChangeText={(text) => setProfile({ ...profile, surname: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Lastname"
            value={profile.lastname}
            onChangeText={(text) => setProfile({ ...profile, lastname: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Nickname"
            value={profile.nickname}
            onChangeText={(text) => setProfile({ ...profile, nickname: text })}
          />

          <View style={styles.switchContainer}>
            <Text>Enable Sound</Text>
            <Switch
              value={profile.sound}
              onValueChange={(value) =>
                setProfile({ ...profile, sound: value })
              }
            />
          </View>

          <View style={styles.switchContainer}>
            <Text>Enable Vibration</Text>
            <Switch
              value={profile.vibration}
              onValueChange={(value) =>
                setProfile({ ...profile, vibration: value })
              }
            />
          </View>

          <Button onPress={handleUpdateProfile}>
            {isSaving ? "Saving..." : "Save Profile"}
          </Button>
          <View style={styles.topMargin}>
            <Button onPress={logout}> Logout </Button>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  placeholderText: { color: "#fff" },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  topMargin: { marginTop: 20 },
});
