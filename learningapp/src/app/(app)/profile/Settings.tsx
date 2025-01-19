import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import Button from "@design/Button/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { logout, getCurrentSession } from "@core/auth/api";
import { getProfile, updateProfile } from "@core/profiles/api";
import { useRouter } from "expo-router";

export default function Settings() {
  const [profile, setProfile] = useState({
    surname: "",
    lastname: "",
    nickname: "",
    birth: "", // YYYY-MM-DD
    img: "",
    sound: true,
    vibration: true,
  });
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const router = useRouter();
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
      if (profileData) {
        setProfile({
          surname: profileData.surname || "",
          lastname: profileData.lastname || "",
          nickname: profileData.nickname || "",
          birth: profileData.birth || "", // YYYY-MM-DD
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
      console.log("updatedProfile: ", updatedProfile);

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

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setDatePickerVisible(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0]; // takes away the time from date
      setProfile({ ...profile, birth: formattedDate });
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading profile...</Text>
      ) : (
        <>
          <Text style={styles.header}>Edit Profile</Text>

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

          <TouchableOpacity
            style={styles.datePickerContainer}
            onPress={() => setDatePickerVisible(true)}
          >
            <Text style={styles.datePickerText}>
              {profile.birth || "Select Date of Birth"}
            </Text>
          </TouchableOpacity>
          {isDatePickerVisible && (
            <DateTimePicker
              value={profile.birth ? new Date(profile.birth) : new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={handleDateChange}
              maximumDate={new Date()} // Ensure birthdate cannot be in the future
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={profile.img}
            onChangeText={(text) => setProfile({ ...profile, img: text })}
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
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  datePickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  datePickerText: {
    color: "#333",
  },
  topMargin: {
    marginTop: 10,
    alignItems: "center",
  },
});
