import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { API } from "@/src/lib/networking/supabaseClient";
import { useRouter } from "expo-router";
import Button from "@/src/components/design/Button";

export default function IndexScreen() {
  const router = useRouter();

  console.log("index");

  const handleLogout = async () => {
    await API.auth.signOut();
    router.replace("/auth/LoginScreen");
  };

  const handleSettings = async () => {
    router.replace("/profile/Settings");
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Settings" onPress={handleSettings} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
